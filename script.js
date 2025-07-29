// DevCircle Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('show');
    });

    // Company Dropdown
    const companyDropdown = document.getElementById('companyDropdown');
    const companyMenu = document.getElementById('companyMenu');
    
    companyDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
        companyDropdown.closest('.dropdown').classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        companyDropdown.closest('.dropdown').classList.remove('active');
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        console.log('Contact form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We\'ll get back to you within 24 hours.');
        
        // Reset form
        contactForm.reset();
    });

    // Newsletter Subscription
    window.subscribeNewsletter = function() {
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value.trim();
        
        if (!email) {
            alert('Please enter your email address.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Here you would typically send the email to your server
        console.log('Newsletter subscription:', email);
        
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
    };

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('show');
            }
        });
    });

    // Header scroll behavior
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.8)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe animated elements
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-scale-in, .animate-slide-up');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add stagger delay to grid items
    const serviceCards = document.querySelectorAll('.service-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const teamMembers = document.querySelectorAll('.team-member');
    const pricingCards = document.querySelectorAll('.pricing-card');

    [serviceCards, portfolioItems, teamMembers, pricingCards].forEach(collection => {
        collection.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    });

    // Button click handlers for navigation
    document.querySelectorAll('.btn').forEach(button => {
        const buttonText = button.textContent.trim();
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            switch(buttonText) {
                case 'Get Quote':
                case 'Get Started':
                case 'Start Your Project':
                    // Scroll to contact section
                    scrollToSection('#contact');
                    break;
                    
                case 'View Our Work':
                    // Scroll to portfolio section
                    scrollToSection('#portfolio');
                    break;
                    
                case 'Explore All Services':
                    // Scroll to services section
                    scrollToSection('#services');
                    break;
                    
                case 'More Projects':
                    // Scroll to portfolio section
                    scrollToSection('#portfolio');
                    break;
                    
                case 'Contact Our Team':
                    // Scroll to contact section
                    scrollToSection('#contact');
                    break;
                    
                case 'View Live':
                    // Show alert for demo (in real app, this would open the project)
                    alert('This would open the live project in a new tab. Demo purposes only.');
                    break;
            }
        });
    });

    // Helper function for smooth scrolling
    function scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Add functionality to company dropdown links
    const companyLinks = document.querySelectorAll('#companyMenu a');
    companyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Close dropdown
            companyDropdown.closest('.dropdown').classList.remove('active');
            
            switch(href) {
                case '#about':
                    // For now, scroll to team section (you can create an about section later)
                    scrollToSection('#team');
                    break;
                case '#careers':
                    // Show careers info
                    alert('Careers: We are always looking for talented individuals! Email us at careers@devcircle.com');
                    break;
                case '#brands':
                    // Show brands info
                    alert('Our Brands: DevCircle is our main brand. We also work with various partner brands.');
                    break;
                case '#learn':
                    // Show learning resources
                    alert('Learn More: Visit our blog and resources section for tips on web development and digital marketing.');
                    break;
            }
        });
    });
});