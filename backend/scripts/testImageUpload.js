import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testSingleImage = async (imagePath) => {
    try {
        console.log(`\nTesting image: ${path.basename(imagePath)}`);
        
        // Get file info
        const stats = fs.statSync(imagePath);
        const fileSizeInMB = stats.size / (1024 * 1024);
        console.log(`File size: ${fileSizeInMB.toFixed(2)} MB`);
        
        // Read and convert image
        const imageBuffer = fs.readFileSync(imagePath);
        const fileExtension = path.extname(imagePath).toLowerCase();
        const mimeType = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp'
        }[fileExtension] || 'image/jpeg';
        
        const base64Image = `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
        
        // Upload
        const startTime = Date.now();
        const response = await axios.post('http://localhost:5000/api/images/upload', {
            image: base64Image
        });
        const endTime = Date.now();
        
        console.log('✅ Upload successful!');
        console.log('Image URL:', response.data.url);
        console.log(`Upload time: ${(endTime - startTime) / 1000} seconds`);
        return true;
    } catch (error) {
        console.error('❌ Upload failed:', error.message);
        if (error.response) {
            console.error('Error details:', error.response.data);
        }
        return false;
    }
};

const testImageUpload = async () => {
    // Array of test images with different formats
    const testImages = [
        path.join(__dirname, '../data/test-images/test-image.jpg'),
        path.join(__dirname, '../data/test-images/test-image.png'),
        path.join(__dirname, '../data/test-images/test-image.gif'),
        path.join(__dirname, '../data/test-images/test-image.webp')
    ];

    console.log('Starting image upload tests...');
    
    let successful = 0;
    let failed = 0;

    for (const imagePath of testImages) {
        const success = await testSingleImage(imagePath);
        if (success) successful++;
        else failed++;
    }

    console.log('\nTest Summary:');
    console.log(`Total tests: ${testImages.length}`);
    console.log(`Successful: ${successful}`);
    console.log(`Failed: ${failed}`);
};

testImageUpload();