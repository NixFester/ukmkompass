import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb';

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  const userId = context.params.id;
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

    const existingsastraIndex = user.sastra.findIndex(
      (a: { id: string }) => a.id === id
    );

    if (existingsastraIndex !== -1) {
      // Update existing sastra
      user.sastra[existingsastraIndex] = artikel;
    } else {
      // Add new sastra
      user.sastra.push(artikel);
    }

    await collection.updateOne(
      { id: userId },
      { $set: { sastra: user.sastra } }
    );

    return NextResponse.json({ message: "Sastra saved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error saving sastra:", error);
    return NextResponse.json({ message: "Failed to save sastra", error }, { status: 500 });
  }
}