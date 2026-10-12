import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const authHeader = req.headers?.authorization
    const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
    const token = req.cookies?.token || bearerToken || req.headers?.token

    if (!token) {
        return res.json({
            success: false,
            message: 'Not authorised'
        })
    }

    try {
        const tokenDecode = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        console.log("DECODED TOKEN:", tokenDecode)

        if (tokenDecode.id) {
            req.userId = tokenDecode.id
        } else {
            return res.json({
                success: false,
                message: 'User ID not found in token'
            })
        }

        next()

    } catch (err) {
        console.log("JWT ERROR:", err.message)

        return res.json({
            success: false,
            message: err.message
        })
    }
}

export default authUser