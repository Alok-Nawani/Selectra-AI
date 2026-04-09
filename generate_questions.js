const fs = require('fs');
const path = require('path');

const topics = {
    "DSA": ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming", "Sorting", "Searching"],
    "DBMS": ["Normalization", "SQL Queries", "Transactions", "Indexing", "Concurrency Control", "ACID Properties"],
    "OS": ["Process Scheduling", "Memory Management", "Deadlocks", "File Systems", "Virtual Memory", "Threads"],
    "CN": ["OSI Model", "TCP/IP", "Routing Algorithms", "DNS", "HTTP", "Sockets"]
};

const templates = [
    "What is the primary function of {topic} in {subject}?",
    "Which algorithm is most efficient for {topic}?",
    "Explain the worst-case time complexity of {topic}.",
    "How does {topic} solve the classic {subject} problem?",
    "What are the disadvantages of using {topic}?",
    "In the context of {subject}, what does {topic} ensure?",
    "Describe a real-world application of {topic}."
];

const optionsBank = [
    "It optimizes space complexity.",
    "O(n log n)",
    "O(n^2)",
    "Ensures data integrity.",
    "Reduces latency by caching.",
    "Prevents race conditions.",
    "Uses a divide and conquer strategy.",
    "Depends on the underlying hardware.",
    "It requires contiguous memory allocation.",
    "O(1)"
];

const questions = [];

for (let i = 0; i < 500; i++) {
    const subjects = Object.keys(topics);
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const topicList = topics[subject];
    const topic = topicList[Math.floor(Math.random() * topicList.length)];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    const questionText = template.replace("{topic}", topic).replace("{subject}", subject);
    
    // Pick 4 random options
    const shuffledOptions = [...optionsBank].sort(() => 0.5 - Math.random());
    const options = shuffledOptions.slice(0, 4);
    const answer = options[Math.floor(Math.random() * 4)]; // Pick one as correct randomly

    questions.push({
        id: i + 1,
        subject,
        topic,
        question: questionText,
        options,
        answer
    });
}

const dir = path.join(__dirname, 'frontend', 'data');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'mock_questions.json'), JSON.stringify(questions, null, 2));

console.log("Successfully generated 500 mock questions in frontend/data/mock_questions.json");
