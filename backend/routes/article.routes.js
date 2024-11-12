import express from 'express';
import {
    createArticle,
    getArticles,
    getArticleBySlug
} from '../controllers/article.controller.js';

const router = express.Router();

// Article routes
router.post('/', createArticle);
router.get('/', getArticles);
router.get('/:slug', getArticleBySlug);
// router.put('/:id', updateArticle);
// router.delete('/:id', deleteArticle);

export default router;