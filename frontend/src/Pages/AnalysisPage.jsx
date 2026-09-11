
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
    LuArrowLeft,
    LuCopy,
    LuCheck,
    LuSparkles,
    LuFileText,
    LuGithub,
    LuCheckCircle2,
    LuAlertCircle,
    LuTarget,
    LuBriefcaseBusiness,
    LuCode2,
    LuChevronDown,
    LuChevronUp,
} from "react-icons/lu";
import { FaLinkedinIn } from "react-icons/fa";

/* =========================================================
   COPY BUTTON
========================================================= */

const CopyButton = ({ text = "", label = "Copy" }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Copy failed:", error);
        }
    };

    return (
        <button
            onClick={handleCopy}
            disabled={!text}
            className="
                flex items-center gap-2 rounded-full
                bg-gray-950 px-4 py-2
                font-body text-xs text-white
                transition-all duration-200
                hover:bg-blue-600
                disabled:cursor-not-allowed
                disabled:opacity-40
            "
        >
            {copied ? (
                <>
                    <LuCheck size={14} />
                    Copied
                </>
            ) : (
                <>
                    <LuCopy size={14} />
                    {label}
                </>
            )}
        </button>
    );
};

/* =========================================================
   SCORE CARD
========================================================= */

const ScoreCard = ({ label, score = 0 }) => {
    const safeScore = Math.min(
        100,
        Math.max(0, Number(score) || 0)
    );

    return (
        <div
            className="
                rounded-3xl
                border border-gray-200
                bg-white
                p-6
            "
        >
            <p className="font-body text-xs text-gray-400">
                {label}
            </p>

            <div className="mt-3 flex items-end gap-1">
                <span className="font-main text-4xl text-gray-950">
                    {safeScore}
                </span>

                <span
                    className="
                        mb-1
                        font-body
                        text-sm
                        text-gray-400
                    "
                >
                    /100
                </span>
            </div>

            <div
                className="
                    mt-4
                    h-1.5
                    overflow-hidden
                    rounded-full
                    bg-gray-100
                "
            >
                <div
                    className="
                        h-full
                        rounded-full
                        bg-blue-500
                        transition-all
                        duration-700
                    "
                    style={{
                        width: `${safeScore}%`,
                    }}
                />
            </div>
        </div>
    );
};

/* =========================================================
   COPY SECTION
========================================================= */

const CopySection = ({
    title,
    icon,
    text = "",
    description = "",
}) => {
    return (
        <section
            className="
                overflow-hidden
                rounded-3xl
                border border-gray-200
                bg-white
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-4
                    border-b
                    border-gray-100
                    px-6
                    py-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >
                <div className="flex items-center gap-3">
                    <div
                        className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-gray-950
                            text-white
                        "
                    >
                        {icon}
                    </div>

                    <div>
                        <p
                            className="
                                font-main
                                text-sm
                                text-gray-950
                            "
                        >
                            {title}
                        </p>

                        {description && (
                            <p
                                className="
                                    mt-0.5
                                    font-body
                                    text-[11px]
                                    text-gray-400
                                "
                            >
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                <CopyButton text={text} />
            </div>

            <div className="p-6">
                {text ? (
                    <pre
                        className="
                            whitespace-pre-wrap
                            break-words
                            font-body
                            text-sm
                            leading-7
                            text-gray-600
                        "
                    >
                        {text}
                    </pre>
                ) : (
                    <p
                        className="
                            font-body
                            text-sm
                            text-gray-400
                        "
                    >
                        No content generated.
                    </p>
                )}
            </div>
        </section>
    );
};

/* =========================================================
   COLLAPSIBLE LIST
========================================================= */

const CollapsibleList = ({
    title,
    icon,
    items = [],
    emptyText = "Nothing to show.",
}) => {
    const [open, setOpen] = useState(true);

    return (
        <div
            className="
                rounded-3xl
                border border-gray-200
                bg-white
            "
        >
            <button
                onClick={() => setOpen(!open)}
                className="
                    flex
                    w-full
                    items-center
                    justify-between
                    px-6
                    py-5
                    text-left
                "
            >
                <div className="flex items-center gap-3">
                    <div
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-gray-950
                            text-white
                        "
                    >
                        {icon}
                    </div>

                    <div>
                        <p
                            className="
                                font-main
                                text-sm
                                text-gray-950
                            "
                        >
                            {title}
                        </p>

                        <p
                            className="
                                mt-0.5
                                font-body
                                text-[11px]
                                text-gray-400
                            "
                        >
                            {items.length} item
                            {items.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                </div>

                {open ? (
                    <LuChevronUp
                        size={18}
                        className="text-gray-400"
                    />
                ) : (
                    <LuChevronDown
                        size={18}
                        className="text-gray-400"
                    />
                )}
            </button>

            {open && (
                <div
                    className="
                        border-t
                        border-gray-100
                        px-6
                        py-5
                    "
                >
                    {items.length > 0 ? (
                        <ul className="space-y-3">
                            {items.map((item, index) => (
                                <li
                                    key={index}
                                    className="
                                        flex
                                        gap-3
                                        font-body
                                        text-sm
                                        leading-6
                                        text-gray-500
                                    "
                                >
                                    <span
                                        className="
                                            mt-2
                                            h-1.5
                                            w-1.5
                                            shrink-0
                                            rounded-full
                                            bg-blue-500
                                        "
                                    />

                                    <span>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p
                            className="
                                font-body
                                text-sm
                                text-gray-400
                            "
                        >
                            {emptyText}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

/* =========================================================
   PLATFORM HEADER
========================================================= */

const PlatformHeader = ({
    icon,
    title,
    description,
}) => {
    return (
        <div className="mb-7">
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
                    {icon}
                </div>

                <div>
                    <p
                        className="
                            font-main
                            text-lg
                            text-gray-950
                        "
                    >
                        {title}
                    </p>

                    <p
                        className="
                            mt-1
                            font-body
                            text-xs
                            text-gray-400
                        "
                    >
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

/* =========================================================
   MAIN PAGE
========================================================= */

const AnalysisPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const analysis = location.state?.analysis;

    /* ---------------------------------------------------------
       ANALYSIS NOT FOUND
    --------------------------------------------------------- */

    if (!analysis) {
        return (
            <main
                className="
                    min-h-screen
                    bg-[#f5f5f0]
                    px-6
                    py-32
                "
            >
                <div className="mx-auto max-w-6xl">
                    <button
                        onClick={() => navigate("/")}
                        className="
                            flex
                            items-center
                            gap-2
                            font-body
                            text-sm
                            text-gray-500
                            transition
                            hover:text-gray-950
                        "
                    >
                        <LuArrowLeft size={16} />
                        Back
                    </button>

                    <div className="mt-20 text-center">
                        <div
                            className="
                                mx-auto
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl
                                bg-white
                                text-gray-950
                            "
                        >
                            <LuAlertCircle size={25} />
                        </div>

                        <h1
                            className="
                                mt-6
                                font-main
                                text-4xl
                                text-gray-950
                            "
                        >
                            Analysis not found
                        </h1>

                        <p
                            className="
                                mt-3
                                font-body
                                text-sm
                                text-gray-400
                            "
                        >
                            Please analyze your profile again.
                        </p>

                        <button
                            onClick={() => navigate("/")}
                            className="
                                mt-7
                                rounded-full
                                bg-gray-950
                                px-6
                                py-3
                                font-body
                                text-sm
                                text-white
                                transition
                                hover:bg-blue-600
                            "
                        >
                            Analyze profile
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    /* ---------------------------------------------------------
       SAFE DATA
    --------------------------------------------------------- */

    const scores = analysis.scores || {};
    const equality = analysis.equality || {};
    const ats = analysis.ats || {};
    const resume = analysis.resume || {};
    const linkedin = analysis.linkedin || {};
    const github = analysis.github || {};
    const copy = analysis.copy || {};

    const resumeCopy = copy.resume || {};
    const linkedinCopy = copy.linkedin || {};
    const githubCopy = copy.github || {};

    const safeExperience = resume.experience || [];
    const safeProjects = resume.projects || [];
    const safeEducation = resume.education || [];

    /* ---------------------------------------------------------
       COPY ALL HELPERS
    --------------------------------------------------------- */

    const resumeAll = [
        resumeCopy.summary || "",
        resumeCopy.skills || "",
        resumeCopy.experience || "",
        resumeCopy.projects || "",
    ]
        .filter(Boolean)
        .join("\n\n");

    const linkedinAll = [
        linkedinCopy.headline || "",
        linkedinCopy.about || "",
        linkedinCopy.experience || "",
    ]
        .filter(Boolean)
        .join("\n\n");

    const githubAll = githubCopy.readme || github.readme || "";

    return (
        <main
            className="
                min-h-screen
                bg-[#f5f5f0]
                px-6
                pb-24
                pt-28
            "
        >
            <div className="mx-auto max-w-6xl">

                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div className="mb-14">
                    <button
                        onClick={() => navigate(-1)}
                        className="
                            mb-8
                            flex
                            items-center
                            gap-2
                            font-body
                            text-xs
                            text-gray-400
                            transition
                            hover:text-gray-950
                        "
                    >
                        <LuArrowLeft size={15} />
                        Back to profile
                    </button>

                    <div className="mb-5 flex items-center gap-3">
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
                                tracking-[0.2em]
                                text-gray-400
                            "
                        >
                            CAREERSYNC ANALYSIS
                        </span>
                    </div>

                    <h1
                        className="
                            max-w-3xl
                            font-main
                            text-4xl
                            tracking-tight
                            text-gray-950
                            sm:text-5xl
                        "
                    >
                        Your profile,
                        <br />

                        <span className="text-gray-400">
                            optimized for opportunities.
                        </span>
                    </h1>

                    <p
                        className="
                            mt-5
                            max-w-2xl
                            font-body
                            text-sm
                            leading-6
                            text-gray-500
                        "
                    >
                        CareerSync analyzed your Resume, LinkedIn
                        and GitHub to identify consistency,
                        ATS opportunities and copy-ready improvements.
                    </p>
                </div>

                {/* =================================================
                    PROFILE EQUALITY
                ================================================= */}

                <section
                    className="
                        mb-12
                        rounded-[2rem]
                        border border-gray-200
                        bg-white
                        p-7
                        sm:p-10
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            gap-8
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >
                        <div>
                            <div className="flex items-center gap-2">
                                <LuSparkles
                                    size={17}
                                    className="text-blue-500"
                                />

                                <p
                                    className="
                                        font-body
                                        text-xs
                                        tracking-[0.18em]
                                        text-gray-400
                                    "
                                >
                                    PROFILE EQUALITY
                                </p>
                            </div>

                            <h2
                                className="
                                    mt-4
                                    font-main
                                    text-4xl
                                    text-gray-950
                                "
                            >
                                {equality.overallEqualityScore ?? 0}

                                <span
                                    className="
                                        ml-1
                                        text-gray-300
                                    "
                                >
                                    /100
                                </span>
                            </h2>

                            <p
                                className="
                                    mt-2
                                    max-w-lg
                                    font-body
                                    text-sm
                                    leading-6
                                    text-gray-500
                                "
                            >
                                How consistently your Resume,
                                LinkedIn and GitHub currently
                                represent the same professional identity.
                            </p>
                        </div>

                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-3
                                sm:grid-cols-3
                                sm:gap-5
                            "
                        >
                            <ScoreCard
                                label="Resume ↔ LinkedIn"
                                score={
                                    equality.resumeLinkedinScore
                                }
                            />

                            <ScoreCard
                                label="Resume ↔ GitHub"
                                score={
                                    equality.resumeGithubScore
                                }
                            />

                            <ScoreCard
                                label="LinkedIn ↔ GitHub"
                                score={
                                    equality.linkedinGithubScore
                                }
                            />
                        </div>
                    </div>
                </section>

                {/* =================================================
                    MATCHING + INCONSISTENCIES
                ================================================= */}

                <section className="mb-14">
                    <div className="mb-7">
                        <p
                            className="
                                font-main
                                text-lg
                                text-gray-950
                            "
                        >
                            Profile consistency
                        </p>

                        <p
                            className="
                                mt-1
                                font-body
                                text-xs
                                text-gray-400
                            "
                        >
                            What is already aligned and what needs
                            to be synchronized.
                        </p>
                    </div>

                    <div
                        className="
                            grid
                            gap-5
                            lg:grid-cols-2
                        "
                    >
                        <CollapsibleList
                            title="Matching points"
                            icon={
                                <LuCheckCircle2 size={17} />
                            }
                            items={
                                equality.matchingPoints || []
                            }
                            emptyText="No matching points returned."
                        />

                        <CollapsibleList
                            title="Inconsistencies"
                            icon={
                                <LuAlertCircle size={17} />
                            }
                            items={
                                equality.inconsistencies || []
                            }
                            emptyText="No inconsistencies found."
                        />
                    </div>
                </section>

                {/* =================================================
                    ATS PERFORMANCE
                ================================================= */}

                <section className="mb-14">
                    <div className="mb-7">
                        <p
                            className="
                                font-main
                                text-lg
                                text-gray-950
                            "
                        >
                            ATS performance
                        </p>

                        <p
                            className="
                                mt-1
                                font-body
                                text-xs
                                text-gray-400
                            "
                        >
                            Estimated quality based on resume
                            structure, keywords and technical relevance.
                        </p>
                    </div>

                    <div
                        className="
                            grid
                            gap-4
                            sm:grid-cols-2
                            lg:grid-cols-5
                        "
                    >
                        <ScoreCard
                            label="ATS Score"
                            score={scores.atsScore}
                        />

                        <ScoreCard
                            label="Keyword Coverage"
                            score={
                                scores.keywordCoverage
                            }
                        />

                        <ScoreCard
                            label="Technical Relevance"
                            score={
                                scores.technicalRelevance
                            }
                        />

                        <ScoreCard
                            label="Impact Score"
                            score={
                                scores.impactScore
                            }
                        />

                        <ScoreCard
                            label="Readability"
                            score={
                                scores.readabilityScore
                            }
                        />
                    </div>
                </section>

                {/* =================================================
                    ATS KEYWORDS
                ================================================= */}

                <section className="mb-14">
                    <div className="mb-7">
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
                                <LuTarget size={17} />
                            </div>

                            <div>
                                <p
                                    className="
                                        font-main
                                        text-lg
                                        text-gray-950
                                    "
                                >
                                    ATS keywords
                                </p>

                                <p
                                    className="
                                        mt-1
                                        font-body
                                        text-xs
                                        text-gray-400
                                    "
                                >
                                    Keywords that strengthen your
                                    software engineering profile.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="
                            rounded-[2rem]
                            border border-gray-200
                            bg-white
                            p-7
                            sm:p-10
                        "
                    >
                        <p
                            className="
                                font-main
                                text-sm
                                text-gray-950
                            "
                        >
                            Top keywords
                        </p>

                        <div
                            className="
                                mt-5
                                flex
                                flex-wrap
                                gap-2
                            "
                        >
                            {(ats.topKeywords || []).map(
                                (keyword, index) => (
                                    <span
                                        key={index}
                                        className="
                                            rounded-full
                                            bg-gray-100
                                            px-4
                                            py-2
                                            font-body
                                            text-xs
                                            text-gray-600
                                        "
                                    >
                                        {keyword}
                                    </span>
                                )
                            )}
                        </div>

                        {(ats.missingKeywords || []).length >
                            0 && (
                            <div className="mt-10">
                                <p
                                    className="
                                        font-main
                                        text-sm
                                        text-gray-950
                                    "
                                >
                                    Missing relevant keywords
                                </p>

                                <div
                                    className="
                                        mt-5
                                        flex
                                        flex-wrap
                                        gap-2
                                    "
                                >
                                    {ats.missingKeywords.map(
                                        (keyword, index) => (
                                            <span
                                                key={index}
                                                className="
                                                    rounded-full
                                                    border
                                                    border-gray-200
                                                    px-4
                                                    py-2
                                                    font-body
                                                    text-xs
                                                    text-gray-500
                                                "
                                            >
                                                {keyword}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {(ats.improvementAreas || []).length >
                            0 && (
                            <div className="mt-10">
                                <p
                                    className="
                                        font-main
                                        text-sm
                                        text-gray-950
                                    "
                                >
                                    Improvement areas
                                </p>

                                <ul
                                    className="
                                        mt-5
                                        space-y-3
                                    "
                                >
                                    {ats.improvementAreas.map(
                                        (item, index) => (
                                            <li
                                                key={index}
                                                className="
                                                    flex
                                                    gap-3
                                                    font-body
                                                    text-sm
                                                    leading-6
                                                    text-gray-500
                                                "
                                            >
                                                <span
                                                    className="
                                                        mt-2
                                                        h-1.5
                                                        w-1.5
                                                        shrink-0
                                                        rounded-full
                                                        bg-blue-500
                                                    "
                                                />

                                                <span>
                                                    {item}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>

                {/* =================================================
                    RESUME
                ================================================= */}

                <section className="mb-14">
                    <PlatformHeader
                        icon={
                            <LuFileText size={18} />
                        }
                        title="ATS-ready resume"
                        description="Copy the optimized sections directly into your resume."
                    />

                    <div className="mb-5 flex justify-end">
                        <CopyButton
                            text={resumeAll}
                            label="Copy entire resume content"
                        />
                    </div>

                    <div className="space-y-5">
                        <CopySection
                            title="Professional Summary"
                            icon={
                                <LuFileText size={17} />
                            }
                            text={
                                resumeCopy.summary ||
                                resume.summary ||
                                ""
                            }
                            description="2–3 line ATS-focused summary"
                        />

                        <CopySection
                            title="Skills"
                            icon={
                                <LuCode2 size={17} />
                            }
                            text={
                                resumeCopy.skills ||
                                ""
                            }
                            description="Keyword-optimized technical skills"
                        />

                        <CopySection
                            title="Experience"
                            icon={
                                <LuBriefcaseBusiness
                                    size={17}
                                />
                            }
                            text={
                                resumeCopy.experience ||
                                ""
                            }
                            description="Action-oriented, copy-ready bullets"
                        />

                        <CopySection
                            title="Projects"
                            icon={
                                <LuCode2 size={17} />
                            }
                            text={
                                resumeCopy.projects ||
                                ""
                            }
                            description="Technical project descriptions"
                        />
                    </div>
                </section>

                {/* =================================================
                    RESUME STRUCTURED VIEW
                ================================================= */}

                <section className="mb-14">
                    <div className="mb-7">
                        <p
                            className="
                                font-main
                                text-lg
                                text-gray-950
                            "
                        >
                            Resume analysis
                        </p>

                        <p
                            className="
                                mt-1
                                font-body
                                text-xs
                                text-gray-400
                            "
                        >
                            Structured view of the optimized resume.
                        </p>
                    </div>

                    <div className="space-y-5">
                        {/* Summary */}

                        {resume.summary && (
                            <div
                                className="
                                    rounded-3xl
                                    border border-gray-200
                                    bg-white
                                    p-6
                                "
                            >
                                <p
                                    className="
                                        font-main
                                        text-sm
                                        text-gray-950
                                    "
                                >
                                    Summary
                                </p>

                                <p
                                    className="
                                        mt-4
                                        font-body
                                        text-sm
                                        leading-7
                                        text-gray-500
                                    "
                                >
                                    {resume.summary}
                                </p>
                            </div>
                        )}

                        {/* Experience */}

                        {safeExperience.length > 0 && (
                            <div
                                className="
                                    rounded-3xl
                                    border border-gray-200
                                    bg-white
                                    p-6
                                "
                            >
                                <p
                                    className="
                                        font-main
                                        text-sm
                                        text-gray-950
                                    "
                                >
                                    Experience
                                </p>

                                <div
                                    className="
                                        mt-6
                                        space-y-8
                                    "
                                >
                                    {safeExperience.map(
                                        (item, index) => (
                                            <div
                                                key={index}
                                            >
                                                <div
                                                    className="
                                                        flex
                                                        flex-col
                                                        gap-1
                                                        sm:flex-row
                                                        sm:items-start
                                                        sm:justify-between
                                                    "
                                                >
                                                    <div>
                                                        <p
                                                            className="
                                                                font-main
                                                                text-sm
                                                                text-gray-950
                                                            "
                                                        >
                                                            {
                                                                item.role
                                                            }
                                                        </p>

                                                        <p
                                                            className="
                                                                mt-1
                                                                font-body
                                                                text-xs
                                                                text-gray-400
                                                            "
                                                        >
                                                            {
                                                                item.company
                                                            }

                                                            {item.location
                                                                ? ` · ${item.location}`
                                                                : ""}
                                                        </p>
                                                    </div>

                                                    <p
                                                        className="
                                                            font-body
                                                            text-xs
                                                            text-gray-400
                                                        "
                                                    >
                                                        {
                                                            item.startDate
                                                        }

                                                        {" – "}

                                                        {
                                                            item.endDate
                                                        }
                                                    </p>
                                                </div>

                                                <ul
                                                    className="
                                                        mt-4
                                                        space-y-2
                                                    "
                                                >
                                                    {(
                                                        item.bullets ||
                                                        []
                                                    ).map(
                                                        (
                                                            bullet,
                                                            bulletIndex
                                                        ) => (
                                                            <li
                                                                key={
                                                                    bulletIndex
                                                                }
                                                                className="
                                                                    flex
                                                                    gap-3
                                                                    font-body
                                                                    text-sm
                                                                    leading-6
                                                                    text-gray-500
                                                                "
                                                            >
                                                                <span
                                                                    className="
                                                                        mt-2
                                                                        h-1.5
                                                                        w-1.5
                                                                        shrink-0
                                                                        rounded-full
                                                                        bg-blue-500
                                                                    "
                                                                />

                                                                <span>
                                                                    {
                                                                        bullet
                                                                    }
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Projects */}

                        {safeProjects.length > 0 && (
                            <div
                                className="
                                    rounded-3xl
                                    border border-gray-200
                                    bg-white
                                    p-6
                                "
                            >
                                <p
                                    className="
                                        font-main
                                        text-sm
                                        text-gray-950
                                    "
                                >
                                    Projects
                                </p>

                                <div
                                    className="
                                        mt-6
                                        space-y-8
                                    "
                                >
                                    {safeProjects.map(
                                        (project, index) => (
                                            <div
                                                key={index}
                                            >
                                                <p
                                                    className="
                                                        font-main
                                                        text-sm
                                                        text-gray-950
                                                    "
                                                >
                                                    {
                                                        project.name
                                                    }
                                                </p>

                                                {(
                                                    project.technologies ||
                                                    []
                                                ).length > 0 && (
                                                    <div
                                                        className="
                                                            mt-3
                                                            flex
                                                            flex-wrap
                                                            gap-2
                                                        "
                                                    >
                                                        {project.technologies.map(
                                                            (
                                                                tech,
                                                                techIndex
                                                            ) => (
                                                                <span
                                                                    key={
                                                                        techIndex
                                                                    }
                                                                    className="
                                                                        rounded-full
                                                                        bg-gray-100
                                                                        px-3
                                                                        py-1.5
                                                                        font-body
                                                                        text-[11px]
                                                                        text-gray-500
                                                                    "
                                                                >
                                                                    {
                                                                        tech
                                                                    }
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                )}

                                                <ul
                                                    className="
                                                        mt-4
                                                        space-y-2
                                                    "
                                                >
                                                    {(
                                                        project.bullets ||
                                                        []
                                                    ).map(
                                                        (
                                                            bullet,
                                                            bulletIndex
                                                        ) => (
                                                            <li
                                                                key={
                                                                    bulletIndex
                                                                }
                                                                className="
                                                                    flex
                                                                    gap-3
                                                                    font-body
                                                                    text-sm
                                                                    leading-6
                                                                    text-gray-500
                                                                "
                                                            >
                                                                <span
                                                                    className="
                                                                        mt-2
                                                                        h-1.5
                                                                        w-1.5
                                                                        shrink-0
                                                                        rounded-full
                                                                        bg-blue-500
                                                                    "
                                                                />

                                                                <span>
                                                                    {
                                                                        bullet
                                                                    }
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Education */}

                        {safeEducation.length > 0 && (
                            <div
                                className="
                                    rounded-3xl
                                    border border-gray-200
                                    bg-white
                                    p-6
                                "
                            >
                                <p
                                    className="
                                        font-main
                                        text-sm
                                        text-gray-950
                                    "
                                >
                                    Education
                                </p>

                                <div
                                    className="
                                        mt-6
                                        space-y-5
                                    "
                                >
                                    {safeEducation.map(
                                        (
                                            education,
                                            index
                                        ) => (
                                            <div
                                                key={index}
                                                className="
                                                    flex
                                                    flex-col
                                                    gap-1
                                                    sm:flex-row
                                                    sm:items-start
                                                    sm:justify-between
                                                "
                                            >
                                                <div>
                                                    <p
                                                        className="
                                                            font-main
                                                            text-sm
                                                            text-gray-950
                                                        "
                                                    >
                                                        {
                                                            education.degree
                                                        }
                                                    </p>

                                                    <p
                                                        className="
                                                            mt-1
                                                            font-body
                                                            text-xs
                                                            text-gray-400
                                                        "
                                                    >
                                                        {
                                                            education.institution
                                                        }

                                                        {education.location
                                                            ? ` · ${education.location}`
                                                            : ""}
                                                    </p>
                                                </div>

                                                <p
                                                    className="
                                                        font-body
                                                        text-xs
                                                        text-gray-400
                                                    "
                                                >
                                                    {
                                                        education.startYear
                                                    }

                                                    {" – "}

                                                    {
                                                        education.endYear
                                                    }
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* =================================================
                    LINKEDIN
                ================================================= */}

                <section className="mb-14">
                    <PlatformHeader
                        icon={
                            <FaLinkedinIn size={15} />
                        }
                        title="LinkedIn optimization"
                        description="Recruiter-searchable content ready to paste."
                    />

                    <div className="mb-5 flex justify-end">
                        <CopyButton
                            text={linkedinAll}
                            label="Copy LinkedIn content"
                        />
                    </div>

                    <div className="space-y-5">
                        <CopySection
                            title="Headline"
                            icon={
                                <FaLinkedinIn size={15} />
                            }
                            text={
                                linkedinCopy.headline ||
                                linkedin.headline ||
                                ""
                            }
                            description="Recruiter-searchable professional headline"
                        />

                        <CopySection
                            title="About"
                            icon={
                                <FaLinkedinIn size={15} />
                            }
                            text={
                                linkedinCopy.about ||
                                linkedin.about ||
                                ""
                            }
                            description="Concise professional summary"
                        />

                        <CopySection
                            title="Experience"
                            icon={
                                <LuBriefcaseBusiness
                                    size={17}
                                />
                            }
                            text={
                                linkedinCopy.experience ||
                                ""
                            }
                            description="Optimized LinkedIn experience descriptions"
                        />
                    </div>
                </section>

                {/* =================================================
                    LINKEDIN STRUCTURED DATA
                ================================================= */}

                <section className="mb-14">
                    <div className="mb-7">
                        <p
                            className="
                                font-main
                                text-lg
                                text-gray-950
                            "
                        >
                            LinkedIn recommendations
                        </p>

                        <p
                            className="
                                mt-1
                                font-body
                                text-xs
                                text-gray-400
                            "
                        >
                            Additional profile sections generated from
                            your existing information.
                        </p>
                    </div>

                    <div className="space-y-5">
                        {linkedin.skills?.length > 0 && (
                            <div
                                className="
                                    rounded-3xl
                                    border border-gray-200
                                    bg-white
                                    p-6
                                "
                            >
                                <p
                                    className="
                                        font-main
                                        text-sm
                                        text-gray-950
                                    "
                                >
                                    Recommended skills
                                </p>

                                <div
                                    className="
                                        mt-5
                                        flex
                                        flex-wrap
                                        gap-2
                                    "
                                >
                                    {linkedin.skills.map(
                                        (skill, index) => (
                                            <span
                                                key={index}
                                                className="
                                                    rounded-full
                                                    bg-gray-100
                                                    px-4
                                                    py-2
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

                        {linkedin.projects?.length > 0 && (
                            <CollapsibleList
                                title="LinkedIn projects"
                                icon={
                                    <LuCode2 size={17} />
                                }
                                items={linkedin.projects.map(
                                    (project) => {
                                        if (
                                            typeof project ===
                                            "string"
                                        ) {
                                            return project;
                                        }

                                        return `${project.name || ""}${
                                            project.description
                                                ? ` — ${project.description}`
                                                : ""
                                        }`;
                                    }
                                )}
                            />
                        )}

                        {linkedin.featured?.length > 0 && (
                            <CollapsibleList
                                title="Featured section"
                                icon={
                                    <LuTarget size={17} />
                                }
                                items={
                                    linkedin.featured
                                }
                            />
                        )}

                        {linkedin.achievements?.length >
                            0 && (
                            <CollapsibleList
                                title="Achievements"
                                icon={
                                    <LuCheckCircle2
                                        size={17}
                                    />
                                }
                                items={
                                    linkedin.achievements
                                }
                            />
                        )}
                    </div>
                </section>

                {/* =================================================
                    GITHUB
                ================================================= */}

                <section className="mb-14">
                    <PlatformHeader
                        icon={
                            <LuGithub size={18} />
                        }
                        title="GitHub optimization"
                        description="A complete professional README synchronized with your resume."
                    />

                    <div className="mb-5 flex justify-end">
                        <CopyButton
                            text={githubAll}
                            label="Copy README"
                        />
                    </div>

                    <CopySection
                        title="README.md"
                        icon={
                            <LuGithub size={17} />
                        }
                        text={
                            githubCopy.readme ||
                            github.readme ||
                            ""
                        }
                        description="Complete copy-ready GitHub profile README"
                    />
                </section>

                {/* =================================================
                    FINAL CTA
                ================================================= */}

                <section
                    className="
                        rounded-[2rem]
                        border border-gray-200
                        bg-white
                        p-7
                        sm:p-10
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            gap-7
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >
                        <div>
                            <div className="flex items-center gap-2">
                                <LuSparkles
                                    size={17}
                                    className="text-blue-500"
                                />

                                <p
                                    className="
                                        font-body
                                        text-xs
                                        tracking-[0.18em]
                                        text-gray-400
                                    "
                                >
                                    NEXT STEP
                                </p>
                            </div>

                            <h2
                                className="
                                    mt-3
                                    font-main
                                    text-2xl
                                    text-gray-950
                                "
                            >
                                Make your profiles consistent.
                            </h2>

                            <p
                                className="
                                    mt-2
                                    max-w-xl
                                    font-body
                                    text-sm
                                    leading-6
                                    text-gray-500
                                "
                            >
                                Start with the copy-ready sections
                                above and update your Resume, LinkedIn
                                and GitHub with the same professional identity.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/")}
                            className="
                                shrink-0
                                rounded-full
                                bg-gray-950
                                px-6
                                py-3
                                font-body
                                text-sm
                                text-white
                                transition
                                hover:bg-blue-600
                            "
                        >
                            Analyze another profile
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AnalysisPage;

