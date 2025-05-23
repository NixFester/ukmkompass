import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';

export async function GET(req: NextRequest, 
    { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const db = await connectToDatabase();
    const collection = db.collection('user');

    try {
    const users = await collection.find({}).toArray();

    const article = users
        .flatMap((user) => user.article || [])
        .find((x) => {
            return x.id === id; // Explicit return
          });
    if (!article) {
        const sastra = users
        .flatMap((user) => user.sastra || [])
        .find((x) => {
            return x.id === id; // Explicit return
          });
        return NextResponse.json(sastra, { status: 200 });
    }

    return NextResponse.json(article, { status: 200 });
    } catch (error) {
    console.error("Error fetching blog content:", error);
    return NextResponse.json({ message: "Failed to fetch blog content", error }, { status: 500 });
    }
}