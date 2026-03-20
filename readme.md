# Express + Mongoose Starter

Production-ready REST API boilerplate with Express, Mongoose, JWT authentication, Zod validation, and full CRUD operations.

## Features

- 🔐 **JWT Authentication** — Register, login, protected routes
- 📦 **Mongoose ODM** — User & Post models with relationships
- ✅ **Zod Validation** — Request body validation middleware
- 🛡️ **Security** — Helmet, CORS, rate limiting
- 👤 **Role-based Access** — Admin & user roles with middleware
- 📄 **Pagination** — Built-in pagination for list endpoints
- 🌱 **Seed Script** — Quick database seeding for development
- 📝 **Error Handling** — Centralized error handler with Mongoose error mapping

## Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Seed the database (optional)
npm run seed

# Start development server
npm run dev
```

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Create account | No |
| POST | `/api/auth/login` | Get JWT token | No |
| GET | `/api/auth/me` | Current user | Yes |

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | List users | Admin |
| GET | `/api/users/:id` | Get user | Yes |
| DELETE | `/api/users/:id` | Delete user | Admin |

### Posts
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/posts` | List published posts | No |
| GET | `/api/posts/:id` | Get post | No |
| POST | `/api/posts` | Create post | Yes |
| PATCH | `/api/posts/:id` | Update own post | Yes |
| DELETE | `/api/posts/:id` | Delete own post | Yes |

Query params: `?page=1&limit=20&tag=express`

## Project Structure

```
src/
├── index.js              # App entry point
├── seed.js               # Database seeder
├── models/
│   ├── User.js           # User model (bcrypt, roles)
│   └── Post.js           # Post model (tags, published)
├── routes/
│   ├── auth.js           # Auth routes
│   ├── users.js          # User CRUD
│   └── posts.js          # Post CRUD
└── middleware/
    ├── auth.js           # JWT protect & role restrict
    ├── validate.js       # Zod validation middleware
    └── error.js          # Error handler
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/...` |
| `JWT_SECRET` | JWT signing secret | — |
| `JWT_EXPIRES_IN` | Token expiry | `7d` |

## License

MIT
