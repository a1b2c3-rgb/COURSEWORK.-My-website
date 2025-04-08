// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Dynamic Greeting
  const greetingEl = document.getElementById('greeting');
  const hour = new Date().getHours();
  let greeting = 'Hello';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  else greeting = 'Good evening';
  greetingEl.textContent = `${greeting}, welcome to my website!`;

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });

  // Form Validation
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    document.getElementById('nameError').textContent = name.value ? '' : 'Name is required';
    document.getElementById('emailError').textContent = /\S+@\S+\.\S+/.test(email.value) ? '' : 'Valid email is required';
    document.getElementById('messageError').textContent = message.value ? '' : 'Message is required';

    valid = name.value && /\S+@\S+\.\S+/.test(email.value) && message.value;
    if (valid) {
      alert('Form submitted successfully!');
      form.reset();
    }
  });

  // Portfolio Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectList = document.getElementById('projectList');

  const projects = [
    { title: 'Weather App', category: 'web' },
    { title: 'Data Dashboard', category: 'data' },
    { title: 'AI Chatbot', category: 'ai' },
    { title: 'Portfolio Website', category: 'web' }
  ];

  function displayProjects(filter) {
    projectList.innerHTML = '';
    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
    filtered.forEach(p => {
      const div = document.createElement('div');
      div.className = 'project';
      div.innerHTML = `<h3>${p.title}</h3><p>Category: ${p.category}</p>`;
      projectList.appendChild(div);
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      displayProjects(btn.dataset.category);
    });
  });
  displayProjects('all');

  // Load Blogs
  const blogList = document.getElementById('blogList');
  const blogSearch = document.getElementById('blogSearch');

  function loadBlogs(searchTerm = '') {
    blogList.innerHTML = '';
    blogData.filter(blog => blog.title.toLowerCase().includes(searchTerm.toLowerCase())).forEach(blog => {
      const article = document.createElement('article');
      article.innerHTML = `<h3>${blog.title}</h3><p>${blog.summary}</p>`;
      blogList.appendChild(article);
    });
  }

  blogSearch.addEventListener('input', e => {
    loadBlogs(e.target.value);
  });

  loadBlogs();
});
