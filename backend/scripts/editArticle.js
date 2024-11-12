import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

// Load environment variables
dotenv.config();

const execAsync = promisify(exec);

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import your Article model
import Article from '../models/article.model.js';

async function editArticle(slug) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find the article
    const article = await Article.findOne({ slug });

    if (!article) {
      console.error('Article not found');
      return;
    }

    // Create markdown content
    const markdownContent = `---
title: ${article.title}
author: ${article.author}
date: ${new Date(article.date).toISOString().split('T')[0]}
readTime: ${article.readTime}
image: ${article.image}
tags:
${article.tags.map(tag => `  - ${tag}`).join('\n')}
---

${article.content}`;

    // Create a temporary file
    const tempFilePath = path.join(__dirname, '../data/articles/content', `${slug}.md`);
    await fs.writeFile(tempFilePath, markdownContent);

    // Open the file in the default editor
    const editor = process.platform === 'win32' ? 'notepad' : 'nano';
    console.log(`Opening article in ${editor}...`);
    
    await execAsync(`${editor} "${tempFilePath}"`);

    console.log('\nArticle saved. Would you like to update the database? (y/n)');
    process.stdin.setEncoding('utf8');
    process.stdin.once('data', async (data) => {
      const answer = data.trim().toLowerCase();
      
      if (answer === 'y') {
        // Import the article using the existing import script
        await import('./importArticles.js');
      } else {
        console.log('Changes discarded');
        // Clean up the temporary file
        await fs.unlink(tempFilePath);
      }
      
      await mongoose.disconnect();
      process.exit();
    });

  } catch (error) {
    console.error('Error editing article:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Get the slug from command line arguments
const slug = process.argv[2];
if (!slug) {
  console.error('Please provide an article slug');
  console.log('Usage: npm run edit-article <slug>');
  process.exit(1);
}

// Run the edit function
editArticle(slug); 