import jwt from 'jsonwebtoken'

export const isAuth = async (req, res) => {
    try {
        // Don't cache authentication response
        res.set('Cache-Control', 'no-store')

        const { userId } = req

        const user = await User.findById(userId).select('-password')

        if (!user) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

        return res.json({
            success: true,
            user
        })

    } catch (err) {
        console.log('IS AUTH ERROR:', err.message)

        return res.json({
            success: false,
            message: err.message
        })
    }
}