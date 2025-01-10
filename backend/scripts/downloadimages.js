import { parse } from 'csv-parse/sync';
import { readFileSync, createWriteStream, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create images directory if it doesn't exist
const imagesDir = join(__dirname, 'downloads');
mkdirSync(imagesDir, { recursive: true });

async function downloadImage(url, venueId) {
    try {
        // Clean the URL by removing query parameters
        const cleanUrl = url.split('?')[0];

        const response = await axios({
            url: cleanUrl,
            method: 'GET',
            responseType: 'stream'
        });

        // Format venue ID with leading zeros (e.g., 0051)
        const formattedId = venueId.toString().padStart(4, '0');
        const fileName = `${formattedId}.jpeg`;
        const filePath = join(imagesDir, fileName);

        // Create a write stream and pipe the image data to it
        const writer = createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                console.log(`Successfully downloaded image for Venue ${venueId} as ${fileName}`);
                resolve(filePath);
            });
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Error downloading image for Venue ${venueId}:`, error.message);
        return null;
    }
}

async function downloadAllImages() {
    try {
        // Read and parse the CSV file
        const csvFilePath = join(__dirname, 'data', 'venues.csv');
        const fileContent = readFileSync(csvFilePath, 'utf-8');
        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            delimiter: ',',
            quote: '"'
        });

        console.log(`Found ${records.length} venues in CSV file`);

        // Download images for each venue
        for (const record of records) {
            if (record.image && record.VenueID) {
                console.log(`Downloading image for Venue ${record.VenueID}...`);
                await downloadImage(record.image, record.VenueID);
            }
        }

        console.log('All images downloaded successfully');
    } catch (error) {
        console.error('Error processing CSV file:', error);
    }
}

downloadAllImages();