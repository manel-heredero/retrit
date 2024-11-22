import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createTestImages = async () => {
    // Source image
    const sourceImage = path.join(__dirname, '../data/articles/images/croatia-dining-table-1600.jpg');
    const outputDir = path.join(__dirname, '../data/test-images');

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
        // Create different formats and sizes
        await sharp(sourceImage)
            .resize(800, 600)
            .jpeg()
            .toFile(path.join(outputDir, 'test-image.jpg'));

        await sharp(sourceImage)
            .resize(800, 600)
            .png()
            .toFile(path.join(outputDir, 'test-image.png'));

        await sharp(sourceImage)
            .resize(400, 300)
            .webp()
            .toFile(path.join(outputDir, 'test-image.webp'));

        await sharp(sourceImage)
            .resize(200, 150)
            .gif()
            .toFile(path.join(outputDir, 'test-image.gif'));

        console.log('Test images created successfully!');
    } catch (error) {
        console.error('Error creating test images:', error);
    }
};

createTestImages();