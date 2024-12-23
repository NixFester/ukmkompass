import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET(req: NextRequest) {
  const db = await connectToDatabase();
  const collection = db.collection('user');

  try {
    const users = await collection.find({}).toArray();

    const sastras = users
      .flatMap((user) => user.sastra || [])
      .map((artikel) => ({
        ...artikel,
        sastra: true,
      }));

    const artikels = users
      .flatMap((user) => user.article || [])
      .map((artikel) => ({
        ...artikel,
        sastra: false,
      }));

    const isiblog = [...sastras, ...artikels];

    return NextResponse.json(isiblog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog content:", error);
    return NextResponse.json({ message: "Failed to fetch blog content", error }, { status: 500 });
  }
}