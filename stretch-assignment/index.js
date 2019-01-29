const blocks = document.querySelectorAll('.block');
let interval;
let order = 0;

const fixedWidth = 200;

let positions = {
    "red": 0,
    "blue": 0,
    "green": 0,
    "pink": 0,
    "gray": 0
};

function updatePosition(color){
    positions[color] = (++positions[color])%fixedWidth;
    move(color);
}

function move(color){
    TweenMax.to(`.block.block--${color}`, 0.5, {
        x: positions[color]
    });
}

function doMagic(elem){
    updatePosition(elem.classList[1].substr(7));
}

blocks.forEach(function(elem) {
    elem.addEventListener('click', (event) => {
        order -= 1;
        elem.style.order = `${order}`;
    });

    elem.addEventListener('mousedown', function() {
        interval = window.setInterval(function() {
            doMagic(elem);
        }, 10);
        interval;
    });
});

window.addEventListener('mouseup', () => {
    window.clearInterval(interval);
});