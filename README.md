# 🛒 GreenCart - Modern Grocery E-Commerce Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-greencart--sagar.vercel.app-2ea44f?style=for-the-badge&logo=vercel)](https://greencart-sagar.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🌐 Live Application Link

- **🚀 Deployed Web Application:** [https://greencart-sagar.vercel.app](https://greencart-sagar.vercel.app)
- **📦 GitHub Repository:** [https://github.com/Sagar000761/greencart](https://github.com/Sagar000761/greencart)

---

## 📖 About GreenCart

**GreenCart** is a production-ready, full-stack grocery e-commerce web application. Built on the modern MERN stack with high-performance responsive UI, it provides a seamless shopping experience for daily essentials, fresh produce, dairy, bakery, and beverages.

---

## ✨ Features & Highlights

### 🛍️ Shopper Experience
- **Auto-Seeded Catalog:** Over 35+ grocery essentials across Fruits, Vegetables, Dairy, Bakery, Drinks, and Grains.
- **Indian Rupee (₹) Pricing:** Complete localization with currency displayed in Indian Rupees throughout the catalog, cart, and checkout.
- **Interactive Cart & Checkout:** Real-time quantity adjustments, empty-cart states, and smooth cart drawer.
- **Address Management:** Save, select, and manage multiple delivery addresses.
- **Flexible Payments:** Support for Cash on Delivery (COD) and Stripe payment gateway.

### 🔐 Authentication & Security
- **Google Login:** One-click Google Sign-in integration with Google Identity Services.
- **Traditional Auth:** Secure email/password login and registration.
- **JWT & HTTP Cookies:** Token verification with secure cookie management and seamless session preservation.
- **Protected Routes:** User and Seller route authorization.

### 🧑‍💼 Seller & Admin Dashboard
- **Product Management:** Add new grocery items with multi-image uploads via Cloudinary.
- **Inventory Control:** Real-time tracking of in-stock items and order fulfillment.
- **Order Tracking:** View customer orders, delivery status, and payment confirmation.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Axios, React Router v7, React Hot Toast |
| **Backend** | Node.js, Express.js, Mongoose, JWT, Cookie Parser, Multer, Stripe |
| **Database & Cloud** | MongoDB (Local & Atlas), Cloudinary (Media storage) |
| **Hosting & CI/CD** | Vercel |

---

## 📁 Repository Structure

```text
GreenCart/
│
├── client/                     # Frontend Vite + React application
│   ├── public/images/products/ # Local product images
│   ├── src/
│   │   ├── assets/             # Brand logos and iconography
│   │   ├── components/         # Reusable UI components (Navbar, Cart, Login, etc.)
│   │   ├── context/            # Global AppContext (Cart, User, Currency state)
│   │   ├── pages/              # ProductCatalog, Cart, Orders, Seller Pages
│   │   └── App.jsx             # Router and layouts
│   ├── index.html              # Google Identity script & metadata
│   ├── package.json
│   └── vercel.json             # SPA client routing config
│
├── server/                     # Backend Express REST API
│   ├── configs/                # MongoDB connection & Seed catalog script
│   ├── controllers/            # User, Cart, Product, Seller & Order controllers
│   ├── middleware/             # AuthUser & AuthSeller middlewares
│   ├── models/                 # Product, User, Order, and Address Mongoose schemas
│   ├── routes/                 # Express API routes
│   ├── server.js               # Express application entrypoint
│   └── vercel.json             # Serverless deployment configuration
│
└── README.md
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas URI

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/GreenCart
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret
```

Start the backend:
```bash
npm start
# or for live reloading:
npm run server
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create a `.env` file in the `client` folder:
```env
VITE_CURRENCY='₹'
VITE_BACKEND_URL=http://localhost:4000
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

Start the frontend:
```bash
npm run dev
```

Visit `http://localhost:5173` to explore GreenCart!

---

## 🌐 Live Deployment Configuration

The web application is deployed on Vercel at [https://greencart-sagar.vercel.app](https://greencart-sagar.vercel.app).

For Vercel environment variables:
- `VITE_CURRENCY`: `₹`
- `VITE_BACKEND_URL`: URL to your deployed backend (or backend proxy)
- `VITE_GOOGLE_CLIENT_ID`: Google OAuth Web Client ID

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
