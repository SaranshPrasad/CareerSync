import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect } from "react";
const Auth = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState("login");
    const token = localStorage.getItem("token");
    useEffect(() => {
        if(token){
            navigate("/product");
        }
    }, [token])
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const handleAuth = async() => {
        try {
            if(currentPage === 'login'){
            let baseUrl = "https://careersync-ptdr.onrender.com/auth/login";
            const res = await axios.post(baseUrl, {email, password});
            if(res.status === 200){
                alert("Login Successfull.");
                const token = res.data.token;
                localStorage.setItem("token", token);
                navigate("/product");

            }else{
                alert("Something went wrong. "+ res.data.message);
            }
        }else{
            const baseUrl = "https://careersync-ptdr.onrender.com/auth/signup";
            const res = await axios.post(baseUrl, {email, password, repassword});
            if(res.status === 200){
                alert("SignUp Successfull..");
                const token = res.data.token;
                localStorage.setItem("token", token);
                navigate("/product");
            }else{
                alert("Something went wrong "+res.data.message);
            }
        }
        } catch (error) {
            console.log("ERROR:", error);
        console.log("ERROR RESPONSE:", error.response?.data);
        console.log("ERROR STATUS:", error.response?.status);
        }
    }



    return (
        <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-5xl min-h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

                {/* Left Side */}
                <div className="hidden md:flex bg-slate-900 text-white p-12 flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-white text-slate-900 flex items-center justify-center font-main text-xl">
                            S
                        </div>

                        <h1 className="font-main text-4xl mt-10 leading-tight">
                            Build.
                            <br />
                            Ship.
                            <br />
                            Grow.
                        </h1>

                        <p className="font-body text-slate-400 mt-6 max-w-sm leading-relaxed">
                            Your developer workspace for building and managing
                            your next big idea.
                        </p>
                    </div>

                    <p className="text-xs text-slate-500 font-body">
                        © 2026 — Your Application
                    </p>
                </div>

                {/* Right Side */}
                <div className="p-6 sm:p-10 md:p-12 flex items-center">
                    <div className="w-full max-w-md mx-auto">

                        {/* Mobile Logo */}
                        <div className="md:hidden w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-main mb-8">
                            S
                        </div>

                        {/* Heading */}
                        <div className="mb-8">
                            <p className="text-sm font-body text-slate-500 mb-2">
                                Welcome back 👋
                            </p>

                            <h1 className="font-main text-3xl sm:text-4xl text-slate-900">
                                {currentPage === "login"
                                    ? "Login"
                                    : "Create account"}
                            </h1>

                            <p className="font-body text-slate-500 mt-3 text-sm leading-relaxed">
                                {currentPage === "login"
                                    ? "Login to continue to your account."
                                    : "Create your account and get started."}
                            </p>
                        </div>

                        {/* Developer Note */}
                        <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-xs text-slate-600 leading-relaxed font-body">
                                <span className="font-main text-slate-900">
                                    #Developer Note
                                </span>
                                <br />
                                You can enter any email and password for now.
                                Login is only being used to keep the backend
                                API protected.
                            </p>
                        </div>

                        {/* Form */}
                        <div className="space-y-4">

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-body font-medium text-slate-700 mb-2">
                                    Email address
                                </label>

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 font-body text-sm"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-body font-medium text-slate-700 mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 font-body text-sm"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Confirm Password */}
                            {currentPage === "signup" && (
                                <div>
                                    <label className="block text-sm font-body font-medium text-slate-700 mb-2">
                                        Confirm password
                                    </label>

                                    <input
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={repassword}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 font-body text-sm"
                                        onChange={(e) => setRePassword(e.target.value)}
                                    />
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                
                                className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-body font-medium text-sm hover:bg-slate-800 active:scale-[0.99] transition-all mt-2"
                                onClick={() => handleAuth()}
                            >
                                {currentPage === "login"
                                    ? "Login"
                                    : "Create account"}
                            </button>
                        </div>

                        {/* Switch Auth */}
                        <p className="text-center text-sm text-slate-500 font-body mt-6">
                            {currentPage === "login"
                                ? "Don't have an account?"
                                : "Already have an account?"}

                            <button
                                type="button"
                                onClick={() =>
                                    setCurrentPage(
                                        currentPage === "login"
                                            ? "signup"
                                            : "login"
                                    )
                                }
                                className="ml-1 font-medium text-slate-900 hover:underline"
                            >
                                {currentPage === "login"
                                    ? "Sign up"
                                    : "Login"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Auth;