// ===== Language Switcher =====
let currentLang = 'en';

function setLang(lang) {
    currentLang = lang;
    
    // Update buttons
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-fr').classList.toggle('active', lang === 'fr');
    
    // Update all elements with data-en and data-fr
    document.querySelectorAll('[data-en][data-fr]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });
    
    // Update typing texts
    typingTexts = lang === 'en' ? textsEN : textsFR;
    textIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typingElement.textContent = '';
}

// ===== Typing Animation =====
const textsEN = [
    "Building the web, one pixel at a time",
    "Dark mode enthusiast",
    "From Boumerdès, Algeria",
    "Learning & building every day"
];

const textsFR = [
    "Construire le web, un pixel à la fois",
    "Amateur du mode sombre",
    "De Boumerdès, Algérie",
    "Apprendre & construire chaque jour"
];

let typingTexts = textsEN;
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing');

function type() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
}

type();

// ===== Scroll Animation =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { 
    threshold: 0.08,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Projects Card Hover Effect (3D Tilt) =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `translateY(-12px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== Console Welcome =====
console.log('%c🚀 Welcome to Nadir Salaheddine Portfolio!', 'color:#f0a500; font-size:16px; font-weight:bold;');
console.log('%c📧 Contact: salah.abahri2010@gmail.com', 'color:#79c0ff; font-size:13px;');
console.log('%c💻 Projects Section loaded with 6 cards!', 'color:#7ee787; font-size:13px;');