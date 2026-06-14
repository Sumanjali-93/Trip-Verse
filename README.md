<div align="center">

# 🌍 Trip-Verse

### A Full-Stack Travel Accommodation Booking Platform

*Discover, list, and review unique stays around the world — built like a real-world Airbnb clone*

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
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Reference](#-api-reference)
- [Folder Structure](#-folder-structure)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Acknowledgements](#-acknowledgements)

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

## 📬 Contact

**Your Name**

- LinkedIn: [your-linkedin-profile](#)
- GitHub: [@your-username](#)
- Email: your.email@example.com

Project Repository: [https://github.com/your-username/trip-verse](#)

---

## 🙏 Acknowledgements

- [Apna College](https://www.apnacollege.in/) — for the structured full-stack web development curriculum
- [Mapbox](https://www.mapbox.com/) — for geolocation and map services
- [Cloudinary](https://cloudinary.com/) — for media storage and delivery
- [Shields.io](https://shields.io/) — for README badges

---

<div align="center">

⭐ If you found this project useful, consider giving it a star on GitHub!

</div>
