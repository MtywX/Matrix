const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let cw = window.innerWidth;
let ch = window.innerHeight;

const charArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
'是', '人', '不', '的', '来', '以', '们', '上', '中', '个', '以', '得', '就', '于', '出', '地', '时', '那', '里', '所', '家', '用', '发', '会', '与', '么', '当', '起'
]

let maxCharsCount = 200;
let fallingCharsArray = [];
let fontSize = 15;
let maxColums = cw / fontSize;

let frames = 0;

canvas.width = cw;
canvas.height = ch;

class FallingChars {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        this.value = charArray[Math.floor(Math.random() * (charArray.length - 1))];
        this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

        ctx.fillStyle = 'rgba(0,255,0)';
        ctx.font = fontSize + 'px san-serif';
        ctx.fillText(this.value, this.x, this.y);
        this.y += this.speed;

        if (this.y > ch) {
            this.y = (Math.random() * ch) / 2 - 50;
            this.x = Math.floor(Math.random() * maxColums) * fontSize;
            this.speed = (- Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
        }
    }
}

let update = () => {
    if (fallingCharsArray.length < maxCharsCount) {
        let fallingChars = new FallingChars(Math.floor(Math.random() * maxColums) * fontSize, Math.random() * ch / 2 - 50);
        fallingCharsArray.push(fallingChars);
    }

    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,cw,ch);

    for (var i = 0; i < fallingCharsArray.length && frames % 2 === 0; i++) {
        fallingCharsArray[i].draw(ctx);
    }

    requestAnimationFrame(update);
    frames++;
}

update();