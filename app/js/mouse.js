const Mouse = {
    x: 0,
    y: 0,

    /** Initializer */
    init: function() {
        console.log('Mouse init');
        
        Mouse.x = window.innerWidth/2;
        Mouse.y = window.innerHeight/2;

        Mouse.addListeners();

        this.cursor.init();

    },

    render: function() {
        Mouse.cursor.render();
    },


    /** MOUSE Methods */
    update: function(e) {
        // console.log(e);

        // Detect touch
        if (e.changedTouches) {
            Mouse.x = e.changedTouches[0].clientX;
            Mouse.y = e.changedTouches[0].clientY;
        } else {
            Mouse.x = e.clientX;
            Mouse.y = e.clientY;
        }
        
        // console.log(Mouse.x, Mouse.y);
    },



    /** Event Handlers */
    addListeners() {
        // window.addEventListener('mousemove', throttle(Mouse.onMove, 30).bind(this) );
        window.addEventListener('mousemove', throttle(Mouse.onMove, 50).bind(this) );
        
        window.addEventListener('touchstart', throttle(Mouse.onMove, 50).bind(this) );
        window.addEventListener('touchmove', throttle(Mouse.onMove, 50).bind(this) );

        window.addEventListener('scroll', throttle(Mouse.onScroll, 100).bind(this) );
    },

    onMove(e) {
        Mouse.update(e);
    },

    onScroll(e) {
        Mouse.cursor.cleanHistory();
    },




    /** CURSOR */
    cursor: {
        x: 0,
        y: 0,
        cof: 0.1,
        radius: 0,
        color: '#ffffff',
        alpha: 1,
        cFrame: 0,

        anchor: {x: 0, y: 0},
        velocity: {x: 0, y: 0},
        acceleration: {x: 0, y: 0},
        accelerationNormal: {x: 0, y: 0},
        accelerationScale: { x: 0, y: 0 },
        limit: { x: 0, y: 0 },
        minLimitX: { 
            mobile: 6,
            desktop: 12
        },
        minLimitY: { 
            mobile: 3,
            desktop: 4
        },

        history: [],
        maxHistory: 100,
        spacing: 1,
        lastPos: {x: 0, y: 0},

        triggers: [],
        targetEnabled: false,
        target: {
            el: undefined,
            x: 0, y: 0
        },


        /** Initializer */
        init: function() {
            this.updateAnchor();
            this.updateHistory();

            this.resize();
            window.addEventListener( 'resize', debounce(Mouse.cursor.resize, 300) );

            this.initTriggers();
        },

        render: function() {
            // this.cofAnimation();
            this.orbitAnimation();

            this.updateAnchor();

            let _dist = Mouse.getDistance(Mouse.cursor.x, Mouse.cursor.y,   Mouse.cursor.lastPos.x, Mouse.cursor.lastPos.y);
            if (_dist > Mouse.cursor.spacing) Mouse.cursor.updateHistory();

            this.draw();

            this.cFrame++;
        },

        resize: function() {
            if (window.innerWidth < 768) {
                Mouse.cursor.radius = 2;

                Mouse.cursor.limit.x = Mouse.cursor.minLimitX.mobile;
                Mouse.cursor.limit.y = Mouse.cursor.minLimitY.mobile;
                
                Mouse.cursor.accelerationScale = {
                    x: .38,
                    y: .3
                }
                
            } else {
                Mouse.cursor.radius = 4;

                Mouse.cursor.limit.x = Mouse.cursor.minLimitX.desktop;
                Mouse.cursor.limit.y = Mouse.cursor.minLimitY.desktop;
                
                Mouse.cursor.accelerationScale = {
                    x: .58,
                    y: .5
                }
            }
        },

        initTriggers: function() {
            let _domTriggers = document.getElementsByClassName('dw-trigger');

            for (let i = 0; i < _domTriggers.length; i++) {
                Mouse.cursor.triggers.push(_domTriggers[i]);

                _domTriggers[i].classList.add('non-hover');
            }

            window.addEventListener( 'touchstart', Mouse.cursor.releaseTargetAnchor.bind(this) );
            
            Mouse.cursor.triggers.forEach((el) => {
                el.addEventListener( 'mouseenter', Mouse.cursor.setTargetAnchor.bind(this) );
                el.addEventListener( 'touchstart', Mouse.cursor.setTargetAnchor.bind(this) );

                el.addEventListener( 'mouseleave', Mouse.cursor.releaseTargetAnchor.bind(this) );
            });
        },
        

        /** CURSOR Methods */
        draw: function() {
            for (var i = 0; i < Mouse.cursor.history.length; i++) {
                let _step = Mouse.cursor.history[i];
                
                Canvas.ctx.beginPath();
                Canvas.ctx.arc(_step.x, _step.y, Mouse.cursor.radius, 0, PI2, false);
                Canvas.ctx.closePath();
                Canvas.ctx.fill();
            }
            
            Canvas.ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
        },

        cofAnimation: function() {
            this.x += (Mouse.x - this.x) * this.cof;
            this.y += (Mouse.y - this.y) * this.cof;
        },

        orbitAnimation: function() {
            this.acceleration.x = this.anchor.x - this.x;
            this.acceleration.y = this.anchor.y - this.y;

            let accelLength = Mouse.getDistance(this.anchor.x, this.anchor.y,   this.x, this.y);
            this.accelerationNormal.x = (this.acceleration.x / accelLength) * this.accelerationScale.x;
            this.accelerationNormal.y = (this.acceleration.y / accelLength) * this.accelerationScale.y;

            if (accelLength > Mouse.spacing) this.updateLastPos();

            this.velocity.x += this.accelerationNormal.x;
            this.velocity.y += this.accelerationNormal.y;
            
            this.applyLimit();
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        },

        applyLimit: function() {
            // X axis
            if (this.velocity.x > this.limit.x) {
                this.velocity.x = this.limit.x;
            } else if (this.velocity.x < -this.limit.x) {
                this.velocity.x = -this.limit.x;
            }
            
            // Y axis
            if (this.velocity.y > this.limit.y) {
                this.velocity.y = this.limit.y;
            } else if (this.velocity.y < -this.limit.y) {
                this.velocity.y = -this.limit.y;
            }
        },

        updateLastPos: function() {
            this.lastPos.x = this.x;
            this.lastPos.y = this.y;
        },

        updateAnchor: function() {
            if (!Mouse.cursor.targetEnabled) {
                // console.log('anchor on mouse');
                Mouse.cursor.anchor.x = Mouse.x;
                Mouse.cursor.anchor.y = Mouse.y;
            } else {
                // console.log('anchor on target');
                Mouse.cursor.getTargetPosition();

                Mouse.cursor.anchor.x = Mouse.cursor.target.x
                Mouse.cursor.anchor.y = Mouse.cursor.target.y
            }
            
        },

        setTargetAnchor: function(e) {
            // console.log('setTargetAnchor', e);

            Mouse.cursor.target.el = e.target.querySelector('.dw-highlight');

            let _color = e.target.getAttribute('data-color');
            let _colorIndex = Mouse.cursor.setColorIndex(_color);
            Canvas.shiftTexture(_colorIndex);

            Mouse.cursor.resetMotion();

            Mouse.cursor.targetEnabled = true;
        },

        getTargetPosition: function() {
            let _bound = Mouse.cursor.target.el.getBoundingClientRect();
            
            Mouse.cursor.target.x = _bound.left + (_bound.width / 2);
            Mouse.cursor.target.y = _bound.top + (_bound.height / 2);

        },

        setColorIndex: function(_string) {
            let _index;
            
            switch(_string) {
                case 'blue':
                    _index = 1;
                    break;
                case 'yellow':
                    _index = 2;
                    break;
                case 'red':
                    _index = 3;
                    break;
            }

            return _index
        },
        
        resetMotion: function() {
            let _bound = Mouse.cursor.target.el.getBoundingClientRect();
            Mouse.cursor.limit.x = Math.max((_bound.width * .05), Mouse.cursor.minLimitX.desktop);
            Mouse.cursor.velocity.x = Mouse.cursor.limit.x;

            // console.log(Mouse.cursor.limit.x);
            
            Mouse.cursor.velocity.y = Mouse.cursor.limit.y;
        },

        releaseTargetAnchor: function(e) {
            // console.log('releaseTargetAnchor', e);
            Mouse.cursor.targetEnabled = false;
            Canvas.shiftTexture(0);

            if (window.innerWidth < 768) {
                Mouse.cursor.limit.x = Mouse.cursor.minLimitX.mobile;
            } else {
                Mouse.cursor.limit.x = Mouse.cursor.minLimitX.desktop;
            }
        },



        updateHistory: function() {
            if (Mouse.cursor.history.length >= Mouse.cursor.maxHistory) {
                Mouse.cursor.history.pop();
            }

            Mouse.cursor.lastPos.x = Mouse.cursor.x;
            Mouse.cursor.lastPos.y = Mouse.cursor.y;
            Mouse.cursor.history.unshift({
                x: Mouse.cursor.x,
                y: Mouse.cursor.y
            });

            // console.log(Mouse.x, Mouse.y);
            // console.log(Mouse.history);
        },
        
        cleanHistory: function() {
            Mouse.cursor.history = [];
        }
    },



    /** Object Helpers */
    getDistance: function(x1, y1, x2, y2) {
        let _dx = x1 - x2;
        let _dy = y1 - y2;
        let _dist = Math.sqrt( Math.pow(_dx, 2) + Math.pow(_dy, 2) );

        return _dist;
    }
}