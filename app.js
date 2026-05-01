// CUNYStudy — app.js
// localStorage database mirroring database.sql schema

const DB_KEY     = 'cunystudy_v3_groups';
const JOINED_KEY = 'cunystudy_v3_joined';

const SEED = [
  { id:1, course:'CSC 226', courseName:'Web Database Applications', professor:'Prof. Tooker', campus:'College of Staten Island', location:'Library Building 1L-116', meetingType:'In-Person', day:'Monday', time:'2:00 PM', maxMembers:5, currentMembers:3, description:'Working on the final project together. We cover SQL joins, Django, and building our website. Bring your laptop and any questions from lecture.', contact:'csc226group@login.cuny.edu', createdAt:'2026-04-10', subject:'Computer Science' },
  { id:2, course:'MTH 230', courseName:'Discrete Mathematics', professor:'Prof. Martinez', campus:'College of Staten Island', location:'Building 1N Room 215', meetingType:'In-Person', day:'Wednesday', time:'4:00 PM', maxMembers:4, currentMembers:2, description:'Studying proofs, logic, and graph theory before the midterm. We quiz each other and work through practice problems together. All levels welcome.', contact:'mth230study@login.cuny.edu', createdAt:'2026-04-11', subject:'Mathematics' },
  { id:3, course:'PSY 100', courseName:'Introduction to Psychology', professor:'Prof. Chen', campus:'College of Staten Island', location:'Zoom', meetingType:'Online', day:'Thursday', time:'6:00 PM', maxMembers:6, currentMembers:6, description:'Final exam review group. We share notes and quiz each other on chapters 1-10. The Zoom link is sent after joining.', contact:'psy100review@login.cuny.edu', createdAt:'2026-04-09', subject:'Psychology' },
  { id:4, course:'ENG 151', courseName:'English Composition', professor:'Prof. Williams', campus:'College of Staten Island', location:'Coffee House (Student Center)', meetingType:'In-Person', day:'Friday', time:'11:00 AM', maxMembers:4, currentMembers:1, description:'Peer review group for essay drafts. Bring your draft and get constructive feedback from classmates. We also review grammar, thesis development, and citations.', contact:'eng151write@login.cuny.edu', createdAt:'2026-04-12', subject:'English' },
  { id:5, course:'CSC 215', courseName:'Computer Organization', professor:'Prof. Khazan', campus:'College of Staten Island', location:'Zoom', meetingType:'Online', day:'Tuesday', time:'7:00 PM', maxMembers:5, currentMembers:4, description:'Going over assembly language and binary arithmetic. We have a shared Google Doc with notes from every lecture. Active group with weekly sessions.', contact:'csc215group@login.cuny.edu', createdAt:'2026-04-08', subject:'Computer Science' },
  { id:6, course:'BIO 150', courseName:'General Biology', professor:'Prof. Rivera', campus:'College of Staten Island', location:'Science Building 2S-118', meetingType:'In-Person', day:'Saturday', time:'10:00 AM', maxMembers:6, currentMembers:3, description:'Cell biology and genetics review. Preparing lab reports and studying for the practical exam. We bring past exams and go through them together.', contact:'bio150lab@login.cuny.edu', createdAt:'2026-04-13', subject:'Biology' },
  { id:7, course:'ACC 101', courseName:'Principles of Accounting', professor:'Prof. Goldstein', campus:'College of Staten Island', location:'Building 2A Room 310', meetingType:'In-Person', day:'Tuesday', time:'3:00 PM', maxMembers:5, currentMembers:2, description:'Working through journal entries, T-accounts, and balance sheets. We practice with real-world examples and past exam problems.', contact:'acc101group@login.cuny.edu', createdAt:'2026-04-14', subject:'Business' },
  { id:8, course:'CHE 103', courseName:'General Chemistry', professor:'Prof. Patel', campus:'College of Staten Island', location:'Zoom + Campus Library', meetingType:'Hybrid', day:'Sunday', time:'1:00 PM', maxMembers:6, currentMembers:4, description:'Covering stoichiometry, thermodynamics, and equilibrium. We do practice problems from the textbook and past exams. Online or in-person — your choice each week.', contact:'che103chem@login.cuny.edu', createdAt:'2026-04-07', subject:'Chemistry' },
  { id:9, course:'CSC 101', courseName:'Introduction to Computing', professor:'Prof. Davis', campus:'College of Staten Island', location:'Library Room 2L-04', meetingType:'In-Person', day:'Wednesday', time:'1:00 PM', maxMembers:6, currentMembers:1, description:'Beginner-friendly group for students new to programming. We go over Python basics, loops, functions, and debugging together. No experience needed.', contact:'csc101intro@login.cuny.edu', createdAt:'2026-04-15', subject:'Computer Science' },
  { id:10, course:'PHI 101', courseName:'Introduction to Philosophy', professor:'Prof. Russo', campus:'College of Staten Island', location:'Zoom', meetingType:'Online', day:'Monday', time:'5:00 PM', maxMembers:4, currentMembers:3, description:'Discussing Plato, Aristotle, Descartes, and Kant. We summarize readings and debate ideas before class. Great for keeping up with dense readings.', contact:'phi101discuss@login.cuny.edu', createdAt:'2026-04-06', subject:'Philosophy' },
  { id:11, course:'HIS 111', courseName:'World History to 1500', professor:'Prof. Kim', campus:'College of Staten Island', location:'Zoom', meetingType:'Online', day:'Thursday', time:'8:00 PM', maxMembers:5, currentMembers:2, description:'Preparing for the essay exam. We build timelines, review key events and figures, and write practice essays together.', contact:'his111group@login.cuny.edu', createdAt:'2026-04-05', subject:'History' },
  { id:12, course:'MTH 130', courseName:'College Algebra', professor:'Prof. Santos', campus:'College of Staten Island', location:'Building 1N Room 108', meetingType:'In-Person', day:'Friday', time:'2:00 PM', maxMembers:6, currentMembers:5, description:'Working through polynomials, exponential functions, and graphing. We go through homework problems step by step. Good group for hands-on practice.', contact:'mth130algebra@login.cuny.edu', createdAt:'2026-04-04', subject:'Mathematics' }
];

// ── DATABASE ─────────────────────────────────────────
function getGroups() {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) { localStorage.setItem(DB_KEY, JSON.stringify(SEED)); return SEED; }
  return JSON.parse(raw);
}
function saveGroups(g) { localStorage.setItem(DB_KEY, JSON.stringify(g)); }
function getJoined() { const r = localStorage.getItem(JOINED_KEY); return r ? JSON.parse(r) : []; }
function hasJoined(id) { return getJoined().includes(parseInt(id)); }
function markJoined(id) { const j = getJoined(); if (!j.includes(parseInt(id))) { j.push(parseInt(id)); localStorage.setItem(JOINED_KEY, JSON.stringify(j)); } }

function insertGroup(g) {
  const groups = getGroups();
  const newId = groups.length > 0 ? Math.max(...groups.map(x => x.id)) + 1 : 1;
  const ng = { ...g, id: newId, currentMembers: 1, createdAt: new Date().toISOString().split('T')[0] };
  groups.unshift(ng);
  saveGroups(groups);
  return ng;
}

function getGroupById(id) { return getGroups().find(g => g.id === parseInt(id)) || null; }

function joinGroup(id) {
  const groups = getGroups();
  const g = groups.find(x => x.id === parseInt(id));
  if (g && g.currentMembers < g.maxMembers) { g.currentMembers++; saveGroups(groups); markJoined(id); return true; }
  return false;
}

function getStatus(g) {
  if (g.currentMembers >= g.maxMembers) return 'Full';
  if (g.currentMembers >= Math.ceil(g.maxMembers * 0.7)) return 'Almost Full';
  return 'Open';
}

function searchGroups(q, campus, type, day, subject) {
  let r = getGroups();
  if (q) { const lq = q.toLowerCase(); r = r.filter(g => g.course.toLowerCase().includes(lq) || g.courseName.toLowerCase().includes(lq) || g.professor.toLowerCase().includes(lq) || g.description.toLowerCase().includes(lq) || (g.subject && g.subject.toLowerCase().includes(lq))); }
  if (campus  && campus  !== 'all') r = r.filter(g => g.campus === campus);
  if (type    && type    !== 'all') r = r.filter(g => g.meetingType === type);
  if (day     && day     !== 'all') r = r.filter(g => g.day === day);
  if (subject && subject !== 'all') r = r.filter(g => g.subject === subject);
  return r;
}

// ── RENDER ───────────────────────────────────────────
function statusBadgeClass(s) {
  if (s === 'Full') return 'badge-full';
  if (s === 'Almost Full') return 'badge-almost';
  return 'badge-open';
}

function createCard(group) {
  const status = getStatus(group);
  const spotsLeft = group.maxMembers - group.currentMembers;
  const card = document.createElement('a');
  card.className = 'card';
  card.href = `group.html?id=${group.id}`;
  card.innerHTML = `
    <div class="card-top">
      <span class="card-tag">${group.course}</span>
      <span class="badge ${statusBadgeClass(status)}">${status}</span>
    </div>
    <h3>${group.courseName}</h3>
    <p class="desc">${group.description.substring(0,120)}${group.description.length > 120 ? '...' : ''}</p>
    <div class="card-meta">
      <span>${group.day} · ${group.time}</span>
      <span>${group.meetingType}</span>
      <span>${group.currentMembers}/${group.maxMembers} members</span>
      ${status !== 'Full' ? `<span class="spots-left">${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left</span>` : ''}
    </div>
  `;
  return card;
}

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function animateCountUp(el, target, duration = 1200) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); return; }
    el.textContent = Math.floor(start);
  }, 16);
}

// ── PAGE: INDEX ──────────────────────────────────────
function initIndex() {
  const groups = getGroups();
  setTimeout(() => {
    const sg = document.getElementById('stat-groups');
    const ss = document.getElementById('stat-students');
    const sc = document.getElementById('stat-courses');
    if (sg) animateCountUp(sg, groups.length);
    if (ss) animateCountUp(ss, groups.reduce((s,g) => s + g.currentMembers, 0));
    if (sc) animateCountUp(sc, [...new Set(groups.map(g => g.course))].length);
  }, 400);

  const grid = document.getElementById('featured-grid');
  if (grid) {
    const featured = [...groups].sort((a,b) => (getStatus(a) === 'Full') - (getStatus(b) === 'Full')).slice(0,6);
    featured.forEach(g => grid.appendChild(createCard(g)));
  }

  const form = document.getElementById('hero-search-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const q = document.getElementById('hero-q')?.value || '';
      window.location.href = `browse.html?q=${encodeURIComponent(q)}`;
    });
  }
}

// ── PAGE: BROWSE ─────────────────────────────────────
function initBrowse() {
  const params = new URLSearchParams(window.location.search);
  const qInput = document.getElementById('search-input');
  if (qInput && params.get('q')) qInput.value = params.get('q');

  function render() {
    const q       = document.getElementById('search-input')?.value || '';
    const campus  = document.getElementById('filter-campus')?.value || 'all';
    const type    = document.getElementById('filter-type')?.value   || 'all';
    const day     = document.getElementById('filter-day')?.value    || 'all';
    const subject = document.getElementById('filter-subject')?.value || 'all';
    const results = searchGroups(q, campus, type, day, subject);
    const grid    = document.getElementById('browse-grid');
    const count   = document.getElementById('results-count');
    if (count) count.textContent = `${results.length} group${results.length !== 1 ? 's' : ''} found`;
    grid.innerHTML = '';
    if (results.length === 0) {
      grid.innerHTML = `<div class="empty" style="grid-column:1/-1"><h3>No groups found</h3><p>Try different filters or <a href="create.html" style="color:var(--teal);font-weight:600;">create a new group</a>.</p></div>`;
      return;
    }
    results.forEach(g => grid.appendChild(createCard(g)));
  }

  ['search-input','filter-campus','filter-type','filter-day','filter-subject'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.addEventListener('input', render); el.addEventListener('change', render); }
  });
  render();
}

// ── PAGE: CREATE ─────────────────────────────────────
function initCreate() {
  const form = document.getElementById('create-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const g = {
      course:      document.getElementById('course').value.trim().toUpperCase(),
      courseName:  document.getElementById('courseName').value.trim(),
      professor:   document.getElementById('professor').value.trim(),
      campus:      document.getElementById('campus').value,
      location:    document.getElementById('location').value.trim(),
      meetingType: document.getElementById('meetingType').value,
      day:         document.getElementById('day').value,
      time:        document.getElementById('time').value,
      maxMembers:  parseInt(document.getElementById('maxMembers').value),
      description: document.getElementById('description').value.trim(),
      contact:     document.getElementById('contact').value.trim(),
      subject:     document.getElementById('subject').value,
    };
    if (!g.course || !g.courseName || !g.campus) { showToast('Please fill in all required fields.'); return; }
    insertGroup(g);
    showToast('Group created! Redirecting...');
    setTimeout(() => window.location.href = 'browse.html', 1600);
  });
  document.getElementById('cancel-btn')?.addEventListener('click', () => window.location.href = 'browse.html');
}

// ── PAGE: GROUP DETAIL ───────────────────────────────
function initGroupDetail() {
  const params = new URLSearchParams(window.location.search);
  const group  = getGroupById(params.get('id'));
  const wrap   = document.getElementById('group-detail');
  if (!wrap) return;
  if (!group) {
    wrap.innerHTML = `<div class="empty" style="padding:100px 24px"><h3>Group not found</h3><p><a href="browse.html">Back to browse</a></p></div>`;
    return;
  }

  const status    = getStatus(group);
  const spotsLeft = group.maxMembers - group.currentMembers;
  const pct       = Math.round((group.currentMembers / group.maxMembers) * 100);
  const alreadyJoined = hasJoined(group.id);

  wrap.innerHTML = `
    <div class="detail-header">
      <div style="max-width:1100px;margin:0 auto;position:relative;">
        <a href="browse.html" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:14px;display:inline-flex;align-items:center;gap:6px;margin-bottom:20px;">Back to Browse</a>
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
          <span class="card-tag" style="font-size:13px;">${group.course}</span>
          <span class="badge ${statusBadgeClass(status)}">${status}</span>
          ${group.subject ? `<span style="background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px;">${group.subject}</span>` : ''}
        </div>
        <h1 style="font-family:'Syne',sans-serif;font-size:clamp(28px,4vw,42px);color:#fff;margin-bottom:10px;">${group.courseName}</h1>
        <p style="color:rgba(255,255,255,0.55);font-size:15px;">${group.professor} &middot; ${group.campus}</p>
      </div>
    </div>
    <div class="detail-body">
      <div class="detail-grid">
        <div>
          <div class="detail-card">
            <h3>About this group</h3>
            <p style="color:var(--gray);line-height:1.8;">${group.description}</p>
          </div>
          <div class="detail-card">
            <h3>Group Details</h3>
            <div class="detail-row">
              <span class="detail-label">Schedule</span>
              <div><div class="detail-row-val">${group.day}s at ${group.time}</div></div>
            </div>
            <div class="detail-row">
              <span class="detail-label">Format</span>
              <div><div class="detail-row-val">${group.meetingType}</div></div>
            </div>
            <div class="detail-row">
              <span class="detail-label">Location</span>
              <div><div class="detail-row-val">${group.location}</div></div>
            </div>
            <div class="detail-row">
              <span class="detail-label">Campus</span>
              <div><div class="detail-row-val">${group.campus}</div></div>
            </div>
            <div class="detail-row">
              <span class="detail-label">Contact</span>
              <div><div class="detail-row-val">${group.contact}</div></div>
            </div>
          </div>
        </div>
        <div>
          <div class="detail-card" style="position:sticky;top:88px;">
            <div style="text-align:center;margin-bottom:24px;">
              <div style="font-family:'Syne',sans-serif;font-size:48px;color:var(--teal);line-height:1;">${group.currentMembers}<span style="font-size:22px;color:var(--gray2);">/${group.maxMembers}</span></div>
              <div style="font-size:13px;color:var(--gray);margin-top:4px;">members joined</div>
              <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
              <div style="font-size:12px;color:var(--gray2);">${pct}% full &middot; ${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} remaining</div>
            </div>
            ${alreadyJoined
              ? `<div class="btn btn-primary" style="width:100%;justify-content:center;cursor:default;">You're In!</div>
                 <p style="text-align:center;font-size:12px;color:var(--gray2);margin-top:10px;">You've joined this group. Check your email.</p>`
              : status !== 'Full'
                ? `<button class="btn btn-primary" id="join-btn" style="width:100%;justify-content:center;">Join This Group</button>`
                : `<button class="btn" style="width:100%;justify-content:center;background:var(--light);color:var(--gray);cursor:not-allowed;" disabled>Group is Full</button>`
            }
            <a href="browse.html" class="btn btn-outline" style="width:100%;justify-content:center;margin-top:10px;">Browse Other Groups</a>
            <a href="create.html" class="btn" style="width:100%;justify-content:center;margin-top:8px;background:var(--light);color:var(--navy);">Create Your Own Group</a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('join-btn')?.addEventListener('click', () => {
    const ok = joinGroup(group.id);
    if (ok) { showToast('You joined the group! Check your email to connect.'); setTimeout(() => location.reload(), 1800); }
    else     { showToast('Sorry, this group is now full.'); }
  });
}

// ── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'index')  initIndex();
  if (page === 'browse') initBrowse();
  if (page === 'create') initCreate();
  if (page === 'group')  initGroupDetail();
});
