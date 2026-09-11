
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    LuBot,
    LuX,
    LuSend,
    LuSparkles,
    LuChevronRight,
} from "react-icons/lu";


const faqs = [
    {
        keywords: ["what", "careersync", "career sync"],
        answer:
            "CareerSync is an AI-powered career optimization tool that helps you improve your Resume, LinkedIn and GitHub presence from one place.",
    },
    {
        keywords: ["resume", "cv", "ats"],
        answer:
            "You can upload your Resume and CareerSync will analyze it for structure, keywords and ATS compatibility, then suggest optimized content.",
    },
    {
        keywords: ["linkedin"],
        answer:
            "CareerSync can help optimize your LinkedIn headline, About section, experience, projects and skills so your profile presents a stronger professional story.",
    },
    {
        keywords: ["github", "readme"],
        answer:
            "You can provide your GitHub profile and CareerSync can help create a professional profile README based on your projects and technical skills.",
    },
    {
        keywords: ["free", "price", "cost", "pricing"],
        answer:
            "CareerSync is currently under development. The initial version is planned to be free to get started.",
    },
    {
        keywords: ["how", "work", "works"],
        answer:
            "Simply provide your Resume, LinkedIn information and GitHub profile. CareerSync analyzes them together and gives you personalized optimization suggestions.",
    },
];


const getAnswer = (question) => {
    const lowerQuestion = question.toLowerCase();

    const matchedFaq = faqs.find((faq) =>
        faq.keywords.some((keyword) =>
            lowerQuestion.includes(keyword)
        )
    );

    if (matchedFaq) {
        return matchedFaq.answer;
    }

    return "I'm still learning! Try asking me about Resume optimization, ATS, LinkedIn, GitHub, pricing, or how CareerSync works.";
};


const suggestedQuestions = [
    "What is CareerSync?",
    "How does it work?",
    "Can you optimize my Resume?",
    "Is it free?",
];


const Assistant = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState([
        {
            id: 1,
            type: "bot",
            text: "Hey! 👋 I'm the CareerSync assistant. Ask me anything about the product.",
        },
    ]);

    const [input, setInput] = useState("");

    const [isTyping, setIsTyping] = useState(false);


    const sendMessage = (question = input) => {

        const trimmedQuestion = question.trim();

        if (!trimmedQuestion) return;


        // Add user message
        const userMessage = {
            id: Date.now(),
            type: "user",
            text: trimmedQuestion,
        };

        setMessages((prev) => [...prev, userMessage]);

        setInput("");

        setIsTyping(true);


        // Fake thinking delay
        setTimeout(() => {

            const botMessage = {
                id: Date.now() + 1,
                type: "bot",
                text: getAnswer(trimmedQuestion),
            };

            setMessages((prev) => [...prev, botMessage]);

            setIsTyping(false);

        }, 700);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    };


    return (
        <>
            {/* ================= FLOATING BUTTON ================= */}

            <AnimatePresence>

                {!isOpen && (

                    <motion.button
                        initial={{
                            opacity: 0,
                            scale: 0.5,
                            y: 30,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.5,
                            y: 30,
                        }}
                        whileHover={{
                            scale: 1.08,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        onClick={() => setIsOpen(true)}
                        className="
                            fixed
                            bottom-6
                            right-6
                            z-[100]
                            h-14
                            w-14
                            rounded-full
                            bg-gray-950
                            text-white
                            shadow-2xl
                            shadow-blue-500/20
                            flex
                            items-center
                            justify-center
                            border
                            border-white/10
                        "
                    >

                        {/* Glow */}
                        <span
                            className="
                                absolute
                                inset-0
                                rounded-full
                                bg-blue-500/30
                                blur-xl
                                -z-10
                            "
                        />

                        <LuBot size={24} />

                        {/* Notification dot */}
                        <span
                            className="
                                absolute
                                right-0
                                top-0
                                h-3
                                w-3
                                rounded-full
                                bg-blue-500
                                border-2
                                border-gray-950
                            "
                        />

                    </motion.button>

                )}

            </AnimatePresence>


            {/* ================= CHAT WINDOW ================= */}

            <AnimatePresence>

                {isOpen && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.85,
                            y: 30,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.85,
                            y: 30,
                        }}
                        transition={{
                            duration: 0.25,
                            ease: "easeOut",
                        }}
                        className="
                            fixed
                            bottom-6
                            right-6
                            z-[100]
                            w-[calc(100%-3rem)]
                            max-w-[380px]
                            overflow-hidden
                            rounded-3xl
                            border
                            border-gray-200
                            bg-white
                            shadow-2xl
                            shadow-black/10
                        "
                    >

                        {/* ================= HEADER ================= */}

                        <div
                            className="
                                relative
                                overflow-hidden
                                bg-gray-950
                                px-5
                                py-4
                                text-white
                            "
                        >

                            {/* Glow */}
                            <div
                                className="
                                    absolute
                                    -right-10
                                    -top-20
                                    h-40
                                    w-40
                                    rounded-full
                                    bg-blue-500/20
                                    blur-3xl
                                "
                            />

                            <div className="relative flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-white/10
                                            border
                                            border-white/10
                                        "
                                    >
                                        <LuSparkles
                                            size={20}
                                            className="text-blue-400"
                                        />
                                    </div>

                                    <div>

                                        <h3 className="font-main text-sm">
                                            CareerSync AI
                                        </h3>

                                        <div className="mt-1 flex items-center gap-1.5">

                                            <span
                                                className="
                                                    h-1.5
                                                    w-1.5
                                                    rounded-full
                                                    bg-green-400
                                                "
                                            />

                                            <span className="font-body text-[11px] text-gray-400">
                                                Online
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="
                                        rounded-full
                                        p-2
                                        text-gray-400
                                        hover:bg-white/10
                                        hover:text-white
                                        transition
                                    "
                                >
                                    <LuX size={18} />
                                </button>

                            </div>

                        </div>


                        {/* ================= MESSAGES ================= */}

                        <div
                            className="
                                h-[330px]
                                overflow-y-auto
                                bg-[#fafaf8]
                                p-4
                                space-y-3
                            "
                        >

                            {messages.map((message) => (

                                <motion.div
                                    key={message.id}
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    className={`
                                        flex
                                        ${
                                            message.type === "user"
                                                ? "justify-end"
                                                : "justify-start"
                                        }
                                    `}
                                >

                                    <div
                                        className={`
                                            max-w-[85%]
                                            rounded-2xl
                                            px-4
                                            py-3
                                            font-body
                                            text-xs
                                            leading-5

                                            ${
                                                message.type === "user"
                                                    ? "rounded-br-sm bg-gray-950 text-white"
                                                    : "rounded-bl-sm border border-gray-200 bg-white text-gray-600"
                                            }
                                        `}
                                    >
                                        {message.text}
                                    </div>

                                </motion.div>

                            ))}


                            {/* Typing indicator */}

                            {isTyping && (

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="
                                        flex
                                        items-center
                                        gap-1
                                        w-fit
                                        rounded-2xl
                                        rounded-bl-sm
                                        border
                                        border-gray-200
                                        bg-white
                                        px-4
                                        py-3
                                    "
                                >

                                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" />

                                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />

                                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />

                                </motion.div>

                            )}

                        </div>


                        {/* ================= SUGGESTIONS ================= */}

                        {messages.length === 1 && (

                            <div className="bg-[#fafaf8] px-4 pb-3">

                                <p className="mb-2 font-body text-[10px] uppercase tracking-wider text-gray-400">
                                    Try asking
                                </p>

                                <div className="flex flex-wrap gap-2">

                                    {suggestedQuestions.map((question) => (

                                        <button
                                            key={question}
                                            onClick={() => sendMessage(question)}
                                            className="
                                                rounded-full
                                                border
                                                border-gray-200
                                                bg-white
                                                px-3
                                                py-2
                                                font-body
                                                text-[11px]
                                                text-gray-600
                                                transition
                                                hover:border-blue-300
                                                hover:text-blue-600
                                            "
                                        >
                                            {question}
                                        </button>

                                    ))}

                                </div>

                            </div>

                        )}


                        {/* ================= INPUT ================= */}

                        <form
                            onSubmit={handleSubmit}
                            className="
                                flex
                                items-center
                                gap-2
                                border-t
                                border-gray-200
                                bg-white
                                p-3
                            "
                        >

                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about CareerSync..."
                                className="
                                    min-w-0
                                    flex-1
                                    rounded-xl
                                    bg-gray-100
                                    px-4
                                    py-3
                                    font-body
                                    text-xs
                                    text-gray-800
                                    outline-none
                                    placeholder:text-gray-400
                                    focus:ring-2
                                    focus:ring-blue-500/20
                                "
                            />

                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-gray-950
                                    text-white
                                    transition
                                    hover:bg-blue-600
                                    disabled:cursor-not-allowed
                                    disabled:opacity-30
                                "
                            >
                                <LuSend size={17} />
                            </button>

                        </form>

                    </motion.div>

                )}

            </AnimatePresence>
        </>
    );
};

export default Assistant;

