import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, sastra } = body;
  const db = await connectToDatabase();
  const collection = db.collection('sastras');

  try {
    const result = await collection.updateOne(
      { _id: id },
      { $set: { sastra } },
      { upsert: true }
    );
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error saving sastra' }, { status: 500 });
  }
}