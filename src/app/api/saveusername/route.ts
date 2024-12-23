import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, name } = body;
  const db = await connectToDatabase();
  const collection = db.collection('user');

  try {
    const user = await collection.findOne({ id });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
    await collection.updateOne({ id }, { $set: { name } });
    return NextResponse.json({ message: "Username updated" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to save user", error }, { status: 500 });
  }
}