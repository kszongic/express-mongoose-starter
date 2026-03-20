const { Router } = require('express');
const { z } = require('zod');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = Router();

const postSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  tags: z.array(z.string()).max(10).optional(),
  published: z.boolean().optional(),
});

// GET /api/posts
router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;
    const filter = { published: true };
    if (req.query.tag) filter.tags = req.query.tag;

    const [posts, total] = await Promise.all([
      Post.find(filter).populate('author', 'name').skip(skip).limit(limit).sort('-createdAt'),
      Post.countDocuments(filter),
    ]);

    res.json({ posts, page, limit, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
});

// GET /api/posts/:id
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ post });
  } catch (err) {
    next(err);
  }
});

// POST /api/posts
router.post('/', protect, validate(postSchema), async (req, res, next) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user._id });
    res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/posts/:id
router.patch('/:id', protect, validate(postSchema.partial()), async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, author: req.user._id });
    if (!post) return res.status(404).json({ error: 'Post not found or not yours' });
    Object.assign(post, req.body);
    await post.save();
    res.json({ post });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/posts/:id
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    if (!post) return res.status(404).json({ error: 'Post not found or not yours' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
