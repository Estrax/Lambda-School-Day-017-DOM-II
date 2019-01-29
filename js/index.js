// Your code goes here

const navItems = document.querySelectorAll('.nav-link');

function randomizeColor(){
    return `rgb(${Math.random()*127+128}, ${Math.random()*255}, ${Math.random()*63+192})`;
}

// navbar items
navItems.forEach(elem => {
    elem.addEventListener('click', e => e.preventDefault());
    elem.addEventListener('mouseover', e => e.target.style.color = randomizeColor());
});

