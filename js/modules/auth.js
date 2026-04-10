import CONFIG from '../config.js';
const API_URL = `${CONFIG.API_URL}/api/auth`;
const API_USER_URL = `${CONFIG.API_URL}/api/user/progress`;

export async function register(name, email, password) {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    
    initLocalProgress(data.user);
    return data.user;
}

export async function login(email, password) {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    localStorage.setItem('authToken', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    
    initLocalProgress(data.user);
    return data.user;
}

export function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userProgress');
    window.location.href = 'login.html';
}

export function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

export async function ensureAuth() {
    let user = getCurrentUser();
    const token = localStorage.getItem('authToken');
    
    if (!user || !token) {
        window.location.href = 'login.html';
        return null;
    }

    try {
        const res = await fetch(API_USER_URL, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.status === 401) {
            logout();
            return null;
        }
        const data = await res.json();
        if (data.success) {
            user = data.user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            initLocalProgress(user);
        }
    } catch (e) {
        console.error("Failed to sync progress on load, using local cache.", e);
    }

    return user;
}

function initLocalProgress(user) {
    const userKey = `progress_${user.email.trim().toLowerCase()}`;
    // Always sync the server state to local on load
    const initialProgress = {
        interviews: [],
        totalScore: Math.floor(user.progress ? (user.progress.dsa + user.progress.dbms + user.progress.os) : 0),
        modulesCompleted: user.completedTopics ? user.completedTopics.length : 0,
        level: 1,
        xp: user.xp || 0,
        streak: user.streak || 1,
        lastActivity: new Date().toISOString(),
        courseProgress: {
            dsa: user.progress ? Math.floor(user.progress.dsa / 10) : 0, // Mock 10 points per completion 
            dbms: user.progress ? Math.floor(user.progress.dbms / 10) : 0,
            os: user.progress ? Math.floor(user.progress.os / 10) : 0
        }
    };
    
    // Preserve interviews if exists
    const existingStr = localStorage.getItem(userKey);
    if (existingStr) {
        const existing = JSON.parse(existingStr);
        initialProgress.interviews = existing.interviews || [];
    }
    
    localStorage.setItem(userKey, JSON.stringify(initialProgress));
}

export function getProgress() {
    const user = getCurrentUser();
    if (!user) return null;

    const userKey = `progress_${user.email.trim().toLowerCase()}`;
    const data = localStorage.getItem(userKey);
    return data ? JSON.parse(data) : null;
}

export function saveProgress(newData) {
    const user = getCurrentUser();
    if (!user) return;

    const userKey = `progress_${user.email.trim().toLowerCase()}`;
    const current = getProgress();

    const updated = { ...current, ...newData };

    if (updated.xp > updated.level * 1000) {
        updated.level++;
        updated.xp = updated.xp - (updated.level * 1000); 
    }

    localStorage.setItem(userKey, JSON.stringify(updated));
    
    const token = localStorage.getItem('authToken');
    if (token) {
        fetch(API_USER_URL, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                dsa: updated.courseProgress && updated.courseProgress.dsa ? updated.courseProgress.dsa * 10 : 0,
                dbms: updated.courseProgress && updated.courseProgress.dbms ? updated.courseProgress.dbms * 10 : 0,
                os: updated.courseProgress && updated.courseProgress.os ? updated.courseProgress.os * 10 : 0,
                streak: updated.streak,
                xp: updated.xp
            })
        }).catch(err => console.error("Cloud sync failed", err));
    }

    return updated;
}

export function addInterviewResult(result) {
    const progress = getProgress();
    progress.interviews = progress.interviews || [];
    progress.interviews.push({
        date: new Date().toISOString(),
        score: result.score,
        company: result.company,
        type: result.type
    });

    progress.totalScore += result.score;
    progress.xp += 500; 
    progress.modulesCompleted++; 

    saveProgress(progress);
}
