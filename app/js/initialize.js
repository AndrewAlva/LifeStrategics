// Global vars
var PageSmoothScroll;


// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Do something
    var clickScroll = new Scroll_To();
    clickScroll.init();
});


// Trigger functions after page is completely loaded
window.onload = function() {
    // Do something, remove preloader perhaps
    console.log("Page fully loaded.");
    console.log("Initialize.js");

    // Mobile menu interactions
    var landingMobileMenu = new Mobile_Menu();
    landingMobileMenu.init();

    // Circles in "Focus" section interaction
    var focusCircles = new Circles();
    focusCircles.init();


    // Services list interactions
    var landingServices = new Services_List();
    landingServices.init();


    // Animiation frame loop at 60fps to enable "toTop()" function
    RAF.init();

    // Smooth scrolling
    if(window.innerWidth >= 1025) {
        PageSmoothScroll = new SmoothScroll();
        RAF.add(PageSmoothScroll);
    }


    // General inview animation, linked with "Cascading" system
    var inviewObjects = document.getElementsByClassName('motion-cascade');

    // Cascade animation timing values
    for (var i = 0; i < inviewObjects.length; i++) {
        var inview = InView(inviewObjects[i], function(isInView, data) {
            if ((this.el.getBoundingClientRect().top - window.innerHeight) < 0) {
                this.el.classList.add('animate');

                if(this.el.querySelector('#services-animation')) {
                    this.el.querySelector('#services-animation').classList.add('drawn');
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

                if(this.el.querySelector('#talks-animation')) {
                    this.el.querySelector('#talks-animation').classList.remove('drawn');
                }

                if(this.el.querySelector('#help-animation')) {
                    this.el.querySelector('#help-animation').classList.remove('drawn');
                }

            }
        })
    }
}









