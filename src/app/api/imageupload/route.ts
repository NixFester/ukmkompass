import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('file');
  
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded or invalid file' }, { status: 400 });
    }
  
    try {
      // Convert the file to a Buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
  
      // Get the file type (mime type) and base64-encode the content
      const mimeType = file.type; // File objects have a `type` property for the MIME type
      const b64 = buffer.toString('base64');
      const dataURI = `data:${mimeType};base64,${b64}`;
  
      // Upload to Cloudinary
      const res = await cloudinary.uploader.upload(dataURI, {
        resource_type: 'auto',
      });
  
      return NextResponse.json(res, { status: 200 });
    } catch (error) {
      console.error('Error uploading file:', error);
      return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
  }