import React, { useEffect } from "react";
import useAppContext from "../context/AppContext";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Loading = () => {

    const {
        navigate,
        axios,
        fetchUser
    } = useAppContext();

    const { search } = useLocation();

    const query = new URLSearchParams(search);

    const nextUrl = query.get("next");
    const sessionId = query.get("session_id");

    useEffect(() => {

        const processPayment = async () => {

            try {

                if (sessionId) {

                    console.log(
                        "🔍 VERIFY SESSION:",
                        sessionId
                    );

                    const { data } =
                        await axios.get(
                            `/api/order/verify-session?sessionId=${sessionId}`
                        );

                    console.log(
                        "💳 VERIFY RESPONSE:",
                        data
                    );

                    if (data.success) {

                        // DB se fresh user/cart lao
                        await fetchUser();

                        toast.success(
                            "Payment successful!"
                        );

                    } else {

                        toast.error(
                            data.message ||
                            "Payment verification failed"
                        );
                    }
                }

            } catch (err) {

                console.log(
                    "PAYMENT ERROR:",
                    err.response?.data ||
                    err.message
                );

                toast.error(
                    "Payment verification failed"
                );

            } finally {

                if (nextUrl) {

                    setTimeout(() => {
                        navigate(`/${nextUrl}`);
                    }, 1000);

                }
            }
        };

        processPayment();

    }, [sessionId, nextUrl]);

    return (
        <div className="flex justify-center items-center h-screen">

            <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary">
            </div>

        </div>
    );
};

export default Loading;
