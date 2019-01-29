// Your code goes here

const navItems = document.querySelectorAll('.nav-link');

// navbar items
navItems.forEach(elem => {
    elem.addEventListener('click', e => e.preventDefault());
})