import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { v2 } from 'cloudinary';

import { config } from 'dotenv';

// Configure environment variables
config();

// Configure Cloudinary
v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ idArtikel: string }> }) {
  const { idArtikel } = await params;
  const db = await connectToDatabase();
  const collection = db.collection('user');

  try {
    // Find the article by ID in the collection
    let user = await collection.findOne({ "article.id": idArtikel });

    if (!user) {
      console.log("artikel not found, attempting sastra");
      user = await collection.findOne({ "sastra.id": idArtikel });
      if (!user) {
        return NextResponse.json({ message: "sastra and artikel not found!" }, { status: 404 });
      }
      console.log("attempting to delete sastra");
      const sastraIndex = user.sastra.findIndex((a: { id: string }) => a.id === idArtikel);
      if (sastraIndex === -1) {
        return NextResponse.json({ message: "sastra not found" }, { status: 404 });
      }
      const ImagePublicId = user.sastra[sastraIndex].image.split("/").pop().split(".")[0]
      v2.uploader.destroy(ImagePublicId).then(result=>console.log(result));
      user.sastra.splice(sastraIndex, 1);
      await collection.updateOne(
        { id: user.id },
        { $set: { sastra: user.sastra } }
      );
    } else {
      console.log("attempting to delete artikel");
      const artikelIndex = user.article.findIndex((a: { id: string }) => a.id === idArtikel);
      if (artikelIndex === -1) {
        return NextResponse.json({ message: "artikel not found" }, { status: 404 });
      }
      const ImagePublicId = user.article[artikelIndex].image.split("/").pop().split(".")[0]
      v2.uploader.destroy(ImagePublicId).then(result=>console.log(result));
      user.article.splice(artikelIndex, 1);
      await collection.updateOne(
        { id: user.id },
        { $set: { article: user.article } }
      );
    }

    return NextResponse.json({ message: "Artikel deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting artikel:", error);
    return NextResponse.json({ message: "error: " + error }, { status: 500 });
  }
}