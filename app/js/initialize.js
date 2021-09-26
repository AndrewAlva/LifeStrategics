// Global vars
var PageSmoothScroll;
var clickScroll;
var smoothScrollWindowMinWidth = 1025;
var inviewTriggerInSmoothScroll = false;
var pageInitDelay = 0;
var jsonBlogLoaded = false;
// var jsonEventsLoaded = false;
var scrolledReady = false;

function checkPreloaderTriggers() {
    // console.log('checking Preloader Triggers');
    // if (jsonBlogLoaded && jsonEventsLoaded && scrolledReady ) { // Hide events section
    if (jsonBlogLoaded && scrolledReady ) {
        clearInterval(loadedInterval);

        // console.log('cleared interval');

        // Remove preloader
        Preloader.init();
        
        // Connect PageSmoothScroll with LazySizes to update "Fake Height" when needed
        LazyFakeHeight.init();

        // Enable easter egg trigger
        EasterEgg.init();
        // RAF.add(Canvas);
    }
}

var loadedInterval = setInterval(checkPreloaderTriggers, 50);

// Bring JSON data if page needs it
if (window.location.pathname == "/" || window.location.pathname == "/index.html" || window.location.pathname == "index") {
    deserializeBlog();
    // deserializeEvents(5);

} else if (window.location.pathname == "/eventos.html" || window.location.pathname == "eventos") {
    jsonBlogLoaded = true;
    deserializeEvents();
} else {
    jsonBlogLoaded = true;
    // jsonEventsLoaded = true;
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
    var LandingSlogan = new Slogan();
    LandingSlogan.init();

});


// Trigger functions after page is completely loaded
window.onload = function() {
    // Do something, remove preloader perhaps
    // console.log("Page fully loaded.");
    // console.log("Initialize.js");

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./sw.js');
    }

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
                scrolledReady = true;
        
            }, pageInitDelay);

        } else {
            scrolledReady = true;
        }

    } else {
        scrolledReady = true;
    }


}









