import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createNewArticle(title) {
  try {
    if (!title) {
      console.error('Please provide an article title');
      console.log('Usage: npm run new-article "Your Article Title"');
      process.exit(1);
    }

    // Create slug from title
    const slug = slugify(title, { lower: true, strict: true });
    
    // Define paths
    const templatePath = path.join(__dirname, '../data/templates/article-template.md');
    const newArticlePath = path.join(__dirname, '../data/articles/content', `${slug}.md`);
    
    // Check if article already exists
    try {
      await fs.access(newArticlePath);
      console.error(`An article with the slug "${slug}" already exists`);
      process.exit(1);
    } catch {
      // File doesn't exist, we can proceed
    }

    // Read template
    const template = await fs.readFile(templatePath, 'utf8');
    
    // Replace title in frontmatter
    const today = new Date().toISOString().split('T')[0];
    const newContent = template
      .replace('title: Article Title', `title: ${title}`)
      .replace('date: YYYY-MM-DD', `date: ${today}`)
      .replace('# Your Title Here', `# ${title}`);
    
    // Write new article
    await fs.writeFile(newArticlePath, newContent);
    
    console.log(`Successfully created new article: ${newArticlePath}`);
    console.log(`Slug: ${slug}`);
    console.log('\nYou can now edit this file and run:');
    console.log('npm run import-articles');
    console.log('to import it to the database.');

  } catch (error) {
    console.error('Error creating new article:', error);
    process.exit(1);
  }
}

// Get the title from command line arguments
const title = process.argv.slice(2).join(' ');
createNewArticle(title);
