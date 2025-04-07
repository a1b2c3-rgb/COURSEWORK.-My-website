// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contact-form');
const projectContainer = document.getElementById('projects-container');
const blogContainer = document.getElementById('blog-container');
const skillsContainer = document.getElementById('skills-container');
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');

// Data
const skills = [
    { name: 'HTML/CSS', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'SQL', level: 70 }
];

const projects = [
    {
        id: 1,
        title: 'E-commerce Website',
        category: 'web',
        description: 'A full-featured e-commerce platform with React and Node.js',
        technologies: ['React', 'Node.js', 'MongoDB'],
        image: 'images/project1.jpg',
        link: '#'
    },
    {
        id: 2,
        title: 'Mobile Task App',
        category: 'mobile',
        description: 'A productivity app for iOS and Android built with React Native',
        technologies: ['React Native', 'Firebase'],
        image: 'images/project2.jpg',
        link: '#'
    },
    {
        id: 3,
        title: 'Data Visualization',
        category: 'data',
        description: 'Interactive data visualizations using D3.js',
        technologies: ['D3.js', 'Python', 'Pandas'],
        image: 'images/project3.jpg',
        link: '#'
    },
    {
        id: 4,
        title: 'Portfolio Website',
        category: 'web',
        description: 'A responsive portfolio website (this one!)',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        image: 'images/project4.jpg',
        link: '#'
    }
];

const blogPosts = [
    {
        id: 1,
        title: 'Getting Started with React Hooks',
        date: '2023-05-15',
        excerpt: 'Learn how to use React Hooks to simplify your functional components',
        image: 'images/blog1.jpg',
        category: 'web'
    },
    {
        id: 2,
        title: 'The Power of CSS Grid',
        date: '2023-04-22',
        excerpt: 'How CSS Grid revolutionized my approach to layout design',
        image: 'images/blog2.jpg',
        category: 'web'
    },
    {
        id: 3,
        title: 'Introduction to Machine Learning',
        date: '2023-03-10',
        excerpt: 'Basic concepts and applications of machine learning',
        image: 'images/blog3.jpg',
        category: 'data'
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateGreeting();
    setCurrentYear();
    loadThemePreference();
    displaySkills();
    displayProjects();
    displayBlogPosts();
    setupEventListeners();
    setupTypewriter();
});

// Functions
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingElement = document.getElementById('dynamic-greeting');
    let greeting;
    
    if (hour < 12) {
        greeting = 'Good Morning!';
    } else if (hour < 18) {
        greeting = 'Good Afternoon!';
    } else {
        greeting = 'Good Evening!';
    }
    
    greetingElement.textContent = greeting;
}

function setCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

function displaySkills() {
    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill';
        skillElement.innerHTML = `
            <span class="skill-name">${skill.name}</span>
            <div class="skill-bar">
                <div class="skill-level" data-level="${skill.level}"></div>
            </div>
        `;
        skillsContainer.appendChild(skillElement);
    });
    
    // Animate skill bars
    setTimeout(() => {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(level => {
            const width = level.getAttribute('data-level');
            level.style.width = `${width}%`;
        });
    }, 500);
}

function displayProjects() {
    projectContainer.innerHTML = '';
    
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = `project-card fade-in ${project.category}`;
        projectElement.dataset.category = project.category;
        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-img">
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-category">${project.category}</span>
                <p>${project.description}</p>
                <button class="view-project" data-id="${project.id}">View Project</button>
            </div>
        `;
        projectContainer.appendChild(projectElement);
    });
}

function displayBlogPosts() {
    blogContainer.innerHTML = '';
    
    blogPosts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'blog-card fade-in';
        postElement.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="blog-img">
            <div class="blog-content">
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-date">${new Date(post.date).toLocaleDateString()}</p>
                <p>${post.excerpt}</p>
            </div>
        `;
        blogContainer.appendChild(postElement);
    });
}

function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Filter projects
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Project modal
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-project')) {
            const projectId = parseInt(e.target.dataset.id);
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-body').innerHTML = `
                    <img src="${project.image}" alt="${project.title}" style="width:100%; max-height:400px; object-fit:cover; margin-bottom:1rem;">
                    <p><strong>Description:</strong> ${project.description}</p>
                    <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
                    <a href="${project.link}" class="view-project" target="_blank" style="display:inline-block; margin-top:1rem;">Visit Project</a>
                `;
                modal.style.display = 'block';
            }
        }
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Form validation
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Form is valid, submit it
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        }
    });
    
    // Blog search
    const blogSearch = document.getElementById('blog-search');
    blogSearch.addEventListener('input', () => {
        const searchTerm = blogSearch.value.toLowerCase();
        const blogCards = document.querySelectorAll('.blog-card');
        
        blogCards.forEach(card => {
            const title = card.querySelector('.blog-title').textContent.toLowerCase();
            const excerpt = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Scroll spy for active nav link
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function validateForm() {
    let isValid = true;
    
    // Name validation
    const name = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (name.value.trim() === '') {
        nameError.textContent = 'Name is required';
        isValid = false;
    } else {
        nameError.textContent = '';
    }
    
    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.value.trim() === '') {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        emailError.textContent = 'Please enter a valid email';
        isValid = false;
    } else {
        emailError.textContent = '';
    }
    
    // Message validation
    const message = document.getElementById('message');
    const messageError = document.getElementById('message-error');
    if (message.value.trim() === '') {
        messageError.textContent = 'Message is required';
        isValid = false;
    } else {
        messageError.textContent = '';
    }
    
    return isValid;
}

function setupTypewriter() {
    const typedText = document.getElementById('typed-text');
    const texts = ["Web Developer", "UI/UX Enthusiast", "Problem Solver"];
    let currentText = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const fullText = texts[currentText];
        
        if (isDeleting) {
            typedText.textContent = fullText.substring(0, currentChar - 1);
            currentChar--;
            typingSpeed = 50;
        } else {
            typedText.textContent = fullText.substring(0, currentChar + 1);
            currentChar++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && currentChar === fullText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentText = (currentText + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}
