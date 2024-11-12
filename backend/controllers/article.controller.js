import Article from '../models/article.model.js';

// Get all articles with pagination
export const getArticles = async (req, res) => {
  try {
    console.log('Fetching articles...'); // Debug log
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const articles = await Article.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    console.log('Found articles:', articles); // Debug log

    const total = await Article.countDocuments();

    res.json({
      success: true,
      data: {
        articles,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalArticles: total
      }
    });
  } catch (error) {
    console.error('Error in getArticles:', error);
    res.status(500).json({
      success: false,
      message: error.message
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
