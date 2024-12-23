import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb';

export async function POST(req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const userId =  (await params).id;
  const { id, title, body, komentar, like, dislike, image } = await req.json();
  const artikel = image
    ? {
        id,
        title,
        body,
        image,
        komentar,
        like,
        dislike,
        lolosSensor: false,
      }
    : {
        id,
        title,
        body,
        komentar,
        like,
        dislike,
        lolosSensor: false,
      };

  const db = await connectToDatabase();
  const collection = db.collection('user');

  try {
    const user = await collection.findOne({ id: userId });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingarticleIndex = user.article.findIndex(
      (a: { id: string }) => a.id === id
    );

    if (existingarticleIndex !== -1) {
      // Update existing article
      user.article[existingarticleIndex] = artikel;
    } else {
      // Add new article
      user.article.push(artikel);
    }

    await collection.updateOne(
      { id: userId },
      { $set: { article: user.article } }
    );

    return NextResponse.json({ message: "article saved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error saving article:", error);
    return NextResponse.json({ message: "Failed to save article", error }, { status: 500 });
  }
}