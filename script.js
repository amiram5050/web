// انتظار برای لود شدن کامل صفحه
document.addEventListener('DOMContentLoaded', function() {
    // حذف پیش‌نمایش لودینگ
    setTimeout(function() {
        document.querySelector('.preloader').classList.add('fade-out');
    }, 800);
    
    // متغیرهای اصلی
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroShapes = document.querySelector('.hero-shapes');
    
    // ایجاد اشکال تزئینی در بخش هیرو
    createHeroShapes();
    
    // فعال‌سازی انیمیشن‌های اسکرول 
    initScrollAnimations();
    
    // فعال‌سازی فیلتر نمونه کارها
    initPortfolioFilter();
    
    // فعال‌سازی نوار پیشرفت مهارت‌ها
    initSkillBars();
    
    // رویدادهای اسکرول
    window.addEventListener('scroll', function() {
        // تغییر استایل نوار ناوبری در هنگام اسکرول
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            scrollTopBtn.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            scrollTopBtn.classList.remove('active');
        }
        
        // فعال‌سازی انیمیشن‌های عناصر در زمان اسکرول
        animateOnScroll();
    });
    
    // فعال‌سازی منوی موبایل
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // اسکرول به بالای صفحه
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // اسکرول نرم برای لینک‌های ناوبری
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // بستن منوی موبایل در صورت باز بودن
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ارسال فرم تماس
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // نمایش پیام موفقیت
            const formData = new FormData(this);
            const name = formData.get('name');
            
            // اینجا می‌توانید کد ارسال فرم به سرور را اضافه کنید
            
            // نمایش پیام موفقیت
            alert(`${name} عزیز، پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.`);
            this.reset();
        });
    }
    
    // انیمیشن ورودی هیرو سکشن
    gsap.to(heroContent.querySelector('h1'), {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5
    });
    
    gsap.to(heroContent.querySelector('p'), {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.8
    });
    
    gsap.to(heroContent.querySelector('.hero-btn'), {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.1
    });
});

// تابع ایجاد اشکال تزئینی در هیرو سکشن
function createHeroShapes() {
    const heroShapes = document.querySelector('.hero-shapes');
    const shapesCount = 10;
    
    for (let i = 0; i < shapesCount; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        
        // تنظیم اندازه تصادفی
        const size = Math.random() * 100 + 50;
        
        // تنظیم موقعیت تصادفی
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // تنظیم تاخیر تصادفی برای انیمیشن
        const delay = Math.random() * 5;
        const duration = Math.random() * 15 + 15;
        
        shape.style.width = size + 'px';
        shape.style.height = size + 'px';
        shape.style.top = posY + '%';
        shape.style.left = posX + '%';
        
        heroShapes.appendChild(shape);
        
        // انیمیشن با GSAP
        gsap.to(shape, {
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            opacity: Math.random() * 0.5 + 0.1,
            duration: duration,
            delay: delay,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

// تابع فعال‌سازی انیمیشن‌های اسکرول
function initScrollAnimations() {
    // انیمیشن عنوان‌های بخش‌ها
    gsap.utils.toArray('.section-title h2').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 20,
            duration: 1
        });
    });
    
    // انیمیشن بخش درباره من
    const aboutImgElements = document.querySelectorAll('.about-img');
    const aboutTextElements = document.querySelectorAll('.about-text');
    
    aboutImgElements.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            x: -50,
            duration: 1
        });
    });
    
    aboutTextElements.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            x: 50,
            duration: 1
        });
    });
    
    // انیمیشن بخش مهارت‌ها
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2
        });
    });
    
    // انیمیشن بخش تجربیات
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 0.8,
            delay: index * 0.2
        });
    });
    
    // انیمیشن بخش نمونه کارها
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 20,
            duration: 0.5,
            delay: index * 0.1
        });
    });
    
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2
        });
    });
    
    // انیمیشن بخش تماس با من
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    
    if (contactInfo) {
        gsap.from(contactInfo, {
            scrollTrigger: {
                trigger: contactInfo,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            x: -50,
            duration: 1
        });
    }
    
    if (contactForm) {
        gsap.from(contactForm, {
            scrollTrigger: {
                trigger: contactForm,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            x: 50,
            duration: 1
        });
    }
}

// تابع انیمیشن در زمان اسکرول برای عناصر مختلف
function animateOnScroll() {
    const portfolioLinks = document.querySelectorAll('.portfolio-overlay .portfolio-link');
    
    portfolioLinks.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            element.style.transitionDelay = index * 0.1 + 's';
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }
    });
}

// تابع فعال‌سازی فیلتر نمونه کارها
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // حذف کلاس active از تمام دکمه‌ها
            filterBtns.forEach(innerBtn => {
                innerBtn.classList.remove('active');
            });
            
            // اضافه کردن کلاس active به دکمه انتخاب شده
            btn.classList.add('active');
            
            // گرفتن فیلتر از دکمه
            const filter = btn.getAttribute('data-filter');
            
            // نمایش/مخفی کردن آیتم‌ها بر اساس فیلتر
            portfolioItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                    
                    // انیمیشن نمایش
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                        item.style.opacity = '1';
                    }, 100);
                    
                } else if (item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    
                    // انیمیشن نمایش
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                        item.style.opacity = '1';
                    }, 100);
                    
                } else {
                    // انیمیشن مخفی کردن
                    item.style.transform = 'scale(0.8)';
                    item.style.opacity = '0';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// تابع فعال‌سازی نوار پیشرفت مهارت‌ها
function initSkillBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    gsap.utils.toArray('.skills').forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // فعال‌سازی انیمیشن نوار پیشرفت‌ها
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        gsap.to(bar, {
                            width: width + '%',
                            duration: 1.5,
                            ease: "power3.out"
                        });
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(section);
    });
}

// تابع برای تایپ متن به صورت انیمیشن
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// اضافه کردن حالت اکتیو به لینک‌های منو بر اساس اسکرول
function updateNavActive() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// اضافه کردن تصاویر متحرک برای بخش تماس با من
function addParallaxEffect() {
    const contact = document.querySelector('.contact');
    const parallaxElements = [];
    
    // ایجاد 5 عنصر متحرک
    for (let i = 0; i < 5; i++) {
        const element = document.createElement('div');
        element.classList.add('parallax-element');
        
        // تنظیم استایل
        element.style.position = 'absolute';
        element.style.width = Math.random() * 100 + 50 + 'px';
        element.style.height = element.style.width;
        element.style.borderRadius = '50%';
        element.style.backgroundColor = `rgba(52, 152, 219, ${Math.random() * 0.1 + 0.02})`;
        element.style.top = Math.random() * 100 + '%';
        element.style.left = Math.random() * 100 + '%';
        element.style.zIndex = '0';
        
        contact.appendChild(element);
        parallaxElements.push(element);
    }
    
    // حرکت عناصر با حرکت ماوس
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.05;
            const x = (mouseX * 100 * speed);
            const y = (mouseY * 100 * speed);
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}