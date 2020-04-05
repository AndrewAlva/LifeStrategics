// Global vars
var PageSmoothScroll;


// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Do something
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
    PageSmoothScroll = new SmoothScroll();
    RAF.add(PageSmoothScroll);
}