export const jsQuizz = {
    questions: [
        {
            question:
                "When was Java developed?",
            choices: [
                "1981",
                "1990",
                "1995",
                "1985",
            ],
            type: "MCQs",
            correctAnswer: "1995",
        },
        {
            question: "Who owns it?",
            choices: [
                "Oracle",
                "Java",
                "Google",
                "None of the above",
            ],
            type: "MCQs",
            correctAnswer: "Oracle",
        },
        {
            question:
                "The following are common applications for which Java is commonly used EXCEPT:",
            choices: ["Game development", "Graphic design", "Mobile app development", "Web development"],
            type: "MCQs",
            correctAnswer: "Graphic design",
        },
        {
            question: "What are three known advantages of using Java as a programming language?",
            choices: ["Platform independence, robustness, and automatic memory management.", "Real-time performance, high concurrency, and low development cost.", "Strongly typed, easy integration with hardware, and lightweight syntax.", "Speed, low memory consumption, and ease of learning."],
            type: "MCQs",
            correctAnswer: "Platform independence, robustness, and automatic memory management.",
        },
        {
            question: "Which of the following statements about Java is true?",
            choices: [
                "Java code is compiled directly to machine code.",
                "Java is primarily a procedural programming language.",
                "Java is a dynamically typed programming language.",
                "Java applications can run on any platform with a compatible Java Virtual Machine (JVM).",
            ],
            type: "MCQs",
            correctAnswer: "Java applications can run on any platform with a compatible Java Virtual Machine (JVM).",
        },
    ],
};

export const resultInitalState = {
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
};