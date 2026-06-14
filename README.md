<div align="center">

# 🌍 Trip-Verse

### A Full-Stack Travel Accommodation Booking Platform

*Discover, list, and review unique stays around the world — built like a real-world Airbnb*

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Mapbox](https://img.shields.io/badge/Mapbox-000000?style=for-the-badge&logo=mapbox&logoColor=white)](https://www.mapbox.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📑 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Engineering Highlights](#-engineering-highlights)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Security & Best Practices](#-security--best-practices)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Reference](#-api-reference)
- [Folder Structure](#-folder-structure)
- [Testing](#-testing)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧭 About The Project

**Trip-Verse** is a full-stack web application that replicates the core experience of a modern accommodation-booking platform (in the spirit of Airbnb). Users can explore property listings, create and manage their own listings, leave reviews and ratings, and filter destinations by category — all wrapped in a clean, fully responsive UI.

The project was built to demonstrate practical, production-style command of:

- **MVC Architecture** for clean separation of concerns
- **RESTful API design** with proper resource-based routing
- **Authentication & Authorization** using session-based auth
- **Third-party service integration** (maps, cloud media storage)
- **Server-side validation** and centralized error handling

---

## ⚙️ Engineering Highlights

A few design decisions worth calling out for technical reviewers:

- **Clean MVC separation** — Controllers contain zero data-access boilerplate; routes are thin and declarative, models encapsulate schema-level logic (e.g., cascading review deletion when a listing is removed).
- **Async error handling at scale** — Every async route handler is wrapped via a `wrapAsync` higher-order function, so rejected promises are funneled into a single centralized error-handling middleware instead of repeated try/catch blocks.
- **Custom error abstraction** — A dedicated `ExpressError` class standardizes HTTP status codes and messages across the app, making failure states predictable and easy to test.
- **Schema-level data integrity** — Joi validation schemas mirror the Mongoose models, rejecting invalid payloads *before* they ever touch the database layer.
- **Authorization middleware** — `isLoggedIn`, `isOwner`, and `isReviewAuthor` middleware enforce resource-level permissions, preventing users from editing or deleting content they don't own — even via direct API calls.
- **Persistent sessions** — Sessions are stored in MongoDB via `connect-mongo` rather than in-memory, so users stay authenticated across server restarts and the app is horizontally scalable.
- **Decoupled cloud storage** — Image handling is abstracted through a dedicated `cloudConfig.js`, so swapping Cloudinary for S3 or another provider requires changes in a single module.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 **Authentication & Authorization** | Secure signup, login, and logout flows using Passport.js with session-based auth |
| 🏠 **Full CRUD for Listings** | Create, read, update, and delete property listings with ownership-based access control |
| 🗺️ **Interactive Maps** | Real-time location visualization for every listing via Mapbox geocoding |
| ☁️ **Cloud Image Uploads** | Multi-image upload and storage handled through Cloudinary |
| ⭐ **Reviews & Ratings** | Users can leave star ratings and written reviews on any listing |
| 🔎 **Category-Based Filtering** | Browse listings by category (trending, mountains, beaches, castles, etc.) |
| 🛡️ **Server-Side Validation** | Robust schema validation using Joi to block malformed or malicious input |
| 📱 **Fully Responsive UI** | Mobile-first design built with Bootstrap and custom CSS |
| ⚠️ **Centralized Error Handling** | Custom error classes + middleware with user-friendly flash messages |

---

## 🛠️ Tech Stack

**Frontend**
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5
- EJS + EJS-Mate (templating & layouts)

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose (ODM)

**Authentication**
- Passport.js (Local Strategy)
- express-session + connect-mongo (session storage)

**Validation & Security**
- Joi (request schema validation)
- Method-override, cookie-parser

**Third-Party Services**
- Mapbox — geocoding & interactive maps
- Cloudinary — image storage, optimization & delivery

---

## 🏗️ System Architecture

Trip-Verse follows the **MVC (Model–View–Controller)** design pattern, keeping routes, business logic, and data models cleanly separated:

```
                ┌────────────────────┐
                │   Client (Browser)  │
                └─────────┬───────────┘
                          │ HTTP Request
                          ▼
                ┌────────────────────┐
                │   Express Routes    │
                └─────────┬───────────┘
                          │
                          ▼
                ┌────────────────────┐
                │     Controllers     │  ◄── Business Logic
                └─────────┬───────────┘
                          │
           ┌──────────────┼──────────────────┐
           ▼               ▼                  ▼
   ┌──────────────┐ ┌────────────┐  ┌───────────────────┐
   │ Mongoose      │ │ EJS Views  │  │ Mapbox / Cloudinary│
   │ Models (DB)   │ │ (UI)       │  │ External APIs      │
   └──────────────┘ └────────────┘  └───────────────────┘
```

---

## 🔒 Security & Best Practices

- **Password hashing** — User credentials are never stored in plaintext; Passport's local strategy handles salting and hashing via `passport-local-mongoose`.
- **Session security** — Sessions use a signed, HTTP-only cookie with a configurable expiry and a strong `SECRET` stored in environment variables.
- **Input sanitization & validation** — All incoming request bodies are validated against Joi schemas before reaching the database layer, mitigating injection and malformed-data attacks.
- **Environment-based configuration** — All credentials (DB URI, API keys, secrets) are loaded via `.env` and excluded from version control through `.gitignore`.
- **Authorization checks** — Edit/delete routes verify resource ownership server-side, not just by hiding UI buttons client-side.
- **Flash-based feedback** — Sensitive errors are never leaked to the client; users receive sanitized, friendly flash messages instead of raw stack traces.

---

## 📸 Screenshots

| Home Page | Listing Details | Add / Edit Listing |
|---|---|---|
| ![Home](./screenshots/home.png) | ![Details](./screenshots/details.png) | ![Add Listing](./screenshots/add-listing.png) |

> Add your own screenshots to a `/screenshots` folder and update the paths above.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas cluster)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/trip-verse.git
   cd trip-verse
   ```

2. Install dependencies
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the project root and add the following keys:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_access_token
PORT=8080
```

> ⚠️ **Never commit your `.env` file.** Ensure it is listed in `.gitignore`.

### Running the App

```bash
# Development mode (auto-restart with nodemon)
npm run dev

# Production mode
npm start
```

The app will be available at: **http://localhost:8080**

---

## 📡 API Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/listings` | Get all listings | No |
| GET | `/listings/new` | Render form to create a new listing | Yes |
| POST | `/listings` | Create a new listing | Yes |
| GET | `/listings/:id` | Get details of a single listing | No |
| GET | `/listings/:id/edit` | Render edit form for a listing | Yes (Owner) |
| PUT | `/listings/:id` | Update a listing | Yes (Owner) |
| DELETE | `/listings/:id` | Delete a listing | Yes (Owner) |
| POST | `/listings/:id/reviews` | Add a review to a listing | Yes |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review | Yes (Author) |
| GET | `/signup` | Render signup form | No |
| POST | `/signup` | Register a new user | No |
| GET | `/login` | Render login form | No |
| POST | `/login` | Authenticate a user | No |
| GET | `/logout` | Log out the current user | Yes |

---

## 📂 Folder Structure

```
trip-verse/
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
├── public/
│   ├── css/
│   └── js/
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
├── init/
│   └── data.js
├── middleware.js
├── schema.js
├── cloudConfig.js
├── app.js
├── package.json
└── .env
```

---

## 🧪 Testing

Manual testing was performed across the following scenarios to ensure reliability:

- CRUD operations validated for both authenticated and unauthenticated users
- Authorization boundaries tested (non-owners blocked from edit/delete via direct route access)
- Form validation tested with empty, malformed, and oversized payloads
- Image upload tested with multiple file types and sizes
- Session persistence verified across server restarts

---

## 🗺️ Roadmap

- [ ] Add wishlist / save-for-later functionality
- [ ] Integrate booking & payment gateway (Stripe / Razorpay)
- [ ] Build an admin dashboard for listing moderation
- [ ] Add email verification & password reset
- [ ] Write unit and integration tests (Jest / Mocha)
- [ ] Dockerize the application
- [ ] Set up CI/CD pipeline for automated deployment

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn and grow. Any contributions are greatly appreciated.

1. Fork the project
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

⭐ If you found this project useful, consider giving it a star on GitHub!

</div>
