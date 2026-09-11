
import React from "react";

const HeroSection = () => {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#f5f5f0] flex items-center justify-center px-6">

            {/* Background Glow */}
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-[140px] rounded-full pointer-events-none" />

            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                }}
            />

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">

                {/* Badge */}
                <div className="font-body text-xs sm:text-sm tracking-wide
                    px-5 py-2.5 rounded-full
                    bg-white border border-gray-200
                    shadow-sm text-gray-700
                    flex items-center gap-2 mb-8">

                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />

                    AI-POWERED CAREER OPTIMIZATION
                </div>

                {/* Heading */}
                <h1 className="font-main text-5xl sm:text-7xl md:text-8xl
                    leading-[0.95] tracking-tight text-gray-950">

                    Your career.
                    <br />

                    <span className="text-blue-600">
                        Optimized.
                    </span>
                </h1>

                {/* Subheading */}
                <p className="font-body mt-8 text-lg sm:text-2xl
                    text-gray-500 max-w-2xl leading-relaxed">

                    One place to optimize your{" "}
                    <span className="text-gray-900 font-medium">
                        Resume, LinkedIn & GitHub
                    </span>{" "}
                    with AI.
                </p>

                {/* Description */}
                <p className="font-body mt-5 text-sm sm:text-base
                    text-gray-400 max-w-xl leading-relaxed">

                    Upload your career profiles and get AI-powered
                    recommendations designed to help you stand out,
                    pass ATS systems, and get hired.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">

                    <button
                        className="
                            group
                            font-main text-sm
                            bg-gray-950 text-white
                            px-7 py-4
                            rounded-full
                            shadow-xl shadow-black/10
                            hover:bg-blue-600
                            hover:shadow-blue-500/20
                            transition-all duration-300
                            flex items-center gap-3
                        "
                    >
                        Get started for free

                        <span className="group-hover:translate-x-1 transition-transform">
                            →
                        </span>
                    </button>

                    <span className="font-body text-xs text-gray-400">
                        No credit card required
                    </span>

                </div>

                {/* Trust text */}
                <div className="mt-16 font-body text-xs text-gray-400">
                    Built for developers who want to stand out.
                </div>

            </div>
        </section>
    );
};

export default HeroSection;

