// Theme toggle function
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Function to handle navigation
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const sectionId = this.getAttribute('data-section');

        // Hide all sections with animation
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('fadeIn');
            section.style.display = 'none';
        });

        // Show the relevant section with animation
        const targetSection = document.getElementById(sectionId);
        targetSection.style.display = 'block';
        setTimeout(() => {
            targetSection.classList.add('fadeIn');
        }, 10); // Short delay to ensure animation effect
    });
});

// Initialize to show only the 'home' section by default
document.getElementById('home').style.display = 'block';
