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
        Mouse.x = e.clientX;
        Mouse.y = e.clientY;
        // console.log(Mouse.x, Mouse.y);
    },



    /** Event Handlers */
    addListeners() {
        window.addEventListener('mousemove', throttle(Mouse.update, 50).bind(this) );
        // window.addEventListener('mousemove', throttle(Mouse.onMove, 30).bind(this) );
    },

    onMove(e) {
        Mouse.cleanEnabled = false;
        Mouse.update(e);
    },




    /** CURSOR */
    cursor: {
        x: 0,
        y: 0,
        cof: 0.1,
        radius: Canvas.line.width,
        color: '#000000',
        alpha: 1,
        cFrame: 0,

        anchor: {x: 0, y: 0},
        velocity: {x: 0, y: 0},
        acceleration: {x: 0, y: 0},
        accelerationNormal: {x: 0, y: 0},
        accelerationScale: {
            x: .58,
            y: .5
        },
        limit: {
            x: 12,
            y: 4
        },

        history: [],
        maxHistory: 100,
        spacing: 7,
        lastPos: {x: 0, y: 0},


        /** Initializer */
        init: function() {
            this.updateAnchor();
            this.updateHistory();
        },

        render: function() {
            // this.cofAnimation();
            this.orbitAnimation();

            this.updateAnchor();

            let _dist = Mouse.getDistance(Mouse.cursor.x, Mouse.cursor.y,   Mouse.cursor.lastPos.x, Mouse.cursor.lastPos.y);
            if (_dist > Mouse.cursor.spacing) Mouse.cursor.updateHistory();

            this.draw();

            this.updateLimit();

            this.cFrame++;
        },
        

        /** CURSOR Methods */
        draw: function() {
            Canvas.ctx.globalAlpha= this.alpha;
            Canvas.ctx.fillStyle= this.color;
            Canvas.ctx.beginPath();
            Canvas.ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
            Canvas.ctx.closePath();
            Canvas.ctx.fill();
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
        
        updateLimit: function() {
            this.limit.x += Math.sin(this.cFrame/30) / 10;
            this.limit.y += Math.cos(this.cFrame/60) / 30;

            this.accelerationScale.x += Math.sin(this.cFrame/100) / 2000;
            // console.log(this.accelerationScale.x);
        },

        updateLastPos: function() {
            this.lastPos.x = this.x;
            this.lastPos.y = this.y;
        },

        updateAnchor: function() {
            this.anchor.x = Mouse.x;
            this.anchor.y = Mouse.y;
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