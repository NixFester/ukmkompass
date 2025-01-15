import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get('imageUrl'); // Get the image URL from query params

  if (!imageUrl) {
    return NextResponse.json({ message: "Image URL is required" }, { status: 400 });
  }

  try {
    // Fetch the image from the external source
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Return the image content with proper headers
    const headers = new Headers();
    headers.set('Content-Type', response.headers['content-type']);
    headers.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours

    return new NextResponse(response.data, { headers });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { message: "Failed to fetch image", error: error},
      { status: 500 }
    );
  }
}
