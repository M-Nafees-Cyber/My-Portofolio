/*
  LONEWOLF Portfolio Interactive Script
  - Animated Particle Background
  - Terminal Typewriter Shell Effect
  - Scroll Animations (IntersectionObserver)
  - Blog Filtering System
  - Blog Post Reader Modal
  - Mobile Menu Navigation
*/

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initNavbar();
  initTypewriter();
  initScrollAnimations();
  initBlogFilters();
  initBlogModals();
});

/* -------------------------------------------------------------
   1. Animated Background Canvas (Particle Network Matrix)
------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.floor(width < 768 ? 35 : 75);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw particle connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 255, 65, ${0.15 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 65, ${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00FF41';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* -------------------------------------------------------------
   2. Navbar & Mobile Menu Navigation
------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  hamburger?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Set active menu item based on current page URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* -------------------------------------------------------------
   3. Terminal Typewriter Animation (Hero Shell Prompt)
------------------------------------------------------------- */
function initTypewriter() {
  const terminalElement = document.getElementById('terminal-content');
  if (!terminalElement) return;

  const sequence = [
    { type: 'cmd', text: '$ whoami' },
    { type: 'output', text: 'Mohamed Nafees' },
    { type: 'cmd', text: '$ cat mission.txt' },
    { type: 'output', text: 'Aspiring SOC Analyst & Security Researcher' },
    { type: 'cmd', text: '$ echo $STATUS' },
    { type: 'output-highlight', text: 'ACTIVELY LEARNING' }
  ];

  let seqIndex = 0;

  function typeNext() {
    if (seqIndex >= sequence.length) return;

    const item = sequence[seqIndex];
    const lineDiv = document.createElement('div');
    lineDiv.className = 'terminal-line';

    if (item.type === 'cmd') {
      lineDiv.innerHTML = `<span class="terminal-prompt">lone@operator:~$</span> <span class="terminal-cmd"></span><span class="cursor"></span>`;
      terminalElement.appendChild(lineDiv);
      const cmdSpan = lineDiv.querySelector('.terminal-cmd');
      const cursor = lineDiv.querySelector('.cursor');
      const textToType = item.text.replace('$ ', '');

      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < textToType.length) {
          cmdSpan.textContent += textToType.charAt(charIndex);
          charIndex++;
        } else {
          clearInterval(typeInterval);
          cursor.remove();
          seqIndex++;
          setTimeout(typeNext, 400);
        }
      }, 65);
    } else {
      const isHighlight = item.type === 'output-highlight';
      lineDiv.innerHTML = `<div class="terminal-output ${isHighlight ? 'terminal-output-highlight' : ''}">${item.text}</div>`;
      terminalElement.appendChild(lineDiv);
      seqIndex++;
      setTimeout(typeNext, 500);
    }
  }

  typeNext();
}

/* -------------------------------------------------------------
   4. Intersection Observer Scroll Animations
------------------------------------------------------------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-in, .glass-card, .section-title').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

/* -------------------------------------------------------------
   5. Blog Filter Buttons (blog.html)
------------------------------------------------------------- */
function initBlogFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      blogCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* -------------------------------------------------------------
   6. Blog Post Modal Reader
------------------------------------------------------------- */
const blogPostsData = {
  'meow': {
    title: 'How I Pwned My First HTB Machine — MEOW',
    category: 'CTF',
    badge: 'MEOW ✅',
    date: 'August 2026',
    author: 'Mohamed Nafees (LONEWOLF)',
    content: `
      <p>My first target on Hack The Box Starting Point was <strong>MEOW</strong>. Although it's classified as Very Easy, the methodology learned during this box laid the foundation for systematic target enumeration.</p>
      
      <h4>1. Reconnaissance & Port Scanning</h4>
      <p>I initiated an Nmap scan against the target IP address to discover open ports and running services:</p>
      <div class="code-block">nmap -sV -sC -oN meow_scan.txt [TARGET_IP]</div>
      <p>The scan revealed port <strong>23/tcp (Telnet)</strong> open.</p>

      <h4>2. Exploitation</h4>
      <p>Telnet is an unencrypted, legacy remote shell protocol. I connected to the target port via netcat / telnet client:</p>
      <div class="code-block">telnet [TARGET_IP] 23</div>
      <p>Prompted for login, I tested common default accounts. Entering <code>root</code> with no password immediately granted interactive root access to the target host!</p>

      <h4>3. Key Lessons Learned</h4>
      <ul>
        <li>Never expose legacy unencrypted management services like Telnet to untrusted networks.</li>
        <li>Default credentials and blank passwords remain a top security risk in legacy deployments.</li>
        <li>Proper Nmap service enumeration saves hours of blind guessing.</li>
      </ul>
    `
  },
  'otw': {
    title: 'OTW Bandit Levels 0-11: What I Learned',
    category: 'CTF',
    badge: 'OTW 🏆',
    date: 'August 2026',
    author: 'Mohamed Nafees (LONEWOLF)',
    content: `
      <p>Completing OverTheWire (OTW) Bandit levels 0 through 11 was an essential hands-on deep dive into Linux command-line mechanics, file permissions, decoding schemes, and system navigation.</p>

      <h4>Key Level Breakdown & Core Commands</h4>
      <ul>
        <li><strong>Level 0-3:</strong> File reading and hidden files (<code>cat</code>, <code>ls -la</code>, handling files with spaces/dashes <code>./-file</code>).</li>
        <li><strong>Level 4-7:</strong> Finding specific human-readable files by size and properties (<code>file *</code>, <code>find . -type f -size 1033c</code>, <code>grep</code>).</li>
        <li><strong>Level 8-9:</strong> Data processing and deduplication (<code>sort | uniq -u</code>, extracting readable strings from binary files using <code>strings</code>).</li>
        <li><strong>Level 10-11:</strong> Base64 decoding (<code>base64 -d</code>) and ROT13 cipher decryption using <code>tr 'A-Za-0-9'</code>.</li>
      </ul>

      <h4>Key Takeaway</h4>
      <p>Linux CLI fluently is non-negotiable for modern cybersecurity operators. Knowing how to filter, parse, and pipe data efficiently is 80% of a SOC Analyst's day-to-day work when analyzing log streams.</p>
    `
  },
  'kali': {
    title: 'Building a Hacker Terminal on Kali Linux',
    category: 'LINUX',
    badge: 'KALI 🐧',
    date: 'August 2026',
    author: 'Mohamed Nafees (LONEWOLF)',
    content: `
      <p>A look at how I customized my default Kali Linux installation into a fully equipped, high-efficiency operator workstation tailored for CTF speed and log analysis.</p>

      <h4>Customizations & Tooling Included:</h4>
      <ul>
        <li><strong>Zsh + Oh-My-Zsh:</strong> Installed custom terminal themes with active OpenVPN IP status prompt, fast command auto-suggestions, and syntax highlighting.</li>
        <li><strong>Conky System HUD:</strong> Desktop widget displaying real-time CPU/RAM usage, network traffic throughput, active OpenVPN tunnel details, and listening ports.</li>
        <li><strong>Tmux Matrix Config:</strong> Multi-pane terminal split workflow for concurrent Nmap scanning, packet capturing, and note taking.</li>
        <li><strong>Custom Bash Aliases:</strong> Quick shortcuts for standard Nmap profile commands, web dir busting with Gobuster, and python HTTP server spinning.</li>
      </ul>
    `
  },
  'zara': {
    title: 'What is Project ZARA? My Personal AI Journey',
    category: 'AI',
    badge: 'ZARA 🤖',
    date: 'August 2026',
    author: 'Mohamed Nafees (LONEWOLF)',
    content: `
      <p>Project ZARA is my custom-built, local-first artificial intelligence assistant developed in Python. Designed to run offline without cloud subscriptions or third-party telemetry, ZARA serves as my automated cyber intel research companion.</p>

      <h4>Features & Capabilities:</h4>
      <ul>
        <li><strong>Local LLM Backend:</strong> Powered by quantized GGUF models running locally on device via llama-cpp-python.</li>
        <li><strong>Cyber Recon Automation:</strong> Natural language interface to parse Nmap XML outputs, generate report summaries, and lookup CVE details.</li>
        <li><strong>Voice & Command Interface:</strong> Offline STT/TTS modules for seamless hands-free operation.</li>
      </ul>
    `
  },
  'soc': {
    title: 'SOC Analyst Fundamentals: Incident Response & Threat Hunting',
    category: 'SECURITY',
    badge: 'SOC 🛡️',
    date: 'August 2026',
    author: 'Mohamed Nafees (LONEWOLF)',
    content: `
      <p>Insights gathered during my BSc Cybersecurity & Digital Forensics degree at Kingston University London and my preparation as an ISC² Candidate.</p>

      <h4>Core Pillars of Blue Teaming</h4>
      <ul>
        <li><strong>Log Aggregation & SIEM:</strong> Understanding Windows Event Logs (Sysmon, Event ID 4624, 4625), Linux Syslog, and web server access logs.</li>
        <li><strong>Incident Response Lifecycle:</strong> Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned.</li>
        <li><strong>Threat Hunting:</strong> Proactively searching for adversary TTPs mapped to the MITRE ATT&CK framework.</li>
      </ul>
    `
  }
};

function initBlogModals() {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.innerHTML = `
    <div class="modal-content glass-card">
      <button class="modal-close">&times;</button>
      <div id="modal-body"></div>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  const modalBody = modalOverlay.querySelector('#modal-body');
  const closeBtn = modalOverlay.querySelector('.modal-close');

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
  }

  document.querySelectorAll('[data-post-id]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const postId = trigger.getAttribute('data-post-id');
      const post = blogPostsData[postId];

      if (post) {
        modalBody.innerHTML = `
          <div style="margin-bottom: 1.5rem;">
            <span class="badge badge-active">${post.badge}</span>
            <span class="muted-text" style="font-family: var(--font-mono); margin-left: 10px; font-size: 0.85rem;">${post.date} | By ${post.author}</span>
          </div>
          <h2 class="gradient-text" style="font-size: 1.8rem; margin-bottom: 1rem;">${post.title}</h2>
          <div style="color: var(--text-main); font-size: 0.98rem; line-height: 1.7;">
            ${post.content}
          </div>
        `;
        modalOverlay.classList.add('active');
      }
    });
  });
}
