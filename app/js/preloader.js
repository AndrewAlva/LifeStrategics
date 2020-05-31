var Preloader = {
	init: function() {
		// setTimeout(this.start, 1000); // for testing locally
		this.start();
	},

	start: function() {
		document.getElementById('preloader').classList.add('loaded');
		document.getElementById('header-nav').classList.add('animate');

		if (window.location.pathname == "/" || window.location.pathname == "/index.html" || window.location.pathname == "index") {
			document.getElementById('hero-section').classList.add('animate');
			document.getElementById('lead-animation').classList.add('drawn');
		}
	}
}