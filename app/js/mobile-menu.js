var Mobile_Menu = function() {
	var _self = this;

	this.opened = false;
	this.initScrollPosition = 0;
	this.pageScroll = document.body;
	this.transitionDuration = 900; // in ms

	this.trigger = document.getElementById('mobile-menu-trigger');
	this.container = document.getElementById('mobile-menu');
	this.pageNavs = this.container.getElementsByClassName('mob-menu-page-scroll');


	this.init = function() {
		this.addListeners();
	}

	this.addListeners = function() {
		this.trigger.addEventListener('click', function() {
			if (!_self.opened) {
				_self.openIt();

			} else {
				_self.closeIt();
				window.scrollTo(0, _self.initScrollPosition);
			}
		});

		for (var i = 0; i < _self.pageNavs.length; i++) {
			_self.pageNavs[i].addEventListener('click', function() {
				_self.closeIt();
			});
		}
	}

	this.openIt = function() {
		this.trigger.classList.add('opened');
		this.container.classList.add('opened');

		this.initScrollPosition = window.pageYOffset;
		this.lockPageScroll();

		this.opened = true;
	}
	this.closeIt = function() {
		this.trigger.classList.remove('opened');
		this.container.classList.remove('opened');

		this.unlockPageScroll();

		this.opened = false;
	}


	this.lockPageScroll = function() {
		setTimeout(function(){
			_self.pageScroll.style.height = "100%";
			_self.pageScroll.style.overflow = "hidden";
		}, this.transitionDuration);
	}
	this.unlockPageScroll = function() {
		this.pageScroll.style.height = "";
		this.pageScroll.style.overflow = "";
	}
}