import mongoose from 'mongoose';
import slugify from 'slugify';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  readTime: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});

// Add pre-save middleware to automatically generate the slug
articleSchema.pre('save', function(next) {
  if (!this.isModified('title')) {
    next();
    return;
  }
  
  this.slug = slugify(this.title, {
    lower: true,      // Convert to lowercase
    strict: true,     // Remove special characters
    trim: true        // Trim whitespace
  });
  next();
});

const Article = mongoose.model('Article', articleSchema);
export default Article;
