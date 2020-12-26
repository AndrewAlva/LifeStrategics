const Mouse = {
    x: 0,
    y: 0,

    init: function() {
        console.log('Mouse init');
        
        Mouse.x = window.innerWidth/2;
        Mouse.y = window.innerHeight/2;

        window.addEventListener('mousemove', throttle(Mouse.update, 50).bind(this) );
    },

    update: function(e) {
        Mouse.x = e.clientX;
        Mouse.y = e.clientY;
        // console.log(Mouse.x, Mouse.y);
    }
}