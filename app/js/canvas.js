const PI2 = Math.PI * 2;

const Canvas = {
    element: undefined,
    pattern: undefined,
    tex: undefined,
    texSrc: '../img/chalk-tex.png',
    ready: true, 

    init: function() {
        console.log('init Canvas');

        Mouse.init();

        // Crear canvas
        Canvas.create();
        // Ingresar canvas en DOM
        Canvas.append();

        // Cargar imagen
        Canvas.loadTexture();

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

    loadTexture: function() {
        Canvas.tex = new Image();
        Canvas.tex.onload = function() {
            Canvas.ready = true;
            console.log('texture loaded');
            Canvas.pattern = Canvas.ctx.createPattern(Canvas.tex, 'repeat');
        };
        Canvas.tex.src = Canvas.texSrc;
    },

    addListeners: function() {
        window.addEventListener( 'resize', debounce(Canvas.resize, 300) );
    },



    // Drawing methods
    render: function() {
        // Main function being executed 60fps
        if (!Canvas.ready) return

        Canvas.ctx.clearRect(0, 0, Canvas.element.width, Canvas.element.height);
        Canvas.ctx.globalCompositeOperation = 'source-out';
        // Canvas.ctx.drawImage(Canvas.tex, 0, 0);
        
        Canvas.ctx.fillStyle = Canvas.pattern;
        Canvas.ctx.fillRect(0, 0, Canvas.element.width, Canvas.element.height);

        Mouse.render();
        Canvas.ctx.drawImage(Mouse.cursor.canvas, 0, 0);
    }
}