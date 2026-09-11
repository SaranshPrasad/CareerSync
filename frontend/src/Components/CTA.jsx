
import React from "react";
import { motion } from "framer-motion";
import { LuInstagram, LuArrowUpRight } from "react-icons/lu";

const CTA = () => {
    return (
        <section className="relative overflow-hidden bg-gray-950 px-6 py-20">

            {/* Background glow */}
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

            <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">

                {/* Status */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="
                        mb-6
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-white/10
                        bg-white/5
                        px-4
                        py-2
                        backdrop-blur-md
                    "
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                    </span>

                    <span className="font-body text-xs tracking-wide text-gray-400">
                        CURRENTLY IN DEVELOPMENT
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="
                        font-main
                        text-3xl
                        leading-tight
                        text-white
                        sm:text-4xl
                        lg:text-5xl
                    "
                >
                    We're building something
                    <br />

                    <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                        worth waiting for.
                    </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="
                        mt-5
                        max-w-xl
                        font-body
                        text-sm
                        leading-6
                        text-gray-500
                        sm:text-base
                    "
                >
                    CareerSync is currently under development.
                    Follow the journey, watch the product come to life,
                    and be the first to know when we launch.
                </motion.p>

                {/* Instagram CTA */}
                <motion.a
                    href="https://www.instagram.com/zen.saransh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ y: -3 }}
                    className="
                        group
                        mt-8
                        flex
                        items-center
                        gap-3
                        rounded-full
                        border
                        border-white/10
                        bg-white
                        px-6
                        py-3.5
                        font-body
                        text-sm
                        font-medium
                        text-gray-950
                        shadow-xl
                        shadow-black/20
                        transition-all
                        hover:bg-blue-500
                        hover:text-white
                    "
                >
                    <LuInstagram size={18} />

                    <span>
                        Follow @zen.saransh
                    </span>

                    <LuArrowUpRight
                        size={16}
                        className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                            group-hover:-translate-y-1
                        "
                    />
                </motion.a>

                {/* Bottom text */}
                <p className="mt-8 font-body text-xs text-gray-700">
                    Stay tuned. Something good is coming.
                </p>

            </div>
        </section>
    );
};

export default CTA;

