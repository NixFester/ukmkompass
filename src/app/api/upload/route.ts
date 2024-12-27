import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

// Configure environment variables
config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Helper function to handle file upload to Cloudinary
async function handleUpload(file: string) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });
  return res;
}

// API Route handler
export async function POST(req: NextRequest) {
  try {
    // Get the file from the request
    const contentType = req.headers.get('content-type');
    if (!contentType?.startsWith('multipart/form-data')) {
      return NextResponse.json(
        { message: 'Invalid content type. Expected multipart/form-data.' },
        { status: 400 }
      );
    }

    // Parse the incoming form data
    const formData = await req.formData();
    const file = formData.get('my_file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ message: 'No file uploaded.' }, { status: 400 });
    }

    // Convert the file to a base64 URI
    const buffer = await file.arrayBuffer();
    const b64 = Buffer.from(buffer).toString('base64');
    const dataURI = `data:${file.type};base64,${b64}`;

    // Upload the file to Cloudinary
    const cldRes = await handleUpload(dataURI);

    // Return the Cloudinary response
    return NextResponse.json(cldRes, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { message: 'Failed to upload file', error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
