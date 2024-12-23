import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';

export async function POST(req: NextRequest, 
  { params }: { params: Promise<{ articleId: string; isiKomentar:komentarTemplate }> }) {
  const { articleId } = await params;
  const isiKomentar = await req.json();
  const db = await connectToDatabase();
  const collection = db.collection('user');

  try {
    const user = await collection.findOne({
      $or: [
      { 'article.id': articleId },
      { 'sastra.id': articleId }
      ]
    });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    if (isiKomentar.type){
      const articleIndex = user.sastra.findIndex((a: { id: string }) => a.id === articleId);
      if (articleIndex === -1) return NextResponse.json({ message: "Article not found" }, { status: 404 });
      user.sastra[articleIndex].komentar = user.sastra[articleIndex].komentar || []
      user.sastra[articleIndex].komentar.push(isiKomentar)
    } else {
      const articleIndex = user.article.findIndex((a: { id: string }) => a.id === articleId);
      if (articleIndex === -1) return NextResponse.json({ message: "Article not found" }, { status: 404 });
      user.article[articleIndex].komentar = user.article[articleIndex].komentar || []
      user.article[articleIndex].komentar.push(isiKomentar)
    }


    await collection.updateOne({ id:user.id }, { $set: isiKomentar.type?{ sastra: user.sastra }:{article: user.article} })

    return NextResponse.json({ message: "Comment added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ message: "Failed to add comment", error }, { status: 500 });
  }
}