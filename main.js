/* ===========================
   RIMPRO – main.js
   =========================== */

const COLORS = {
  gold:    '#C4922A',
  silber:  '#B8B8B8',
  schwarz: '#2A2A2A',
  weiss:   '#E8E4DC'
};

let currentStyle = 'sport';
let currentColor = 'gold';
let wheelPositions = [];
let carImage = null;
let numRads = 4;

/* ===========================
   RIM DRAWING FUNCTIONS
   =========================== */
function drawRim(ctx, x, y, r, style, colorKey) {
  const c = COLORS[colorKey] || COLORS.gold;

  // Tire (black outer ring)
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = '#111';
  ctx.fill();

  // Tire detail ring
  ctx.beginPath();
  ctx.arc(x, y, r * 0.88, 0, Math.PI * 2);
  ctx.strokeStyle = '#2A2A2A';
  ctx.lineWidth = r * 0.10;
  ctx.stroke();

  const rr = r * 0.72; // rim radius

  if (style === 'sport')    drawSport(ctx, x, y, rr, c);
  if (style === 'elegance') drawElegance(ctx, x, y, rr, c);
  if (style === 'multi')    drawMulti(ctx, x, y, rr, c);
  if (style === 'offroad')  drawOffroad(ctx, x, y, rr, c);

  // Center cap
  ctx.beginPath();
  ctx.arc(x, y, rr * 0.14, 0, Math.PI * 2);
  ctx.fillStyle = c;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y, rr * 0.07, 0, Math.PI * 2);
  ctx.fillStyle = '#111';
  ctx.fill();
}

function drawSport(ctx, x, y, r, c) {
  // Dark background
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = '#1C0F08';
  ctx.fill();

  // 5 trapezoid spokes
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(-r * 0.13, r * 0.17);
    ctx.lineTo(-r * 0.22, r * 0.90);
    ctx.lineTo(r * 0.22, r * 0.90);
    ctx.lineTo(r * 0.13, r * 0.17);
    ctx.closePath();
    ctx.fillStyle = c;
    ctx.fill();
    ctx.restore();
  }

  // Outer ring
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.strokeStyle = c;
  ctx.lineWidth = r * 0.07;
  ctx.stroke();

  // Inner dark hub
  ctx.beginPath();
  ctx.arc(x, y, r * 0.20, 0, Math.PI * 2);
  ctx.fillStyle = '#1C0F08';
  ctx.fill();
}

function drawElegance(ctx, x, y, r, c) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = '#1C0F08';
  ctx.fill();

  // 10 thin spokes
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(-r * 0.07, r * 0.20);
    ctx.lineTo(-r * 0.11, r * 0.90);
    ctx.lineTo(r * 0.11, r * 0.90);
    ctx.lineTo(r * 0.07, r * 0.20);
    ctx.closePath();
    ctx.fillStyle = c;
    ctx.fill();
    ctx.restore();
  }

  // Rings at 3 positions
  [0.90, 0.55, 0.26].forEach(ratio => {
    ctx.beginPath();
    ctx.arc(x, y, r * ratio, 0, Math.PI * 2);
    ctx.strokeStyle = c;
    ctx.lineWidth = r * 0.06;
    ctx.stroke();
  });
}

function drawMulti(ctx, x, y, r, c) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = '#1C0F08';
  ctx.fill();

  // 18 alternating-length spokes
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2;
    const long = i % 2 === 0;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(-r * 0.05, r * 0.22);
    ctx.lineTo(-r * 0.07, long ? r * 0.88 : r * 0.62);
    ctx.lineTo(r * 0.07, long ? r * 0.88 : r * 0.62);
    ctx.lineTo(r * 0.05, r * 0.22);
    ctx.closePath();
    ctx.fillStyle = c;
    ctx.fill();
    ctx.restore();
  }

  // Rings
  [0.90, 0.62, 0.27].forEach(ratio => {
    ctx.beginPath();
    ctx.arc(x, y, r * ratio, 0, Math.PI * 2);
    ctx.strokeStyle = c;
    ctx.lineWidth = r * 0.055;
    ctx.stroke();
  });
}

function drawOffroad(ctx, x, y, r, c) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = '#1C0F08';
  ctx.fill();

  // 6 chunky spokes
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 6;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(-r * 0.18, r * 0.17);
    ctx.lineTo(-r * 0.25, r * 0.87);
    ctx.lineTo(r * 0.25, r * 0.87);
    ctx.lineTo(r * 0.18, r * 0.17);
    ctx.closePath();
    ctx.fillStyle = c;
    ctx.fill();
    // Center line detail
    ctx.strokeStyle = '#1C0F08';
    ctx.lineWidth = r * 0.04;
    ctx.beginPath();
    ctx.moveTo(0, r * 0.22);
    ctx.lineTo(0, r * 0.83);
    ctx.stroke();
    ctx.restore();
  }

  // Heavy outer ring
  ctx.beginPath();
  ctx.arc(x, y, r * 0.88, 0, Math.PI * 2);
  ctx.strokeStyle = c;
  ctx.lineWidth = r * 0.12;
  ctx.stroke();

  // Hex center
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const hr = r * 0.24;
    i === 0 ? ctx.moveTo(Math.cos(a)*hr, Math.sin(a)*hr) : ctx.lineTo(Math.cos(a)*hr, Math.sin(a)*hr);
  }
  ctx.closePath();
  ctx.fillStyle = c;
  ctx.fill();
  ctx.restore();
}

/* ===========================
   HERO RIM ANIMATION
   =========================== */
function initHeroRim() {
  const canvas = document.getElementById('hero-rim');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let angle = 0;

  function draw() {
    ctx.clearRect(0, 0, 320, 320);
    ctx.save();
    ctx.translate(160, 160);
    ctx.rotate(angle);
    ctx.translate(-160, -160);
    drawRim(ctx, 160, 160, 140, 'sport', 'gold');
    ctx.restore();
    angle += 0.008;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ===========================
   KONFIGURATOR CANVAS
   =========================== */
function initKonfigurator() {
  const canvas = document.getElementById('konfigurator-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const hint = document.getElementById('canvas-hint');

  function drawBackground() {
    // Sky gradient
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#EFE0C4');
    grad.addColorStop(1, '#D9C4A0');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Road
    ctx.fillStyle = '#2C1A0E';
    ctx.fillRect(0, H * 0.78, W, H * 0.22);

    // Road marking
    ctx.strokeStyle = '#C4922A';
    ctx.lineWidth = 3;
    ctx.setLineDash([50, 25]);
    ctx.beginPath();
    ctx.moveTo(0, H * 0.89);
    ctx.lineTo(W, H * 0.89);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function drawCarSilhouette() {
    const gY = H * 0.78;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.ellipse(W * 0.5, gY + 6, W * 0.36, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    const carColor = '#C8B498';
    const strokeC = '#8B6030';

    // Car body
    ctx.fillStyle = carColor;
    ctx.strokeStyle = strokeC;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(W*0.08, gY);
    ctx.lineTo(W*0.08, gY - H*0.24);
    ctx.bezierCurveTo(W*0.08, gY-H*0.24, W*0.17, gY-H*0.50, W*0.27, gY-H*0.54);
    ctx.bezierCurveTo(W*0.37, gY-H*0.58, W*0.63, gY-H*0.58, W*0.73, gY-H*0.52);
    ctx.bezierCurveTo(W*0.83, gY-H*0.46, W*0.92, gY-H*0.24, W*0.92, gY-H*0.24);
    ctx.lineTo(W*0.92, gY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Windows
    ctx.fillStyle = 'rgba(120, 170, 220, 0.42)';
    ctx.strokeStyle = strokeC;
    ctx.lineWidth = 1.5;

    // Rear window
    ctx.beginPath();
    ctx.moveTo(W*0.27, gY-H*0.54);
    ctx.lineTo(W*0.18, gY-H*0.46);
    ctx.lineTo(W*0.15, gY-H*0.24);
    ctx.lineTo(W*0.29, gY-H*0.24);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Middle window
    ctx.beginPath();
    ctx.rect(W*0.30, gY-H*0.55, W*0.40, H*0.31);
    ctx.fill(); ctx.stroke();

    // Front window
    ctx.beginPath();
    ctx.moveTo(W*0.73, gY-H*0.52);
    ctx.lineTo(W*0.82, gY-H*0.46);
    ctx.lineTo(W*0.86, gY-H*0.24);
    ctx.lineTo(W*0.71, gY-H*0.24);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Door line
    ctx.strokeStyle = 'rgba(100,70,30,0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(W*0.50, gY-H*0.24);
    ctx.lineTo(W*0.50, gY);
    ctx.stroke();

    // Headlight
    ctx.fillStyle = '#FFF5D6';
    ctx.strokeStyle = '#C4922A';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(W*0.895, gY-H*0.17, W*0.022, H*0.040, -0.35, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();

    // Taillight
    ctx.fillStyle = '#CC3322';
    ctx.strokeStyle = '#880000';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(W*0.105, gY-H*0.17, W*0.022, H*0.040, 0.35, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();

    // Wheel arches
    ctx.fillStyle = carColor;
    ctx.strokeStyle = strokeC;
    ctx.lineWidth = 2;
    [[W*0.74, gY], [W*0.26, gY]].forEach(([wx, wy]) => {
      ctx.beginPath();
      ctx.arc(wx, wy, W*0.092, Math.PI, 0);
      ctx.fill(); ctx.stroke();
    });
  }

  function redraw() {
    ctx.clearRect(0, 0, W, H);

    if (carImage) {
      // User uploaded a photo
      ctx.drawImage(carImage, 0, 0, W, H);
    } else {
      drawBackground();
      drawCarSilhouette();
    }

    // Draw placed wheels
    wheelPositions.forEach(pos => {
      drawRim(ctx, pos.x, pos.y, pos.r, currentStyle, currentColor);
    });

    // Instruction overlay if no wheels placed yet
    if (wheelPositions.length === 0 && !carImage) {
      ctx.fillStyle = 'rgba(28,15,8,0.55)';
      ctx.beginPath();
      ctx.roundRect(W/2 - 200, H/2 - 22, 400, 44, 22);
      ctx.fill();
      ctx.fillStyle = '#EFE0C4';
      ctx.font = 'bold 15px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('👆 Klicke auf die Räder des Autos', W/2, H/2 + 5);
    }
  }

  // Click to place rim
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const r = carImage ? 55 : 42;

    if (wheelPositions.length < 4) {
      wheelPositions.push({ x, y, r });
    } else {
      // Cycle: replace oldest
      wheelPositions.shift();
      wheelPositions.push({ x, y, r });
    }
    if (hint) hint.style.opacity = '0';
    redraw();
  });

  // Rim style buttons
  document.querySelectorAll('.rim-style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rim-style-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentStyle = btn.dataset.style;
      redraw();
      drawAllPreviews();
    });
  });

  // Color buttons
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentColor = btn.dataset.color;
      redraw();
      drawAllPreviews();
    });
  });

  // Reset wheels
  document.getElementById('reset-wheels').addEventListener('click', () => {
    wheelPositions = [];
    if (hint) hint.style.opacity = '1';
    redraw();
  });

  // Download
  document.getElementById('download-config').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'meine-traumfelgen.png';
    link.href = canvas.toDataURL();
    link.click();
  });

  // Car upload
  document.getElementById('car-upload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        carImage = img;
        wheelPositions = [];
        if (hint) { hint.style.opacity = '1'; hint.querySelector('span').textContent = '👆 Klicke auf deine Felgen im Foto um sie auszutauschen'; }
        redraw();
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });

  redraw();
}

/* ===========================
   RIM PREVIEW THUMBNAILS
   =========================== */
function drawAllPreviews() {
  document.querySelectorAll('.rim-preview').forEach(canvas => {
    const ctx = canvas.getContext('2d');
    const style = canvas.dataset.style;
    ctx.clearRect(0, 0, 70, 70);
    drawRim(ctx, 35, 35, 32, style, currentColor);
  });

  document.querySelectorAll('.felge-canvas').forEach(canvas => {
    const ctx = canvas.getContext('2d');
    const style = canvas.dataset.style;
    const color = canvas.dataset.color;
    ctx.clearRect(0, 0, 140, 140);
    ctx.fillStyle = 'transparent';
    drawRim(ctx, 70, 70, 60, style, color);
  });
}

/* ===========================
   HERO RIM THUMBNAIL
   =========================== */
function drawHeroRimStatic() {
  // Rotate slowly with requestAnimationFrame
}

/* ===========================
   PREISRECHNER
   =========================== */
function initPreisrechner() {
  const checks = document.querySelectorAll('.service-check');
  const radBtns = document.querySelectorAll('.rad-btn');
  const breakdown = document.getElementById('rechner-breakdown');
  const totalEl = document.getElementById('total-price');

  radBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      radBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      numRads = parseInt(btn.dataset.rads);
      update();
    });
  });

  checks.forEach(c => c.addEventListener('change', update));

  function update() {
    let total = 0;
    const lines = [];

    checks.forEach(c => {
      if (!c.checked) return;
      const price = parseFloat(c.dataset.price);
      const perRad = c.dataset.perRad === 'true';
      const label = c.closest('.service-item').querySelector('strong').textContent;
      const subtotal = perRad ? price * numRads : price;
      total += subtotal;
      const detail = perRad ? `${price} € × ${numRads} Räder` : 'pauschal';
      lines.push(`<div class="breakdown-line"><span>${label}</span><span><small>${detail}</small> = <strong>${subtotal.toFixed(2)} €</strong></span></div>`);
    });

    breakdown.innerHTML = lines.length
      ? lines.join('')
      : '<p class="rechner-empty">Wähle einen oder mehrere Services links aus.</p>';

    totalEl.textContent = total.toFixed(2).replace('.', ',') + ' €';
  }
}

/* ===========================
   GALERIE FILTER
   =========================== */
function initGalerie() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.galerie-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(card => {
        card.classList.toggle('hidden', f !== 'alle' && card.dataset.category !== f);
      });
    });
  });
}

/* ===========================
   TESTIMONIALS CAROUSEL
   =========================== */
function initTestimonials() {
  const track = document.getElementById('testimonials-track');
  const dotsWrap = document.getElementById('testimonial-dots');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  let current = 0;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(n) {
    current = (n + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  document.getElementById('prev-testimonial').addEventListener('click', () => goTo(current - 1));
  document.getElementById('next-testimonial').addEventListener('click', () => goTo(current + 1));

  // Auto-advance every 5s
  setInterval(() => goTo(current + 1), 5000);
}

/* ===========================
   TERMIN FORM
   =========================== */
function initTerminForm() {
  const form = document.getElementById('termin-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  // Set min date to today
  const dateInput = document.getElementById('wunschdatum');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real project: send data to a backend/Formspree
    form.style.opacity = '0.5';
    form.style.pointerEvents = 'none';
    success.style.display = 'block';
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

/* ===========================
   NAVBAR SCROLL
   =========================== */
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  document.getElementById('hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.remove('open');
    });
  });
}

/* ===========================
   SCROLL ANIMATIONS
   =========================== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.galerie-card, .testimonial-card, .why-card, .service-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

/* ===========================
   BOOT
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroRim();
  initKonfigurator();
  drawAllPreviews();
  initPreisrechner();
  initGalerie();
  initTestimonials();
  initTerminForm();
  initScrollAnimations();
});
