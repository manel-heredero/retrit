import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import slugify from 'slugify';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import your Article model
import Article from '../models/article.model.js';

async function processMarkdownFile(filePath) {
  try {
    // Read the markdown file
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // Parse frontmatter and content
    const { data: frontmatter, content } = matter(fileContent);
    
    // Validate required fields
    if (!frontmatter.title) {
      throw new Error('Missing required field: title');
    }
    if (!frontmatter.author) {
      throw new Error('Missing required field: author');
    }
    if (!frontmatter.date) {
      throw new Error('Missing required field: date');
    }
    
    // Convert markdown to HTML
    const htmlContent = marked(content);
    
    // Generate slug from title
    const slug = slugify(frontmatter.title, {
      lower: true,
      strict: true
    });
    
    return {
      title: frontmatter.title,
      author: frontmatter.author,
      date: new Date(frontmatter.date),
      content: htmlContent,
      image: frontmatter.image || '/images/default.jpg',
      tags: frontmatter.tags || [],
      readTime: frontmatter.readTime || '5 min read',
      slug
    };
  } catch (error) {
    console.error(`Error processing ${path.basename(filePath)}:`);
    console.error('Make sure the file has the correct frontmatter structure:');
    console.error(`
---
title: Your Title Here
author: Author Name
date: YYYY-MM-DD
readTime: X min read
image: /images/your-image.jpg
tags:
  - tag1
  - tag2
---

# Content starts here...
    `);
    return null;
  }
}

async function importArticles() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Read the articles directory
    const articlesDir = path.join(__dirname, '../data/articles/content');
    const files = await fs.readdir(articlesDir);

    // Process each markdown file
    for (const file of files) {
      if (file.endsWith('.md')) {
        console.log(`Processing ${file}...`);
        
        const filePath = path.join(articlesDir, file);
        const articleData = await processMarkdownFile(filePath);
        
        if (articleData) {
          // Check if article already exists
          const existingArticle = await Article.findOne({ slug: articleData.slug });
          
          if (existingArticle) {
            console.log(`Updating article: "${articleData.title}"`);
            await Article.findOneAndUpdate(
              { slug: articleData.slug },
              articleData,
              { new: true }
            );
          } else {
            console.log(`Creating new article: "${articleData.title}"`);
            await Article.create(articleData);
          }
        }
      }
    }

    console.log('Import completed successfully');
  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the import
importArticles(); 