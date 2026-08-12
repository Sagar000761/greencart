import User from "../models/user.js"

//Update user cartData: /api/cart/update
export const updateCart = async (req, res) => {
    try {
        const { cartItems } = req.body

        await User.findByIdAndUpdate(
            req.userId,
            { cartItems },
            { new: true }
        )

        res.json({
            success: true,
            message: 'Cart Updated'
        })

    } catch (err) {
        console.log(err.message)
        res.json({
            success: false,
            message: err.message
        })
    }
}