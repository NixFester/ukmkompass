import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb';

// Explicitly type the context
interface Context {
  params: {
    id: string; // Match your dynamic route segment name
  };
}

export async function GET(req: NextRequest, { params }: Context) {
  const { id } = params; // Extract the `id` from `context.params`
  const db = await connectToDatabase();
  const collection = db.collection('user');

  try {
    // Adjust the query if necessary to match your MongoDB document structure
    const user = await collection.findOne({ "article.id": id });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Failed to fetch user", error }, { status: 500 });
  }
}
