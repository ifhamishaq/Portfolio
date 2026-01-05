// ===================================
// Portfolio JavaScript - Ifham Ishaq
// ===================================

// Initialize Lucide Icons
lucide.createIcons();

// --- Configuration ---
const CONFIG = {
    particleCount: window.innerWidth < 768 ? 500 : 1000, // Reduce particles on mobile
    particleSize: 0.015,
    particleColor: 0x3b82f6,
};

// --- 1. Preloader ---
const hidePreloader = () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    }
};

// --- 2. WebGL Background (Three.js) ---
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const posArray = new Float32Array(CONFIG.particleCount * 3);

        for (let i = 0; i < CONFIG.particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 12;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const material = new THREE.PointsMaterial({
            size: CONFIG.particleSize,
            color: CONFIG.particleColor,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);

        camera.position.z = 3;

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;

        // Throttled event listener
        let timeout;
        document.addEventListener('mousemove', (event) => {
            if (timeout) return;
            timeout = setTimeout(() => {
                mouseX = event.clientX / window.innerWidth - 0.5;
                mouseY = event.clientY / window.innerHeight - 0.5;
                timeout = null;
            }, 10);
        });

        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.0005;
            particlesMesh.rotation.x += 0.0002;
            particlesMesh.rotation.x += mouseY * 0.02;
            particlesMesh.rotation.y += mouseX * 0.02;
            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    } catch (error) {
        console.error('Three.js initialization failed:', error);
    }
};

// --- 3. Video Modal Logic ---
const modal = document.getElementById('video-modal');
const iframe = document.getElementById('modal-iframe');

function openModal(videoUrl) {
    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        document.body.classList.add('modal-open');
        iframe.src = videoUrl;
    });
}

function closeModal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
        modal.classList.add('hidden');
        iframe.src = '';
    }, 300);
}

// Close modal on click outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
    if (e.key === 'Escape' && imageModal && !imageModal.classList.contains('hidden')) {
        closeImageModal();
    }
});

// --- 3b. Image Modal Logic ---
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');

function openImageModal(imageSrc) {
    if (!imageModal) {
        // Create image modal if it doesn't exist
        const modalHTML = `
            <div id="image-modal" class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300">
                <button onclick="closeImageModal()" class="absolute top-4 right-4 p-3 bg-primary border-4 border-dark hover:bg-secondary transition-colors z-10">
                    <i data-lucide="x" class="w-6 h-6 text-white"></i>
                </button>
                <img id="modal-image" src="" alt="Full size image" class="max-w-full max-h-full object-contain border-4 border-dark shadow-retro-lg">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        lucide.createIcons(); // Reinitialize icons

        // Get references after creating
        window.imageModal = document.getElementById('image-modal');
        window.modalImage = document.getElementById('modal-image');
    }

    window.imageModal.classList.remove('hidden');
    requestAnimationFrame(() => {
        window.imageModal.classList.remove('opacity-0', 'pointer-events-none');
        document.body.classList.add('modal-open');
        window.modalImage.src = imageSrc;
    });
}

function closeImageModal() {
    if (!window.imageModal) return;
    window.imageModal.classList.add('opacity-0', 'pointer-events-none');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
        window.imageModal.classList.add('hidden');
        window.modalImage.src = '';
    }, 300);
}

// Close image modal on click outside
if (imageModal) {
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) closeImageModal();
    });
}


// --- 4. Mobile Navigation ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavLinks = document.querySelectorAll('#mobile-nav a');

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('modal-open');
    });

    // Close mobile nav when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('modal-open');
        });
    });
}

// --- 5. Scroll Progress Indicator ---
const updateScrollProgress = () => {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;

    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
};

window.addEventListener('scroll', updateScrollProgress);

// --- 6. Active Navigation State ---
const updateActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveNav);

// --- 7. Smooth Scroll with Offset ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// --- 8. Number Counter Logic ---
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter-value');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1500;
        const increment = target / (duration / 16);

        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
};

// --- 9. GSAP Animations ---
const initGSAP = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text
    const tl = gsap.timeline();
    tl.from(".reveal-hero", {
        duration: 1.2,
        y: 120,
        opacity: 0,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2
    })
        .to(".reveal-text", {
            duration: 0.8,
            opacity: 1,
            y: 0,
            stagger: 0.1
        }, "-=0.5");

    // About Section - Image stays static (parallax removed for better focus)
    // Removed parallax effect to keep the portrait image static and professional

    // Skills Reveal
    gsap.from("#skills .glass-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        scrollTrigger: {
            trigger: "#skills",
            start: "top 75%",
        }
    });

    // Work Grid Reveal
    gsap.from("#work .group", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: "#work",
            start: "top 70%",
        }
    });

    // Trigger Counters
    ScrollTrigger.create({
        trigger: "#results",
        start: "top 75%",
        once: true,
        onEnter: () => animateCounters()
    });
};

// --- 10. Lazy Load Images ---
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => img.classList.add('loaded'));
    }
};

// --- 11. Contact Form Handler ---
const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Here you would typically send to a backend or service like Formspree
        // For now, we'll use mailto as fallback
        const mailtoLink = `mailto:ifham.wani89@gmail.com?subject=${encodeURIComponent(data.subject || 'Portfolio Contact')}&body=${encodeURIComponent(data.message)}`;
        window.location.href = mailtoLink;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            form.reset();
        }, 2000);
    });
};

// --- 12. Gallery Modal (for thumbnails) ---
function openGallery(images) {
    // This would open a gallery modal with multiple images
    // Implementation depends on your specific needs
    console.log('Gallery feature - to be implemented with actual images');
}

// --- 13. Custom Cursor Animation ---
const initCustomCursor = () => {
    // Only run on desktop devices
    if (window.innerWidth <= 768) return;

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows cursor immediately
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth follow animation for outline using GSAP
    const animateOutline = () => {
        // Lerp (linear interpolation) for smooth following
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateOutline);
    };
    animateOutline();

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [onclick], .cursor-pointer, input, textarea');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });

    // Add click animation
    document.addEventListener('mousedown', () => {
        cursorDot.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        cursorDot.classList.remove('click');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.classList.add('hidden');
        cursorOutline.classList.add('hidden');
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.classList.remove('hidden');
        cursorOutline.classList.remove('hidden');
    });
};

// --- 14. Slideshow Controls ---
let currentVideoSlide = 0;
let currentThumbnailSlide = 0;

// Video Carousel Functions
function slideVideo(direction) {
    const carousel = document.getElementById('video-carousel');
    const slides = carousel.children;
    const totalSlides = slides.length;

    currentVideoSlide = (currentVideoSlide + direction + totalSlides) % totalSlides;
    updateVideoCarousel();
}

function goToVideoSlide(index) {
    currentVideoSlide = index;
    updateVideoCarousel();
}

function updateVideoCarousel() {
    const carousel = document.getElementById('video-carousel');
    const indicators = document.querySelectorAll('.video-indicator');

    carousel.style.transform = `translateX(-${currentVideoSlide * 100}%)`;

    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentVideoSlide) {
            indicator.classList.remove('bg-white/30');
            indicator.classList.add('bg-white/50');
        } else {
            indicator.classList.remove('bg-white/50');
            indicator.classList.add('bg-white/30');
        }
    });
}

// Thumbnail Carousel Functions
function slideThumbnail(direction) {
    const carousel = document.getElementById('thumbnail-carousel');
    const slides = carousel.children;
    const totalSlides = slides.length;

    currentThumbnailSlide = (currentThumbnailSlide + direction + totalSlides) % totalSlides;
    updateThumbnailCarousel();
}

function goToThumbnailSlide(index) {
    currentThumbnailSlide = index;
    updateThumbnailCarousel();
}

function updateThumbnailCarousel() {
    const carousel = document.getElementById('thumbnail-carousel');
    const indicators = document.querySelectorAll('.thumbnail-indicator');

    carousel.style.transform = `translateX(-${currentThumbnailSlide * 100}%)`;

    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentThumbnailSlide) {
            indicator.classList.remove('bg-red-500/30');
            indicator.classList.add('bg-red-500/50');
        } else {
            indicator.classList.remove('bg-red-500/50');
            indicator.classList.add('bg-red-500/30');
        }
    });
}

// Auto-advance slideshows (optional)
let videoAutoPlay, thumbnailAutoPlay;

function startAutoPlay() {
    // Auto-advance video carousel every 5 seconds
    videoAutoPlay = setInterval(() => {
        slideVideo(1);
    }, 5000);

    // Auto-advance thumbnail carousel every 6 seconds
    thumbnailAutoPlay = setInterval(() => {
        slideThumbnail(1);
    }, 6000);
}

function stopAutoPlay() {
    clearInterval(videoAutoPlay);
    clearInterval(thumbnailAutoPlay);
}

// Pause auto-play on hover
document.addEventListener('DOMContentLoaded', () => {
    const videoSection = document.getElementById('videos');
    const thumbnailSection = document.getElementById('thumbnails');

    if (videoSection) {
        videoSection.addEventListener('mouseenter', stopAutoPlay);
        videoSection.addEventListener('mouseleave', startAutoPlay);
    }

    if (thumbnailSection) {
        thumbnailSection.addEventListener('mouseenter', stopAutoPlay);
        thumbnailSection.addEventListener('mouseleave', startAutoPlay);
    }
});

// --- 15. Blur Reveal on Scroll ---
const initBlurReveal = () => {
    const revealElements = document.querySelectorAll('.blur-reveal');

    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally unobserve after revealing
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
};

// --- Initialize Everything ---
window.addEventListener('load', () => {
    initThreeJS();
    initGSAP();
    lazyLoadImages();
    initContactForm();
    initCustomCursor();
    initBlurReveal();
    startAutoPlay();
    hidePreloader();
});

// Expose functions globally for onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.openGallery = openGallery;
window.slideVideo = slideVideo;
window.goToVideoSlide = goToVideoSlide;
window.slideThumbnail = slideThumbnail;
window.goToThumbnailSlide = goToThumbnailSlide;

