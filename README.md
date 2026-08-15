# 🛒 GreenCart

GreenCart is a full-stack grocery e-commerce web application where users can browse products, add them to their cart, manage their addresses, and place orders.

The project is built using the MERN stack with Cloudinary for image storage.

## 🚀 Features

### 👤 User Features
- User registration and login
- User authentication using JWT
- Browse available products
- View product details
- Add products to cart
- Update product quantity
- Remove products from cart
- Add and manage delivery addresses
- Place Cash on Delivery orders
- View order information

### 🧑‍💼 Seller Features
- Seller login
- Seller authentication
- Add new products
- Upload product images
- Manage product stock
- View products

### 🔐 Authentication
- JWT-based authentication
- Authentication using HTTP cookies
- Separate authentication for users and sellers
- Protected routes using middleware

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- Multer

### Cloud & Storage
- Cloudinary

## 📁 Project Structure

```text
GreenCart/
│
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
│
├── server/              # Backend Node.js application
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
