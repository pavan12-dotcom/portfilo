/* ─── INITIALIZATION ─── */
function initAll() {
  initHero();
  initConsole();
  initReveal();
  initSkills();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

/* ─── CURSOR ─── */
const cursorDot = document.getElementById('cursorDot');
if(window.innerWidth >= 768 && cursorDot){
  document.addEventListener('mousemove', e=>{
    cursorDot.style.transform = `translate(calc(-50% + ${e.clientX}px), calc(-50% + ${e.clientY}px))`;
  });
}

/* ─── SCROLL PROGRESS ─── */
window.addEventListener('scroll', ()=>{
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  document.getElementById('scroll-progress').style.width = pct + '%';
  document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 20);
  updateActiveNav();
}, {passive:true});

/* ─── NAV ACTIVE ─── */
function updateActiveNav(){
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s=>{
    if(window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  links.forEach(a=>{
    a.classList.toggle('active', a.getAttribute('href') === '#'+current);
  });
}

/* ─── HAMBURGER ─── */
document.getElementById('hamburger').addEventListener('click', ()=>{
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click', ()=> document.getElementById('navLinks').classList.remove('open'));
});

/* ─── HERO ANIMATIONS ─── */
function initHero(){
  const delays = [
    ['heroBadge', 100], ['heroName', 280],
    ['heroSubPrompt', 420], ['heroSub', 560], 
    ['heroActions', 700], ['heroTerminal', 700],
    ['heroSocials', 840], ['heroMetrics', 980]
  ];
  delays.forEach(([id, delay])=>{
    setTimeout(()=>{
      const el = document.getElementById(id);
      if(el){ el.classList.add('show'); }
    }, delay);
  });
}

/* ─── INTERACTIVE CONSOLE ─── */
function initConsole(){
  const codeEl = document.getElementById('consoleCode');
  if(!codeEl) return;

  const consoleContent = {
    profile: `{
  <span class="code-json-key">"engineer"</span>: <span class="code-json-string">"Thotakura Pavan"</span>,
  <span class="code-json-key">"role"</span>: <span class="code-json-string">"Full-Stack with Data Analytics"</span>,
  <span class="code-json-key">"location"</span>: <span class="code-json-string">"Guntur, AP"</span>,
  <span class="code-json-key">"email"</span>: <span class="code-json-string">"pavathotakura167@gmail.com"</span>,
  <span class="code-json-key">"phone"</span>: <span class="code-json-string">"+ 91 7730959659"</span>,
  <span class="code-json-key">"education"</span>: {
    <span class="code-json-key">"college"</span>: <span class="code-json-string">"Narasaraopeta Engg College"</span>,
    <span class="code-json-key">"degree"</span>: <span class="code-json-string">"B.Tech ECE (2023-2027)"</span>,
    <span class="code-json-key">"cgpa"</span>: <span class="code-json-string">"8.0 / 10.00"</span>
  },
  <span class="code-json-key">"github"</span>: <span class="code-json-string">"github.com/pavan12-dotcom"</span>,
  <span class="code-json-key">"linkedin"</span>: <span class="code-json-string">"in/thotakura-pavan"</span>,
  <span class="code-json-key">"status"</span>: <span class="code-status-op">"OPERATIONAL"</span>
}`,
    skills: `<span class="code-comment"># Technical Capabilities</span>
<span class="code-json-key">languages:</span>
  - <span class="code-value">C</span>
  - <span class="code-value">C++</span>
  - <span class="code-value">Python</span>
  - <span class="code-value">JavaScript</span>
<span class="code-json-key">web_development:</span>
  - <span class="code-value">React.js</span>
  - <span class="code-value">Node.js</span>
  - <span class="code-value">HTML5 / CSS3</span>
  - <span class="code-value">REST APIs</span>
<span class="code-json-key">data_and_vision:</span>
  - <span class="code-value">OpenCV (Computer Vision)</span>
  - <span class="code-value">Power BI (Analytics)</span>
  - <span class="code-value">Python Data Science</span>
<span class="code-json-key">tools:</span>
  - <span class="code-value">Git &amp; GitHub</span>
  - <span class="code-value">VS Code</span>`,
    telemetry: `<span class="code-keyword">[system]</span>
<span class="code-json-key">status</span>     = <span class="code-status-op">OPERATIONAL</span>
<span class="code-json-key">connection</span>  = <span class="code-value">SECURE</span>
<span class="code-json-key">latency</span>    = <span class="code-value">OPTIMAL</span>
<span class="code-json-key">runtime</span>    = <span class="code-value">LIVE_PORTFOLIO</span>

<span class="code-keyword">[experience]</span>
<span class="code-json-key">company</span>    = <span class="code-value">Datavalley India Pvt. Ltd.</span>
<span class="code-json-key">role</span>       = <span class="code-value">Online Intern — IoT</span>
<span class="code-json-key">reg_no</span>     = <span class="code-value">AP26S11112601</span>
<span class="code-json-key">domain</span>     = <span class="code-value">Internet of Things</span>

<span class="code-keyword">[certifications]</span>
<span class="code-json-key">count</span>      = <span class="code-json-number">17</span>
<span class="code-json-key">latest</span>     = <span class="code-value">Industry 4.0 & IIoT (Elite)</span>
<span class="code-json-key">issuer</span>     = <span class="code-value">NPTEL (IIT KGP), Infosys, UNICEF</span>
<span class="code-json-key">score</span>      = <span class="code-json-number">80% Elite</span>`
  };

  // Set default active tab code
  codeEl.innerHTML = consoleContent.profile;
  codeEl.style.opacity = '1';

  const tabs = document.querySelectorAll('.console-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if(tab.classList.contains('active')) return;
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const tabName = tab.getAttribute('data-tab');
      if(consoleContent[tabName]) {
        codeEl.style.opacity = '0';
        setTimeout(() => {
          codeEl.innerHTML = consoleContent[tabName];
          codeEl.style.opacity = '1';
        }, 150);
      }
    });
  });
}

/* ─── REVEAL ─── */
function initReveal(){
  const obs = new IntersectionObserver(entries=>{
    entries.forEach((entry,i)=>{
      if(entry.isIntersecting){
        setTimeout(()=> entry.target.classList.add('visible'), i * 75);
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el=> obs.observe(el));
}

/* ─── SKILLS STAGGER ─── */
function initSkills(){
  const grid = document.getElementById('skillsGrid');
  if(!grid) return;
  const obs = new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
      document.querySelectorAll('.skill-card').forEach((c,i)=>{
        setTimeout(()=> c.classList.add('visible'), i*55);
      });
      obs.disconnect();
    }
  }, {threshold:0.15});
  obs.observe(grid);
}

/* ─── LIGHTBOX ─── */
function openLightbox(src){
  if(!src) return;
  let lb = document.getElementById('lightboxBackdrop');
  if(!lb){
    lb = document.createElement('div');
    lb.id = 'lightboxBackdrop';
    lb.className = 'lightbox-backdrop';
    lb.innerHTML = `<div class="lightbox-inner"><button class="lightbox-close" onclick="closeLightbox()">✕</button><img id="lbImg" src="" alt="Preview"/></div>`;
    lb.addEventListener('click', e=>{ if(e.target===lb) closeLightbox(); });
    document.body.appendChild(lb);
  }
  document.getElementById('lbImg').src = src;
  lb.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  const lb = document.getElementById('lightboxBackdrop');
  if(lb) lb.style.display = 'none';
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeLightbox(); });

/* ─── CONTACT FORM ─── */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const btn = this.querySelector('.form-submit');
  const success = document.getElementById('formSuccess');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(()=>{
    btn.style.display = 'none';
    success.style.display = 'block';
    this.reset();
  }, 1200);
});

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const t = document.querySelector(a.getAttribute('href'));
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
  });
});

/* ─── CERTIFICATE VIEWER ─── */
const certDB = {
  nptel: {
    theme: 'nptel',
    issuer: 'NPTEL · IIT Kharagpur',
    issuerSub: 'Funded by the Ministry of Education, Govt. of India',
    sealIcon: 'fa-award',
    certType: 'Elite Online Certification',
    recipient: 'THOTAKURA PAVAN',
    desc: 'for successfully completing the 12-week proctored online course with distinction',
    course: 'Introduction to Industry 4.0 and Industrial Internet of Things',
    score: 80,
    scoreDetails: [
      { label: 'Online Assignments', val: '23.1 / 25' },
      { label: 'Proctored Exam',     val: '57 / 75'   }
    ],
    credits: '4 Credits Recommended by NPTEL',
    date: 'Jan – Apr 2026',
    dateLbl: '12-week course',
    badge: '🏅 Elite · Verified',
    authority: 'Prof. Haimanti Banerji',
    authorityRole: 'Coordinator, NPTEL — IIT Kharagpur',
    verify: [
      { icon: 'fa-id-card',      text: 'NPTEL26CS38S1551300016' },
      { icon: 'fa-shield-alt',   text: 'Skill India · SWAYAM' },
      { icon: 'fa-users',        text: '20,896 candidates certified' }
    ],
    realImage: 'assets/cert_nptel_iiot.jpg'
  },
  nptel_iot: {
    theme: 'nptel',
    issuer: 'NPTEL · IIT Kharagpur',
    issuerSub: 'Funded by the Ministry of Education, Govt. of India',
    sealIcon: 'fa-award',
    certType: 'Elite Online Certification',
    recipient: 'THOTAKURA PAVAN',
    desc: 'for successfully completing the 12-week proctored online course',
    course: 'Introduction To Internet Of Things',
    score: 64,
    scoreDetails: [
      { label: 'Online Assignments', val: '15.63 / 25' },
      { label: 'Proctored Exam',     val: '48 / 75'   }
    ],
    credits: '3 or 4 Credits Recommended by NPTEL',
    date: 'Jan – Apr 2025',
    dateLbl: '12-week course',
    badge: '🏅 Elite · Verified',
    authority: 'Prof. Haimanti Banerji',
    authorityRole: 'Coordinator, NPTEL — IIT Kharagpur',
    verify: [
      { icon: 'fa-id-card',      text: 'NPTEL25CS44S453300512' },
      { icon: 'fa-shield-alt',   text: 'Skill India · SWAYAM' },
      { icon: 'fa-users',        text: '38,143 candidates certified' }
    ],
    realImage: 'assets/cert_nptel_iot.jpg'
  },

  unicef_ai: {
    theme: 'orange',
    issuer: 'UNICEF · YuWaah!',
    issuerSub: 'Passport to Earning Program',
    sealIcon: 'fa-robot',
    certType: 'Certificate of Completion',
    recipient: 'PAVAN THOTAKURA',
    desc: 'for successfully completing the course Digital Productivity with AI with a score of 100%',
    course: 'Digital Productivity with AI',
    score: 100,
    scoreDetails: [
      { label: 'Consolidated Score', val: '100% / 100%' }
    ],
    date: 'February 21, 2026',
    dateLbl: 'Date of Issue',
    badge: '✓ Completed · UNICEF',
    authority: 'Ms. Giorgia Varisco',
    authorityRole: 'Chief of Generation Unlimited (YuWaah), UNICEF',
    verify: [
      { icon: 'fa-shield-alt', text: 'Passport to Earning Verified' },
      { icon: 'fa-globe',      text: 'skills.myp2e.org' }
    ],
    realImage: 'assets/cert_unicef.jpg'
  },
  infosys: {
    theme: 'accent',
    issuer: 'Infosys Springboard',
    issuerSub: 'TechA Certification Program',
    sealIcon: 'fa-certificate',
    certType: 'Foundation Certification',
    recipient: '23471A04AY THOTAKURA PAVAN',
    desc: 'for successfully completing the TechA certification in Data Analytics using Power BI',
    course: 'TechA Data Analytics using Power BI Foundation Certification',
    date: 'December 17, 2025',
    dateLbl: 'Date of Issue',
    badge: '✓ Verified',
    authority: 'Infosys Springboard',
    authorityRole: 'Certification Authority',
    verify: [
      { icon: 'fa-shield-alt', text: 'Infosys Springboard · Verified' },
      { icon: 'fa-star',       text: 'TechA Program' }
    ],
    realImage: 'assets/cert_power_bi.png'
  },
  cloudtech: {
    theme: 'accent',
    issuer: 'Infosys Springboard',
    issuerSub: 'Course Completion Certificate',
    sealIcon: 'fa-cloud',
    certType: 'Course Completion Certificate',
    recipient: '23471A04AY THOTAKURA PAVAN',
    desc: 'for successfully completing the course Cloud Technologies',
    course: 'Cloud Technologies',
    date: 'March 23, 2026',
    dateLbl: 'Date of Issue',
    badge: '✓ Completed · Verified',
    authority: 'Infosys Springboard',
    authorityRole: 'Certification Program',
    verify: [
      { icon: 'fa-shield-alt', text: 'Infosys Springboard · Verified' },
      { icon: 'fa-globe',      text: 'verify.onwingspan.com' }
    ],
    realImage: 'assets/cert_cloud_tech.png'
  },
  datamodel: {
    theme: 'accent',
    issuer: 'Infosys Springboard',
    issuerSub: 'Course Completion Certificate',
    sealIcon: 'fa-database',
    certType: 'Course Completion Certificate',
    recipient: '23471A04AY THOTAKURA PAVAN',
    desc: 'for successfully completing the course Multidimensional Data Modeling',
    course: 'Multidimensional Data Modeling',
    date: 'December 12, 2025',
    dateLbl: 'Date of Issue',
    badge: '✓ Completed · Verified',
    authority: 'Infosys Springboard',
    authorityRole: 'Certification Program',
    verify: [
      { icon: 'fa-shield-alt', text: 'Infosys Springboard · Verified' },
      { icon: 'fa-globe',      text: 'verify.onwingspan.com' }
    ],
    realImage: 'assets/cert_datamodel.jpg'
  },
  powerbi_prof: {
    theme: 'accent',
    issuer: 'Infosys Springboard',
    issuerSub: 'Course Completion Certificate',
    sealIcon: 'fa-chart-line',
    certType: 'Course Completion Certificate',
    recipient: '23471A04AY THOTAKURA PAVAN',
    desc: 'for successfully completing the course Power BI for Business Professionals',
    course: 'Power BI for Business Professionals',
    date: 'December 16, 2025',
    dateLbl: 'Date of Issue',
    badge: '✓ Completed · Verified',
    authority: 'Infosys Springboard',
    authorityRole: 'Certification Program',
    verify: [
      { icon: 'fa-shield-alt', text: 'Infosys Springboard · Verified' },
      { icon: 'fa-globe',      text: 'verify.onwingspan.com' }
    ],
    realImage: 'assets/cert_power_bi_prof.png'
  },
  excel: {
    theme: 'accent',
    issuer: 'Infosys Springboard',
    issuerSub: 'Course Completion Certificate',
    sealIcon: 'fa-table',
    certType: 'Course Completion Certificate',
    recipient: '23471A04AY THOTAKURA PAVAN',
    desc: 'for successfully completing the course Excel',
    course: 'Excel',
    date: 'December 11, 2025',
    dateLbl: 'Date of Issue',
    badge: '✓ Completed · Verified',
    authority: 'Infosys Springboard',
    authorityRole: 'Certification Program',
    verify: [
      { icon: 'fa-shield-alt', text: 'Infosys Springboard · Verified' },
      { icon: 'fa-globe',      text: 'verify.onwingspan.com' }
    ],
    realImage: 'assets/cert_excel.png'
  },

  gradguru: {
    theme: 'gold',
    issuer: 'Grad Guru · IIT Hyderabad',
    issuerSub: 'E-Cell IIT Hyderabad Career Guidance Program',
    sealIcon: 'fa-lightbulb',
    certType: 'Certificate of Participation',
    recipient: 'THOTAKURA PAVAN',
    desc: 'for participation in the Career Guidance Session organized by "E-Cell IIT Hyderabad" in association with Gradguru Innovations',
    course: 'Career Guidance Session',
    date: 'August 10, 2025',
    dateLbl: 'Date of Session',
    badge: '✓ Participant · Verified',
    authority: 'Career Counsellor',
    authorityRole: 'GradGuru Innovation Team',
    verify: [
      { icon: 'fa-shield-alt', text: 'ISO 27001:2013 Certified Company' },
      { icon: 'fa-users',      text: 'GradGuru Innovations Partner' }
    ],
    realImage: 'assets/cert_gradguru.jpg'
  },

  learn_powerbi: {
    theme: 'accent',
    issuer: 'Infosys Springboard',
    issuerSub: 'Course Completion Certificate',
    sealIcon: 'fa-chart-pie',
    certType: 'Course Completion Certificate',
    recipient: '23471A04AY THOTAKURA PAVAN',
    desc: 'for successfully completing the course Learning Microsoft Power BI',
    course: 'Learning Microsoft Power BI',
    date: 'December 15, 2025',
    dateLbl: 'Date of Issue',
    badge: '✓ Completed · Verified',
    authority: 'Satheesha B. Nanjappa',
    authorityRole: 'SVP & Head — Education, Training & Assessment, Infosys',
    verify: [
      { icon: 'fa-shield-alt', text: 'Infosys Springboard · Verified' },
      { icon: 'fa-globe',      text: 'verify.onwingspan.com' }
    ],
    realImage: 'assets/cert_learn_powerbi.jpg'
  },

  intro_bi: {
    theme: 'accent',
    issuer: 'Infosys Springboard',
    issuerSub: 'Course Completion Certificate',
    sealIcon: 'fa-brain',
    certType: 'Course Completion Certificate',
    recipient: '23471A04AY THOTAKURA PAVAN',
    desc: 'for successfully completing the course Introduction to Business Intelligence',
    course: 'Introduction to Business Intelligence',
    date: 'December 12, 2025',
    dateLbl: 'Date of Issue',
    badge: '✓ Completed · Verified',
    authority: 'Satheesha B. Nanjappa',
    authorityRole: 'SVP & Head — Education, Training & Assessment, Infosys',
    verify: [
      { icon: 'fa-shield-alt', text: 'Infosys Springboard · Verified' },
      { icon: 'fa-globe',      text: 'verify.onwingspan.com' }
    ],
    realImage: 'assets/cert_intro_bi.jpg'
  },

  er_modeling: {
    theme: 'accent',
    issuer: 'Infosys Springboard',
    issuerSub: 'Course Completion Certificate',
    sealIcon: 'fa-project-diagram',
    certType: 'Course Completion Certificate',
    recipient: '23471A04AY THOTAKURA PAVAN',
    desc: 'for successfully completing the course Introduction to Entity Relationship ER Modeling',
    course: 'Introduction to Entity Relationship ER Modeling',
    date: 'December 12, 2025',
    dateLbl: 'Date of Issue',
    badge: '✓ Completed · Verified',
    authority: 'Satheesha B. Nanjappa',
    authorityRole: 'SVP & Head — Education, Training & Assessment, Infosys',
    verify: [
      { icon: 'fa-shield-alt', text: 'Infosys Springboard · Verified' },
      { icon: 'fa-globe',      text: 'verify.onwingspan.com' }
    ],
    realImage: 'assets/cert_er_modeling.jpg'
  },

  java_prog: {
    theme: 'accent',
    issuer: 'Infosys Springboard',
    issuerSub: 'Course Completion Certificate',
    sealIcon: 'fa-coffee',
    certType: 'Course Completion Certificate',
    recipient: '23471A04AY THOTAKURA PAVAN',
    desc: 'for successfully completing the course Programming using Java',
    course: 'Programming using Java',
    date: 'December 11, 2025',
    dateLbl: 'Date of Issue',
    badge: '✓ Completed · Verified',
    authority: 'Satheesha B. Nanjappa',
    authorityRole: 'SVP & Head — Education, Training & Assessment, Infosys',
    verify: [
      { icon: 'fa-shield-alt', text: 'Infosys Springboard · Verified' },
      { icon: 'fa-globe',      text: 'verify.onwingspan.com' }
    ],
    realImage: 'assets/cert_java.jpg'
  },

  gpt3_dev: {
    theme: 'accent',
    issuer: 'Infosys Springboard',
    issuerSub: 'Course Completion Certificate',
    sealIcon: 'fa-robot',
    certType: 'Course Completion Certificate',
    recipient: '23471A04AY THOTAKURA PAVAN',
    desc: 'for successfully completing the course OpenAI Generative Pre-trained Transformer 3 (GPT-3) for developers',
    course: 'OpenAI GPT-3 for Developers',
    date: 'December 11, 2025',
    dateLbl: 'Date of Issue',
    badge: '✓ Completed · Verified',
    authority: 'Satheesha B. Nanjappa',
    authorityRole: 'SVP & Head — Education, Training & Assessment, Infosys',
    verify: [
      { icon: 'fa-shield-alt', text: 'Infosys Springboard · Verified' },
      { icon: 'fa-globe',      text: 'verify.onwingspan.com' }
    ],
    realImage: 'assets/cert_gpt3.jpg'
  },

  data_science: {
    theme: 'accent',
    issuer: 'Infosys Springboard',
    issuerSub: 'Course Completion Certificate',
    sealIcon: 'fa-flask',
    certType: 'Course Completion Certificate',
    recipient: '23471A04AY THOTAKURA PAVAN',
    desc: 'for successfully completing the course Data Science',
    course: 'Data Science',
    date: 'December 17, 2025',
    dateLbl: 'Date of Issue',
    badge: '✓ Completed · Verified',
    authority: 'Satheesha B. Nanjappa',
    authorityRole: 'SVP & Head — Education, Training & Assessment, Infosys',
    verify: [
      { icon: 'fa-shield-alt', text: 'Infosys Springboard · Verified' },
      { icon: 'fa-globe',      text: 'verify.onwingspan.com' }
    ],
    realImage: 'assets/cert_data_science.jpg'
  },

  oop_python: {
    theme: 'accent',
    issuer: 'Infosys Springboard',
    issuerSub: 'Course Completion Certificate',
    sealIcon: 'fa-cube',
    certType: 'Course Completion Certificate',
    recipient: '23471A04AY THOTAKURA PAVAN',
    desc: 'for successfully completing the course Object Oriented Programming using Python',
    course: 'Object Oriented Programming using Python',
    date: 'December 11, 2025',
    dateLbl: 'Date of Issue',
    badge: '✓ Completed · Verified',
    authority: 'Satheesha B. Nanjappa',
    authorityRole: 'SVP & Head — Education, Training & Assessment, Infosys',
    verify: [
      { icon: 'fa-shield-alt', text: 'Infosys Springboard · Verified' },
      { icon: 'fa-globe',      text: 'verify.onwingspan.com' }
    ],
    realImage: 'assets/cert_oop_python.jpg'
  },

  big_data: {
    theme: 'accent',
    issuer: 'Infosys Springboard',
    issuerSub: 'Course Completion Certificate',
    sealIcon: 'fa-server',
    certType: 'Course Completion Certificate',
    recipient: '23471A04AY THOTAKURA PAVAN',
    desc: 'for successfully completing the course Big Data',
    course: 'Big Data',
    date: 'March 23, 2026',
    dateLbl: 'Date of Issue',
    badge: '✓ Completed · Verified',
    authority: 'Satheesha B. Nanjappa',
    authorityRole: 'SVP & Head — Education, Training & Assessment, Infosys',
    verify: [
      { icon: 'fa-shield-alt', text: 'Infosys Springboard · Verified' },
      { icon: 'fa-globe',      text: 'verify.onwingspan.com' }
    ],
    realImage: 'assets/cert_big_data.jpg'
  }
};

function openCertView(id) {
  const c = certDB[id];
  if (!c) return;

  const card = document.getElementById('cvCard');
  card.dataset.theme = c.theme || 'accent';

  const realImg = document.getElementById('cvRealImage');
  if (c.realImage) {
    realImg.src = c.realImage;
  } else {
    realImg.src = '';
  }

  // Show modal
  document.getElementById('certModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertView() {
  document.getElementById('certModal').classList.remove('active');
  document.body.style.overflow = '';
}

function openRealImageLightbox() {
  const realImg = document.getElementById('cvRealImage');
  if (realImg && realImg.src) {
    openLightbox(realImg.src);
  }
}

// Close on backdrop click or Escape
document.getElementById('certModal').addEventListener('click', e => {
  if (e.target === document.getElementById('certModal')) closeCertView();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCertView();
});
