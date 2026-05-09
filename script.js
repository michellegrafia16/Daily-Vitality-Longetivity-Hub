let activeIntervals = { tip: null, testimonial: null };
let activeEventListeners = [];

function addTrackedInterval(fn, delay, group) {
    const id = setInterval(fn, delay);
    if (group) {
        if (activeIntervals[group]) clearInterval(activeIntervals[group]);
        activeIntervals[group] = id;
    }
    return id;
}

function clearIntervalGroup(group) {
    if (activeIntervals[group]) {
        clearInterval(activeIntervals[group]);
        activeIntervals[group] = null;
    }
}

function clearAllIntervals() {
    Object.values(activeIntervals).forEach(id => {
        if (id) clearInterval(id);
    });
    activeIntervals = { tip: null, testimonial: null };
}

function addTrackedEventListener(element, event, handler) {
    if (!element) return;
    element.addEventListener(event, handler);
    activeEventListeners.push({ element, event, handler });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    initMobileMenu();
    initDailyTips();
    initTestimonialCarousel();
    initNewsletterForm();
    initContactForm();
    initSmoothScroll();
    console.log('Initialization complete');
});

window.addEventListener('beforeunload', function() {
    clearAllIntervals();
    activeEventListeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler);
    });
});

let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) return;
    scrollTimeout = requestAnimationFrame(function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 24px rgba(27, 77, 62, 0.12)';
            } else {
                header.style.boxShadow = '0 2px 16px rgba(27, 77, 62, 0.08)';
            }
        }
        scrollTimeout = null;
    });
});

function initMobileMenu() {
    const toggle = document.querySelector('.hamburger, .menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    console.log('Mobile menu elements:', { toggle, mobileMenu, mobileLinksCount: mobileLinks.length });

    if (toggle && mobileMenu) {
        toggle.addEventListener('click', function() {
            toggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        mobileLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                toggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
}

function initDailyTips() {
    const tipText = document.getElementById('tip-text');
    const prevBtn = document.getElementById('prev-tip');
    const nextBtn = document.getElementById('next-tip');
    const tipDotsContainer = document.getElementById('tip-dots');

    if (!tipText) return;

    const tips = [
        "Start your day with a glass of warm water with lemon to kickstart digestion and boost metabolism.",
        "Aim for 7-9 hours of quality sleep each night. Your body repairs itself during sleep.",
        "Take a 10-minute walk after meals to aid digestion and stabilize blood sugar levels.",
        "Practice deep breathing for 5 minutes when you feel stressed. It activates your parasympathetic nervous system.",
        "Include protein at every meal to maintain muscle mass and keep you feeling full longer.",
        "Spend at least 15 minutes outdoors daily to boost vitamin D and improve mood.",
        "Try a new vegetable each week to diversify your nutrient intake and keep meals interesting.",
        "Stand up and stretch every 30 minutes if you have a sedentary job to improve circulation.",
        "End your day with gratitude - write down three things you're thankful for.",
        "Stay hydrated! Aim for at least 8 glasses of water throughout the day.",
        "Incorporate strength training twice a week to maintain bone density and muscle mass.",
        "Limit processed foods and focus on whole, nutrient-dense foods for optimal health.",
        "Practice mindful eating - chew slowly and savor each bite to improve digestion.",
        "Add turmeric to your diet for its anti-inflammatory properties and potent antioxidants.",
        "Connect with loved ones regularly - social connections are key to longevity and mental health."
    ];

    let currentTipIndex = 0;

    function renderDots() {
        if (!tipDotsContainer) return;
        try {
            tipDotsContainer.innerHTML = '';
            tips.forEach(function(_, index) {
                const dot = document.createElement('span');
                dot.className = 'tip-dot' + (index === currentTipIndex ? ' active' : '');
                const clickHandler = function() {
                    currentTipIndex = index;
                    updateTip();
                    resetTipInterval();
                };
                addTrackedEventListener(dot, 'click', clickHandler);
                tipDotsContainer.appendChild(dot);
            });
        } catch (error) {
            console.error('Error rendering dots:', error);
        }
    }

    function updateTip() {
        if (!tipText) return;
        tipText.style.opacity = '0';
        setTimeout(function() {
            tipText.textContent = tips[currentTipIndex];
            tipText.style.opacity = '1';
        }, 300);
        renderDots();
    }

    function nextTip() {
        currentTipIndex = (currentTipIndex + 1) % tips.length;
        updateTip();
    }

    function prevTip() {
        currentTipIndex = (currentTipIndex - 1 + tips.length) % tips.length;
        updateTip();
    }

    function startTipInterval() {
        addTrackedInterval(nextTip, 8000, 'tip');
    }

    function resetTipInterval() {
        clearIntervalGroup('tip');
        startTipInterval();
    }

    updateTip();
    startTipInterval();

    if (prevBtn) {
        addTrackedEventListener(prevBtn, 'click', function() {
            prevTip();
            resetTipInterval();
        });
    }

    if (nextBtn) {
        addTrackedEventListener(nextBtn, 'click', function() {
            nextTip();
            resetTipInterval();
        });
    }
}

function initTestimonialCarousel() {
    const track = document.getElementById('testimonial-track');
    const dotsContainer = document.getElementById('carousel-dots');

    if (!track) return;

    const testimonials = track.querySelectorAll('.testimonial');
    if (testimonials.length === 0) return;

    let currentSlide = 0;

    function createDots() {
        if (!dotsContainer) return;
        try {
            dotsContainer.innerHTML = '';
            testimonials.forEach(function(_, index) {
                const dot = document.createElement('span');
                dot.className = 'carousel-dot' + (index === currentSlide ? ' active' : '');
                const clickHandler = function() {
                    goToSlide(index);
                    resetCarouselInterval();
                };
                addTrackedEventListener(dot, 'click', clickHandler);
                dotsContainer.appendChild(dot);
            });
        } catch (error) {
            console.error('Error creating dots:', error);
        }
    }

    function goToSlide(index) {
        if (index < 0 || index >= testimonials.length) return;
        currentSlide = index;
        track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        updateDots();
    }

    function updateDots() {
        if (!dotsContainer) return;
        try {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach(function(dot, index) {
                dot.classList.toggle('active', index === currentSlide);
            });
        } catch (error) {
            console.error('Error updating dots:', error);
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        goToSlide(currentSlide);
    }

    function startCarouselInterval() {
        addTrackedInterval(nextSlide, 5000, 'testimonial');
    }

    function resetCarouselInterval() {
        clearIntervalGroup('testimonial');
        startCarouselInterval();
    }

    createDots();
    startCarouselInterval();

    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        addTrackedEventListener(carousel, 'mouseenter', function() {
            clearIntervalGroup('testimonial');
        });
        addTrackedEventListener(carousel, 'mouseleave', function() {
            startCarouselInterval();
        });
    }
}

function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) {
        console.log('Newsletter form not found');
        return;
    }
    
    console.log('Newsletter form found, adding listener');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Newsletter form submitted!');
        
        const emailInput = document.getElementById('email-input');
        if (!emailInput) {
            console.log('Email input not found');
            return;
        }
        
        const email = emailInput.value.trim();
        console.log('Email:', email);

        if (email) {
            try {
                console.log('Sending POST request...');
                const response = await fetch('/newsletter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email })
                });
                console.log('Response status:', response.status);
            } catch (err) {
                console.error('Error:', err);
            }
            
            form.style.display = 'none';
            const successMessage = document.getElementById('newsletter-success');
            if (successMessage) {
                successMessage.classList.add('show');
            }
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');

    if (!form) return;

    addTrackedEventListener(form, 'submit', async function(e) {
        e.preventDefault();

        try {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            if (!name || !email || !subject || !message) return;

            const nameVal = name.value.trim();
            const emailVal = email.value.trim();
            const subjectVal = subject.value;
            const messageVal = message.value.trim();

            if (nameVal && emailVal && subjectVal && messageVal) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailVal)) {
                    email.classList.add('error');
                    setTimeout(() => email.classList.remove('error'), 3000);
                    return;
                }

                const formData = {
                    name: nameVal,
                    email: emailVal,
                    subject: subjectVal,
                    message: messageVal
                };

                try {
                    const response = await fetch(window.location.pathname === '/' ? '/contact' : '/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });

                    if (response.ok) {
                        form.reset();
                        if (successMessage) {
                            successMessage.classList.add('show');
                            setTimeout(function() {
                                successMessage.classList.remove('show');
                            }, 5000);
                        }
                    } else {
                        console.error('Form submission failed');
                    }
                } catch (fetchError) {
                    console.error('Network error:', fetchError);
                }
            }
        } catch (error) {
            console.error('Contact form error:', error);
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});