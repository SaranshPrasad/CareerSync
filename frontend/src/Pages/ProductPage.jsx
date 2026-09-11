import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
    LuUpload,
    LuFileText,
    LuGithub,
    LuX,
    LuCheck,
    LuArrowRight,
    LuSparkles,
    LuLoaderCircle,
    LuCircleAlert,
} from "react-icons/lu";

import { FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router";
import axios from "axios";

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 25,
    },

    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

/* =========================================================
   FILE UPLOAD CARD
========================================================= */

const FileUploadCard = ({
    type,
    title,
    description,
    file,
    onFileSelect,
    onRemove,
}) => {
    const inputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState("");

    const isLinkedIn = type === "linkedin";

    const validateFile = (selectedFile) => {
        if (!selectedFile) return;

        // Only PDF
        if (selectedFile.type !== "application/pdf") {
            setError("Please upload a PDF file.");
            return;
        }

        // 5MB limit
        if (selectedFile.size > 5 * 1024 * 1024) {
            setError("File size must be less than 5MB.");
            return;
        }

        setError("");
        onFileSelect(selectedFile);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files?.[0];

        validateFile(droppedFile);
    };

    const handleChange = (e) => {
        const selectedFile = e.target.files?.[0];

        validateFile(selectedFile);

        // Allow selecting the same file again
        e.target.value = "";
    };

    return (
        <motion.div
            variants={itemVariants}
            className="relative"
        >
            {/* Header */}

            <div className="mb-4 flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div
                        className={`
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            ${isLinkedIn
                                ? "bg-blue-600/10 text-blue-600"
                                : "bg-gray-950/5 text-gray-950"
                            }
                        `}
                    >
                        {isLinkedIn ? (
                            <FaLinkedinIn size={18} />
                        ) : (
                            <LuFileText size={20} />
                        )}
                    </div>

                    <div>

                        <p className="font-main text-sm text-gray-950">
                            {title}
                        </p>

                        <p className="mt-0.5 font-body text-xs text-gray-400">
                            {description}
                        </p>

                    </div>

                </div>

                <span className="font-body text-[10px] tracking-[0.2em] text-gray-400">
                    PDF
                </span>

            </div>

            {/* Upload Area */}

            <AnimatePresence mode="wait">

                {!file ? (

                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current?.click()}
                        className={`
                            group
                            relative
                            flex
                            min-h-[230px]
                            cursor-pointer
                            flex-col
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-3xl
                            border
                            border-dashed
                            transition-all
                            duration-300

                            ${isDragging
                                ? `
                                        border-blue-500
                                        bg-blue-500/5
                                        scale-[1.01]
                                    `
                                : `
                                        border-gray-300
                                        bg-white
                                        hover:border-gray-400
                                        hover:bg-gray-50/50
                                    `
                            }
                        `}
                    >

                        {/* Background glow */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                left-1/2
                                top-1/2
                                h-32
                                w-32
                                -translate-x-1/2
                                -translate-y-1/2
                                rounded-full
                                bg-blue-500/5
                                blur-3xl
                                transition-all
                                duration-500
                                group-hover:bg-blue-500/10
                            "
                        />

                        {/* Upload icon */}

                        <motion.div
                            animate={{
                                y: isDragging ? -5 : 0,
                            }}
                            className="
                                relative
                                z-10
                                mb-5
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-gray-950
                                text-white
                                shadow-lg
                                shadow-black/10
                                transition-transform
                                duration-300
                                group-hover:-translate-y-1
                            "
                        >
                            <LuUpload size={21} />
                        </motion.div>

                        <div className="relative z-10 text-center">

                            <p className="font-main text-sm text-gray-950">
                                {isDragging
                                    ? "Drop your file here"
                                    : "Drop your PDF here"}
                            </p>

                            <p className="mt-2 font-body text-xs text-gray-400">
                                or{" "}
                                <span className="text-gray-950 underline underline-offset-4">
                                    browse files
                                </span>
                            </p>

                            <p className="mt-5 font-body text-[10px] tracking-[0.15em] text-gray-400">
                                PDF · MAX 5MB
                            </p>

                        </div>

                        <input
                            ref={inputRef}
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleChange}
                            className="hidden"
                        />

                    </motion.div>

                ) : (

                    /* =====================================================
                       FILE SELECTED
                    ===================================================== */

                    <motion.div
                        key="file"
                        initial={{
                            opacity: 0,
                            scale: 0.97,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        className="
                            relative
                            min-h-[230px]
                            overflow-hidden
                            rounded-3xl
                            border
                            border-emerald-200
                            bg-white
                            p-6
                        "
                    >

                        {/* Success glow */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                -right-20
                                -top-20
                                h-48
                                w-48
                                rounded-full
                                bg-emerald-400/10
                                blur-3xl
                            "
                        />

                        <div className="relative z-10 flex h-full min-h-[180px] flex-col justify-between">

                            <div className="flex items-start justify-between">

                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-emerald-500/10
                                        text-emerald-600
                                    "
                                >
                                    <LuCheck size={22} />
                                </div>

                                <button
                                    type="button"
                                    onClick={onRemove}
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-gray-100
                                        text-gray-500
                                        transition-all
                                        hover:bg-red-50
                                        hover:text-red-500
                                    "
                                >
                                    <LuX size={17} />
                                </button>

                            </div>

                            <div>

                                <p className="font-main text-sm text-gray-950">
                                    {file.name}
                                </p>

                                <p className="mt-1 font-body text-xs text-gray-400">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </p>

                                <div className="mt-5 flex items-center gap-2">

                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                                    <span className="font-body text-xs text-emerald-600">
                                        Ready to analyze
                                    </span>

                                </div>

                            </div>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

            {/* Error */}

            <AnimatePresence>

                {error && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                        }}
                        className="
                            mt-3
                            flex
                            items-center
                            gap-2
                            font-body
                            text-xs
                            text-red-500
                        "
                    >
                        <LuCircleAlert size={14} />
                        {error}
                    </motion.div>

                )}

            </AnimatePresence>

        </motion.div>
    );
};

/* =========================================================
   GITHUB CARD
========================================================= */

const GithubCard = ({
    value,
    setValue,
}) => {

    const [error, setError] = useState("");
    const [valid, setValid] = useState(false);

    const handleChange = (e) => {

        const input = e.target.value;

        setValue(input);

        if (!input) {
            setError("");
            setValid(false);
            return;
        }

        const githubRegex =
            /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9-]+\/?$/;

        if (!githubRegex.test(input)) {
            setError("Enter a valid GitHub profile URL.");
            setValid(false);
        } else {
            setError("");
            setValid(true);
        }
    };

    return (
        <motion.div
            variants={itemVariants}
            className="
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-7
            "
        >

            {/* Header */}

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-gray-950
                            text-white
                        "
                    >
                        <LuGithub size={20} />
                    </div>

                    <div>

                        <p className="font-main text-sm text-gray-950">
                            GitHub Profile
                        </p>

                        <p className="mt-0.5 font-body text-xs text-gray-400">
                            Let AI understand your projects.
                        </p>

                    </div>

                </div>

                <span className="font-body text-[10px] tracking-[0.2em] text-gray-400">
                    03
                </span>

            </div>

            {/* Input */}

            <div className="mt-8">

                <div
                    className={`
                        flex
                        items-center
                        gap-3
                        rounded-2xl
                        border
                        px-4
                        py-3
                        transition-all
                        duration-300

                        ${error
                            ? "border-red-300"
                            : valid
                                ? "border-emerald-300"
                                : "border-gray-200 focus-within:border-gray-400"
                        }
                    `}
                >

                    <span className="font-body text-sm text-gray-400">
                        github.com/
                    </span>

                    <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        placeholder="username"
                        className="
                            min-w-0
                            flex-1
                            bg-transparent
                            font-body
                            text-sm
                            text-gray-950
                            outline-none
                            placeholder:text-gray-300
                        "
                    />

                    <AnimatePresence mode="wait">

                        {valid && (

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.5,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.5,
                                }}
                                className="text-emerald-500"
                            >
                                <LuCheck size={18} />
                            </motion.div>

                        )}

                    </AnimatePresence>

                </div>

                {error && (

                    <motion.p
                        initial={{
                            opacity: 0,
                            y: -5,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="
                            mt-2
                            font-body
                            text-xs
                            text-red-500
                        "
                    >
                        {error}
                    </motion.p>

                )}

                {!error && (

                    <p className="mt-3 font-body text-xs text-gray-400">
                        Example: https://github.com/username
                    </p>

                )}

            </div>

        </motion.div>
    );
};

/* =========================================================
   RESULTS - RESUME
========================================================= */

const ResumeResults = ({ resume }) => {

    if (!resume) return null;

    return (
        <section className="mb-6">

            <div
                className="
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    p-7
                    sm:p-8
                "
            >

                <div className="mb-8">

                    <p className="font-main text-lg text-gray-950">
                        Resume
                    </p>

                    <p className="mt-1 font-body text-xs text-gray-400">
                        Your optimized ATS-friendly profile
                    </p>

                </div>

                {/* Summary */}

                {resume.summary && (

                    <div className="mb-9">

                        <p
                            className="
                                mb-3
                                font-body
                                text-[10px]
                                font-medium
                                tracking-[0.2em]
                                text-gray-400
                            "
                        >
                            PROFESSIONAL SUMMARY
                        </p>

                        <p
                            className="
                                font-body
                                text-sm
                                leading-7
                                text-gray-600
                            "
                        >
                            {resume.summary}
                        </p>

                    </div>

                )}

                {/* Skills */}

                {resume.skills && (

                    <div className="mb-9">

                        <p
                            className="
                                mb-5
                                font-body
                                text-[10px]
                                font-medium
                                tracking-[0.2em]
                                text-gray-400
                            "
                        >
                            SKILLS
                        </p>

                        <div className="grid gap-6 sm:grid-cols-2">

                            {Object.entries(resume.skills).map(
                                ([category, skills]) => {

                                    if (!Array.isArray(skills) || !skills.length) {
                                        return null;
                                    }

                                    return (
                                        <div key={category}>

                                            <p className="mb-3 font-main text-sm capitalize text-gray-950">
                                                {category}
                                            </p>

                                            <div className="flex flex-wrap gap-2">

                                                {skills.map((skill, index) => (

                                                    <span
                                                        key={`${skill}-${index}`}
                                                        className="
                                                            rounded-full
                                                            bg-gray-100
                                                            px-3
                                                            py-1.5
                                                            font-body
                                                            text-xs
                                                            text-gray-600
                                                        "
                                                    >
                                                        {skill}
                                                    </span>

                                                ))}

                                            </div>

                                        </div>
                                    );
                                }
                            )}

                        </div>

                    </div>

                )}

                {/* Experience */}

                {Array.isArray(resume.experience) &&
                    resume.experience.length > 0 && (

                        <div className="mb-9">

                            <p
                                className="
                                    mb-6
                                    font-body
                                    text-[10px]
                                    font-medium
                                    tracking-[0.2em]
                                    text-gray-400
                                "
                            >
                                EXPERIENCE
                            </p>

                            <div className="space-y-8">

                                {resume.experience.map(
                                    (experience, index) => (

                                        <div
                                            key={index}
                                            className="
                                                border-l
                                                border-gray-200
                                                pl-5
                                            "
                                        >

                                            <div className="flex flex-col justify-between gap-2 sm:flex-row">

                                                <div>

                                                    <p className="font-main text-sm text-gray-950">
                                                        {experience.role}
                                                    </p>

                                                    <p className="mt-1 font-body text-xs text-gray-500">
                                                        {experience.company}
                                                        {experience.location
                                                            ? ` · ${experience.location}`
                                                            : ""}
                                                    </p>

                                                </div>

                                                {(experience.startDate ||
                                                    experience.endDate) && (

                                                        <p className="font-body text-xs text-gray-400">
                                                            {experience.startDate || ""}
                                                            {" – "}
                                                            {experience.endDate || ""}
                                                        </p>

                                                    )}

                                            </div>

                                            {Array.isArray(experience.bullets) &&
                                                experience.bullets.length > 0 && (

                                                    <ul className="mt-4 space-y-3">

                                                        {experience.bullets.map(
                                                            (bullet, bulletIndex) => (

                                                                <li
                                                                    key={bulletIndex}
                                                                    className="
                                                                        flex
                                                                        gap-3
                                                                        font-body
                                                                        text-xs
                                                                        leading-6
                                                                        text-gray-500
                                                                    "
                                                                >

                                                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />

                                                                    <span>
                                                                        {bullet}
                                                                    </span>

                                                                </li>

                                                            )
                                                        )}

                                                    </ul>

                                                )}

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                {/* Projects */}

                {Array.isArray(resume.projects) &&
                    resume.projects.length > 0 && (

                        <div className="mb-9">

                            <p
                                className="
                                    mb-6
                                    font-body
                                    text-[10px]
                                    font-medium
                                    tracking-[0.2em]
                                    text-gray-400
                                "
                            >
                                PROJECTS
                            </p>

                            <div className="grid gap-4 sm:grid-cols-2">

                                {resume.projects.map(
                                    (project, index) => (

                                        <div
                                            key={index}
                                            className="
                                                rounded-2xl
                                                border
                                                border-gray-100
                                                bg-gray-50
                                                p-5
                                            "
                                        >

                                            <p className="font-main text-sm text-gray-950">
                                                {project.name}
                                            </p>

                                            {Array.isArray(project.technologies) &&
                                                project.technologies.length > 0 && (

                                                    <div className="mt-3 flex flex-wrap gap-1.5">

                                                        {project.technologies.map(
                                                            (technology, techIndex) => (

                                                                <span
                                                                    key={techIndex}
                                                                    className="
                                                                        font-body
                                                                        text-[10px]
                                                                        text-gray-400
                                                                    "
                                                                >
                                                                    {technology}
                                                                    {techIndex <
                                                                        project.technologies.length - 1
                                                                        ? " •"
                                                                        : ""}
                                                                </span>

                                                            )
                                                        )}

                                                    </div>

                                                )}

                                            {Array.isArray(project.bullets) &&
                                                project.bullets.length > 0 && (

                                                    <ul className="mt-4 space-y-2">

                                                        {project.bullets.map(
                                                            (bullet, bulletIndex) => (

                                                                <li
                                                                    key={bulletIndex}
                                                                    className="
                                                                        font-body
                                                                        text-xs
                                                                        leading-6
                                                                        text-gray-500
                                                                    "
                                                                >
                                                                    {bullet}
                                                                </li>

                                                            )
                                                        )}

                                                    </ul>

                                                )}

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                {/* Education */}

                {Array.isArray(resume.education) &&
                    resume.education.length > 0 && (

                        <div className="mb-9">

                            <p
                                className="
                                    mb-6
                                    font-body
                                    text-[10px]
                                    font-medium
                                    tracking-[0.2em]
                                    text-gray-400
                                "
                            >
                                EDUCATION
                            </p>

                            <div className="space-y-5">

                                {resume.education.map(
                                    (education, index) => (

                                        <div
                                            key={index}
                                            className="
                                                rounded-2xl
                                                border
                                                border-gray-100
                                                bg-gray-50
                                                p-5
                                            "
                                        >

                                            <div className="flex flex-col justify-between gap-2 sm:flex-row">

                                                <div>

                                                    <p className="font-main text-sm text-gray-950">
                                                        {education.degree}
                                                    </p>

                                                    <p className="mt-1 font-body text-xs text-gray-500">
                                                        {education.institution}
                                                    </p>

                                                </div>

                                                <p className="font-body text-xs text-gray-400">
                                                    {education.startYear}
                                                    {" – "}
                                                    {education.endYear}
                                                </p>

                                            </div>

                                            <div className="mt-3 flex flex-wrap gap-3">

                                                {education.grade && (

                                                    <span className="font-body text-xs text-gray-500">
                                                        {education.grade}
                                                    </span>

                                                )}

                                                {education.location && (

                                                    <span className="font-body text-xs text-gray-400">
                                                        {education.location}
                                                    </span>

                                                )}

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                {/* Achievements */}

                {Array.isArray(resume.achievements) &&
                    resume.achievements.length > 0 && (

                        <div>

                            <p
                                className="
                                    mb-5
                                    font-body
                                    text-[10px]
                                    font-medium
                                    tracking-[0.2em]
                                    text-gray-400
                                "
                            >
                                ACHIEVEMENTS
                            </p>

                            <ul className="space-y-3">

                                {resume.achievements.map(
                                    (achievement, index) => (

                                        <li
                                            key={index}
                                            className="
                                                flex
                                                gap-3
                                                font-body
                                                text-xs
                                                leading-6
                                                text-gray-500
                                            "
                                        >

                                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />

                                            <span>
                                                {achievement}
                                            </span>

                                        </li>

                                    )
                                )}

                            </ul>

                        </div>

                    )}

            </div>

        </section>
    );
};

/* =========================================================
   GITHUB RESULTS
========================================================= */

const GithubResults = ({ github }) => {

    if (!github) return null;

    return (
        <section className="mb-6">

            <div
                className="
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    p-7
                    sm:p-8
                "
            >

                <div className="mb-7 flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-gray-950
                            text-white
                        "
                    >
                        <LuGithub size={19} />
                    </div>

                    <div>

                        <p className="font-main text-lg text-gray-950">
                            GitHub
                        </p>

                        <p className="mt-1 font-body text-xs text-gray-400">
                            Optimized README
                        </p>

                    </div>

                </div>

                {github.readme && (

                    <div
                        className="
                            whitespace-pre-wrap
                            overflow-x-auto
                            rounded-2xl
                            bg-gray-50
                            p-6
                            font-body
                            text-sm
                            leading-7
                            text-gray-600
                        "
                    >
                        {github.readme}
                    </div>

                )}

            </div>

        </section>
    );
};

/* =========================================================
   LINKEDIN RESULTS
========================================================= */

const LinkedinResults = ({ linkedin }) => {

    if (!linkedin) return null;

    return (
        <section className="mb-6">

            <div
                className="
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    p-7
                    sm:p-8
                "
            >

                <div className="mb-8 flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-600/10
                            text-blue-600
                        "
                    >
                        <FaLinkedinIn size={17} />
                    </div>

                    <div>

                        <p className="font-main text-lg text-gray-950">
                            LinkedIn
                        </p>

                        <p className="mt-1 font-body text-xs text-gray-400">
                            Profile optimization
                        </p>

                    </div>

                </div>

                {/* Headline */}

                {linkedin.headline && (

                    <div className="mb-7">

                        <p
                            className="
                                mb-3
                                font-body
                                text-[10px]
                                font-medium
                                tracking-[0.2em]
                                text-gray-400
                            "
                        >
                            HEADLINE
                        </p>

                        <div
                            className="
                                rounded-2xl
                                bg-gray-50
                                p-5
                                font-body
                                text-sm
                                leading-6
                                text-gray-700
                            "
                        >
                            {linkedin.headline}
                        </div>

                    </div>

                )}

                {/* About */}

                {linkedin.about && (

                    <div className="mb-7">

                        <p
                            className="
                                mb-3
                                font-body
                                text-[10px]
                                font-medium
                                tracking-[0.2em]
                                text-gray-400
                            "
                        >
                            ABOUT
                        </p>

                        <div
                            className="
                                rounded-2xl
                                bg-gray-50
                                p-5
                                font-body
                                text-sm
                                leading-7
                                text-gray-600
                            "
                        >
                            {linkedin.about}
                        </div>

                    </div>

                )}

                {/* Experience */}

                {Array.isArray(linkedin.experience) &&
                    linkedin.experience.length > 0 && (

                        <div className="mb-7">

                            <p
                                className="
                                    mb-5
                                    font-body
                                    text-[10px]
                                    font-medium
                                    tracking-[0.2em]
                                    text-gray-400
                                "
                            >
                                EXPERIENCE
                            </p>

                            <div className="space-y-6">

                                {linkedin.experience.map(
                                    (experience, index) => (

                                        <div
                                            key={index}
                                            className="
                                                rounded-2xl
                                                border
                                                border-gray-100
                                                bg-gray-50
                                                p-5
                                            "
                                        >

                                            <div className="flex flex-col justify-between gap-2 sm:flex-row">

                                                <div>

                                                    <p className="font-main text-sm text-gray-950">
                                                        {experience.role}
                                                    </p>

                                                    <p className="mt-1 font-body text-xs text-gray-500">
                                                        {experience.company}
                                                        {experience.location
                                                            ? ` · ${experience.location}`
                                                            : ""}
                                                    </p>

                                                </div>

                                                {(experience.startDate ||
                                                    experience.endDate) && (

                                                        <p className="font-body text-xs text-gray-400">
                                                            {experience.startDate || ""}
                                                            {" – "}
                                                            {experience.endDate || ""}
                                                        </p>

                                                    )}

                                            </div>

                                            {experience.description && (

                                                <p className="mt-4 font-body text-xs leading-6 text-gray-500">
                                                    {experience.description}
                                                </p>

                                            )}

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                {/* Skills */}

                {Array.isArray(linkedin.skills) &&
                    linkedin.skills.length > 0 && (

                        <div className="mb-7">

                            <p
                                className="
                                    mb-4
                                    font-body
                                    text-[10px]
                                    font-medium
                                    tracking-[0.2em]
                                    text-gray-400
                                "
                            >
                                RECOMMENDED SKILLS
                            </p>

                            <div className="flex flex-wrap gap-2">

                                {linkedin.skills.map(
                                    (skill, index) => (

                                        <span
                                            key={index}
                                            className="
                                                rounded-full
                                                bg-gray-100
                                                px-3
                                                py-1.5
                                                font-body
                                                text-xs
                                                text-gray-600
                                            "
                                        >
                                            {skill}
                                        </span>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                {/* Projects */}

                {Array.isArray(linkedin.projects) &&
                    linkedin.projects.length > 0 && (

                        <div className="mb-7">

                            <p
                                className="
                                    mb-4
                                    font-body
                                    text-[10px]
                                    font-medium
                                    tracking-[0.2em]
                                    text-gray-400
                                "
                            >
                                PROJECTS
                            </p>

                            <div className="flex flex-wrap gap-2">

                                {linkedin.projects.map(
                                    (project, index) => (

                                        <span
                                            key={index}
                                            className="
                                                rounded-full
                                                bg-gray-100
                                                px-3
                                                py-1.5
                                                font-body
                                                text-xs
                                                text-gray-600
                                            "
                                        >
                                            {project}
                                        </span>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                {/* Featured */}

                {Array.isArray(linkedin.featured) &&
                    linkedin.featured.length > 0 && (

                        <div className="mb-7">

                            <p
                                className="
                                    mb-4
                                    font-body
                                    text-[10px]
                                    font-medium
                                    tracking-[0.2em]
                                    text-gray-400
                                "
                            >
                                FEATURED
                            </p>

                            <div className="space-y-2">

                                {linkedin.featured.map(
                                    (item, index) => (

                                        <div
                                            key={index}
                                            className="
                                                rounded-2xl
                                                border
                                                border-gray-100
                                                bg-gray-50
                                                px-4
                                                py-3
                                                font-body
                                                text-xs
                                                text-gray-600
                                            "
                                        >
                                            {item}
                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                {/* Achievements */}

                {Array.isArray(linkedin.achievements) &&
                    linkedin.achievements.length > 0 && (

                        <div>

                            <p
                                className="
                                    mb-4
                                    font-body
                                    text-[10px]
                                    font-medium
                                    tracking-[0.2em]
                                    text-gray-400
                                "
                            >
                                ACHIEVEMENTS
                            </p>

                            <ul className="space-y-3">

                                {linkedin.achievements.map(
                                    (achievement, index) => (

                                        <li
                                            key={index}
                                            className="
                                                flex
                                                gap-3
                                                font-body
                                                text-xs
                                                leading-6
                                                text-gray-500
                                            "
                                        >

                                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />

                                            <span>
                                                {achievement}
                                            </span>

                                        </li>

                                    )
                                )}

                            </ul>

                        </div>

                    )}

            </div>

        </section>
    );
};

/* =========================================================
   MAIN PRODUCT PAGE
========================================================= */

const ProductPage = () => {

    const [resume, setResume] = useState(null);
    const [linkedin, setLinkedin] = useState(null);
    const [github, setGithub] = useState("");

    // Gemini analysis
    const [analysis, setAnalysis] = useState(null);

    const navigate = useNavigate();

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisStarted, setAnalysisStarted] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const token = localStorage.getItem("token");

    /* =====================================================
       AUTH
    ===================================================== */

    useEffect(() => {

        if (!token) {
            navigate("/auth");
        }

    }, [token, navigate]);

    /* =====================================================
       CAN ANALYZE
    ===================================================== */

    const canAnalyze =
        resume &&
        linkedin &&
        github &&
        /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9-]+\/?$/.test(
            github
        );

    /* =====================================================
       HANDLE ANALYZE
    ===================================================== */

    const handleAnalyze = async () => {

        if (!canAnalyze || isAnalyzing) return;

        try {

            setIsAnalyzing(true);
            setAnalysisStarted(true);
            setAnalysis(null);
            setErrorMessage("");

            const formData = new FormData();

            formData.append("resume", resume);
            formData.append("linkedin", linkedin);
            formData.append("github", github);

            const res = await axios.post(
                "http://localhost:3000/user/analyze",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            


            /*
             * Supports BOTH:
             *
             * 1. {
             *      analysis: {...}
             *    }
             *
             * 2. {
             *      data: {
             *          analyse: {...}
             *      }
             *    }
             */

            const result =
                res.data?.analysis ||
                res.data?.data?.analyse ||
                res.data?.data?.analysis;

            if (!result) {

                console.error(
                    "Unexpected analysis response:",
                    res.data
                );

                throw new Error(
                    "Analysis data was not found in the server response."
                );
            }

            console.log("Formatted analysis:", result);

            // Store Gemini result
            setAnalysis(result);

            // Stop analyzing state
            setIsAnalyzing(false);

        } catch (error) {

            console.error(
                "Analysis error:",
                error.response?.data || error.message
            );

            setIsAnalyzing(false);
            setAnalysisStarted(false);

            setErrorMessage(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong while analyzing your profile."
            );
        }
    };

    /* =====================================================
       NEW ANALYSIS
    ===================================================== */

    const handleNewAnalysis = () => {

        setAnalysis(null);
        setAnalysisStarted(false);
        setIsAnalyzing(false);
        setErrorMessage("");

        setResume(null);
        setLinkedin(null);
        setGithub("");

    };

    return (
        <main
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#f5f5f0]
                px-6
                pb-24
                pt-28
                lg:pt-32
            "
        >

            {/* =====================================================
                BACKGROUND
            ===================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    top-20
                    h-[400px]
                    w-[400px]
                    rounded-full
                    bg-blue-400/10
                    blur-[130px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    top-[40%]
                    h-[450px]
                    w-[450px]
                    rounded-full
                    bg-violet-400/10
                    blur-[140px]
                "
            />

            {/* =====================================================
                CONTENT
            ===================================================== */}

            <div className="relative z-10 mx-auto max-w-6xl">

                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                    className="mb-14"
                >

                    {/* Label */}

                    <div className="mb-6 flex items-center gap-3">

                        <div className="flex items-center gap-2">

                            <span
                                className="
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-blue-500
                                "
                            />

                            <span
                                className="
                                    font-body
                                    text-xs
                                    font-medium
                                    tracking-[0.2em]
                                    text-gray-400
                                "
                            >
                                YOUR PROFILE
                            </span>

                        </div>

                        <div className="h-px w-10 bg-gray-300" />

                        <span
                            className="
                                font-body
                                text-xs
                                tracking-[0.2em]
                                text-gray-400
                            "
                        >
                            {analysis ? "02" : "01"}
                        </span>

                    </div>

                    {/* Heading */}

                    <h1
                        className="
                            max-w-3xl
                            font-main
                            text-4xl
                            leading-[1.05]
                            tracking-tight
                            text-gray-950
                            sm:text-5xl
                            lg:text-6xl
                        "
                    >

                        {analysis ? (
                            <>
                                Your professional
                                <br />
                                <span className="text-gray-400">
                                    identity is ready.
                                </span>
                            </>
                        ) : (
                            <>
                                Build your professional
                                <br />
                                <span className="text-gray-400">
                                    identity in one place.
                                </span>
                            </>
                        )}

                    </h1>

                    <p
                        className="
                            mt-6
                            max-w-xl
                            font-body
                            text-sm
                            leading-7
                            text-gray-500
                            sm:text-base
                        "
                    >

                        {analysis
                            ? "Your Resume, LinkedIn and GitHub have been analyzed and synchronized into one professional profile."
                            : "Upload your Resume, LinkedIn and GitHub. CareerSync will analyze your profile and find opportunities to make you stand out."}

                    </p>

                </motion.div>

                {/* Divider */}

                <motion.div
                    initial={{
                        scaleX: 0,
                    }}
                    animate={{
                        scaleX: 1,
                    }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                    }}
                    className="
                        mb-10
                        h-px
                        w-full
                        origin-left
                        bg-gray-200
                    "
                />

                {/* =================================================
                    ERROR
                ================================================= */}

                <AnimatePresence>

                    {errorMessage && (

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -10,
                            }}
                            className="
                                mb-6
                                flex
                                items-center
                                gap-3
                                rounded-2xl
                                border
                                border-red-200
                                bg-red-50
                                px-5
                                py-4
                                font-body
                                text-sm
                                text-red-600
                            "
                        >

                            <LuCircleAlert size={18} />

                            <span>
                                {errorMessage}
                            </span>

                        </motion.div>

                    )}

                </AnimatePresence>

                {/* =================================================
                    MAIN STATES
                ================================================= */}

                <AnimatePresence mode="wait">

                    {/* =================================================
                        UPLOAD SCREEN
                    ================================================= */}

                    {!analysisStarted && !analysis && (

                        <motion.div
                            key="upload"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            exit={{
                                opacity: 0,
                                y: -20,
                            }}
                        >

                            {/* Section heading */}

                            <motion.div
                                variants={itemVariants}
                                className="
                                    mb-7
                                    flex
                                    items-end
                                    justify-between
                                "
                            >

                                <div>

                                    <p
                                        className="
                                            font-main
                                            text-lg
                                            text-gray-950
                                        "
                                    >
                                        Your career data
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            font-body
                                            text-xs
                                            text-gray-400
                                        "
                                    >
                                        Three things. One complete profile.
                                    </p>

                                </div>

                                <span
                                    className="
                                        hidden
                                        font-body
                                        text-xs
                                        text-gray-400
                                        sm:block
                                    "
                                >
                                    03 / 03 required
                                </span>

                            </motion.div>

                            {/* Resume + LinkedIn */}

                            <div
                                className="
                                    grid
                                    gap-5
                                    lg:grid-cols-2
                                "
                            >

                                <FileUploadCard
                                    type="resume"
                                    title="Resume"
                                    description="Your primary career document."
                                    file={resume}
                                    onFileSelect={setResume}
                                    onRemove={() => setResume(null)}
                                />

                                <FileUploadCard
                                    type="linkedin"
                                    title="LinkedIn"
                                    description="Your professional online profile."
                                    file={linkedin}
                                    onFileSelect={setLinkedin}
                                    onRemove={() => setLinkedin(null)}
                                />

                            </div>

                            {/* GitHub */}

                            <div className="mt-5">

                                <GithubCard
                                    value={github}
                                    setValue={setGithub}
                                />

                            </div>

                            {/* =================================================
                                ANALYZE CTA
                            ================================================= */}

                            <motion.div
                                variants={itemVariants}
                                className="
                                    mt-8
                                    flex
                                    flex-col
                                    items-center
                                    justify-between
                                    gap-5
                                    border-t
                                    border-gray-200
                                    pt-8
                                    sm:flex-row
                                "
                            >

                                <div className="flex items-center gap-2">

                                    <LuSparkles
                                        size={15}
                                        className="text-blue-500"
                                    />

                                    <p className="font-body text-xs text-gray-500">
                                        Your data stays private.
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={handleAnalyze}
                                    disabled={!canAnalyze}
                                    className={`
                                        group
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-3
                                        rounded-full
                                        px-7
                                        py-3.5
                                        font-main
                                        text-sm
                                        transition-all
                                        duration-300
                                        sm:w-auto

                                        ${canAnalyze
                                            ? `
                                                    bg-gray-950
                                                    text-white
                                                    shadow-xl
                                                    shadow-black/10
                                                    hover:bg-blue-600
                                                    hover:shadow-blue-500/20
                                                `
                                            : `
                                                    cursor-not-allowed
                                                    bg-gray-200
                                                    text-gray-400
                                                `
                                        }
                                    `}
                                >

                                    Analyze my profile

                                    <LuArrowRight
                                        size={17}
                                        className="
                                            transition-transform
                                            duration-300
                                            group-hover:translate-x-1
                                        "
                                    />

                                </button>

                            </motion.div>

                        </motion.div>

                    )}

                    {/* =================================================
                        ANALYZING STATE
                    ================================================= */}

                    {analysisStarted && !analysis && (

                        <motion.div
                            key="analyzing"
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            className="
                                flex
                                min-h-[500px]
                                flex-col
                                items-center
                                justify-center
                                rounded-[2rem]
                                border
                                border-gray-200
                                bg-white
                                px-6
                                text-center
                            "
                        >

                            {/* Animated icon */}

                            <div className="relative mb-8">

                                <motion.div
                                    animate={{
                                        rotate: 360,
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="
                                        absolute
                                        -inset-5
                                        rounded-full
                                        border
                                        border-dashed
                                        border-blue-200
                                    "
                                />

                                <motion.div
                                    animate={{
                                        scale: [1, 1.08, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                    className="
                                        flex
                                        h-20
                                        w-20
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-gray-950
                                        text-blue-400
                                        shadow-xl
                                        shadow-blue-500/10
                                    "
                                >
                                    <LuSparkles size={28} />
                                </motion.div>

                            </div>

                            <p
                                className="
                                    font-body
                                    text-xs
                                    font-medium
                                    tracking-[0.25em]
                                    text-blue-500
                                "
                            >
                                ANALYZING YOUR PROFILE
                            </p>

                            <h2
                                className="
                                    mt-4
                                    font-main
                                    text-3xl
                                    tracking-tight
                                    text-gray-950
                                    sm:text-4xl
                                "
                            >
                                Finding what makes
                                <br />
                                <span className="text-gray-400">
                                    you stand out.
                                </span>
                            </h2>

                            {/* Loading */}

                            <div
                                className="
                                    mt-10
                                    flex
                                    items-center
                                    gap-3
                                    font-body
                                    text-xs
                                    text-gray-400
                                "
                            >

                                <LuLoaderCircle
                                    size={15}
                                    className="animate-spin"
                                />

                                Processing your career data...

                            </div>

                        </motion.div>

                    )}

                    {/* =================================================
                        RESULTS
                    ================================================= */}

                    {analysis && (

                        <motion.div
                            key="results"
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                        >

                            {/* Results heading */}

                            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

                                <div>

                                    <div className="mb-4 flex items-center gap-3">

                                        <span
                                            className="
                                                h-2
                                                w-2
                                                rounded-full
                                                bg-emerald-500
                                            "
                                        />

                                        <span
                                            className="
                                                font-body
                                                text-xs
                                                font-medium
                                                tracking-[0.2em]
                                                text-gray-400
                                            "
                                        >
                                            ANALYSIS COMPLETE
                                        </span>

                                    </div>

                                    <p className="font-main text-lg text-gray-950">
                                        Your optimized profile
                                    </p>

                                    <p className="mt-1 font-body text-xs text-gray-400">
                                        Resume · LinkedIn · GitHub
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={handleNewAnalysis}
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-full
                                        border
                                        border-gray-200
                                        bg-white
                                        px-5
                                        py-2.5
                                        font-main
                                        text-xs
                                        text-gray-600
                                        transition-all
                                        hover:border-gray-400
                                        hover:text-gray-950
                                    "
                                >
                                    <LuArrowRight
                                        size={14}
                                        className="rotate-180"
                                    />

                                    Start new analysis
                                </button>

                            </div>

                            {/* Resume */}

                            <ResumeResults
                                resume={analysis.resume}
                            />

                            {/* GitHub */}

                            <GithubResults
                                github={analysis.github}
                            />

                            {/* LinkedIn */}

                            <LinkedinResults
                                linkedin={analysis.linkedin}
                            />

                        </motion.div>

                    )}

                </AnimatePresence>

            </div>

        </main>
    );
};

export default ProductPage;