var Preloader = {
	init: function() {
		// setTimeout(this.remove, 1000); // for testing locally
		this.remove();

		// Inview objects animation, linked with "Cascading" system
        initInView();
		
		// console.log("Page fully loaded, remove preloader.");
	},

	remove: function() {
		document.getElementById('preloader').classList.add('loaded');
		document.getElementById('header-nav').classList.add('animate');

		if (window.location.pathname == "/" || window.location.pathname == "/index.html" || window.location.pathname == "/index") {
			document.getElementById('inicio').classList.add('animate');
			document.getElementById('hero-animation').classList.add('drawn');
		
		} else if (window.location.pathname == "/creditos.html" || window.location.pathname == "/creditos") {
			document.getElementById('credits-page').classList.add('animate');
			document.getElementById('credits-animation').classList.add('drawn');
		}
	}
}