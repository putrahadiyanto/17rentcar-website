import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

/**
 * POST handler - Upload an image file
 */
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Get the file bytes
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate a unique filename with timestamp to prevent overwriting
        const timestamp = new Date().getTime();
        const originalName = file.name;
        const extension = originalName.substring(originalName.lastIndexOf('.'));
        const fileName = `${timestamp}${extension}`;

        // Ensure the directory exists (public/images/cars)
        const filePath = join(process.cwd(), 'public', 'images', 'cars', fileName);

        // Write the file to the public directory
        await writeFile(filePath, buffer);

        // Return the path that can be used in <Image> component 
        const relativePath = `/images/cars/${fileName}`;

        return NextResponse.json({
            success: true,
            filePath: relativePath,
            fileName: fileName
        }, { status: 201 });

    } catch (error: any) {
        console.error(`[BFF ERROR] Upload request:`, error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
