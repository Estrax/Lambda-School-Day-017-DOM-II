// Your code goes here

// selectors
const navItems = document.querySelectorAll('.nav-link');
const home_p = document.querySelectorAll('p');

// helper functions

function randomizeColor(){
    return `rgb(${Math.random()*127+128}, ${Math.random()*255}, ${Math.random()*63+192})`;
}

function boldParagraphs(){
    return Math.floor(Math.random()*6)*100+100;
}

// navbar items
navItems.forEach(elem => {
    elem.addEventListener('click', e => e.preventDefault());
    elem.addEventListener('mouseover', e => e.target.style.color = randomizeColor());
});

home_p.forEach(elem => {
    elem.addEventListener('dblclick', e => {
        e.target.style.fontWeight = boldParagraphs();
        e.target.style.color = randomizeColor();
    });
});