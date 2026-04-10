let allQuestions = [];
let currentIndex = 0;
let currentTestQuestions = [];
let testScore = 0;

export async function initMockTest() {
    const btn50 = document.getElementById('btn-start-mock-50');
    const btn10 = document.getElementById('btn-start-mock-10');
    const prevBtn = document.getElementById('btn-mock-prev');
    const nextBtn = document.getElementById('btn-mock-next');

    try {
        // We use fetch since data is being served by our HTTP server
        const res = await fetch('/data/mock_questions.json');
        if (res.ok) {
            allQuestions = await res.json();
            console.log("Loaded Mock Questions Array length:", allQuestions.length);
        }
    } catch(e) {
        console.error("Could not load mock questions", e);
    }

    if (btn50) btn50.addEventListener('click', () => startTest(50));
    if (btn10) btn10.addEventListener('click', () => startTest(10));
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion();
        }
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        // If at the end, finish test
        if (currentIndex === currentTestQuestions.length - 1) {
            finishTest();
        } else {
            currentIndex++;
            renderQuestion();
        }
    });
}

function startTest(num) {
    if (allQuestions.length === 0) {
        alert("Questions not loaded yet.");
        return;
    }

    document.getElementById('mock-test-selector').classList.add('hidden');
    document.getElementById('mock-test-active').classList.remove('hidden');

    // Pick random questions from the pool
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    currentTestQuestions = shuffled.slice(0, num).map(q => {
        // Create a deep copy and shuffle the options for this specific session
        const opts = [...q.options].sort(() => 0.5 - Math.random());
        return {
            ...q,
            options: opts,
            user_answer: null
        };
    });
    
    currentIndex = 0;
    testScore = 0;
    renderQuestion();
}

function renderQuestion() {
    const qData = currentTestQuestions[currentIndex];
    
    document.getElementById('mock-test-progress').innerText = `Question ${currentIndex + 1} / ${currentTestQuestions.length}`;
    document.getElementById('mock-test-question').innerText = `[${qData.subject} - ${qData.topic}]\n${qData.question}`;
    
    const optionsContainer = document.getElementById('mock-test-options');
    optionsContainer.innerHTML = '';

    qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = `btn-secondary w-100 ${qData.user_answer === opt ? 'selected' : ''}`;
        btn.style.textAlign = 'left';
        btn.style.padding = '1rem';
        btn.innerHTML = `${String.fromCharCode(65 + idx)}. ${opt}`;
        
        // Highlight active selection
        if (qData.user_answer === opt) {
            btn.style.borderColor = 'var(--accent-cyan)';
            btn.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
        }

        btn.addEventListener('click', () => {
            currentTestQuestions[currentIndex].user_answer = opt;
            renderQuestion(); // re-render to update highlights
        });
        optionsContainer.appendChild(btn);
    });

    // Update buttons
    const prevBtn = document.getElementById('btn-mock-prev');
    const nextBtn = document.getElementById('btn-mock-next');
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.innerText = currentIndex === currentTestQuestions.length - 1 ? 'Finish Test' : 'Next';
}

function finishTest() {
    testScore = 0;
    currentTestQuestions.forEach(q => {
        if (q.user_answer === q.answer) {
            testScore++;
        }
    });

    const percent = Math.round((testScore / currentTestQuestions.length) * 100);
    
    document.getElementById('mock-test-active').innerHTML = `
        <div class="card" style="text-align: center; padding: 3rem;">
            <h2>Test Complete!</h2>
            <div style="font-size: 4rem; color: var(--accent-cyan); margin: 2rem 0; font-weight: bold;">${percent}%</div>
            <p style="font-size: 1.2rem;">You scored ${testScore} out of ${currentTestQuestions.length}.</p>
            <button class="btn-primary" style="margin-top: 2rem;" onclick="location.reload()">Back to Dashboard</button>
        </div>
    `;
}
