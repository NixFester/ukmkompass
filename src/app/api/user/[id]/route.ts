import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';

// Define the context type explicitly
interface Context {
  params: {
    id: string; // Match your dynamic route parameter name
  };
}

export async function GET(req: NextRequest, { params }: Context) {
  const { id } = params; // Extract 'id' from the dynamic route
  const db = await connectToDatabase();
  const collection = db.collection('user');

  try {
    const user = await collection.findOne({ id });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch user", error }, { status: 500 });
  }
}
