import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../../lib/mongodb';

function isUnique(str: string, arr: string[]): boolean {
    return !arr.includes(str);
  }

export async function POST(req: NextRequest, 
  { params }: { params: Promise<{ id: string, articleId:string }> }
) {
  const { id,articleId } = await params;
  const db = await connectToDatabase();
  const collection = db.collection('user');

  try {
    const user = await collection.findOne({ id });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
    user.interaksi = user.interaksi || []
    if (isUnique(articleId,user.interaksi)){
        user.interaksi.push(articleId)
        await collection.updateOne({ id:id }, { $set:{interaksi: user.interaksi}})
    }
    return NextResponse.json(user, { status: 200 });

    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch user", error }, { status: 500 });
  }
}