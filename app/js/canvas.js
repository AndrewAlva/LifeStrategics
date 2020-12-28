const PI2 = Math.PI * 2;

const Canvas = {
    element: undefined,
    
    patterns: [],
    tex: [],
    texSrcs: ['../img/chalk/chalk-w.png', '../img/chalk/chalk-b.png', '../img/chalk/chalk-y.png', '../img/chalk/chalk-r.png'],
    currentTex: 0,
    ready: false,

    init: function() {
        console.log('init Canvas');

        Mouse.init();

        // Crear canvas
        Canvas.create();
        // Ingresar canvas en DOM
        Canvas.append();

        // Cargar imagen
        Canvas.loadTextures();

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

    loadTextures: function() {
        let _totalTex = Canvas.texSrcs.length;
        let _texsLoaded = 0;
        
        
        Canvas.texSrcs.forEach( (tex, i) => {
            Canvas.tex[i] = new Image();
            Canvas.tex[i].onload = function() {
                _texsLoaded++;
                Canvas.patterns[i] = Canvas.ctx.createPattern(Canvas.tex[i], 'repeat');

                if (_texsLoaded >= _totalTex) {
                    Canvas.ready = true;
                    console.log('textures loaded');
                }
            }
            
        });

        Canvas.tex[0].src = Canvas.texSrcs[0];
        Canvas.tex[1].src = Canvas.texSrcs[1];
        Canvas.tex[2].src = Canvas.texSrcs[2];
        Canvas.tex[3].src = Canvas.texSrcs[3];
    },

    shiftTexture: function(_index) {
        Canvas.currentTex = _index;
        Mouse.cursor.history = [];
    },

    addListeners: function() {
        window.addEventListener( 'resize', debounce(Canvas.resize, 300) );
    },



    // Drawing methods
    render: function() {
        // Main function being executed 60fps
        if (!Canvas.ready) return

        Canvas.ctx.clearRect(0, 0, Canvas.element.width, Canvas.element.height);
        Canvas.ctx.fillStyle = Canvas.patterns[Canvas.currentTex];
        // Canvas.ctx.fillStyle = '#ff6600';

        Mouse.render();
    }
}