# WanderWise

A full-stack travel planning application built with the MERN stack. Plan trips, manage itineraries, track baggage, and collaborate with friends — all in one place.

## Features

- **Trip Planning** — Create and manage trips with destinations, dates, and budgets
- **Itinerary Builder** — Day-by-day activity scheduling with time, location, and notes
- **Baggage Tracker** — Organize packing lists by category with packed/unpacked status
- **Budget Tracker** — Track trip expenses with categorized spending
- **Collaboration** — Invite friends via email to collaborate on trips
- **Authentication** — Secure JWT-based auth with access & refresh tokens
- **Dark Mode** — Theme switching with light/dark support

## Tech Stack

### Frontend

- React 19 + Vite
- React Router v7
- Tailwind CSS v4
- shadcn/ui (Radix UI primitives)
- React Hook Form + Zod validation
- Axios
- Lucide Icons

### Backend

- Node.js + Express 5
- MongoDB + Mongoose 9
- JSON Web Tokens (JWT)
- bcrypt (password hashing)
- express-validator
- Helmet (security headers)
- Nodemailer (email)

## Project Structure

```
Wander-Wise/
├── Backend/
│   ├── config/          # Database, JWT, mail configuration
│   ├── errors/          # Custom error classes
│   ├── handlers/        # Route handlers (controllers)
│   ├── middlewares/      # Auth, error, rate-limit middleware
│   ├── models/          # Mongoose schemas
│   ├── services/        # Business logic
│   ├── validators/      # Request validation rules
│   ├── utils/           # Helpers (send-mail)
│   ├── templates/       # Email HTML templates
│   ├── index.js         # App entry point
│   └── .env.example
├── Frontend/
│   └── wander-wise/
│       ├── src/
│       │   ├── api/          # Axios instance
│       │   ├── components/   # UI components (landing, shared, ui)
│       │   ├── context/      # Auth & Theme context
│       │   ├── hooks/        # Custom hooks
│       │   ├── layouts/      # App layout
│       │   ├── lib/          # Utilities
│       │   └── pages/        # Route pages
│       └── index.html
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd Wander-Wise/Backend
npm install
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/wanderwise
JWT_KEY=your_jwt_secret
JWT_EXPIRES_IN=24h
SMTP_SERVICE=gmail
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
BASE_URL=http://localhost:3000
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd Wander-Wise/Frontend/wander-wise
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## API Endpoints

### Auth

| Method | Endpoint        | Description         |
|--------|-----------------|---------------------|
| POST   | /auth/register  | Register a new user |
| POST   | /auth/login     | Login               |

### Users

| Method | Endpoint   | Description      |
|--------|------------|------------------|
| GET    | /users     | Get all users    |
| GET    | /users/:id | Get user by ID   |
| PATCH  | /users/:id | Update user      |
| DELETE | /users/:id | Delete user      |

### Trips

| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| GET    | /trips                          | Get all trips            |
| POST   | /trips                          | Create a trip            |
| GET    | /trips/:id                      | Get trip by ID           |
| PATCH  | /trips/:id                      | Update trip              |
| DELETE | /trips/:id                      | Delete trip              |
| PATCH  | /trips/:id/expenses             | Add expense to trip      |
| POST   | /trips/:id/invite               | Invite collaborator      |
| POST   | /trips/:id/invite/accept        | Accept invite            |

### Itineraries

| Method | Endpoint                              | Description           |
|--------|---------------------------------------|-----------------------|
| GET    | /itinerary/:tripId                    | Get itineraries       |
| POST   | /itinerary/:tripId                    | Create itinerary      |
| GET    | /itinerary/:tripId/:id                | Get itinerary by ID   |
| PATCH  | /itinerary/:tripId/:id                | Update itinerary      |
| DELETE | /itinerary/:tripId/:id                | Delete itinerary      |

### Baggage

| Method | Endpoint                         | Description         |
|--------|----------------------------------|---------------------|
| GET    | /baggage/:tripId                 | Get baggage list    |
| POST   | /baggage/:tripId                 | Add baggage item    |
| GET    | /baggage/:tripId/:id             | Get baggage by ID   |
| PATCH  | /baggage/:tripId/:id             | Update baggage      |
| DELETE | /baggage/:tripId/:id             | Delete baggage      |

## License

ISC
