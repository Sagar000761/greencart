import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    console.log("COOKIES:", req.cookies)
    console.log("TOKEN:", req.cookies?.token)

    const { token } = req.cookies

    if (!token) {
        return res.json({
            success: false,
            message: 'Token not found'
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