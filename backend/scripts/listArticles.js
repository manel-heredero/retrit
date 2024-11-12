import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables
dotenv.config();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import your Article model
import Article from '../models/article.model.js';

async function listArticles() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get all articles
    const articles = await Article.find({}, 'title slug date').sort({ date: -1 });

    console.log('\nExisting Articles:');
    console.log('------------------');
    articles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title}`);
      console.log(`   Slug: ${article.slug}`);
      console.log(`   Date: ${new Date(article.date).toLocaleDateString()}`);
      console.log('------------------');
    });

  } catch (error) {
    console.error('Error listing articles:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the list function
listArticles(); 