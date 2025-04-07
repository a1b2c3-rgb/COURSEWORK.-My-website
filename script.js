// Dynamic Greeting
const greetingElement = document.getElementById("greeting");

function updateGreeting() {
  const hours = new Date().getHours();
  if (hours < 12) {
    greetingElement.innerText = "Good Morning! Welcome to My Website!";
  } else if (hours < 18) {
    greetingElement.innerText = "Good Afternoon! Welcome to My Website!";
  } else {
    greetingElement.innerText = "Good Evening! Welcome to My Website!";
  }
}

updateGreeting();

// Form Validation
const form = document.getElementById("contact-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  
  if (!name || !email || !message) {
    alert("All fields are required.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  alert("Form submitted successfully!");
});

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Theme Toggle
const themeToggleButton = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

themeToggleButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Portfolio Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const filter = this.getAttribute("data-filter");

    projects.forEach((project) => {
      if (filter === "all" || project.getAttribute("data-category") === filter) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  });
});
