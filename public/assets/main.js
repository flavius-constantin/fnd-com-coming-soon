const maxSquares = 9;
const minSquares = 3;

function randomColor() {
    const baseColor = [157, 190, 200];
    const variation = 20;
    const r = Math.min(255, Math.max(0, baseColor[0] + Math.floor(Math.random() * variation - variation/2)));
    const g = Math.min(255, Math.max(0, baseColor[1] + Math.floor(Math.random() * variation - variation/2)));
    const b = Math.min(255, Math.max(0, baseColor[2] + Math.floor(Math.random() * variation - variation/2)));
    return `rgb(${r}, ${g}, ${b})`;
}

function createSquare() {
    const square = document.createElement('div');
    square.classList.add('square');
    const size = 30 + Math.random() * 70;
    square.style.width = size + 'px';
    square.style.height = size + 'px';
    square.style.top = Math.random() * 90 + '%';
    square.style.left = Math.random() * 90 + '%';
    square.style.backgroundColor = randomColor();

    const moveX = (Math.random() - 0.5) * 200;
    const moveY = (Math.random() - 0.5) * 200;
    const rotate = (Math.random() - 0.5) * 720;
    const baseDuration = 4 + Math.random() * 4;
    const delay = Math.random() * 2000;

    function randomTimingFunction() {
        const timings = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'];
        return timings[Math.floor(Math.random() * timings.length)];
    }

    square.animate([
        { transform: `translate(0, 0) rotate(0deg) scale(1)`, opacity: 0 },
        { transform: `translate(${moveX}vw, ${moveY}vh) rotate(${rotate}deg) scale(1.2)`, opacity: 0.5 + Math.random() * 0.5 },
        { transform: `translate(0, 0) rotate(0deg) scale(1)`, opacity: 0 }
    ], {
        duration: baseDuration * 1000,
        iterations: Infinity,
        delay: delay,
        easing: randomTimingFunction()
    });

    document.body.appendChild(square);
}

function adjustSquares() {
    const squares = document.querySelectorAll('.square');
    if (squares.length < maxSquares) {
        createSquare();
    } else if (squares.length > minSquares) {
        const lastSquare = squares[squares.length - 1];
        lastSquare.style.opacity = '0';
        setTimeout(() => {
            lastSquare.remove();
        }, 1000);
    }
}

for (let i = 0; i < 3; i++) {
    createSquare();
}

setInterval(() => {
    adjustSquares();
}, 3000);