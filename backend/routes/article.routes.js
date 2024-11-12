import express from 'express';
import { getArticles, getArticleBySlug } from '../controllers/article.controller.js';

const router = express.Router();

// Get all articles (with pagination)
router.get('/', getArticles);

// Create new article
router.post('/', createArticle);

// Get single article by slug
router.get('/:slug', getArticleBySlug);

export default router;