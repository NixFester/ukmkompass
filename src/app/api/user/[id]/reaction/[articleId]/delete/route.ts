import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../../../lib/mongodb';

function removeIfExists(str: string, arr: string[]): string[] {
    return arr.filter(item => item !== str);
  }

export async function DELETE(req: NextRequest, 
  { params }: { params: Promise<{ id: string, articleId:string }> }
) {
  const { id,articleId } = await params;
  const db = await connectToDatabase();
  const collection = db.collection('user');

  try {
    const user = await collection.findOne({ id });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
    const deletedInteraksi = removeIfExists(articleId,user.interaksi)
    await collection.updateOne({ id:id }, { $set:{interaksi: deletedInteraksi}})
    return NextResponse.json(user, { status: 200 });

    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch user", error }, { status: 500 });
  }
}