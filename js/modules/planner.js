import { getCurrentUser } from './auth.js';

let goals = [
    { id: 'dsa', text: 'Solve 2 DSA problems', completed: false },
    { id: 'os', text: 'Review Operating System Paging', completed: false },
    { id: 'quiz', text: 'Complete a Mock Quick Review', completed: false }
];

export function initPlanner() {
    console.log("Initializing Study Planner");
    renderGoals();

    window.addEventListener('goal-completed', (e) => {
        const { goalId } = e.detail;
        const currentGoals = getDailyGoals();
        const targetGoal = currentGoals.find(g => g.id === goalId);
        if (targetGoal && !targetGoal.completed) {
            targetGoal.completed = true;
            saveDailyGoals(currentGoals);
            renderGoals();
        }
    });
}

function getDailyGoals() {
    const user = getCurrentUser();
    if (!user) return goals;

    const todayDate = new Date().toISOString().split('T')[0];
    const key = `goals_${user.id}_${todayDate}`;

    let saved = localStorage.getItem(key);
    if (!saved) {
        // Reset/Create for today
        localStorage.setItem(key, JSON.stringify(goals));
        return goals;
    }
    
    return JSON.parse(saved);
}

function saveDailyGoals(currentGoals) {
    const user = getCurrentUser();
    if (!user) return;
    
    const todayDate = new Date().toISOString().split('T')[0];
    const key = `goals_${user.id}_${todayDate}`;
    localStorage.setItem(key, JSON.stringify(currentGoals));
}

function calculateStreak() {
    const user = getCurrentUser();
    let streak = user ? (user.streak || 1) : 1;
    
    const currentGoals = getDailyGoals();
    const doneCount = currentGoals.filter(g => g.completed).length;
    const totalCount = currentGoals.length;
    const allDone = doneCount === totalCount;
    if (allDone && totalCount > 0) streak++;

    const display = document.getElementById('streak-display');
    if (display) display.innerText = streak;

    // Update Progress Bar
    const progressPercent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
    const bar = document.getElementById('planner-overall-progress');
    const txt = document.getElementById('planner-progress-percent');
    if (bar) bar.style.width = `${progressPercent}%`;
    if (txt) txt.innerText = `${progressPercent}%`;
}

export function renderGoals() {
    const goalsList = document.getElementById('goals-list');
    if (!goalsList) return;
    
    const currentGoals = getDailyGoals();
    goalsList.innerHTML = '';

    currentGoals.forEach(goal => {
        const li = document.createElement('li');
        li.style.background = goal.completed ? 'rgba(34, 197, 94, 0.05)' : 'rgba(255, 255, 255, 0.02)';
        li.style.border = goal.completed ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)';
        li.style.borderRadius = '12px';
        li.style.padding = '1.2rem';
        li.style.marginBottom = '1rem';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.transition = 'all 0.3s ease';
        
        li.innerHTML = `
            <div style="display:flex; align-items:center; gap: 1.5rem;">
                <label style="position: relative; width: 28px; height: 28px; cursor: pointer;">
                    <input type="checkbox" style="opacity: 0; width: 0; height: 0;" data-id="${goal.id}" ${goal.completed ? 'checked' : ''}>
                    <span style="position: absolute; top:0; left:0; height: 28px; width: 28px; background: ${goal.completed ? '#22c55e' : 'rgba(255,255,255,0.1)'}; border: 1px solid ${goal.completed ? '#22c55e' : 'rgba(255,255,255,0.2)'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                        ${goal.completed ? '<i class="fa-solid fa-check" style="color: #0f172a; font-size: 0.8rem;"></i>' : ''}
                    </span>
                </label>
                <span style="font-weight: 500; color: ${goal.completed ? '#94a3b8' : 'white'}; text-decoration: ${goal.completed ? 'line-through' : 'none'}; font-size: 1rem;">${goal.text}</span>
            </div>
            <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; color: ${goal.completed ? '#22c55e' : '#64748b'};">
                ${goal.completed ? 'Completed' : 'Objective Active'}
            </div>
        `;
        
        goalsList.appendChild(li);
    });

    // Attach listeners
    goalsList.querySelectorAll('input[type="checkbox"]').forEach(box => {
        box.addEventListener('change', (e) => {
            const id = e.target.getAttribute('data-id');
            const targetGoal = currentGoals.find(g => g.id === id);
            if (targetGoal) {
                targetGoal.completed = e.target.checked;
                saveDailyGoals(currentGoals);
                renderGoals();
            }
        });
    });

    calculateStreak();
}
