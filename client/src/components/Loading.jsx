import React, { useEffect } from "react";
import useAppContext from "../context/AppContext";
import { useLocation } from "react-router-dom";

const Loading = () => {
    const { navigate, fetchUser } = useAppContext();
    const { search } = useLocation();

    const query = new URLSearchParams(search);
    const nextUrl = query.get("next");

    useEffect(() => {
        const handlePaymentSuccess = async () => {
            if (!nextUrl) return;

            // Give Stripe webhook a little time
            await new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );

            // Get fresh user + cart from database
            await fetchUser();

            // Go to My Orders
            navigate(`/${nextUrl}`, {
                replace: true
            });
        };

        handlePaymentSuccess();
    }, [nextUrl]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
        </div>
    );
};

export default Loading;