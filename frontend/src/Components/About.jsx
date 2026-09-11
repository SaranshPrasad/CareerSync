
import React from "react";
import { motion } from "framer-motion";

import {
    LuUpload,
    LuSparkles,
    LuLayers3,
    LuFileCheck2,
    LuArrowUpRight,
} from "react-icons/lu";

import {
    FaGithub,
    FaLinkedinIn,
} from "react-icons/fa";


const features = [
    {
        icon: LuUpload,
        title: "One Upload",
        description:
            "Upload your Resume, LinkedIn PDF, and GitHub URL in one place.",
        gradient: "from-blue-500 to-cyan-400",
        iconBg: "bg-blue-500/10",
    },

    {
        icon: LuSparkles,
        title: "AI-Powered Optimization",
        description:
            "AI analyzes your complete professional profile and generates optimized content.",
        gradient: "from-violet-500 to-blue-500",
        iconBg: "bg-violet-500/10",
        featured: true,
    },

    {
        icon: LuLayers3,
        title: "Consistent Everywhere",
        description:
            "Your Resume, LinkedIn, and GitHub tell one consistent professional story.",
        gradient: "from-emerald-500 to-green-400",
        iconBg: "bg-emerald-500/10",
    },

    {
        icon: LuFileCheck2,
        title: "ATS-Friendly Resume",
        description:
            "Generate a structured resume optimized for job applications and relevant keywords.",
        gradient: "from-orange-500 to-amber-400",
        iconBg: "bg-orange-500/10",
    },

    {
        icon: FaGithub,
        title: "GitHub Profile README",
        description:
            "Get a complete professional GitHub README based on your real skills and projects.",
        gradient: "from-gray-600 to-gray-950",
        iconBg: "bg-gray-900/10",
    },

    {
        icon: FaLinkedinIn,
        title: "LinkedIn Optimization",
        description:
            "Update your headline, About section, experience, projects, and skills.",
        gradient: "from-blue-600 to-indigo-500",
        iconBg: "bg-blue-600/10",
    },
];


const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};


const cardVariants = {
    hidden: {
        opacity: 0,
        y: 35,
    },

    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: "easeOut",
        },
    },
};


const About = () => {
    return (
        <section
            id="features"
            className="
                relative
                overflow-hidden
                bg-[#f5f5f0]
                py-24
                lg:py-32
            "
        >

            {/* ================= BACKGROUND ================= */}

            <div
                className="
                    absolute
                    -left-40
                    top-20
                    h-[400px]
                    w-[400px]
                    rounded-full
                    bg-blue-400/10
                    blur-[120px]
                "
            />

            <div
                className="
                    absolute
                    -right-40
                    bottom-0
                    h-[400px]
                    w-[400px]
                    rounded-full
                    bg-violet-400/10
                    blur-[120px]
                "
            />

            {/* ================= CONTENT ================= */}

            <div className="relative z-10 mx-auto max-w-7xl px-6">

                {/* ================= HEADER ================= */}

        


<motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7 }}
    className="mb-16"
>
    <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-end">

        {/* Section Label */}

        <div className="flex items-center gap-3">

            <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" />

                <span className="font-body text-xs font-medium tracking-[0.2em] text-gray-400">
                    01
                </span>
            </div>

            <div className="h-px w-12 bg-gray-300" />

            <span className="font-body text-xs font-medium tracking-[0.2em] text-gray-500">
                FEATURES
            </span>

        </div>


        {/* Heading */}

        <div>

            <motion.h2
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="
                    font-main
                    text-3xl
                    leading-[1.05]
                    tracking-tight
                    text-gray-950
                    sm:text-2xl
                    lg:text-4xl
                "
            >
                Everything your career
                <br />

                <span className="text-gray-400">
                    needs to stand out.
                </span>

            </motion.h2>


            <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="
                    mt-6
                    max-w-2xl
                    font-body
                    text-sm
                    leading-7
                    text-gray-500
                    sm:text-base
                "
            >
                From your Resume to your LinkedIn and GitHub,
                CareerSync brings everything together into one
                consistent professional identity.
            </motion.p>

        </div>

    </div>


    {/* Bottom Divider */}

    <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="
            mt-12
            h-px
            w-full
            origin-left
            bg-gray-200
        "
    />

</motion.div>




                {/* ================= FEATURES ================= */}

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{
                        once: true,
                        amount: 0.15,
                    }}
                    className="
                        grid
                        gap-5
                        sm:grid-cols-2
                        lg:grid-cols-3
                    "
                >

                    {features.map((feature) => {

                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                variants={cardVariants}
                                whileHover={{
                                    y: -8,
                                }}
                                transition={{
                                    duration: 0.25,
                                }}
                                className={`
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    p-7
                                    transition-all
                                    duration-300

                                    ${
                                        feature.featured
                                            ? `
                                                border-blue-200
                                                bg-gray-950
                                                text-white
                                                shadow-xl
                                                shadow-blue-500/10
                                            `
                                            : `
                                                border-gray-200
                                                bg-white
                                                hover:border-gray-300
                                                hover:shadow-xl
                                                hover:shadow-black/5
                                            `
                                    }
                                `}
                            >

                                {/* Featured glow */}

                                {feature.featured && (
                                    <div
                                        className="
                                            absolute
                                            -right-20
                                            -top-20
                                            h-48
                                            w-48
                                            rounded-full
                                            bg-blue-500/20
                                            blur-3xl
                                        "
                                    />
                                )}


                                {/* Hover gradient */}

                                <div
                                    className={`
                                        absolute
                                        inset-0
                                        bg-gradient-to-br
                                        ${feature.gradient}
                                        opacity-0
                                        transition-opacity
                                        duration-500
                                        group-hover:opacity-[0.04]
                                    `}
                                />


                                {/* Card content */}

                                <div className="relative z-10">

                                    {/* ICON */}

                                    <div
                                        className={`
                                            mb-8
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            ${feature.iconBg}
                                            transition-all
                                            duration-300
                                            group-hover:scale-110
                                            group-hover:rotate-3
                                        `}
                                    >

                                        <Icon
                                            size={22}
                                            strokeWidth={1.8}
                                            className={
                                                feature.featured
                                                    ? "text-blue-400"
                                                    : "text-gray-800"
                                            }
                                        />

                                    </div>


                                    {/* TITLE + ARROW */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-3
                                        "
                                    >

                                        <h3
                                            className={`
                                                font-main
                                                text-lg

                                                ${
                                                    feature.featured
                                                        ? "text-white"
                                                        : "text-gray-950"
                                                }
                                            `}
                                        >
                                            {feature.title}
                                        </h3>


                                        <LuArrowUpRight
                                            size={18}
                                            className="
                                                shrink-0
                                                -translate-x-2
                                                text-gray-400
                                                opacity-0
                                                transition-all
                                                duration-300
                                                group-hover:translate-x-0
                                                group-hover:opacity-100
                                            "
                                        />

                                    </div>


                                    {/* DESCRIPTION */}

                                    <p
                                        className={`
                                            mt-3
                                            font-body
                                            text-sm
                                            leading-6

                                            ${
                                                feature.featured
                                                    ? "text-gray-400"
                                                    : "text-gray-500"
                                            }
                                        `}
                                    >
                                        {feature.description}
                                    </p>


                                    {/* BOTTOM LINE */}

                                    <div
                                        className={`
                                            mt-7
                                            h-px
                                            w-0
                                            bg-gradient-to-r
                                            ${feature.gradient}
                                            transition-all
                                            duration-500
                                            group-hover:w-full
                                        `}
                                    />

                                </div>

                            </motion.div>
                        );
                    })}

                </motion.div>

            </div>
        </section>
    );
};

export default About;

