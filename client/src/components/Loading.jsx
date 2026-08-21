import React, { useEffect } from "react";
import useAppContext from "../context/AppContext";
import { useLocation } from "react-router-dom";

const Loading = () => {
    const { navigate, clearCart } = useAppContext();
    const { search } = useLocation();

    const query = new URLSearchParams(search);
    const nextUrl = query.get("next");

    useEffect(() => {
        const handleSuccess = async () => {
            if (!nextUrl) return;

            // Wait for Stripe webhook to update database
            await new Promise((resolve) => {
                setTimeout(resolve, 3000);
            });

            // Clear DB + frontend cart
            await clearCart();

            // Go to orders
            navigate(`/${nextUrl}`, {
                replace: true
            });
        };

        handleSuccess();
    }, [nextUrl]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
        </div>
    );
};

export default Loading; 