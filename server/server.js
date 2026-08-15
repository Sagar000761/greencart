import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/db.js'
import 'dotenv/config'

import userRouter from './routes/userRouter.js'
import sellerRouter from './routes/sellerRoutes.js'
import connectCloudinary from './configs/cloudinary.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import addressRouter from './routes/addressRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import { stripeWebhooks } from './controllers/orderController.js'

const app = express()

const allowedOrigins = [
    'http://localhost:5173',
    "https://greencart-sagar.vercel.app"
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

// Stripe webhook MUST come before express.json()
app.post(
    '/stripe',
    express.raw({ type: 'application/json' }),
    stripeWebhooks
)

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('API is working')
})

// Connect database/cloudinary
await connectDB()
await connectCloudinary()

app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)

export default app
