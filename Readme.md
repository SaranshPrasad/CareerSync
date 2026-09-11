# CareerSync 🚀

> **Your Resume, LinkedIn & GitHub — Finally Telling the Same Story.**

CareerSync is an AI-powered career optimization platform that analyzes your **Resume, LinkedIn, and GitHub** together to help you build a stronger, more consistent, and ATS-friendly professional profile.

Instead of optimizing each platform separately, CareerSync brings everything together and shows you **what to improve, why it matters, and exactly what to change.**

---

## 🌐 Try CareerSync

**Live:** https://careersync-ptdr.onrender.com

---

## 🤔 Why CareerSync?

Your professional profile exists across multiple platforms.

But often:

* Your Resume says **Backend Developer**
* Your LinkedIn says **Full Stack Developer**
* Your GitHub doesn't clearly explain what you build

At the same time, you may not know:

* Whether your resume is ATS-friendly
* Which keywords you're missing
* Which resume sections are weak
* How to improve your LinkedIn headline
* What to write in your LinkedIn About section
* How to make your GitHub profile more professional
* Whether your Resume, LinkedIn and GitHub are consistent

**CareerSync analyzes all three together.**

---

# ✨ Features

## 📊 ATS Resume Analysis

Get a detailed analysis of your resume with scores for:

* ATS compatibility
* Keyword coverage
* Technical relevance
* Impact
* Readability

CareerSync also identifies:

* Important keywords
* Missing keywords
* Weak sections
* Areas for improvement

---

## 📝 Resume Optimization

Get copy-paste-ready improvements for:

* Professional Summary
* Work Experience
* Projects
* Skills
* Education
* Achievements

The goal is not to make your resume sound unnecessarily complicated.

The goal is to make your experience **clearer, stronger, more relevant and ATS-friendly.**

---

## 💼 LinkedIn Optimization

Improve your complete LinkedIn profile:

* Headline
* About
* Experience
* Skills
* Projects
* Featured
* Achievements

CareerSync provides **ready-to-use content** instead of generic advice.

---

## 🐙 GitHub Optimization

Your GitHub profile is an important part of your developer identity.

CareerSync can generate a professional GitHub README with:

* Introduction
* Technical skills
* Development focus
* Projects
* Professional positioning
* Relevant career information

The generated README is designed to be **professional, readable and recruiter-friendly.**

---

# 🔄 Profile Consistency

CareerSync compares your three professional platforms:

```text
Resume
  ↕
LinkedIn
  ↕
GitHub
```

It calculates:

* Resume ↔ LinkedIn score
* Resume ↔ GitHub score
* LinkedIn ↔ GitHub score
* Overall consistency score

It also identifies:

### ✅ Matching Information

Information that is consistent across your profiles.

### ⚠️ Inconsistencies

Information that may need to be updated.

### 💡 Suggested Updates

Recommendations explaining what should be changed.

---

# 🧠 AI-Powered Career Analysis

CareerSync uses **Google Gemini** to analyze your career information across multiple sources.

The AI is designed to prioritize factual accuracy.

## 🚫 No Fake Achievements

CareerSync does not intentionally invent:

* User counts
* Revenue
* Performance improvements
* Clients
* Certifications
* Awards
* Technologies
* Responsibilities
* Projects
* Business impact

If a real metric is available, it can be used.

If a metric is missing, CareerSync can identify the opportunity and ask for the **real information** instead of making up a number.

For example:

```text
Current:
Improved API performance.

CareerSync:
How much did the API response time improve?
```

This allows users to strengthen their resume with **verified information**.

---

# 🎯 Who Is CareerSync For?

CareerSync is built for:

* 🎓 College students
* 👨‍💻 Freshers
* 💻 Software developers
* 🔎 Job seekers
* 🚀 Early-career engineers
* 🧑‍🎓 Students preparing for placements
* 🌱 Developers building their professional presence

---

# 🏗️ How It Works

```text
                 ┌──────────────────┐
                 │       User       │
                 └────────┬─────────┘
                          │
             ┌────────────┼────────────┐
             │            │            │
             ▼            ▼            ▼
         Resume       LinkedIn      GitHub
           PDF           PDF          URL
             │            │            │
             └────────────┼────────────┘
                          ▼
                 ┌──────────────────┐
                 │    CareerSync    │
                 │   AI Analysis    │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │    Analysis      │
                 │    Dashboard     │
                 └────────┬─────────┘
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
          Resume       LinkedIn      GitHub
       Optimization  Optimization  Optimization
```

---

# 📈 Analysis Dashboard

After submitting your profile, CareerSync provides a centralized analysis dashboard.

```text
CareerSync Analysis
│
├── Overall Profile Score
│
├── Profile Consistency
│   ├── Resume ↔ LinkedIn
│   ├── Resume ↔ GitHub
│   └── LinkedIn ↔ GitHub
│
├── ATS Resume Score
│   ├── Keyword Coverage
│   ├── Technical Relevance
│   ├── Impact
│   └── Readability
│
├── Resume Optimization
│   ├── Summary
│   ├── Experience
│   ├── Projects
│   └── Skills
│
├── LinkedIn Optimization
│   ├── Headline
│   ├── About
│   ├── Experience
│   ├── Skills
│   └── Projects
│
├── GitHub Optimization
│   └── README
│
└── Improvement Suggestions
```

---

# 🛠️ Tech Stack

## Frontend

* React
* Tailwind CSS
* Framer Motion
* Axios
* React Router
* React Icons

## Backend

* Node.js
* Express.js
* MongoDB
* JWT
* bcrypt
* Multer

## AI & Processing

* Google Gemini
* PDF parsing
* GitHub profile analysis

---

# 🔐 Authentication

CareerSync uses:

* JWT authentication
* bcrypt password hashing
* Protected API routes

Users authenticate before submitting their career information for analysis.

---

# 🔌 API

## Authentication

```http
POST /auth/register
POST /auth/login
```

## Career Analysis

```http
POST /user/analyze
```

The analysis endpoint accepts:

```text
resume   → Resume PDF
linkedin → LinkedIn PDF
github   → GitHub profile URL
```

Authentication is handled using:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 📁 Project Structure

```text
CareerSync/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── ProductPage.jsx
│   │   │   ├── AnalysisPage.jsx
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   │   └── gemini.js
│   ├── app.js
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/careersync.git

cd careersync
```

## 2. Install dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

## 4. Start the Backend

```bash
npm run dev
```

---

## 5. Start the Frontend

```bash
npm run dev
```

---

# 🗺️ Roadmap

## ✅ Current

* [x] User authentication
* [x] Resume upload
* [x] LinkedIn PDF upload
* [x] GitHub profile input
* [x] AI career analysis
* [x] ATS scoring
* [x] Keyword analysis
* [x] Resume optimization
* [x] LinkedIn optimization
* [x] GitHub README generation
* [x] Profile consistency analysis
* [x] Copy-paste-ready recommendations

## 🔜 Coming Next

* [ ] Job Description analysis
* [ ] Resume ↔ Job Description matching
* [ ] Job-specific keyword optimization
* [ ] Tailored resume generation
* [ ] Verified metric collection
* [ ] Profile history
* [ ] Improvement tracking
* [ ] More career platforms
* [ ] Advanced personalization

---

# 🤝 Contributing

Contributions, suggestions and feedback are welcome.

If you have an idea that can make CareerSync more useful for students, developers or job seekers, feel free to:

* Open an issue
* Submit a pull request
* Share your feedback

---

# ⭐ Support CareerSync

If CareerSync helps you improve your professional profile:

⭐ Star the repository

🐛 Report issues

💡 Share feedback

📢 Share CareerSync with someone looking for a job

---

# 📬 Feedback

CareerSync is being built with feedback from students, developers and job seekers.

If you try it, I'd love to know:

* What was useful?
* What was confusing?
* What should be added?
* Did the recommendations actually improve your profile?

---

# 🚀 CareerSync

### Build a profile that tells one consistent story.

**Resume. LinkedIn. GitHub.**

### One professional identity.

---

Made with ❤️ by **Saransh Prasad Bari**
