require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/express-mongoose-starter');
  console.log('Connected to MongoDB');

  await User.deleteMany({});
  await Post.deleteMany({});

  const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: 'password123', role: 'admin' });
  const user = await User.create({ name: 'John Doe', email: 'john@example.com', password: 'password123' });

  await Post.create([
    { title: 'Getting Started with Express', content: 'Express is a minimal web framework for Node.js...', author: admin._id, tags: ['express', 'nodejs'], published: true },
    { title: 'MongoDB Best Practices', content: 'When working with MongoDB, consider these tips...', author: user._id, tags: ['mongodb', 'database'], published: true },
    { title: 'Draft Post', content: 'This is a work in progress...', author: user._id, tags: ['draft'], published: false },
  ]);

  console.log('✅ Seeded: 2 users, 3 posts');
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
