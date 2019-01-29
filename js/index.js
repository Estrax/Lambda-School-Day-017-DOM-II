// Your code goes here

// selectors
const navigation = document.querySelector('.main-navigation');
const navItems = document.querySelectorAll('.nav-link');
const home = document.querySelector('.home');
const paragraphs = document.querySelectorAll('p');
const bus_img = document.querySelector('.intro img');
const intro_h2 = document.querySelector('.intro h2');
const buttons = document.querySelectorAll('.btn');

// helper functions

function randomizeColor(){
    return `rgb(${Math.random()*127+128}, ${Math.random()*255}, ${Math.random()*63+192})`;
}

function randomizeGray(){
    let color = Math.random()*127+127;

    return `rgb(${color}, ${color}, ${color})`;
}

function boldParagraphs(){
    return Math.floor(Math.random()*6)*100+100;
}

function updateIntroH2(event){
    if(event.keyCode >= 65){
        intro_h2.textContent += "!!!";
        return;
    }
    intro_h2.textContent = "What about the new heading?";
}

function epilepsyHeader(event){
    let position = window.scrollY;
    if(position >= 50){
        navigation.style.background = randomizeColor();
    }else{
        navigation.style.background = "rgb(255, 255, 255)";
    }
}

// event listeners

// navbar items - click & mouseover (#1, #2)
navItems.forEach(elem => {
    elem.addEventListener('click', e => e.preventDefault());
    elem.addEventListener('mouseover', e => e.target.style.color = randomizeColor());
});

// paragraphs - dblclick & focus & blur (#3, #4, #5)
paragraphs.forEach(elem => {
    elem.addEventListener('dblclick', e => {
        e.target.style.fontWeight = boldParagraphs();
        e.target.style.color = randomizeColor();
    });
    elem.tabIndex = 1;
    elem.addEventListener('focus', e => e.target.style.background = randomizeColor());
    elem.addEventListener('blur', e => e.target.style.background = null);
});

// bus img - drag (#6)
bus_img.addEventListener('drag', e => e.target.style.opacity = .3);

// buttons - click (#7)
buttons.forEach(elem => {
    elem.addEventListener('click', e => {
        e.stopPropagation();
        e.target.style.background = randomizeColor();
        event.target.style.color = white;
    });
});

// window - mousemove, keypress, keydown, scroll (#7, #8, #9, #10)
window.onload = e => {
    TweenMax.from('.logo-heading', 2, {
        x: 5000
    });

    let idletime = 0;
    const interval = setInterval(timer, 1000);
    const timerreset = () => idletime = 0;

    window.addEventListener('mousemove', timerreset);
    window.addEventListener('keypress', timerreset);
    window.addEventListener('keydown', updateIntroH2);
    window.addEventListener('scroll', epilepsyHeader);

    function timer(){
        idletime++;
        if(idletime > 3){
            alert("You were afk for at least 3 seconds!");
            window.removeEventListener('keypress', timerreset);
            window.removeEventListener('mousemove', timerreset);
            clearInterval(interval);
        }
    }
}

// window - load (#11)
window.addEventListener('load', e => alert("Webpage successfully loaded!"));

// .home - click (#12)
home.addEventListener('click', e => e.target.style.background = randomizeGray());