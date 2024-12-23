import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';

export async function PUT(req: NextRequest, context: { params: { artikelId: string } }) {
  const { artikelId } = context.params;
  const db = await connectToDatabase();
  const collection = db.collection('user');

  try {
    // Find the article by ID in the collection
    const article = await collection.findOne({ "article.id": artikelId });

    if (!article) {
      console.log("artikel not found, attempting sastra");
      const sastra = await collection.findOne({ "sastra.id": artikelId });
      if (!sastra) {
        return NextResponse.json(
          { message: "sastra and artikel not found!" },
          { status: 404 }
        );
      }
      console.log("attempting to update");

      const sastraIndex = sastra.sastra.findIndex(
        (isi: { id: string }) => isi.id === artikelId
      );

      if (sastraIndex === -1) {
        return NextResponse.json(
          { message: "sastra and artikel not found!" },
          { status: 404 }
        );
      }
      sastra.sastra[sastraIndex].lolosSensor = true;

      const updateResult = await collection.updateOne(
        { "sastra.id": artikelId },
        { $set: { sastra: sastra.sastra } }
      );
      if (updateResult.modifiedCount === 0) {
        return NextResponse.json(
          { message: "Failed to update artikel" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: "Artikel updated successfully",
        artikelId,
      });
    }

    const articleIndex = article.article.findIndex(
      (isi: { id: string }) => isi.id === artikelId
    );

    if (articleIndex === -1) {
      return NextResponse.json(
        { message: "article and artikel not found!" },
        { status: 404 }
      );
    }
    article.article[articleIndex].lolosSensor = true;

    const updateResult = await collection.updateOne(
      { "article.id": artikelId },
      { $set: { article: article.article } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Failed to update artikel" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Artikel updated successfully",
      artikelId,
    });
  } catch (error) {
    console.error("Error updating lolosSensor:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}