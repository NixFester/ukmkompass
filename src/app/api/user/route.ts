import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function POST(req: NextRequest) {
  const { id, profpic, name, email } = await req.json();
  const db = await connectToDatabase();
  const collection = db.collection('user');

  try {
    const existingUser = await collection.findOne({ id });
    if (!existingUser) {
      await collection.insertOne({
        id,
        profpic,
        email,
        name,
        description: "I Think, Therefore I Am",
        article: [],
      });
    } else {
      return NextResponse.json({ message: "User already saved" }, { status: 200 });
    }

    return NextResponse.json({ message: "User saved successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to save user", error }, { status: 500 });
  }
}