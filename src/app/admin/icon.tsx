import { ImageResponse } from 'next/og';
import { promises as fs } from 'fs';
import path from 'path';

export const size = { width: 32, height: 32 };
export const contentType = 'image/x-icon';

export default async function Icon() {
    try {
        // Read the favicon file from the public directory
        const faviconPath = path.join(process.cwd(), 'public', 'images', 'favicon.ico');
        const faviconBuffer = await fs.readFile(faviconPath);

        // Return the favicon as a Response
        return new Response(faviconBuffer, {
            headers: {
                'Content-Type': 'image/x-icon',
            },
        });
    } catch (error) {
        console.error('Error generating icon:', error);
        // Return a default or error icon if reading fails
        // You might want to replace this with a fallback icon buffer
        return new Response('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">?</text></svg>', {
            headers: {
                'Content-Type': 'image/svg+xml',
            },
        });
    }
} 