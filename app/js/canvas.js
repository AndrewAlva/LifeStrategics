const PI2 = Math.PI * 2;

const Canvas = {
    element: undefined,

    init: function() {
        console.log('init Canvas');

        Mouse.init();

        // Crear canvas
        Canvas.create();
        // Ingresar canvas en DOM
        Canvas.append();
        // Resizear canvas cuando sea necesario
        Canvas.resize();

        Canvas.addListeners();
    },

    create: function() {
        Canvas.element = document.createElement('canvas');
        Canvas.resize();
        Canvas.ctx = Canvas.element.getContext('2d');

        Canvas.element.style.position = 'fixed';
        Canvas.element.style.top = 0;
        Canvas.element.style.left = 0;
        Canvas.element.style.zIndex = 999;
        Canvas.element.style.pointerEvents = 'none';
    },

    append: function() {
        document.body.appendChild(Canvas.element);
    },

    resize: function() {
        Canvas.element.width = window.innerWidth;
        Canvas.element.height = window.innerHeight;
    },

    addListeners: function() {
        window.addEventListener( 'resize', debounce(Canvas.resize, 300) );
    },


    // Drawing methods
    render: function() {
        // Main function being executed 60fps
        Canvas.ctx.clearRect(0, 0, Canvas.element.width, Canvas.element.height);
        Canvas.circlesLine.update();
    },

    circlesLine: {
        x: 0,
        y: 0,
        cof: 0.1,
        radius: 5,
        color: 'white',
        alpha: 1,

        update: function() {
            this.x += (Mouse.x - this.x) * this.cof;
            this.y += (Mouse.y - this.y) * this.cof;
            this.draw();
        },
        
        draw: function() {
            Canvas.ctx.beginPath();
            Canvas.ctx.globalAlpha= this.alpha;
            Canvas.ctx.fillStyle= this.color;
            Canvas.ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
            Canvas.ctx.fill();
            Canvas.ctx.closePath();
        }
    }
}