import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router";

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");


    const isAboutPage = location.pathname === "/about";

    useEffect(() => {
        // When route changes, always start from top
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });

        // About page → navbar always visible
        if (isAboutPage) {
            setShowNavbar(true);
            return;
        }

        // Other pages → navbar appears after scrolling
        const handleScroll = () => {
            setShowNavbar(
                window.scrollY > window.innerHeight * 0.7
            );
        };

        // Run once immediately
        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [location.pathname, isAboutPage]);

    const handleAuth = () => {
        if(!token){
            navigate("/auth");
        }else{
            localStorage.removeItem("token");
            navigate("/auth");
        }
    };

    return (
        <AnimatePresence>
            {showNavbar && (
                <motion.nav
                    initial={{
                        opacity: 0,
                        y: -30,
                        scale: 0.95,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        y: -30,
                        scale: 0.95,
                    }}
                    transition={{
                        duration: 0.35,
                        ease: "easeOut",
                    }}
                    className="
                        fixed
                        z-50
                        top-4
                        left-1/2
                        -translate-x-1/2
                        w-[calc(100%-2rem)]
                        max-w-6xl
                        px-4
                        py-3
                        rounded-full
                        bg-white/80
                        backdrop-blur-xl
                        border
                        border-gray-200/70
                        shadow-lg
                        shadow-black/5
                        flex
                        items-center
                        justify-between
                        font-body
                    "
                >
                    {/* Logo */}
                    <div className="flex items-center gap-2">

                        <Link
                            to="/"
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >
                            <div
                                className="
                                    w-9
                                    h-9
                                    rounded-full
                                    bg-gray-950
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    font-main
                                    text-sm
                                "
                            >
                                C
                            </div>

                            <span className="font-main text-xl tracking-tight text-gray-950">
                                Career<span className="text-blue-600">Sync</span>
                            </span>
                        </Link>

                    </div>

                    {/* Navigation */}
                    <div
                        className="
                            hidden
                            sm:flex
                            items-center
                            gap-1
                            bg-gray-100/80
                            p-1
                            rounded-full
                        "
                    >
                        <Link
                            to="/about"
                            className="
                                px-5
                                py-2
                                rounded-full
                                text-sm
                                text-gray-600
                                hover:bg-white
                                hover:text-gray-950
                                transition-all
                            "
                        >
                            About
                        </Link>

                        <Link
                            to="/product"
                            className="
                                px-5
                                py-2
                                rounded-full
                                text-sm
                                text-gray-600
                                hover:bg-white
                                hover:text-gray-950
                                transition-all
                            "
                        >
                            Product
                        </Link>
                    </div>

                    {/* Login */}
                    <button
                        onClick={() => {handleAuth()}}
                        className="
                            group
                            flex
                            items-center
                            gap-2
                            bg-gray-950
                            text-white
                            px-5
                            py-2.5
                            rounded-full
                            text-sm
                            hover:bg-blue-600
                            transition-all
                        "
                    >
                        {token ? "Logout" : "Login"}

                        <LuArrowRight
                            size={15}
                            className="
                                transition-transform
                                group-hover:translate-x-1
                            "
                        />
                    </button>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;