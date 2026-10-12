import React, { useEffect, useRef, useState } from "react";
import useAppContext from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showGooglePrompt, setShowGooglePrompt] = useState(false);
    const [googleEmailInput, setGoogleEmailInput] = useState("");
    const [googleNameInput, setGoogleNameInput] = useState("");

    const { setShowUserLogin, setUser, axios, navigate, fetchUser } = useAppContext();
    const googleBtnRef = useRef(null);

    const handleGoogleSuccess = async ({ token, email: gEmail, name: gName }) => {
        try {
            const { data } = await axios.post("/api/user/google-login", {
                token,
                email: gEmail,
                name: gName
            });
            if (data.success) {
                toast.success(data.message || "Logged in with Google successfully");
                if (data.token) {
                    localStorage.setItem("user_token", data.token);
                }
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    setUser(data.user);
                }
                setShowUserLogin(false);
                setShowGooglePrompt(false);
                if (fetchUser) fetchUser();
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    useEffect(() => {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (window.google && clientId && googleBtnRef.current) {
            try {
                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: (response) => {
                        if (response.credential) {
                            handleGoogleSuccess({ token: response.credential });
                        }
                    }
                });
                window.google.accounts.id.renderButton(googleBtnRef.current, {
                    theme: "outline",
                    size: "large",
                    width: 288,
                    text: "continue_with",
                    shape: "rectangular"
                });
            } catch (err) {
                console.warn("Google Sign-In initialization:", err.message);
            }
        }
    }, [state]);

    const onCustomGoogleClick = () => {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (window.google && clientId) {
            window.google.accounts.id.prompt();
        } else {
            // Prompt for quick Google login test or entering Google credentials
            setShowGooglePrompt(true);
        }
    };

    const handlePromptSubmit = (e) => {
        e.preventDefault();
        if (!googleEmailInput) {
            return toast.error("Please enter a valid Google email");
        }
        handleGoogleSuccess({
            email: googleEmailInput,
            name: googleNameInput || googleEmailInput.split("@")[0]
        });
    };

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const { data } = await axios.post(`/api/user/${state}`, {
                name,
                email,
                password
            });
            if (data.success) {
                toast.success(
                    data.message ||
                        (state === "login"
                            ? "Logged in successfully"
                            : "Account created successfully")
                );
                if (data.token) {
                    localStorage.setItem("user_token", data.token);
                }
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    setUser(data.user);
                }
                setShowUserLogin(false);
                if (fetchUser) fetchUser();
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    return (
        <div
            onClick={() => {
                setShowUserLogin(false);
            }}
            className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/50"
        >
            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="flex flex-col gap-3 m-auto items-start p-7 py-9 w-84 sm:w-[360px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
            >
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User</span>{" "}
                    {state === "login" ? "Login" : "Sign Up"}
                </p>

                {/* Google Sign-In Button */}
                <div className="w-full mt-2">
                    <div ref={googleBtnRef} className="w-full flex justify-center"></div>

                    <button
                        type="button"
                        onClick={onCustomGoogleClick}
                        className="w-full flex items-center justify-center gap-3 py-2 px-3 border border-gray-300 rounded-md hover:bg-gray-50 transition cursor-pointer font-medium text-gray-700 text-sm shadow-xs"
                    >
                        <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                            />
                        </svg>
                        <span>Continue with Google</span>
                    </button>
                </div>

                {showGooglePrompt && (
                    <div className="w-full bg-blue-50 border border-blue-200 rounded p-3 text-xs text-gray-700">
                        <p className="font-semibold text-blue-900 mb-1">
                            Google Quick Sign-In
                        </p>
                        <p className="text-gray-600 mb-2">
                            Enter your Google email to sign in or test Google auth:
                        </p>
                        <input
                            type="email"
                            placeholder="yourname@gmail.com"
                            value={googleEmailInput}
                            onChange={(e) => setGoogleEmailInput(e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 bg-white mb-2 text-xs outline-primary"
                        />
                        <input
                            type="text"
                            placeholder="Your Name (optional)"
                            value={googleNameInput}
                            onChange={(e) => setGoogleNameInput(e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 bg-white mb-2 text-xs outline-primary"
                        />
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handlePromptSubmit}
                                className="flex-1 bg-primary text-white py-1.5 rounded text-xs font-medium hover:bg-primary-dull transition"
                            >
                                Continue
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowGooglePrompt(false)}
                                className="px-3 border border-gray-300 bg-white rounded text-xs hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex items-center w-full my-1">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="px-3 text-xs text-gray-400 font-medium uppercase">
                        or with email
                    </span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="type here"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                            type="text"
                            required
                        />
                    </div>
                )}
                <div className="w-full">
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="type here"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        type="email"
                        required
                    />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="type here"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        type="password"
                        required
                    />
                </div>
                {state === "register" ? (
                    <p>
                        Already have account?{" "}
                        <span
                            onClick={() => setState("login")}
                            className="text-primary cursor-pointer font-medium"
                        >
                            click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Create an account?{" "}
                        <span
                            onClick={() => setState("register")}
                            className="text-primary cursor-pointer font-medium"
                        >
                            click here
                        </span>
                    </p>
                )}
                <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2.5 rounded-md cursor-pointer font-medium">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;