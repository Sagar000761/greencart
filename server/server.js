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
const port = process.env.PORT || 4000

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'https://greencart-sagar.vercel.app'
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(null, true)
        }
    },
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

import { seedInitialProducts } from './configs/seedData.js'

// Connect database/cloudinary
await connectDB()
await seedInitialProducts()
await connectCloudinary()

app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)

if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
}

export default app
