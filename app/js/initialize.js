// Global vars
var PageSmoothScroll;
var clickScroll;
var smoothScrollWindowMinWidth = 1025;
var inviewTriggerInSmoothScroll = false;
var pageInitDelay = 0;

// Bring JSON data if page needs it
if (window.location.pathname == "/" || window.location.pathname == "/index.html" || window.location.pathname == "index") {
    deserializeBlog();
    deserializeEvents(5);
} else if (window.location.pathname == "/eventos.html" || window.location.pathname == "eventos") {
    deserializeEvents();
}


// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu interactions
    var landingMobileMenu = new Mobile_Menu();
    landingMobileMenu.init();

    
    clickScroll = new Scroll_To();
    clickScroll.init();

    // Slogan highlighting interaction
    if (window.location.pathname == "/" || window.location.pathname == "/index.html" || window.location.pathname == "index") {
        var LandingSlogan = new Slogan();
        LandingSlogan.init();
    }
});


// Trigger functions after page is completely loaded
window.onload = function() {
    // Do something, remove preloader perhaps
    console.log("Page fully loaded.");
    console.log("Initialize.js");

    // Preloader.init();

    // Animiation frame loop at 60fps to enable "toTop()" function
    RAF.init();

    // Smooth scrolling
    if(window.innerWidth >= smoothScrollWindowMinWidth) {
        PageSmoothScroll = new SmoothScroll();
        RAF.add(PageSmoothScroll);

        pageInitDelay = PageSmoothScroll.state.initDelay;
    }


    if (window.location.pathname == "/" || window.location.pathname == "/index.html" || window.location.pathname == "index") {
        // Circles in "Focus" section interaction
        var focusCircles = new Circles();
        focusCircles.init();


        // Services list interactions
        var landingServices = new Services_List();
        landingServices.init();


        if (window.location.hash) {
            setTimeout(function(){
                // Scroll to specific section through URL
                var _targetId = window.location.hash;
                _targetId = _targetId.substr(1);

                var _scrollTarget = document.getElementById(_targetId);
                
                clickScroll.getCurrentPosition();
                clickScroll.getDisplacement(_scrollTarget);
                clickScroll.getNewPosition();
                // console.log(clickScroll.newPosition);

                if (window.innerWidth >= smoothScrollWindowMinWidth) {
                    PageSmoothScroll.state.scroll.target = clickScroll.newPosition;
                    PageSmoothScroll.state.scroll.current = clickScroll.newPosition;
                    PageSmoothScroll.state.scroll.displacement = clickScroll.newPosition;
                }

                clickScroll.goTo(_scrollTarget);
        
            }, pageInitDelay);
        }

    }

    setTimeout(function(){
        // Inview objects animation, linked with "Cascading" system
        var inviewObjects = document.getElementsByClassName('motion-cascade');

        // Cascade animation timing values
        for (var i = 0; i < inviewObjects.length; i++) {
            var inview = InView(inviewObjects[i], function(isInView, data) {
                if ((this.el.getBoundingClientRect().top - window.innerHeight) < 0) {
                    this.el.classList.add('animate');

                    if(this.el.querySelector('#services-animation')) {
                        this.el.querySelector('#services-animation').classList.add('drawn');
                    }

                    if(this.el.querySelector('#blog-animation')) {
                        this.el.querySelector('#blog-animation').classList.add('drawn');
                    }

                    if(this.el.querySelector('#talks-animation')) {
                        this.el.querySelector('#talks-animation').classList.add('drawn');
                    }

                    if(this.el.querySelector('#help-animation')) {
                        this.el.querySelector('#help-animation').classList.add('drawn');
                    }

                } else {
                    this.el.classList.remove('animate');

                    if(this.el.querySelector('#services-animation')) {
                        this.el.querySelector('#services-animation').classList.remove('drawn');
                    }

                    if(this.el.querySelector('#blog-animation')) {
                        this.el.querySelector('#blog-animation').classList.remove('drawn');
                    }

                    if(this.el.querySelector('#talks-animation')) {
                        this.el.querySelector('#talks-animation').classList.remove('drawn');
                    }

                    if(this.el.querySelector('#help-animation')) {
                        this.el.querySelector('#help-animation').classList.remove('drawn');
                    }

                }
            })
        }


        // Remove preloader
        Preloader.init();

    }, pageInitDelay);

}









