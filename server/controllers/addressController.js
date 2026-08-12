import Address from "../models/address.js"

// Add address: /api/address/add
export const addAddress = async (req, res) => {
    try {
        const { address } = req.body
        await Address.create({...address,userId: req.userId})
        res.json({success: true, message: "Address added Successfully"})
    } catch (err) {
        console.log(err.message)
        res.json({success: false, message: err.message})
    }
}

// Get address: /api/address/get
export const getAddress = async (req, res) => {
    try {
        const addresses = await Address.find({userId: req.userId})
        res.json({success: true, addresses})
    } catch (err) {
        console.log(err.message)
        res.json({success: false, message: err.message})
    }
}