let canvas = document.querySelector('canvas');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let c = canvas.getContext('2d');

let mouse = {
    x:undefined, y:undefined
};

let maxRadius = 40;

let colorArray = [
    '#F2668B',
    '#025E73',
    '#011F26',
    '#026873',
    '#03A688'
];

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

window.addEventListener('resize', 
    function() {
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;

        init();
    }
);

function Circle(x, y, dx, dy, r) {
    this.x = x; this.y = y;
    this.dx = dx; this.dy = dy;
    this.r = r; this.minRadius = r;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if (this.x + this.r > innerWidth || this.x - this.r < 0) { this.dx = -this.dx; }
        if (this.y + this.r > innerWidth || this.y - this.r < 0) { this.dy = -this.dy; }
        
        this.x+=this.dx; this.y +=this.dy;

        //interaction
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.r < maxRadius) {
                this.r += 1;
            }
        }
        else if (this.r > this.minRadius) {
            this.r -= 1;
        }

        this.draw();
    }
}

let circleArray = [];

function init() {
    circleArray = []
    for (let i=0; i<1000; i++) {
        let r = (Math.random() * 3) + 1;
        let x = Math.random()*(window.innerWidth - r*2) + r; let dx = 7*(Math.random()-0.5);
        let y = Math.random()*(window.innerHeight - r*2) + r; let dy = 7*(Math.random()-0.5);
        
        circleArray.push(new Circle(x, y, dx, dy, r));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i=0; i<circleArray.length; i++) {
        circleArray[i].update();
    } 
}

init(); animate();