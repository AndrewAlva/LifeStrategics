var Scroll_To = function() {
	var _self = this;

	this.cof = 0.05;

	this.currentPosition = 0;
	this.displacement = 0;
	this.newPosition = 0;

	this.intervalSpeed = 16;
	this.scrollInterval;
	this.scrollTarget;
	this.scrollSpeed = 0;
	this.interpolatedScrollPosition = 0;

	this.cFrame = 0;
	this.cFrameSpeed = 0;
	this.startPosition = 0;
	this.easeDisplace = 0;
	this.easeDuration = 2000; // In miliseconds

	this.triggers = document.getElementsByClassName('scroll-to-js');

	this.init = function() {
		this.addListeners();
		_self.cFrameSpeed = 1 / (_self.easeDuration / _self.intervalSpeed);
	}

	this.addListeners = function() {
		for (var i = 0; i < _self.triggers.length; i++) {
			_self.triggers[i].addEventListener('click', function(e) {
				e.preventDefault();

				var _domElementId = e.target.getAttribute('href')
				var _target = document.getElementById(_domElementId);

				if (window.innerWidth < smoothScrollWindowMinWidth) {
					_self.initInterval(_target);
				} else {
					_self.goTo(_target);
				}
			});
		}

		// Regain control if user scrolls after click
		window.addEventListener('wheel', throttle(_self.stopInterval, 20));
		window.addEventListener('touchstart', _self.stopInterval, false);
	}

	this.getCurrentPosition = function() {
		_self.currentPosition = window.pageYOffset;
		// console.log("_self.currentPosition: " + _self.currentPosition);
	}

	this.getDisplacement = function(target) {
		_self.displacement = target.getBoundingClientRect().y;
		// console.log("_self.displacement: " + _self.displacement);
	}

	this.getNewPosition = function() {
		_self.newPosition = _self.currentPosition + _self.displacement;
		// console.log("_self.newPosition: " + _self.newPosition);
	}

	this.goTo = function(target) {
		// console.log(target);

		inviewTriggerInSmoothScroll = true;

		_self.getCurrentPosition();
		_self.getDisplacement(target);
		_self.getNewPosition();

		window.scroll(0, _self.newPosition);
	}

	this.getTo = function() {
		_self.getCurrentPosition();
		_self.getNewPosition();
		_self.getDisplacement(_self.scrollTarget);

		if (_self.displacement < 1 && _self.displacement > -1) {
			_self.stopInterval();

		} else {
			// console.log(_self.cFrame, _self.startPosition, _self.easeDisplace, 1);
			var _easePosition = _self.easeOutQuint(_self.cFrame, _self.startPosition, _self.easeDisplace, 1);
			window.scroll(0, _easePosition);

			_self.cFrame += _self.cFrameSpeed;
			// console.log(_easePosition);
		}


		
	}


	this.initInterval = function(target) {
		// console.log('init interval');
		_self.scrollTarget = target;
		_self.stopInterval();

		_self.startPosition = window.pageYOffset;
		_self.easeDisplace = target.getBoundingClientRect().y;
		// console.log(_self.startPosition, _self.easeDisplace);
		_self.scrollInterval = setInterval(_self.getTo, _self.intervalSpeed);
	}

	this.stopInterval = function() {
		// console.log('stopped interval');
		clearInterval(_self.scrollInterval);
		_self.cFrame = 0;
	}

	this.easeInOutCubic = function (t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	}

	this.easeInOutCubic = function (t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	}

	this.easeOutQuart = function (t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	}

	this.easeOutQuint = function (t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	}
}