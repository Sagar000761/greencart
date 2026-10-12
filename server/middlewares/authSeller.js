import jwt from 'jsonwebtoken'

const authSeller = async (req, res, next) => {
    const authHeader = req.headers?.authorization
    const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
    const sellerToken = req.cookies?.sellerToken || bearerToken || req.headers?.sellertoken || req.headers?.['seller-token']

    if (!sellerToken) {
        return res.json({
            success: false,
            message: 'Not Authorized'
        })
    }

    try {
        const tokenDecode = jwt.verify(
            sellerToken,
            process.env.JWT_SECRET
        )

        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            next()
        } else {
            return res.json({
                success: false,
                message: 'Not Authorized'
            })
        }

    } catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}

export default authSeller