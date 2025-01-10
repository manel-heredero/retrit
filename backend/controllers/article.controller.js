import mongoose from 'mongoose';
import Article from '../models/article.model.js';

// Get all articles with pagination
export const getArticles = async (req, res) => {
  try {
    console.log('\n--- Article Request Details ---');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Collection:', Article.collection.name);

    // First, check if any articles exist
    const count = await Article.countDocuments();
    console.log('Total articles in database:', count);

    // If articles exist, proceed with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const articles = await Article.find()
      .sort({ date: -1 })
      .select('-__v') // Exclude version field
      .lean(); // Convert to plain JavaScript object

    console.log('Articles found:', articles.length);
    if (articles.length > 0) {
      console.log('First article:', {
        title: articles[0].title,
        slug: articles[0].slug,
        date: articles[0].date
      });
    }

    res.json({
      success: true,
      data: {
        articles,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalArticles: count
      }
    });
  } catch (error) {
    console.error('Error in getArticles:', error);
    res.status(500).json({
      success: false,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get single article by slug
export const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    res.json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create new article
export const createArticle = async (req, res) => {
    try {
      console.log('Creating new article:', req.body); // Debug log
      
      const article = new Article({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,
        readTime: req.body.readTime,
        date: new Date(),
        // slug will be generated automatically by the model
      });
  
      await article.save();
      
      res.status(201).json({
        success: true,
        data: article
      });
    } catch (error) {
      console.error('Error creating article:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };
