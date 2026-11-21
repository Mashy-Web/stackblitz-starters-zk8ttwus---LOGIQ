
const SUPABASE_URL = 'https://ngtoeoxsmevrbhdvhygj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_WibYnlnGChYdOvhpZVTOZA_Sa1qv8Hq';

let sb = null;
try {
  if (window.supabase) {
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) {
  console.warn("Supabase initialization skipped, using local fallback.");
}

// EXAM BOARD DATA DICTIONARY
const EXAM_BOARD_DATA = {
  "Biology (Triple)": {
    "AQA": ["Cells and Microscopy", "Exchanging Substances", "Organisation, Enzymes and Circulation", "Disease and Plant Organisation", "Infection Response", "Bioenergetics", "The Nervous System", "Hormones", "DNA and Reproduction", "Variation, Evolution and Classification", "Ecology and Cycles", "Ecosystems, Biodiversity & Food production", "Biology Practicals" ],
    "Edexcel": ["Key Concepts in Biology", "Cells & Control", "Genetics", "Natural Selection & Genetic Modification", "Health, Disease & Medicine Devlopment", "Plant Structures & Functions", "Animal Coordination, Control and Homeostasis", "Exchange & Transport in Animals", "Ecosystems & Material Cycles", "Biology Practicals"]
  },
  "Maths": {
    "AQA": ["Number", "Algebra", "Graphs", "Ratio, Proportion and Rates of Change", "Geometry and Measures", "Pythagoras & Trigonometry", "Probability & Statistics"],
    "Edexcel": ["Number", "Algebra", "Graphs", "Ratio, Proportion & Rates of Change", "Geometry and Measures", "Pythagoras & Trigonometry", "Probability & Statistics"]
  },
  "Chemistry (Triple)": {
    "AQA": ["Atomic Structure & Periodic Table", "Bonding Structure and Matter Properties", "Quantitative Chemistry", "Chemical Changes", "Organic Chemistry", "Energy Changes", "Rate & Extent of Chemical Change", "Chemical Analysis", "Chemistry of the Atmosphere", "Using Resources", "Chemistry Practicals"],
    "Edexcel": ["Key Concepts in Chemistry", "States of Matter and Mixtures", "Chemical Changes and Electrolysis", "Extracting Metals and Equilibrium", "Quantitative Chemistry", "Transition Metals, Alloys and the Haber Process", "Groups in the Periodic Table", "Rate of Reaction & Energy Changes", "Fuels & Earth Science", "Organic Chemistry", "Nanoparticles, Anions, Cations & Flame Photometry", "Chemistry Practical Skills"]
  },
  "Physics (Triple)": {
    "AQA": ["Energy Stores & Transfers", "Energy Resources", "Circuits", "Everyday Electricty", "Particle Model of Matter", "Atomic Structure", "Forces, Moments & Pressure", "Forces and Motion", "Stopping Distances and Momentum", "Wave Basics and EM Waves", "Light, Radiation & Other Waves", "Magnetism and Electromagnetism", "Space Physics", "Physics ractical Skills"],
    "Edexcel": ["Motion & Forces", "Conservation of Energy", "Waves & The Electromagnetic Spectrum", "Radioactivity", "Astronomy", "Forces & Energy", "Electricity & Circuits", "Electric & Magnetic Fields", "Matter", "Physics Practicals"]
  },
  "Combined Science Biology": {
    "AQA": ["B1- Cell Biology", "B2- Organisation", "B3- Infection & Response", "B4- Bioenergetics", "B5- Homeostasis & Response", "B6a- DNA & Reproduction", "B6b- Variation, Evolution & Classfication", "B7- Ecology"],
    "Edexcel" : ["Key Biology Concepts", "Cells & Control", "Genetics", "Natural Selection & Genetic Modification", "Health, Disease & Medicine Development", "Plant Structures & Functions", "Animal Coordination, Control & Homeostasis", "Exchange & Transport in Animals"]
  },
  "Combined Science Chemistry": {
    "AQA": ["C1- Atomic Structure & Periodic Table", "C2- Bonding Structure & Matter Properties", "Quantitative Chemistry", "Chemical Changes", "Energy Changes", "Organic Chemsitry", "Chemical Analysis", "Chemsitry of the Atmosphere", "Using Resources"],
    "Edexcel" : ["Key Chemistry Concepts", "States of matter & mixtures", "Chemical Changes", "Extracting Metals & Equilibria", "Periodic Table Groups", "Rates of Reaction & Energy Changes", "Fuels & Earth Science"]
  },
  "Combined Science Physics": {
    "AQA": ["Energy", "Electricity", "Particle Model of Matter", "Atomic Structure", "Forces", "Waves", "Magnetism & Electromagnetism", "Physics Practical Skills"],
    "Edexcel": ["Motion & Forces", "Conservation of Energy", "Waves & the Electromagnetic Spectrum", "Radioactivity", "Forces & Energy", "Electricity & Circuits", "Magnetic Fields", "Matter", "Combined Science Practical Skills"]
  },
  "Geography": {
    "AQA": ["Natural Hazards", "Tectonic Hazards", "Weather Hazards", "Climate Change", "Ecosystems", "Tropical Rainforests", "Hot Deserts", "Cold environments", "The UK's Coastal Landscape", "The UK's River Landscape", "The UK's glacial landscape", "Urban Issues & Challenges", "The Changing Economic World", "Resource Management", "Food Supply & Demand", "Water Supply & Demand", "Energy Supply & Demand", "Fieldwork & Issue Evaluation"],
    "Edexcel Spec A": ["Coastal Landscapes & Processes", "River Landscapes & Processes", "Glaciated & Upland Landscapes & Processes", "Weather Hazards & Climate Change", "Ecosystems, Biodiversity & Management", "Changing Cities", "Global Development", "Energy Resource Management", "Water Resource Management", "Geographical Fieldwork", "Geographical Investigations"],
    "Edexcel Spec B": ["Hazardous Earth", "Development Dynamics", "Challenges of an Urbanising World", "UK's Evolving Physical Landscape", "Coastal Changes & Conflict", "River Processes & Pressures", "UK's Eveolving Human Landscape", "Geographical Investigations", "People & the Biosphere", "Forests Under Threat", "Consuming Eneegy Resources", "Geographical Decisions"]
  },

"History": {
    "AQA": ["How History Works", "Exam Skills for the Period Study", "American People and the 'Boom'", "Americans' Experiences of the Depression and New Deal", "Post-War America", "Germany and the Growth of Democracy", "Germany and the Depression", "The Experiences of Germans Under the Nazis", "Exam Skills for the Depth Studies", "Peacemaking", "The League of Nations and International Peace", "The Origins and Outbreak of the Second World War", "Elizabeth's Court and Parliament", "Life in Elizabethan Times", "Troubles at Home and Abroad", "Exam Skills for the Historic Environment", "Exam Skills for the Thematic Study", "Medicine Stands Still", "The Beginnings of Change", "A Revolution in Medicine", "Modern Medicine" ],
    
    "Edexcel": ["c.1250-c.1500: Medicine in Medieval England", "c.1500-c.1700: The Medical Renaissance in England", "c.1700-c.1900: Medicine in 18th and 19th Century Britain", "c.1900-Present: Medicine in Modern Britain", "The British Sector of the Western Front, 1914-1918", "The Early Settlement of the West, c.1835-c.1862","Development of the Plains, c.1862-c.1876", "Later Developments in the West, c.1876-c.1895", "The Origins of the Cold War, 1941-58", "Cold War Crises, 1958-70", "The End of the Cold War, 1970-91", "Queen, Government and Religion, 1558-69", "Challenges at Home and Abroad, 1569-88", "Elizabethan Society in the Age of Exploration, 1558-88", "The Weimar Republic, 1918-29", "Hitler's Rise to Power, 1919-33", "Nazi Control and Dictatorship, 1933-39", "Life in Nazi Germany, 1933-39", "Exam Skills- Thematic Study, Depth Study & Historic Environment"]
  }
};

// Global Application State
let currentUser = null;
let pendingSignUpData = null;
let activeTimer = null;
let timerSecondsRemaining = 1800;
let currentTimerTarget = { subject: "", subtopic: "" };
let openSubjectCards = new Set();

function handleSubjectToggle(subName, detailsEl) {
  if (detailsEl.open) {
    openSubjectCards.add(subName);
  } else {
    openSubjectCards.delete(subName);
  }
}

// Utility: LocalStorage Database Accessors
function getUsersDB() {
  return JSON.parse(localStorage.getItem('logiq_users') || '{}');
}
function saveUsersDB(db) {
  localStorage.setItem('logiq_users', JSON.stringify(db));
  saveProgressToSupabase(db);
}


// Password Eye Toggle
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === "password") {
    input.type = "text";
    btn.innerText = "🙈";
  } else {
    input.type = "password";
    btn.innerText = "👁️";
  }
}

// Navigation & View Routing
function switchView(viewName) {
  const views = ['signup', 'onboarding', 'verification', 'signin', 'dashboard', 'forgot'];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) el.style.display = (v === viewName) ? 'block' : 'none';
  });
  const topNav = document.getElementById('top-nav');
  if (topNav) {
    topNav.style.display = (viewName === 'dashboard') ? 'flex' : 'none';
  }
  if (viewName === 'dashboard') {
    renderDashboard();
  }
}

// 1. Sign Up Step 1: Account Checks (Resilient Fallback)
async function handleSignUp(event) {
  event.preventDefault();
  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const password = document.getElementById('signup-password').value;
  const errorEl = document.getElementById('signup-error');

  try {
    if (sb) {
      const { error } = await sb.auth.signUp({
        email: email,
        password: password,
        options: { data: { username: username } }
      });
      if (error) {
        console.warn("Supabase Notice:", error.message);
      }
    }

    if (errorEl) errorEl.style.display = 'none';
    
    pendingSignUpData = {
      username,
      email,
      password,
      subjects: {},
      todayMinutes: 0,
      lastStudiedDate: new Date().toDateString(),
      streakDays: 1
    };

    renderOnboardingSubjects();
    switchView('onboarding');
  } catch (err) {
    if (errorEl) {
      errorEl.innerText = "Error: " + err.message;
      errorEl.style.display = 'block';
    }
  }
}

// Render Onboarding Subject Picker
function renderOnboardingSubjects() {
  const container = document.getElementById('onboarding-subjects-container');
  if (!container) return;
  const availableSubjects = Object.keys(EXAM_BOARD_DATA);
  container.innerHTML = availableSubjects.map(sub => {
    const defaultBoard = Object.keys(EXAM_BOARD_DATA[sub])[0];
    const subtopics = EXAM_BOARD_DATA[sub][defaultBoard] || [];
    const subtopicsHtml = subtopics.map(st => {
      const safeId = st.replace(/[^a-zA-Z0-9-_]/g, '-');
      return `
      <div style="display: flex; flex-direction: column; width: 100%; margin-bottom: 8px;">
      <span style="font-size: 0.85rem; color: #333; margin-bottom: 2px;">${st}</span>
      <select id="confidence-${safeId}" style="padding: 4px; border-radius: 4px; font-size: 0.75rem; width: 100%;">
        <option value="1">1 - Very Low (High Priority)</option>
        <option value="2">2 - Low</option>
        <option value="3" selected>3 - Medium</option>
        <option value="4">4 - High</option>
        <option value="5">5 - Very High (Low Priority)</option>
      </select>
        </div>
      `;
    }).join('');

    return `
    <div class="onboarding-subject-card" style="background: #f8fafc; border-radius: 12px; padding: 14px; margin-bottom: 12px;">
      <div class="subject-toggle-header" style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
        <label style="display: flex; align-items: center; gap: 8px; font-size: 0.95rem; cursor: pointer;">
          <input type="checkbox" id="chk-${sub}" checked style="width: 18px; height: 18px; accent-color: #2563eb;" />
          <strong>${sub}</strong>
        </label>
        <select id="board-${sub}" style="padding: 6px 10px; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; font-size: 0.85rem;">
          ${Object.keys(EXAM_BOARD_DATA[sub]).map(b => `<option value="${b}">${b}</option>`).join('')}
        </select>
      </div>

      <details style="margin-top: 12px;">
        <summary style="font-size: 0.85rem; font-weight: 600; color: #475569; cursor: pointer; user-select: none; padding: 4px 0;">
          Rate Subtopic Confidence (Default: 3)
        </summary>
        <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 10px;">
          ${subtopicsHtml}
        </div>
      </details>
    </div>
  `;
  }).join('');
}

function completeOnboarding() {
  try {
    const availableSubjects = Object.keys(EXAM_BOARD_DATA);
    const subjectsData = {};
    const retentionInput = document.getElementById('retention-days');
    const retentionDropDays = retentionInput ? parseInt(retentionInput.value) || 3 : 3;

    availableSubjects.forEach(sub => {
      const chk = document.getElementById(`chk-${sub}`);
      if (chk && chk.checked) {
        const board = document.getElementById(`board-${sub}`).value;
        const subtopicsList = EXAM_BOARD_DATA[sub][board];
        const confidenceMap = {};
        subtopicsList.forEach(st => {
          const safeId = st.replace(/[^a-zA-Z0-9-_]/g, '-');
          const ratingSelect = document.getElementById(`confidence-${safeId}`);
          confidenceMap[st] = ratingSelect ? parseInt(ratingSelect.value) : 3;
        });
        subjectsData[sub] = { board: board, subtopics: confidenceMap };
      }
    });

    currentUser = {
      ...pendingSignUpData,
      subjects: subjectsData,
      retentionDropDays,
      id: 'user-' + Date.now()
    };

    const usersDB = getUsersDB();
    usersDB[currentUser.email] = currentUser;
    saveUsersDB(usersDB);

    const navUsername = document.getElementById('nav-username');
    if (navUsername) navUsername.innerText = currentUser.username;
    switchView('dashboard');
  } catch (err) {
    alert("Error inside completeOnboarding: " + err.message);
  }
}

// 4. Sign In Authentication
async function handleSignIn(event) {
  event.preventDefault();
  const cloudData = await loadProgressFromSupabase();
  if (cloudData) {
    localStorage.setItem('logiq_users', JSON.stringify(cloudData));
  }
  const email = document.getElementById('signin-email').value.trim().toLowerCase();
  const password = document.getElementById('signin-password').value;
  const errorEl = document.getElementById('signin-error');
  const usersDB = getUsersDB();
  const user = usersDB[email];

  if (!user || user.password !== password) {
    errorEl.innerText = "Incorrect email address or password.";
    errorEl.style.display = 'block';
    return;
  }

  errorEl.style.display = 'none';
  currentUser = user;

  const todayStr = new Date().toDateString();
  if (user.lastStudiedDate !== todayStr) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (user.lastStudiedDate !== yesterday.toDateString()) {
      user.streakDays = 1;
    }
    user.lastStudiedDate = todayStr;
    user.todayMinutes = 0;
    usersDB[email] = user;
    saveUsersDB(usersDB);
  }

  const navUsername = document.getElementById('nav-username');
  if (navUsername) navUsername.innerText = user.username;
  switchView('dashboard');
}

// 5. Render Dashboard
function renderDashboard() {
  if (!currentUser) return;
  const timeEl = document.getElementById('header-today-time');
  if (timeEl) timeEl.innerText = currentUser.todayMinutes || 0;

  let totalSubtopics = 0;
  let totalScore = 0;
  let needsReviewQueue = [];
  let allWeakTopicsBySubject = {};

  Object.keys(currentUser.subjects).forEach(subName => {
    const subData = currentUser.subjects[subName];
    allWeakTopicsBySubject[subName] = [];
    Object.keys(subData.subtopics).forEach(stName => {
      const conf = subData.subtopics[stName];
      totalSubtopics++;
      totalScore += conf;
      if (conf <= 3) {
        allWeakTopicsBySubject[subName].push({
          subject: subName,
          subtopic: stName,
          confidence: conf,
          urgency: conf <= 2 ? "High" : "Medium"
        });
      }
    });
  });

  Object.keys(allWeakTopicsBySubject).forEach(subName => {
    const topics = allWeakTopicsBySubject[subName];
    if (topics.length > 0) {
      topics.sort((a, b) => a.confidence - b.confidence);
      needsReviewQueue.push(topics[0]);
    }
  });

  const masteryPct = totalSubtopics > 0 ? Math.round((totalScore / (totalSubtopics * 5)) * 100) : 0;
  const streakEl = document.getElementById('stat-streak');
  const dueEl = document.getElementById('stat-due');
  const masteryEl = document.getElementById('stat-mastery');
  
  if (streakEl) streakEl.innerText = `${currentUser.streakDays || 1} Days`;
  if (dueEl) dueEl.innerText = `${needsReviewQueue.length} Topics`;
  if (masteryEl) masteryEl.innerText = `${masteryPct}%`;

  const queueContainer = document.getElementById('review-queue-container');
  if (queueContainer) {
    if (needsReviewQueue.length === 0) {
      queueContainer.innerHTML = `<p class="empty-state">🎉 All caught up! No topics currently need review.</p>`;
    } else {
      queueContainer.innerHTML = needsReviewQueue.map((item, index) => {
        const isTopPick = index === 0;
        return `
          <div class="review-item ${isTopPick ? 'spotlight-review-item' : ''}">
            <div class="review-info">
              <span class="review-subject">${item.subject} ${isTopPick ? '— ⭐ Recommended Focus Today' : ''}</span>
              <strong class="review-topic">${item.subtopic}</strong>
            </div>
            <div class="review-actions">
              <span class="badge badge-${item.urgency.toLowerCase()}">${item.urgency} Priority</span>
              <button class="btn-sm" onclick="startTargetedReview('${item.subject}', '${item.subtopic}')">Review Now</button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  const subjectContainer = document.getElementById('subject-grid-container');
  if (subjectContainer) {
    subjectContainer.innerHTML = Object.keys(currentUser.subjects).map(subName => {
      const sub = currentUser.subjects[subName];
      const subtopicsKeys = Object.keys(sub.subtopics);
      let subTotalScore = 0;
      let subDueCount = 0;
      subtopicsKeys.forEach(st => {
        const score = sub.subtopics[st];
        subTotalScore += score;
        if (score <= 3) subDueCount++;
      });
      const subPct = subtopicsKeys.length > 0 ? Math.round((subTotalScore / (subtopicsKeys.length * 5)) * 100) : 0;
      const isOpen = openSubjectCards.has(subName) ? 'open' : '';
      return `
        <details class="subject-card-details" ${isOpen} ontoggle="handleSubjectToggle('${subName}', this)">
          <summary class="subject-card-summary">
            <div class="subject-card-header">
              <h3>${subName} <span class="board-tag">(${sub.board})</span></h3>
              <span class="due-badge">${subDueCount} needs review</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: ${subPct}%"></div>
            </div>
            <div class="subject-card-footer">
              <span>${subPct}% Retained</span>
              <span class="dropdown-arrow">▼</span>
            </div>
          </summary>
          <div class="subtopics-dropdown-list">
            <h4>Subtopics & Confidence</h4>
            ${subtopicsKeys.map(st => `
              <div class="subtopic-row">
                <span>${st}</span>
                <div class="confidence-selector">
                  ${[1, 2, 3, 4, 5].map(lvl => `
                    <button class="conf-btn ${sub.subtopics[st] === lvl ? 'active' : ''}" onclick="updateConfidenceDirectly('${subName}', '${st}', ${lvl})">${lvl}</button>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </details>
      `;
    }).join('');
  }
}

function updateConfidenceDirectly(subject, subtopic, score) {
  currentUser.subjects[subject].subtopics[subtopic] = score;
  saveCurrentUserData();
  renderDashboard();
}

function saveCurrentUserData() {
  const usersDB = getUsersDB();
  usersDB[currentUser.email] = currentUser;
  saveUsersDB(usersDB);
}

function startTargetedReview(subject, subtopic) {
  currentTimerTarget = { subject, subtopic };
  openTimerModal(30, subject, subtopic);
}

function openTimerModal(mins = 30, subject = "", subtopic = "") {
  const modal = document.getElementById('timer-modal');
  if (modal) modal.style.display = 'flex';
  const subSelect = document.getElementById('timer-subject-select');
  const userSubs = Object.keys(currentUser.subjects);
  subSelect.innerHTML = userSubs.map(s => `<option value="${s}" ${s === subject ? 'selected' : ''}>${s}</option>`).join('');
  const currentSub = subject || userSubs[0];
  updateTimerSubtopicDropdown(currentSub, subtopic);
  adjustTimerDuration(mins);
}

function updateTimerSubtopicDropdown(subject, targetSubtopic = "") {
  const stSelect = document.getElementById('timer-subtopic-select');
  if (!currentUser.subjects[subject]) return;
  const stList = Object.keys(currentUser.subjects[subject].subtopics);
  stSelect.innerHTML = stList.map(st => `<option value="${st}" ${st === targetSubtopic ? 'selected' : ''}>${st}</option>`).join('');
}

function adjustTimerDuration(mins) {
  mins = Math.max(5, Math.min(120, mins));
  const minInput = document.getElementById('timer-minutes-input');
  if (minInput) minInput.value = mins;
  timerSecondsRemaining = mins * 60;
  updateTimerClockDisplay();
}

function updateTimerClockDisplay() {
  const m = Math.floor(timerSecondsRemaining / 60);
  const s = timerSecondsRemaining % 60;
  const clockEl = document.getElementById('timer-clock');
  if (clockEl) clockEl.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

let timerEndTime = null;
let timerPausedRemaining = null;

function toggleTimer() {
  const btn = document.getElementById('timer-start-btn');
  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
    timerPausedRemaining = timerSecondsRemaining;
    if (btn) btn.innerText = "Start Timer";
  } else {
    const secondsToRun = timerPausedRemaining !== null ? timerPausedRemaining : timerSecondsRemaining;
    timerEndTime = Date.now() + secondsToRun * 1000;
    timerPausedRemaining = null;
    if (btn) btn.innerText = "Pause Timer";
    if (activeTimer) clearInterval(activeTimer);
    activeTimer = setInterval(() => {
      const now = Date.now();
      const diffInSeconds = Math.round((timerEndTime - now) / 1000);
      if (diffInSeconds <= 0) {
        clearInterval(activeTimer);
        activeTimer = null;
        timerSecondsRemaining = 0;
        updateTimerClockDisplay();
        if (typeof completeTimerSession === 'function') {
          completeTimerSession();
        }
      } else {
        timerSecondsRemaining = diffInSeconds;
        updateTimerClockDisplay();
      }
    }, 1000);
  }
}

function resetTimer() {
  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
  }
  timerPausedRemaining = null;
  timerEndTime = null;
  const mins = parseInt(document.getElementById('timer-minutes-input')?.value) || 30;
  adjustTimerDuration(mins);
  const btn = document.getElementById('timer-start-btn');
  if (btn) btn.innerText = "Start Timer";
}

function closeTimerModal() {
  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
  }
  timerPausedRemaining = null;
  timerEndTime = null;
  const modal = document.getElementById('timer-modal');
  if (modal) modal.style.display = 'none';
  const btn = document.getElementById('timer-start-btn');
  if (btn) btn.innerText = "Start Timer";
}

function completeTimerSession() {
  closeTimerModal();
  const minsSpent = parseInt(document.getElementById('timer-minutes-input').value) || 30;
  currentUser.todayMinutes = (currentUser.todayMinutes || 0) + minsSpent;
  saveCurrentUserData();
  const sub = document.getElementById('timer-subject-select').value;
  const st = document.getElementById('timer-subtopic-select').value;
  currentTimerTarget = { subject: sub, subtopic: st };
  document.getElementById('conf-modal-subtopic').innerText = `${sub} - ${st}`;
  document.getElementById('confidence-modal').style.display = 'flex';
}

function saveUpdatedConfidence(level) {
  const { subject, subtopic } = currentTimerTarget;
  if (subject && subtopic && currentUser.subjects[subject]) {
    currentUser.subjects[subject].subtopics[subtopic] = level;
    saveCurrentUserData();
  }
  document.getElementById('confidence-modal').style.display = 'none';
  renderDashboard();
}

function openAddSubjectModal() {
  const modal = document.getElementById('add-subject-modal');
  const body = document.getElementById('manage-subjects-body');
  const availableSubjects = Object.keys(EXAM_BOARD_DATA);
  body.innerHTML = availableSubjects.map(sub => {
    const isChecked = !!currentUser.subjects[sub];
    const currentBoard = isChecked ? currentUser.subjects[sub].board : "AQA";
    return `
      <div class="onboarding-subject-card" style="margin-bottom: 12px;">
        <div class="subject-toggle-header" style="display: flex; justify-content: space-between; align-items: center;">
          <label>
            <input type="checkbox" id="manage-chk-${sub}" ${isChecked ? 'checked' : ''} />
            <strong>${sub}</strong>
          </label>
          <select id="manage-board-${sub}">
            <option value="AQA" ${currentBoard === 'AQA' ? 'selected' : ''}>AQA</option>
            <option value="Edexcel" ${currentBoard === 'Edexcel' ? 'selected' : ''}>Edexcel</option>
          </select>
        </div>
      </div>
    `;
  }).join('');
  modal.style.display = 'flex';
}

function closeAddSubjectModal() {
  document.getElementById('add-subject-modal').style.display = 'none';
}

function saveSubjectChanges() {
  const availableSubjects = Object.keys(EXAM_BOARD_DATA);
  availableSubjects.forEach(sub => {
    const chk = document.getElementById(`manage-chk-${sub}`);
    const isChecked = chk && chk.checked;
    const board = document.getElementById(`manage-board-${sub}`).value;
    if (isChecked) {
      if (!currentUser.subjects[sub] || currentUser.subjects[sub].board !== board) {
        const subtopicsList = EXAM_BOARD_DATA[sub][board];
        const confidenceMap = {};
        subtopicsList.forEach(st => {
          confidenceMap[st] = 2;
        });
        currentUser.subjects[sub] = { board, subtopics: confidenceMap };
      }
    } else {
      delete currentUser.subjects[sub];
    }
  });
  saveCurrentUserData();
  closeAddSubjectModal();
  renderDashboard();
}

function logout() {
  currentUser = null;
  switchView('signin');
}

function toggleSettingsModal(show) {
  const modal = document.getElementById('settings-modal');
  if (show) {
    document.getElementById('settings-email-display').innerText = currentUser ? currentUser.email : "Guest";
    modal.style.display = 'flex';
  } else {
    modal.style.display = 'none';
  }
}

let pendingResetEmail = null;
function handleForgotPassword(event) {
  event.preventDefault();
  const email = document.getElementById('forgot-email').value.trim().toLowerCase();
  const errorEl = document.getElementById('forgot-error');
  const successEl = document.getElementById('forgot-success');
  const newPassGroup = document.getElementById('new-password-group');
  const submitBtn = document.getElementById('forgot-submit-btn');
  const usersDB = getUsersDB();

  if (!usersDB[email]) {
    errorEl.innerText = "No account found with this email address.";
    errorEl.style.display = 'block';
    successEl.style.display = 'none';
    return;
  }

  errorEl.style.display = 'none';
  if (pendingResetEmail !== email) {
    pendingResetEmail = email;
    newPassGroup.style.display = 'block';
    document.getElementById('forgot-email').disabled = true;
    submitBtn.innerText = "Save New Password";
    successEl.innerText = "Account found! Enter your new password below.";
    successEl.style.display = 'block';
    return;
  }

  const newPassword = document.getElementById('forgot-new-password').value;
  if (!newPassword || newPassword.length < 6) {
    errorEl.innerText = "Password must be at least 6 characters.";
    errorEl.style.display = 'block';
    return;
  }

  const updatedUser = usersDB[email];
  updatedUser.password = newPassword;
  usersDB[email] = updatedUser;
  saveUsersDB(usersDB);

  newPassGroup.style.display = 'none';
  submitBtn.innerText = "Reset Password";
  successEl.style.display = 'none';
  alert('Password successfully reset! Please sign in with your new password.');
  pendingResetEmail = null;
  document.getElementById('forgot-email').disabled = false;
  document.getElementById('forgot-email').value = '';
  document.getElementById('forgot-new-password').value = '';
  switchView('signin');
}
// --- CLOUD SYNC HELPERS ---
async function saveProgressToSupabase(progressData) {
  if (!sb) return;
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return;

  const { error } = await sb
    .from('user_progress')
    .upsert({ 
      user_id: user.id, 
      revision_data: progressData,
      updated_at: new Date().toISOString()
    });

  if (error) console.error('Cloud save error:', error);
}

async function loadProgressFromSupabase() {
  if (!sb) return null;
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;

  const { data, error } = await sb
    .from('user_progress')
    .select('revision_data')
    .eq('user_id', user.id)
    .single();

  if (error) return null;
  return data ? data.revision_data : null;
}
