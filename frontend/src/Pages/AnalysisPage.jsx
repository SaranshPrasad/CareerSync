import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import {
  FiCopy,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiFileText,
  FiLinkedin,
  FiGithub,
  FiAlertTriangle,
  FiTarget,
  FiTrendingUp,
  FiArrowRight,
  FiArrowLeft,
  FiRefreshCw,
} from "react-icons/fi";

/* =========================================================
   COPY BUTTON
========================================================= */

const CopyButton = ({ text, small = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className={`inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 font-body font-medium text-blue-600 transition hover:border-blue-200 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40 ${
        small ? "px-3 py-1.5 text-xs" : "px-3.5 py-2 text-xs"
      }`}
    >
      {copied ? (
        <>
          <FiCheck className="text-green-500" />
          Copied
        </>
      ) : (
        <>
          <FiCopy />
          Copy
        </>
      )}
    </button>
  );
};

/* =========================================================
   SECTION HEADER
========================================================= */

const SectionHeader = ({
  eyebrow,
  title,
  description,
  icon,
}) => {
  return (
    <div className="mb-7">
      <div className="mb-2 flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
        {icon}
        {eyebrow}
      </div>

      <h2 className="font-main text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-2xl font-body text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
};

/* =========================================================
   SCORE CARD
========================================================= */

const ScoreCard = ({
  title,
  score,
  description,
}) => {
  const value = Number(score || 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-body text-sm font-medium text-slate-600">
            {title}
          </p>

          {description && (
            <p className="mt-1 font-body text-xs text-slate-400">
              {description}
            </p>
          )}
        </div>

        <span
          className={`font-main text-2xl font-bold ${
            value >= 80
              ? "text-green-500"
              : value >= 60
              ? "text-amber-500"
              : "text-red-500"
          }`}
        >
          {value}
        </span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all ${
            value >= 80
              ? "bg-green-500"
              : value >= 60
              ? "bg-amber-500"
              : "bg-red-500"
          }`}
          style={{
            width: `${Math.min(value, 100)}%`,
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
  content,
  description,
}) => {
  if (!content) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.035)]">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="font-main font-semibold text-slate-900">
            {title}
          </h3>

          {description && (
            <p className="mt-1 font-body text-xs text-slate-400">
              {description}
            </p>
          )}
        </div>

        <CopyButton text={content} />
      </div>

      <div className="whitespace-pre-wrap px-5 py-5 font-body text-sm leading-7 text-slate-600">
        {content}
      </div>
    </div>
  );
};

/* =========================================================
   COLLAPSIBLE
========================================================= */

const Collapsible = ({
  title,
  children,
  defaultOpen = true,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.035)]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-slate-50"
      >
        <span className="font-main font-semibold text-slate-900">
          {title}
        </span>

        {open ? (
          <FiChevronUp className="text-slate-400" />
        ) : (
          <FiChevronDown className="text-slate-400" />
        )}
      </button>

      {open && (
        <div className="border-t border-slate-100 p-5">
          {children}
        </div>
      )}
    </div>
  );
};

/* =========================================================
   TAG
========================================================= */

const Tag = ({ children, type = "default" }) => {
  const classes =
    type === "missing"
      ? "border-red-100 bg-red-50 text-red-500"
      : "border-blue-100 bg-blue-50 text-blue-600";

  return (
    <span
      className={`inline-flex rounded-lg border px-2.5 py-1.5 font-body text-xs font-medium ${classes}`}
    >
      {children}
    </span>
  );
};

/* =========================================================
   INFO LIST
========================================================= */

const InfoList = ({
  items,
  emptyText,
  icon,
  iconClass,
}) => {
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <p className="font-body text-sm text-slate-400">
        {emptyText}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex gap-3 font-body text-sm leading-6 text-slate-600"
        >
          <span className={`mt-1 ${iconClass}`}>
            {icon}
          </span>

          <span>{item}</span>
        </div>
      ))}
    </div>
  );
};

/* =========================================================
   ANALYSIS PAGE
========================================================= */

const AnalysisPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const analysis = location.state?.analysis;

  /* =========================================================
     NO ANALYSIS
  ========================================================= */

  if (!analysis) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 text-slate-900">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <FiAlertTriangle size={24} />
          </div>

          <h1 className="mt-5 font-main text-2xl font-bold">
            No analysis found
          </h1>

          <p className="mt-3 font-body text-sm leading-6 text-slate-500">
            Your analysis data is not available. Start a new
            analysis to continue.
          </p>

          <button
            onClick={() => navigate("/product")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Start new analysis
            <FiArrowRight />
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     DATA
  ========================================================= */

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

  const overallEquality =
    equality.overallEqualityScore || 0;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-body">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate("/product")}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <FiArrowLeft />
            </button>

            <div>
              <p className="font-main text-sm font-bold tracking-tight text-slate-900">
                Career<span className="text-blue-600">Sync</span>
              </p>

              <p className="font-body text-xs text-slate-400">
                Profile analysis
              </p>
            </div>

          </div>

          <button
            onClick={() => navigate("/product")}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 font-body text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <FiRefreshCw />
            New analysis
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:py-14">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="mb-14">

          <div className="max-w-3xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 font-body text-xs font-semibold text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              CareerSync Analysis
            </div>

            <h1 className="font-main text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Your professional identity,
              <span className="block text-blue-600">
                analyzed & optimized.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-500 sm:text-base">
              CareerSync analyzed your Resume, LinkedIn profile
              and GitHub presence to identify ATS improvements,
              profile inconsistencies and optimization
              opportunities.
            </p>

          </div>

        </section>

        {/* =====================================================
            PROFILE CONSISTENCY
        ===================================================== */}

        <section className="mb-16">

          <SectionHeader
            eyebrow="Profile consistency"
            title="How consistent is your profile?"
            description="Your Resume, LinkedIn and GitHub should communicate the same professional identity."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <ScoreCard
              title="Overall Equality"
              score={overallEquality}
              description="Across all platforms"
            />

            <ScoreCard
              title="Resume ↔ LinkedIn"
              score={equality.resumeLinkedinScore}
            />

            <ScoreCard
              title="Resume ↔ GitHub"
              score={equality.resumeGithubScore}
            />

            <ScoreCard
              title="LinkedIn ↔ GitHub"
              score={equality.linkedinGithubScore}
            />

          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">

            {/* MATCHING */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.035)]">

              <h3 className="flex items-center gap-2 font-main font-semibold text-slate-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-500">
                  <FiCheck />
                </span>
                Matching points
              </h3>

              <div className="mt-5">
                <InfoList
                  items={equality.matchingPoints}
                  emptyText="No matching points provided."
                  icon="•"
                  iconClass="text-green-500"
                />
              </div>

            </div>

            {/* INCONSISTENCIES */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.035)]">

              <h3 className="flex items-center gap-2 font-main font-semibold text-slate-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                  <FiAlertTriangle />
                </span>
                Inconsistencies
              </h3>

              <div className="mt-5">
                <InfoList
                  items={equality.inconsistencies}
                  emptyText="No major inconsistencies found."
                  icon="•"
                  iconClass="text-amber-500"
                />
              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            ATS
        ===================================================== */}

        <section className="mb-16">

          <SectionHeader
            eyebrow="ATS optimization"
            title="Resume ATS score"
            description="See how well your resume performs against technical hiring systems and recruiter expectations."
            icon={<FiTarget />}
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

            <ScoreCard
              title="ATS Score"
              score={scores.atsScore}
            />

            <ScoreCard
              title="Keyword Coverage"
              score={scores.keywordCoverage}
            />

            <ScoreCard
              title="Technical Relevance"
              score={scores.technicalRelevance}
            />

            <ScoreCard
              title="Impact"
              score={scores.impactScore}
            />

            <ScoreCard
              title="Readability"
              score={scores.readabilityScore}
            />

          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">

            {/* TOP KEYWORDS */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.035)]">

              <h3 className="font-main font-semibold text-slate-900">
                Top keywords
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">

                {Array.isArray(ats.topKeywords) &&
                ats.topKeywords.length > 0 ? (
                  ats.topKeywords.map((item, index) => (
                    <Tag key={index}>
                      {item}
                    </Tag>
                  ))
                ) : (
                  <span className="font-body text-sm text-slate-400">
                    No keywords provided.
                  </span>
                )}

              </div>

            </div>

            {/* MISSING KEYWORDS */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.035)]">

              <h3 className="font-main font-semibold text-slate-900">
                Missing keywords
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">

                {Array.isArray(ats.missingKeywords) &&
                ats.missingKeywords.length > 0 ? (
                  ats.missingKeywords.map(
                    (item, index) => (
                      <Tag
                        key={index}
                        type="missing"
                      >
                        {item}
                      </Tag>
                    )
                  )
                ) : (
                  <span className="font-body text-sm text-slate-400">
                    No major missing keywords.
                  </span>
                )}

              </div>

            </div>

            {/* IMPROVEMENTS */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.035)]">

              <h3 className="font-main font-semibold text-slate-900">
                Improvement areas
              </h3>

              <div className="mt-4">

                {Array.isArray(ats.improvementAreas) &&
                ats.improvementAreas.length > 0 ? (
                  <div className="space-y-3">

                    {ats.improvementAreas.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="flex gap-3 font-body text-sm leading-6 text-slate-600"
                        >
                          <span className="text-blue-600">
                            →
                          </span>

                          <span>{item}</span>
                        </div>
                      )
                    )}

                  </div>
                ) : (
                  <span className="font-body text-sm text-slate-400">
                    No major improvements required.
                  </span>
                )}

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            RESUME
        ===================================================== */}

        <section className="mb-16">

          <SectionHeader
            eyebrow="Resume"
            title="ATS-optimized resume"
            description="Copy the optimized sections directly into your resume."
            icon={<FiFileText />}
          />

          <div className="space-y-5">

            <CopySection
              title="Professional Summary"
              content={
                resumeCopy.summary ||
                resume.summary
              }
            />

            <CopySection
              title="Experience"
              content={
                resumeCopy.experience ||
                resume.experience
                  ?.map(
                    (exp) =>
                      `${exp.role} — ${exp.company}\n${(
                        exp.bullets || []
                      ).join("\n")}`
                  )
                  .join("\n\n")
              }
            />

            <CopySection
              title="Projects"
              content={
                resumeCopy.projects ||
                resume.projects
                  ?.map(
                    (project) =>
                      `${project.name}\n${(
                        project.bullets || []
                      ).join("\n")}`
                  )
                  .join("\n\n")
              }
            />

            <CopySection
              title="Skills"
              content={
                resumeCopy.skills ||
                Object.entries(
                  resume.skills || {}
                )
                  .map(
                    ([key, value]) =>
                      `${key}: ${
                        Array.isArray(value)
                          ? value.join(", ")
                          : value
                      }`
                  )
                  .join("\n")
              }
            />

          </div>

          {/* EXPERIENCE DETAILS */}

          {Array.isArray(resume.experience) &&
            resume.experience.length > 0 && (
              <div className="mt-8">

                <Collapsible title="Optimized experience details">

                  <div className="space-y-8">

                    {resume.experience.map(
                      (experience, index) => (
                        <div key={index}>

                          <div className="flex flex-col justify-between gap-2 sm:flex-row">

                            <div>

                              <h3 className="font-main font-semibold text-slate-900">
                                {experience.role}
                              </h3>

                              <p className="mt-1 font-body text-sm font-medium text-blue-600">
                                {experience.company}
                              </p>

                            </div>

                            <div className="font-body text-xs text-slate-400">
                              {experience.startDate}{" "}
                              —{" "}
                              {experience.endDate}
                            </div>

                          </div>

                          <div className="mt-4 space-y-3">

                            {(
                              experience.bullets ||
                              []
                            ).map(
                              (bullet, bulletIndex) => (
                                <div
                                  key={bulletIndex}
                                  className="flex gap-3 font-body text-sm leading-6 text-slate-600"
                                >
                                  <span className="text-blue-600">
                                    •
                                  </span>

                                  <span>
                                    {bullet}
                                  </span>
                                </div>
                              )
                            )}

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </Collapsible>

              </div>
            )}

          {/* PROJECTS */}

          {Array.isArray(resume.projects) &&
            resume.projects.length > 0 && (
              <div className="mt-5">

                <Collapsible title="Optimized projects">

                  <div className="space-y-7">

                    {resume.projects.map(
                      (project, index) => (
                        <div key={index}>

                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            <h3 className="font-main font-semibold text-slate-900">
                              {project.name}
                            </h3>

                            <div className="flex flex-wrap gap-2">

                              {(
                                project.technologies ||
                                []
                              ).map(
                                (tech, techIndex) => (
                                  <Tag
                                    key={techIndex}
                                  >
                                    {tech}
                                  </Tag>
                                )
                              )}

                            </div>

                          </div>

                          <div className="mt-4 space-y-2">

                            {(
                              project.bullets ||
                              []
                            ).map(
                              (bullet, bulletIndex) => (
                                <p
                                  key={bulletIndex}
                                  className="font-body text-sm leading-6 text-slate-600"
                                >
                                  • {bullet}
                                </p>
                              )
                            )}

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </Collapsible>

              </div>
            )}

        </section>

        {/* =====================================================
            LINKEDIN
        ===================================================== */}

        <section className="mb-16">

          <SectionHeader
            eyebrow="LinkedIn"
            title="LinkedIn optimization"
            description="Position your LinkedIn profile around the same professional identity as your resume."
            icon={<FiLinkedin />}
          />

          <div className="space-y-5">

            <CopySection
              title="Headline"
              content={
                linkedinCopy.headline ||
                linkedin.headline
              }
              description="Copy this directly into your LinkedIn headline."
            />

            <CopySection
              title="About"
              content={
                linkedinCopy.about ||
                linkedin.about
              }
              description="Copy this into your LinkedIn About section."
            />

            <CopySection
              title="Experience"
              content={
                linkedinCopy.experience ||
                linkedin.experience
                  ?.map(
                    (experience) =>
                      `${experience.role} — ${experience.company}\n${experience.description}`
                  )
                  .join("\n\n")
              }
            />

            <CopySection
              title="Projects"
              content={
                linkedinCopy.projects ||
                (Array.isArray(linkedin.projects)
                  ? linkedin.projects
                      .map((project) =>
                        typeof project ===
                        "string"
                          ? project
                          : `${project.name}\n${project.description}`
                      )
                      .join("\n\n")
                  : "")
              }
            />

          </div>

          {/* SKILLS */}

          {Array.isArray(linkedin.skills) &&
            linkedin.skills.length > 0 && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.035)]">

                <div className="flex items-center justify-between gap-4">

                  <h3 className="font-main font-semibold text-slate-900">
                    Recommended skills
                  </h3>

                  <CopyButton
                    text={linkedin.skills.join(", ")}
                    small
                  />

                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                  {linkedin.skills.map(
                    (skill, index) => (
                      <Tag key={index}>
                        {skill}
                      </Tag>
                    )
                  )}

                </div>

              </div>
            )}

          {/* EDUCATION */}

          {Array.isArray(linkedin.education) &&
            linkedin.education.length > 0 && (
              <div className="mt-5">

                <Collapsible
                  title="Education"
                  defaultOpen={false}
                >

                  <div className="space-y-3">

                    {linkedin.education.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-slate-100 bg-slate-50 p-4 font-body text-sm leading-6 text-slate-600"
                        >
                          {typeof item === "string"
                            ? item
                            : JSON.stringify(
                                item
                              )}
                        </div>
                      )
                    )}

                  </div>

                </Collapsible>

              </div>
            )}

        </section>

        {/* =====================================================
            GITHUB
        ===================================================== */}

        <section className="mb-16">

          <SectionHeader
            eyebrow="GitHub"
            title="GitHub README optimization"
            description="A professional README that communicates your skills, projects and engineering focus clearly."
            icon={<FiGithub />}
          />

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.035)]">

            <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">

              <div>

                <h3 className="font-main font-semibold text-slate-900">
                  README.md
                </h3>

                <p className="mt-1 font-body text-xs text-slate-400">
                  Copy this directly to your GitHub profile README.
                </p>

              </div>

              <CopyButton
                text={
                  githubCopy.readme ||
                  github.readme
                }
              />

            </div>

            <pre className="max-h-[700px] overflow-auto whitespace-pre-wrap bg-slate-50 p-5 font-body text-sm leading-7 text-slate-600">
              {githubCopy.readme ||
                github.readme ||
                "No README content generated."}
            </pre>

          </div>

        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-white p-8 text-center sm:p-12">

          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-200/30 blur-3xl" />

          <div className="relative">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <FiTrendingUp />
            </div>

            <h2 className="mt-5 font-main text-2xl font-bold text-slate-950 sm:text-3xl">
              Your profile is ready to improve.
            </h2>

            <p className="mx-auto mt-3 max-w-xl font-body text-sm leading-6 text-slate-500">
              Use the copy buttons above to update your Resume,
              LinkedIn and GitHub with the optimized content.
            </p>

            <button
              onClick={() => navigate("/product")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Run another analysis
              <FiArrowRight />
            </button>

          </div>

        </section>

      </main>
    </div>
  );
};

export default AnalysisPage;