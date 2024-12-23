import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb';

export async function GET(_: any, { params }: { params: { id: string } }) {
  const { id } = params;
  const db = await connectToDatabase();
  const collection = db.collection('user');

  try {
    const user = await collection.findOne({ "article.id": id });
    if (!user) return NextResponse.json({ message: "Us er not found" }, { status: 404 });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch user", error }, { status: 500 });
  }
}