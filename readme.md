# Express + Mongoose Starter 🚀

> Production-ready REST API boilerplate with Express, Mongoose, JWT auth, Zod validation, role-based access, and full CRUD — ready to deploy in minutes.

[![GitHub stars](https://img.shields.io/github/stars/kszongic/express-mongoose-starter?style=flat-square)](https://github.com/kszongic/express-mongoose-starter/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-6%2B-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/kszongic/express-mongoose-starter/pulls)

## Why This Starter?

Starting a new API project shouldn't mean spending a day wiring up auth, validation, error handling, and RBAC from scratch. This boilerplate gives you:

- **JWT authentication** out of the box — register, login, protected routes
- **Role-based access control** — admin vs user middleware
- **Zod validation** — type-safe request validation without decorators
- **Production security** — Helmet, CORS, rate limiting pre-configured
- **Clean architecture** — organized routes, models, and middleware

Clone it, set your MongoDB URI, and start building your actual business logic.

## Features

| Feature | What You Get |
|---------|-------------|
| 🔐 **JWT Auth** | Register, login, token refresh, `auth/me` endpoint |
| 👤 **Role-Based Access** | Admin & user roles with middleware guards |
| ✅ **Zod Validation** | Request body validation with descriptive errors |
| 🛡️ **Security** | Helmet, CORS, express-rate-limit pre-configured |
| 📄 **Pagination** | Built-in cursor for list endpoints (`?page=1&limit=20`) |
| 🌱 **Database Seeding** | One-command seed script for development |
| 🚨 **Error Handling** | Centralized handler with Mongoose error mapping |
| 📝 **Posts CRUD** | Complete example resource with tags and publishing |

## Quick Start

```bash
# Clone
git clone https://github.com/kszongic/express-mongoose-starter.git
cd express-mongoose-starter

# Install
npm install

# Configure
cp .env.example .env
# Edit .env → set MONGODB_URI and JWT_SECRET

# Seed database (optional)
npm run seed

# Start dev server
npm run dev
```

Server starts at `http://localhost:3000`.

## Deploy

### Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/express-mongoose?referralCode=kszongic)

### Render

1. Connect your GitHub repo on [render.com](https://render.com)
2. Set environment variables (`MONGODB_URI`, `JWT_SECRET`)
3. Deploy — Render auto-detects Node.js

### Docker

```bash
docker build -t express-api .
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/myapp \
  -e JWT_SECRET=your-secret \
  express-api
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| POST | `/api/auth/register` | Create account | ❌ |
| POST | `/api/auth/login` | Get JWT token | ❌ |
| GET | `/api/auth/me` | Current user profile | ✅ |

### Users (Admin)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| GET | `/api/users` | List all users | 🔑 Admin |
| GET | `/api/users/:id` | Get user by ID | ✅ |
| DELETE | `/api/users/:id` | Delete user | 🔑 Admin |

### Posts

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| GET | `/api/posts` | List published posts | ❌ |
| GET | `/api/posts/:id` | Get single post | ❌ |
| POST | `/api/posts` | Create post | ✅ |
| PATCH | `/api/posts/:id` | Update own post | ✅ |
| DELETE | `/api/posts/:id` | Delete own post | ✅ |

**Query parameters:** `?page=1&limit=20&tag=express`

### Example Requests

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","password":"secret123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"secret123"}'

# Create post (use token from login response)
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"My First Post","body":"Hello world!","tags":["express","api"]}'

# List posts with pagination
curl "http://localhost:3000/api/posts?page=1&limit=5&tag=express"
```

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
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/express-starter` |
| `JWT_SECRET` | JWT signing secret | *(required)* |
| `JWT_EXPIRES_IN` | Token expiry | `7d` |

## Adding a New Resource

Want to add a `Comment` model? Here's the pattern:

1. **Create model** → `src/models/Comment.js`
2. **Create route** → `src/routes/comments.js`
3. **Register route** → add `app.use('/api/comments', commentsRouter)` in `index.js`
4. **Add validation** → define Zod schema, use `validate()` middleware

The existing Post routes serve as a complete reference implementation.

## Comparison with Alternatives

| Feature | This Starter | express-generator | create-express-api | Manual Setup |
|---------|:---:|:---:|:---:|:---:|
| JWT Authentication | ✅ | ❌ | ✅ | Manual |
| Role-Based Access | ✅ | ❌ | ❌ | Manual |
| Request Validation | ✅ (Zod) | ❌ | ❌ | Manual |
| Rate Limiting | ✅ | ❌ | ❌ | Manual |
| Pagination | ✅ | ❌ | ❌ | Manual |
| Database Seeding | ✅ | ❌ | ❌ | Manual |
| Error Handling | ✅ | Basic | Basic | Manual |
| Security Headers | ✅ | ❌ | ❌ | Manual |
| Example CRUD Resource | ✅ | ❌ | ✅ | Manual |
| Zero Config Deploy | ✅ | ❌ | ❌ | ❌ |

## Tips

- **Testing:** Add `jest` + `supertest` for integration tests — the route structure makes it straightforward
- **TypeScript:** Convert by renaming files to `.ts` and adding types to your Zod schemas
- **Logging:** Drop in `morgan` or `pino` for request logging
- **File uploads:** Add `multer` middleware to any route
- **WebSockets:** See [bun-websocket-starter](https://github.com/kszongic/bun-websocket-starter) for real-time features

## Related Starters

- [**astro-resume-starter**](https://github.com/kszongic/astro-resume-starter) — Static resume/portfolio site with Astro
- [**bun-websocket-starter**](https://github.com/kszongic/bun-websocket-starter) — Real-time WebSocket server with Bun
- [**node-background-jobs-starter**](https://github.com/kszongic/node-background-jobs-starter) — BullMQ background job processing

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## License

MIT © [kszongic](https://github.com/kszongic)

---

**Found this useful?** Give it a ⭐ — it helps others find it!
