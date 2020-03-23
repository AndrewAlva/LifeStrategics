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

    var circles = document.getElementsByClassName('graph-circle');

    for (var i = 0; i < circles.length; i++) {
    	circles[i].addEventListener("click", function(){
    	// 	alert("circle clicked")
    	})
    }
}