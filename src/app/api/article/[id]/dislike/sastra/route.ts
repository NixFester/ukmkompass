import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../../lib/mongodb';

export async function POST(req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await connectToDatabase();
  const collection = db.collection('user');

  try {
    const user = await collection.findOne({ 'sastra.id': id });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const sastraIndex = user.sastra.findIndex((a: { id: string }) => a.id === id);
    if (sastraIndex === -1) return NextResponse.json({ message: "sastra not found" }, { status: 404 });
    user.sastra[sastraIndex].dislike = user.sastra[sastraIndex].dislike || 0
    user.sastra[sastraIndex].dislike = user.sastra[sastraIndex].dislike + 1
    await collection.updateOne({ id:user.id }, { $set: {sastra: user.sastra} })

    return NextResponse.json({ message: "dislike added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding dislike:", error);
    return NextResponse.json({ message: "Failed to add dislike", error }, { status: 500 });
  }
}