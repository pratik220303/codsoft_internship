// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Testimonial slider
const testimonials = [
    {
        text: "The AI/ML training program completely transformed my career. I'm now working as a Data Scientist at a top tech company.",
        name: "Sarah Johnson",
        role: "Data Scientist"
    },
    {
        text: "Excellent curriculum and hands-on projects. The instructors are highly knowledgeable and supportive.",
        name: "Michael Chen",
        role: "ML Engineer"
    },
    {
        text: "The practical approach to learning AI concepts helped me understand complex topics easily.",
        name: "Emily Rodriguez",
        role: "AI Developer"
    }
];

let currentTestimonial = 0;
const testimonialContainer = document.querySelector('.testimonial');

function updateTestimonial() {
    const { text, name, role } = testimonials[currentTestimonial];
    testimonialContainer.innerHTML = `
        <p>${text}</p>
        <h4>${name}</h4>
        <span>${role}</span>
    `;
}

setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonialContainer.style.opacity = 0;
    setTimeout(() => {
        updateTestimonial();
        testimonialContainer.style.opacity = 1;
    }, 500);
}, 5000);

// Form submission handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
    }, 1500);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.course-card, .feature-card');
animatedElements.forEach(element => observer.observe(element));

// Add animation classes to elements
document.querySelectorAll('.course-card, .feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animate elements when they come into view
function animateOnScroll() {
    document.querySelectorAll('.course-card, .feature-card').forEach(card => {
        if (isInViewport(card)) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Initial check for elements in viewport
animateOnScroll();