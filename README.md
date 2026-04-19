# ReadersUniverse

ReadersUniverse is a full-stack web application for readers: create an account, pick favorite genres, curate a wishlist, track books you are reading (with progress), discover other readers with overlapping tastes, share short posts on a community feed, and add books to a shared catalog.

## Repository layout

| Folder | Role |
|--------|------|
| `ru_backend` | REST API built with **Node.js** and **Express**, **MongoDB** via **Mongoose**, **JWT** authentication |
| `ru_frontend` | **React** (Vite) SPA with **Tailwind CSS**, **React Router**, and **Axios** |

## Features

- **Authentication**: Register with profile fields and genre preferences; login receives a JWT stored in the browser.
- **Dashboard**: Browse curated book cards and open flows to add books to your wishlist or “currently reading” list.
- **Favorites (wishlist)** & **Current reading**: Persisted per user; update reading progress for active titles.
- **Matches**: Suggested readers who overlap on genres or wishlist titles.
- **Feed**: Create, list, and delete your own posts (simple social layer).
- **Add book**: Submit title, author, genre, and optional metadata into the `Book` collection.
- **Profile, settings, about**: Supporting pages for navigation and account-related UI.

## Tech stack

**Backend:** Express 5, Mongoose 8, bcryptjs, jsonwebtoken, cors, dotenv  

**Frontend:** React 19, Vite 6, Tailwind CSS 4, React Router 7, Axios, React Toastify, React Icons

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or local MongoDB instance

## Environment variables

Create `ru_backend/.env`:

```env
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_long_random_secret
PORT=5000
```

If `JWT_SECRET` is omitted, the server falls back to a development default (not suitable for production).

## Run locally

### 1. Backend

```bash
cd ru_backend
npm install
npm start
```

API base URL defaults to `http://localhost:5000`. A root `GET /` responds with a short health message.

### 2. Frontend

In a second terminal:

```bash
cd ru_frontend
npm install
npm run dev
```

The Vite dev server prints a local URL (commonly `http://localhost:5173`). The frontend is configured to call the API at `http://localhost:5000/api` (see `ru_frontend/src/services/api.js`). Change the host or port there if your backend differs.

## API overview (high level)

| Area | Base path | Notes |
|------|-----------|--------|
| Auth | `/api/auth` | Register, login, authenticated profile |
| User features | `/api/user` | Wishlist, current reading, matches, feed (protected routes use Bearer JWT) |
| Books | `/api/books` | List and create `Book` documents |

For request/response shapes, data models, and security considerations, see **`TECHNICAL_GUIDE_AND_INTERVIEW_QNA.md`**.

## Production build (frontend)

```bash
cd ru_frontend
npm run build
npm run preview   # optional local preview of the build
```

Serve the `ru_frontend/dist` output behind your preferred static host or reverse proxy, and deploy the Express app with a process manager and HTTPS in front.

## License

See individual `package.json` files in `ru_backend` and `ru_frontend` (project metadata lists **ISC** where specified).

---

*Maintainers: keep the technical deep dive and interview-oriented Q&A in sync with code changes in `TECHNICAL_GUIDE_AND_INTERVIEW_QNA.md`.*