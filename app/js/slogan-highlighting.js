var Slogan = function() {
	var _self = this;

	this.container = document.getElementById('highlighting-slogan');

	this.blue = document.getElementById('blue-slogan');
	this.yellow = document.getElementById('yellow-slogan');
	this.red = document.getElementById('red-slogan');

	this.defaultTriggers = [];
	this.blueTriggers = [];
	this.yellowTriggers = [];
	this.redTriggers = [];

	this.init = function(){
		_self.setTriggers();
		_self.addListeners();
	}

	this.setTriggers = function(){
		// Default triggers
		_self.defaultTriggers[0] = document.getElementById('hero-section');
		var footers = document.getElementsByClassName('landing-footer');
		for (var i = 0; i < footers.length; i++) {
			_self.defaultTriggers.push(footers[i]);
		}

		// Blue triggers
		_self.blueTriggers[0] = document.getElementById('ourfocus-section');
		_self.blueTriggers[1] = document.getElementById('how-section');
		_self.blueTriggers[2] = document.getElementById('events-section');
		var blue_links = document.getElementsByClassName('slogan-highlight-blue');
		for (var i = 0; i < blue_links.length; i++) {
			_self.blueTriggers.push(blue_links[i]);
		}


		// Yellow triggers
		_self.yellowTriggers[0] = document.getElementById('services-section');
		_self.yellowTriggers[1] = document.getElementById('clients-section');
		var yellow_links = document.getElementsByClassName('slogan-highlight-yellow');
		for (var i = 0; i < yellow_links.length; i++) {
			_self.yellowTriggers.push(yellow_links[i]);
		}

		// Red triggers
		_self.redTriggers[0] = document.getElementById('contact-section');
		var red_links = document.getElementsByClassName('slogan-highlight-red');
		for (var i = 0; i < red_links.length; i++) {
			_self.redTriggers.push(red_links[i]);
		}
	}

	this.addListeners = function(){
		// Default triggers
		for (var i = 0; i < _self.defaultTriggers.length; i++) {
			_self.defaultTriggers[i].addEventListener('mouseenter', function(){
				_self.shiftTo('default');
			});
		}

		// Blue triggers
		for (var i = 0; i < _self.blueTriggers.length; i++) {
			_self.blueTriggers[i].addEventListener('mouseenter', function(){
				_self.shiftTo('blue');
			});

			_self.blueTriggers[i].addEventListener('mouseleave', function(){
				_self.shiftTo('default');
			});
		}

		// Yellow triggers
		for (var i = 0; i < _self.yellowTriggers.length; i++) {
			_self.yellowTriggers[i].addEventListener('mouseenter', function(){
				_self.shiftTo('yellow');
			});

			_self.yellowTriggers[i].addEventListener('mouseleave', function(){
				_self.shiftTo('default');
			});
		}

		// Red triggers
		for (var i = 0; i < _self.redTriggers.length; i++) {
			_self.redTriggers[i].addEventListener('mouseenter', function(){
				_self.shiftTo('red');
			});

			_self.redTriggers[i].addEventListener('mouseleave', function(){
				_self.shiftTo('default');
			});
		}

	}

	this.shiftTo = function(color){
		switch (color) {
			case 'blue':
				_self.highlightBlue();
				break;

			case 'yellow':
				_self.highlightYellow();
				break;

			case 'red':
				_self.highlightRed();
				break;

			default:
				_self.returnToDefault();
		}
	}

	this.highlightBlue = function(){
		_self.blue.classList.add('on');
		_self.container.classList.add('on');

		_self.yellow.classList.remove('on');
		_self.red.classList.remove('on');
	}

	this.highlightYellow = function(){
		_self.yellow.classList.add('on');
		_self.container.classList.add('on');

		_self.blue.classList.remove('on');
		_self.red.classList.remove('on');
	}

	this.highlightRed = function(){
		// console.log('red triggered!');
		_self.red.classList.add('on');
		_self.container.classList.add('on');

		_self.blue.classList.remove('on');
		_self.yellow.classList.remove('on');
	}


	this.returnToDefault = function(){
		// console.log('returnToDefault');
		_self.container.classList.remove('on');
		_self.blue.classList.remove('on');
		_self.yellow.classList.remove('on');
		_self.red.classList.remove('on');
	}
}