import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios'

axios.defaults.withCredentials= true
axios.defaults.baseURL= import.meta.env.VITE_BACKEND_URL

export const AppContext = createContext();

export const AppContextProvider =({children})=>{
    const currency=import.meta.env.VITE_CURRENCY
    const navigate=useNavigate() 
    const [user,setUser]=useState(false)
    const [isSeller,setIsSeller]=useState(false)
    const [showUserLogin,setShowUserLogin]=useState(false)
    const [products,setProducts]=useState([])
    const [cartItems,setCartItems]=useState({})
    const [searchQuery,setSearchQuery]=useState([])

    //fetch seller status
    const fetchseller= async()=>{
        try {
            const {data}= await axios.get('/api/seller/is-auth')
            if(data.success){
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (err) {
            setIsSeller(false)
        }
    }

    //fetch user auth status , user data and cart items
    const fetchUser= async()=>{
        try {
            const {data}= await axios.get('/api/user/is-auth')
            if(data.success){
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }
        } catch (err) {
            setUser(null)
        }
    }

    //Fetch all products
    const fetchProducts=async()=>{
        try {
            const {data}= await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            } else{
                toast.error(data.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    
    //Add product to cart 
    const addToCart=(itemId)=>{
        let cartData= structuredClone(cartItems)
        if(cartData[itemId]){
            cartData[itemId] += 1
        } else {
            cartData[itemId]=1
        }
        setCartItems(cartData)
        toast.success('Added to Cart')
    } 

    //Update cart items quantity
    const updateCart=(itemId,quantity)=>{
        let cartData=structuredClone(cartItems)
        cartData[itemId]=quantity
        setCartItems(cartData)
        toast.success("cart updated")
    }
    
    //remove product from cart
    const removeFromCart=(itemId)=>{
        let cartData=structuredClone(cartItems)
        if(cartData[itemId]){
            cartData[itemId] -= 1
            if(cartData[itemId]===0){
                delete cartData[itemId]
            }
        }
        toast.success("Removed from cart")
        setCartItems(cartData)
    }

// Get cart item count
    const getCartCount=()=>{
        let totalCount = 0
        for(const item in cartItems){
            totalCount += cartItems[item]
        }
        return totalCount
    }

    // Get cart total Amount
    const getCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItems) {
            const itemInfo = products.find((productItem) => productItem._id === item)
            if (itemInfo && cartItems[item] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[item]
            }}
        return Math.floor(totalAmount * 100) / 100
    }

    useEffect(()=>{
        fetchUser()
        fetchseller()
        fetchProducts()
    },[])

    //update database cart items
    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post(
                    '/api/cart/update',
                    { cartItems },
                    { withCredentials: true }
                );
    
                console.log('CART UPDATE RESPONSE:', data);
    
                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (err) {
                console.log('CART UPDATE ERROR:', err.response?.data || err);
                toast.error(err.response?.data?.message || err.message);
            }
        };
    
        if (user) {
            updateCart();
        }
    }, [cartItems, user]);

    const value={navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCart, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartCount, getCartAmount, setCartItems, axios, fetchProducts}
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default function useAppContext(){
    return useContext(AppContext)
}