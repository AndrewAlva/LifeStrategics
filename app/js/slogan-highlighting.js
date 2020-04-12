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

		// Blue triggers
		_self.blueTriggers[0] = document.getElementById('ourfocus-section');
		_self.blueTriggers[1] = document.getElementById('how-section');
		_self.blueTriggers[2] = document.getElementById('events-section');


		// Yellow triggers
		_self.yellowTriggers[0] = document.getElementById('services-section');
		_self.yellowTriggers[1] = document.getElementById('clients-section');

		// Red triggers
		_self.redTriggers[0] = document.getElementById('contact-section');
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
	}

		// Yellow triggers
		for (var i = 0; i < _self.yellowTriggers.length; i++) {
		_self.yellowTriggers[i].addEventListener('mouseenter', function(){
			_self.shiftTo('yellow');
		});
	}

		// Red triggers
		for (var i = 0; i < _self.redTriggers.length; i++) {
		_self.redTriggers[i].addEventListener('mouseenter', function(){
			_self.shiftTo('red');
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
		_self.red.classList.add('on');
		_self.container.classList.add('on');

		_self.blue.classList.remove('on');
		_self.yellow.classList.remove('on');
	}


	this.returnToDefault = function(){
		_self.container.classList.remove('on');
		_self.blue.classList.remove('on');
		_self.yellow.classList.remove('on');
		_self.red.classList.remove('on');
	}
}