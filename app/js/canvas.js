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


    // Drawing objects
    line: {
        alpha: 1,
        color: 'white',
        width: 6,

        draw: function(_pos) {
            Canvas.ctx.globalAlpha= this.alpha;
            Canvas.ctx.fillStyle= this.color;
            Canvas.ctx.strokeStyle= '#000000';
            
            this.shape( _pos );
            
            Canvas.ctx.fill();
            Canvas.ctx.stroke();
            
            // this.context.globalCompositeOperation = 'source-in';
            // this.context.drawImage(Canvas.img, 0, 0);
        },

        shape: function(_pos) {
            Canvas.ctx.beginPath();
            Canvas.ctx.arc(_pos.x, _pos.y, this.width, 0, PI2, false);
            Canvas.ctx.closePath();
        }
    },


    // Drawing methods
    render: function() {
        // Main function being executed 60fps
        Canvas.ctx.clearRect(0, 0, Canvas.element.width, Canvas.element.height);
        
        for (var i = 0; i < Mouse.cursor.history.length; i++) {
            let _step = Mouse.cursor.history[i];
            Canvas.line.draw(_step);
        }

        Mouse.render();
    }
}