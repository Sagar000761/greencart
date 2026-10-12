// import { use } from "react"
import User from "../models/user.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//Register user : /api/user/register
export const register= async(req,res)=>{
    try{
        const {name,email,password}=req.body
        if(!name || !email || !password){
            return res.json({success: false, message:'Missing details'})
        }
        const existingUser = await User.findOne({email})
        if(existingUser)
            return res.json({success: false, message:'User already exists'})

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({name,email,password: hashedPassword})

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'})

        res.cookie('token', token, {
            httpOnly: true, //prevent javascript to access cookie
            secure: process.env.NODE_ENV === 'production', //use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', //CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.json({
            success: true, 
            message: 'Account created successfully', 
            token,
            user: { _id: user._id, email: user.email, name: user.name, cartItems: {} }
        })    
    } catch(err){
        console.log(err.message)
        res.json({success:false, message:err.message})
    }
}

//Login user :/api/user.login
export const login = async(req,res)=>{
    try{
        const {email, password}= req.body
        if(!email || !password)
            return res.json({success: false, message: 'Email and password are required'})
        const user=await User.findOne({email})

        if(!user){
            return res.json({success: false, message:'Invalid email or password'})
        }

        //checking the password 
        const isMatch= await bcrypt.compare(password, user.password)

        if(!isMatch)
            return res.json({success: false,message:'Invalid email or password'})

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'})

        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.json({
            success: true, 
            message: 'Logged in successfully', 
            token,
            user: { _id: user._id, email: user.email, name: user.name, cartItems: user.cartItems || {} }
        })
    } catch(err){
        console.log(err.message)
        res.json({success:false, message:err.message})
    }       
}

// check Auth : /api/user/is-auth
export const isAuth = async(req,res)=>{ 
    try{
        const { userId }=req
        const user = await User.findById(userId).select("-password")
        return res.json({success:true, user})
    } catch(err){
        console.log(err.message)
        res.json({success:false, message:err.message})
    }
}

//logout : /api/user/logout
export const logOut= async (req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        })
        return res.json({success: true, message: 'Logged Out'})
    } catch(err){
        console.log(err.message)
        res.json({success:false, message:err.message})
    }
}

// Google Login: /api/user/google-login
export const googleLogin = async (req, res) => {
    try {
        const { token, email, name } = req.body;
        let userEmail = email;
        let userName = name;

        if (token) {
            const decoded = jwt.decode(token);
            if (decoded && decoded.email) {
                userEmail = decoded.email;
                userName = decoded.name || userName || 'Google User';
            }
        }

        if (!userEmail) {
            return res.json({ success: false, message: 'Google email is required' });
        }

        let user = await User.findOne({ email: userEmail });

        if (!user) {
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);
            user = await User.create({
                name: userName || userEmail.split('@')[0],
                email: userEmail,
                password: hashedPassword,
                cartItems: {}
            });
        }

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            success: true,
            message: 'Logged in with Google successfully',
            token: jwtToken,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                cartItems: user.cartItems || {}
            }
        });
    } catch (err) {
        console.log("GOOGLE LOGIN ERROR:", err.message);
        return res.json({ success: false, message: err.message });
    }
};

