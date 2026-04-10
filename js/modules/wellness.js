import { saveNotes } from './auth.js';

// Pomodoro Timer Logic
let pomodoroTimer;
let timeLeft = 25 * 60;
let isRunning = false;

// Audio Context for Sounds
let audioPlayer;
let isPlaying = false;

export function initWellness() {
    console.log("Wellness Module Initialized");

    // --- Pomodoro ---
    const btnStart = document.getElementById('btn-pomodoro-start');
    const btnReset = document.getElementById('btn-pomodoro-reset');
    const display = document.getElementById('pomodoro-time');

    if (btnStart && btnReset && display) {
        btnStart.addEventListener('click', () => {
            if (isRunning) {
                clearInterval(pomodoroTimer);
                btnStart.innerText = 'Start';
                isRunning = false;
            } else {
                pomodoroTimer = setInterval(() => {
                    if (timeLeft > 0) {
                        timeLeft--;
                        updateDisplay(display);
                    } else {
                        clearInterval(pomodoroTimer);
                        isRunning = false;
                        alert("Pomodoro complete! Take a break.");
                    }
                }, 1000);
                btnStart.innerText = 'Pause';
                isRunning = true;
            }
        });

        btnReset.addEventListener('click', () => {
            clearInterval(pomodoroTimer);
            isRunning = false;
            timeLeft = 25 * 60;
            updateDisplay(display);
            btnStart.innerText = 'Start';
        });
    }

    // --- Breathing ---
    const btnBreathe = document.getElementById('btn-breathe-start');
    const circle = document.getElementById('breathing-circle');
    const text = document.getElementById('breathing-text');
    let breatheInterval;

    if (btnBreathe && circle && text) {
        btnBreathe.addEventListener('click', () => {
            if (btnBreathe.innerText === 'Start Exercise') {
                btnBreathe.innerText = 'Stop';
                let cycle = 0;
                const states = [
                    { t: 'Inhale...', s: 1.5 },
                    { t: 'Hold...', s: 1.5 },
                    { t: 'Exhale...', s: 1 },
                    { t: 'Hold...', s: 1 }
                ];
                
                text.innerText = states[0].t;
                circle.style.transform = `scale(${states[0].s})`;
                
                breatheInterval = setInterval(() => {
                    cycle = (cycle + 1) % 4;
                    text.innerText = states[cycle].t;
                    circle.style.transform = `scale(${states[cycle].s})`;
                }, 2000); // 2s per phase (faster)

            } else {
                clearInterval(breatheInterval);
                btnBreathe.innerText = 'Start Exercise';
                text.innerText = 'Ready';
                circle.style.transform = `scale(1)`;
            }
        });
    }

    // --- Audio Tracks System ---
    const soundMap = {
        'meditation': 'sounds/freesound_community-meditation-bowls-23651.mp3',
        'rain': 'sounds/freesound_community-rain-sound-and-rainforest-6293.mp3',
        'ocean': 'sounds/dragon-studio-ocean-waves-376898.mp3',
        'birds': 'sounds/creative_spark-morning-birdsong-246402.mp3',
        'flute1': 'sounds/krishna_flute.mp3',
        'flute2': 'sounds/krishna_flute (1).mp3',
        'flute3': 'sounds/krishna_flute.mp3'
    };

    audioPlayer = document.getElementById('audio-player');
    const btnStop = document.getElementById('btn-sound-stop');

    if (audioPlayer && btnStop) {
        Object.keys(soundMap).forEach(key => {
            const btn = document.getElementById(`btn-sound-${key}`);
            if (btn) {
                btn.addEventListener('click', () => {
                    audioPlayer.src = soundMap[key];
                    audioPlayer.play();
                    isPlaying = true;
                    btnStop.style.display = 'flex';
                    
                    // Premium UI Glow for active sound
                    document.querySelectorAll('.sound-tile').forEach(b => {
                        b.style.borderColor = 'rgba(255,255,255,0.05)';
                        b.style.background = 'rgba(255,255,255,0.02)';
                        b.style.boxShadow = 'none';
                        b.classList.remove('active-glow');
                    });
                    btn.style.borderColor = 'var(--accent-cyan)';
                    btn.style.background = 'rgba(56, 189, 248, 0.1)';
                    btn.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.2)';
                    btn.classList.add('active-glow');
                });
            }
        });

        btnStop.addEventListener('click', () => {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            isPlaying = false;
            btnStop.style.display = 'none';
            document.querySelectorAll('.sound-tile').forEach(b => {
                b.style.borderColor = 'rgba(255,255,255,0.05)';
                b.style.background = 'rgba(255,255,255,0.02)';
                b.style.boxShadow = 'none';
            });
        });
    }

    // --- Notes Hub ---
    const btnSaveNotes = document.getElementById('btn-save-notes');
    const notesArea = document.getElementById('personal-notes');
    const savedContainer = document.getElementById('saved-notes-container');
    
    if (btnSaveNotes && notesArea && savedContainer) {
        renderSavedNotes(savedContainer);

        btnSaveNotes.addEventListener('click', () => {
            const text = notesArea.value.trim();
            if (!text) return;
            
            const saved = localStorage.getItem('selectra_notes_list');
            const notesList = saved ? JSON.parse(saved) : [];
            notesList.push({
                id: Date.now(),
                text: text,
                date: new Date().toLocaleString()
            });
            localStorage.setItem('selectra_notes_list', JSON.stringify(notesList));
            
            // Sync to cloud
            saveNotes(notesList);
            
            notesArea.value = '';
            renderSavedNotes(savedContainer);
            
            const originalText = btnSaveNotes.innerText;
            btnSaveNotes.innerText = 'Saved!';
            setTimeout(() => btnSaveNotes.innerText = originalText, 2000);
        });
    }

    // Expose deleteNote to window but keep sync capability
    window.deleteNote = async function(id) {
        const saved = localStorage.getItem('selectra_notes_list');
        if (!saved) return;
        let notesList = JSON.parse(saved);
        notesList = notesList.filter(n => n.id !== id);
        localStorage.setItem('selectra_notes_list', JSON.stringify(notesList));
        
        // Sync to cloud
        await saveNotes(notesList);
        
        renderSavedNotes(document.getElementById('saved-notes-container'));
    };
}

function renderSavedNotes(container) {
    const saved = localStorage.getItem('selectra_notes_list');
    const notesList = saved ? JSON.parse(saved) : [];
    
    if (notesList.length === 0) {
        container.innerHTML = '<p style="color:#94a3b8;">No notes saved yet.</p>';
        return;
    }
    
    container.innerHTML = notesList.map(note => {
        // Random slight rotation for sticky note realism
        const rotation = Math.random() * 4 - 2;
        return `
        <div style="background: #fef08a; padding: 1.5rem; border-radius: 2px; width: calc(50% - 1rem); min-width: 200px; box-shadow: 3px 5px 15px rgba(0,0,0,0.3); position: relative; color: #1e293b; transform: rotate(${rotation}deg); border-top: 12px solid #fde047; transition: transform 0.2s;">
            <p style="font-size: 0.75rem; color: #64748b; margin-bottom: 0.75rem; font-weight: bold; border-bottom: 1px dashed rgba(0,0,0,0.1); padding-bottom: 5px;"><i class="fa-regular fa-clock"></i> ${note.date}</p>
            <p style="font-size: 1rem; line-height: 1.5; white-space: pre-wrap; font-family: 'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif;">${note.text}</p>
            <button onclick="deleteNote(${note.id})" style="position: absolute; top: -8px; right: 8px; background: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"><i class="fa-solid fa-times"></i></button>
        </div>
        `;
    }).reverse().join('');
}


function updateDisplay(el) {
    const min = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const sec = (timeLeft % 60).toString().padStart(2, '0');
    el.innerText = `${min}:${sec}`;
}

// (Audio synthesis removed)
