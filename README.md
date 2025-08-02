# 🛒 E-Commerce Cart Management (Node.js + Redis + MongoDB)

This project is a scalable shopping cart system built with **Node.js**, **Express**, **Redis**, and **MongoDB**.  
Redis is used for **real-time cart operations** and caching to reduce database load, while MongoDB is used for persistent storage.

---

## 🚀 Features
- User authentication (JWT + bcrypt)
- Product management (CRUD)
- Shopping cart management using Redis
- Redis caching for optimized performance
- Session management with Redis
- MongoDB for persistent data storage
- Secure environment variable handling with `.env`
- RESTful API endpoints
- Scalable architecture

---

## 🏗️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Cache:** Redis (Memurai for Windows or Redis on WSL)
- **Authentication:** JWT & bcrypt.js
- **Environment Config:** dotenv
- **Others:** Mongoose, Redis client

---

## 📂 Project Structure
```
shopping-cart-redis/
│
├── server.js
├── config/
│   ├── db.js
│   └── redis.js
├── models/
│   ├── User.js
│   └── Product.js
├── routes/
│   ├── auth.js
│   ├── product.js
│   └── cart.js
└── .env
```

---

## ⚙️ Installation & Setup

### 1️⃣ Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Redis (Memurai for Windows)](https://www.memurai.com/download) or [Redis with WSL](https://redis.io/)
- [Postman](https://www.postman.com/downloads/) (for API testing)

---

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/shopping-cart-redis.git
cd shopping-cart-redis
```

---

### 3️⃣ Install Dependencies
```bash
npm install
```

---

### 4️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=your_jwt_secret
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

---

### 5️⃣ Start MongoDB & Redis
For MongoDB:
```bash
net start MongoDB
```
For Redis (Memurai):
```bash
net start Memurai
```

Verify Redis:
```bash
redis-cli ping
# Output: PONG
```

---

### 6️⃣ Run the Project
```bash
node server.js
```

The server will start on `http://localhost:5000`.

---

## 🧪 API Endpoints

| Method | Endpoint          | Description             |
|--------|-------------------|-------------------------|
| POST   | /api/auth/signup  | Register a new user     |
| POST   | /api/auth/login   | Login user             |
| GET    | /api/products     | Get all products        |
| POST   | /api/products     | Add a new product       |
| POST   | /api/cart         | Add product to cart     |
| GET    | /api/cart         | View cart              |
| DELETE | /api/cart/:id     | Remove product from cart|

---

## 📸 Output Screenshots
(Add your screenshots here)

| Screenshot | Description |
|------------|-------------|
| ![Signup](./screenshots/signup.png) | User signup API |
| ![Cart](./screenshots/cart.png)     | Redis cart operations |
| ![Redis CLI](./screenshots/redis.png) | Redis data preview |

---

## 🔧 Troubleshooting
- **Redis not recognized:** Ensure Memurai is installed and added to PATH or use `net start Memurai`.
- **MongoDB connection error:** Verify MongoDB is running with `net start MongoDB`.
- **JWT error:** Ensure you have set `JWT_SECRET` in your `.env`.

---

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License
This project is licensed under the MIT License.
