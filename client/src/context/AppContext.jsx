import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [user, setUser] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState([]);

    // =========================
    // FETCH SELLER STATUS
    // =========================
    const fetchseller = async () => {
        try {
            const { data } = await axios.get("/api/seller/is-auth");

            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch (err) {
            setIsSeller(false);
        }
    };

    // =========================
    // FETCH USER
    // =========================
    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/is-auth");

            if (data.success) {
                setUser(data.user);

                // IMPORTANT:
                // Always take latest cart from database
                setCartItems(data.user.cartItems || {});
            } else {
                setUser(null);
                setCartItems({});
            }
        } catch (err) {
            console.log(
                "FETCH USER ERROR:",
                err.response?.data || err.message
            );

            setUser(null);
            setCartItems({});
        }
    };

    // =========================
    // FETCH PRODUCTS
    // =========================
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("/api/product/list");

            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    // =========================
    // SYNC CART WITH DATABASE
    // =========================
    const syncCartWithDatabase = async (cartData) => {
        try {
            const { data } = await axios.post(
                "/api/cart/update",
                {
                    cartItems: cartData
                },
                {
                    withCredentials: true
                }
            );

            console.log("CART UPDATE RESPONSE:", data);

            if (!data.success) {
                console.log("CART UPDATE FAILED:", data.message);
            }

            return data;
        } catch (err) {
            console.log(
                "CART UPDATE ERROR:",
                err.response?.data || err.message
            );

            return {
                success: false,
                message: err.response?.data?.message || err.message
            };
        }
    };

    // =========================
    // ADD TO CART
    // =========================
    const addToCart = async (itemId) => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        const cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);

        await syncCartWithDatabase(cartData);

        toast.success("Added to Cart");
    };

    // =========================
    // UPDATE CART QUANTITY
    // =========================
    const updateCart = async (itemId, quantity) => {
        const cartData = structuredClone(cartItems);

        if (quantity <= 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }

        setCartItems(cartData);

        await syncCartWithDatabase(cartData);

        toast.success("Cart updated");
    };

    // =========================
    // REMOVE FROM CART
    // =========================
    const removeFromCart = async (itemId) => {
        const cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] -= 1;

            if (cartData[itemId] <= 0) {
                delete cartData[itemId];
            }
        }

        setCartItems(cartData);

        await syncCartWithDatabase(cartData);

        toast.success("Removed from cart");
    };

    // =========================
    // CLEAR CART
    // =========================
    const clearCart = async () => {
        try {
            // Clear frontend
            setCartItems({});

            // Clear database
            const result = await syncCartWithDatabase({});

            if (result?.success) {
                console.log("🛒 Cart cleared successfully");
            } else {
                console.log("❌ Failed to clear cart");
            }
        } catch (err) {
            console.log("CLEAR CART ERROR:", err);
        }
    };

    // =========================
    // GET CART COUNT
    // =========================
    const getCartCount = () => {
        let totalCount = 0;

        for (const item in cartItems) {
            totalCount += cartItems[item];
        }

        return totalCount;
    };

    // =========================
    // GET CART TOTAL
    // =========================
    const getCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            const itemInfo = products.find(
                (productItem) => productItem._id === item
            );

            if (itemInfo && cartItems[item] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[item];
            }
        }

        return Math.floor(totalAmount * 100) / 100;
    };

    // =========================
    // INITIAL DATA
    // =========================
    useEffect(() => {
        fetchUser();
        fetchseller();
        fetchProducts();
    }, []);

    const value = {
        navigate,
        user,
        setUser,

        isSeller,
        setIsSeller,

        showUserLogin,
        setShowUserLogin,

        products,
        currency,

        addToCart,
        updateCart,
        removeFromCart,
        clearCart,

        cartItems,
        setCartItems,

        searchQuery,
        setSearchQuery,

        getCartCount,
        getCartAmount,

        axios,

        fetchProducts,
        fetchUser
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default function useAppContext() {
    return useContext(AppContext);
}