import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

/**
 * DELETE handler - Delete an image file
 */
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const filePath = searchParams.get('path');

        if (!filePath) {
            return NextResponse.json({ error: 'File path is required' }, { status: 400 });
        }

        // Extract filename from path
        const fileName = filePath.split('/').pop();

        // Only allow deletion from images/cars directory for security
        if (!filePath.startsWith('/images/cars/') || !fileName) {
            return NextResponse.json({
                error: 'Invalid path. Only files in /images/cars/ can be deleted'
            }, { status: 400 });
        }

        // Construct the full path to the file in the public directory
        const fullPath = join(process.cwd(), 'public', filePath);

        // Check if file exists
        if (!existsSync(fullPath)) {
            console.log(`[FileDelete] File not found: ${fullPath}`);
            // Return success even if file doesn't exist to make the API idempotent
            return NextResponse.json({
                success: true,
                message: 'File not found, no action needed'
            });
        }

        // Delete the file
        await unlink(fullPath);
        console.log(`[FileDelete] Successfully deleted file: ${fullPath}`);

        return NextResponse.json({
            success: true,
            message: 'File successfully deleted'
        });

    } catch (error: any) {
        console.error(`[FileDelete] Error deleting file:`, error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
