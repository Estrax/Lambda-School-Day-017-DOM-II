// Your code goes here

// selectors
const navigation = document.querySelector('.main-navigation');
const navItems = document.querySelectorAll('.nav-link');
const home = document.querySelector('.home');
const paragraphs = document.querySelectorAll('p');
const bus_img = document.querySelector('.intro img');
const intro_h2 = document.querySelector('.intro h2');
const buttons = document.querySelectorAll('.btn');
const body = document.querySelector('body');

// variables
let loaderStatus = true;

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

// navbar items - click & mouseover (#0, #1)
navItems.forEach(elem => {
    elem.addEventListener('click', e => {
        e.preventDefault();
        TweenMax.from(elem, 1, {
            x: -500,
            y: -300
        });
    });
    elem.addEventListener('mouseover', e => e.target.style.color = randomizeColor());
});

// paragraphs - dblclick & focus & blur (#2, #3, #4)
paragraphs.forEach(elem => {
    elem.addEventListener('dblclick', e => {
        e.target.style.fontWeight = boldParagraphs();
        e.target.style.color = randomizeColor();
    });
    elem.tabIndex = 1;
    elem.addEventListener('focus', e => e.target.style.background = randomizeColor());
    elem.addEventListener('blur', e => e.target.style.background = null);
});

// bus img - drag (#5)
bus_img.addEventListener('drag', e => e.target.style.opacity = .3);

// buttons - click (#0)
buttons.forEach(elem => {
    elem.addEventListener('click', e => {
        e.stopPropagation();
        e.target.style.background = randomizeColor();
        event.target.style.color = white;
    });
});

// window - mousemove, keypress, keydown, scroll (#6, #7, #8, #9)
window.onload = e => {
    TweenMax.from('.logo-heading', 5, {
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

// window - load (#10)
window.addEventListener('load', e => alert("Webpage successfully loaded!"));

// .home - click (#0)
home.addEventListener('click', e => e.target.style.background = randomizeGray());


const overlay = document.createElement('div');
overlay.style.width = "100vw";
overlay.style.height = "100vh";
overlay.style.zIndex = "1000";
overlay.style.background = "#000";

body.prepend(overlay);




// loader

const preloader = new GSPreloader({
    radius:84, 
    dotSize:25, 
    dotCount:10,
    colors:["#f00","#0f0","00f","#ff0", "#0ff", "#f0f"],
    boxOpacity:0,
    boxBorder:"1px solid #AAA",
    animationOffset: 1.8,
});
    
//open the preloader
preloader.active(loaderStatus);

document.onclick = document.ontouchstart = function() {
    if(loaderStatus){
        preloader.active( !preloader.active() );
        loaderStatus = !loaderStatus;
    }
};

//this is the whole preloader class/function
function GSPreloader(options) {
    options = options || {};
    let parent = options.parent || document.body,
        element = this.element = document.createElement("div"),
        radius = options.radius || 42,
        dotSize = options.dotSize || 15,
        animationOffset = options.animationOffset || 1.8,
        createDot = function(rotation) {
            let dot = document.createElement("div");
            element.appendChild(dot);
            TweenLite.set(dot, {width:dotSize, height:dotSize, transformOrigin:(-radius + "px 0px"), x: radius, backgroundColor:colors[colors.length-1], borderRadius:"50%", force3D:true, position:"absolute", rotation:rotation});
            dot.className = options.dotClass || "preloader-dot";
            return dot; 
        }, 
        i = options.dotCount || 10,
        rotationIncrement = 360 / i,
        colors = options.colors || ["#61AC27","black"],
        animation = new TimelineLite({paused:true}),
        dots = [],
        isActive = false,
        box = document.createElement("div"),
        tl, dot, closingAnimation, j;
    colors.push(colors.shift());

    
    TweenLite.set(box, {width: radius * 2 + 70, height: radius * 2 + 70, borderRadius:"14px", backgroundColor:options.boxColor || "white", border: options.boxBorder || "1px solid #AAA", position:"absolute", xPercent:-50, yPercent:-50, opacity:((options.boxOpacity != null) ? options.boxOpacity : 0.3)});
    box.className = options.boxClass || "preloader-box";
    element.appendChild(box);

    parent.appendChild(element);
    TweenLite.set(element, {position:"fixed", top:"45%", left:"50%", perspective:600, overflow:"visible", zIndex:2000});
    animation.from(box, 0.1, {opacity:0, scale:0.1, ease:Power1.easeOut}, animationOffset);
    while (--i > -1) {
        dot = createDot(i * rotationIncrement);
        dots.unshift(dot);
        animation.from(dot, 0.1, {scale:0.01, opacity:0, ease:Power1.easeOut}, animationOffset);
        tl = new TimelineMax({repeat:-1, repeatDelay:0.25});
        for (j = 0; j < colors.length; j++) {
        tl.to(dot, 2.5, {rotation:"-=360", ease:Power2.easeInOut}, j * 2.9)
            .to(dot, 1.2, {skewX:"+=360", backgroundColor:colors[j], ease:Power2.easeInOut}, 1.6 + 2.9 * j);
        }
        animation.add(tl, i * 0.07);
    }
    if (TweenLite.render) {
        TweenLite.render();
    }

    this.active = function(show) {
        if (!arguments.length) {
            return isActive;
        }
        if (isActive != show) {
            isActive = show;
            if (closingAnimation) {
                closingAnimation.kill();
            }
            if (isActive) {
                element.style.visibility = "visible";
                TweenLite.set([element, box], {rotation:0});
                animation.play(animationOffset);
            } else {
                setInterval(() => {
                    overlay.style.display = "none"
                }, 1000);
                closingAnimation = new TimelineLite();
                if (animation.time() < animationOffset + 0.3) {
                animation.pause();
                closingAnimation.to(element, 1, {rotation:-360, ease:Power1.easeInOut}).to(box, 1, {rotation:360, ease:Power1.easeInOut}, 0);
                }
                closingAnimation.staggerTo(dots, 0.3, {scale:0.01, opacity:0, ease:Power1.easeIn, overwrite:false}, 0.05, 0).to(box, 0.4, {opacity:0, scale:0.2, ease:Power2.easeIn, overwrite:false}, 0).call(function() { animation.pause(); closingAnimation = null; }).set(element, {visibility:"hidden"});
            }
        }
        return this;
    };
}