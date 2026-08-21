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
            // Give Stripe webhook some time to update database
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Fetch latest user/cart from database
            await fetchUser();

            // Small delay to make sure state is updated
            setTimeout(() => {
                if (nextUrl) {
                    navigate(`/${nextUrl}`, { replace: true });
                }
            }, 500);
        };

        handlePaymentSuccess();
    }, [nextUrl, navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
        </div>
    );
};

export default Loading;