var Preloader = {
	init: function() {
		// setTimeout(this.start, 500); // for testing locally
		this.start();
	},

	start: function() {
		document.getElementById('preloader').classList.add('loaded');
		document.getElementById('header-nav').classList.add('animate');
		document.getElementById('hero-section').classList.add('animate');
		document.getElementById('lead-animation').classList.add('drawn');
	}
}