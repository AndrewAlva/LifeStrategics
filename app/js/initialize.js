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

    // Circles in "Focus" section interaction
    var Focus_Circles = new Circles();
    Focus_Circles.init();


    // Services list interactions
    var Landing_Services = new Services_List();
    Landing_Services.init();
}