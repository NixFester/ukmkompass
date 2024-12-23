import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { id, article }: { id: string; article: IArticle } = body;
  if (!id) return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  if (!article) return NextResponse.json({ message: "Article is required" }, { status: 400 });
  
  const db = await connectToDatabase();
  const collection = db.collection('user');
  
  

  try {
    const user = await collection.findOne({ id });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const existingArticleIndex = user.article.findIndex((a: { id: string }) => a.id === article.id);

    if (existingArticleIndex !== -1) {
      user.article[existingArticleIndex] = article;
    } else {
      user.article.push(article);
    }

    await collection.updateOne({ id }, { $set: { article: user.article } });
    return NextResponse.json({ message: "Article saved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error saving article:", error);
    return NextResponse.json({ message: "Failed to save article", error }, { status: 500 });
  }
}