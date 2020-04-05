var Scroll_To = function() {
	var _self = this;

	this.currentPosition = 0;
	this.newPosition = 0;
	this.displacement = 0;

	this.triggers = document.getElementsByClassName('scroll-to-js');

	this.init = function() {
		this.addListeners();
	}

	this.addListeners = function() {
		for (var i = 0; i < _self.triggers.length; i++) {
			_self.triggers[i].addEventListener('click', function(e) {
				e.preventDefault();

				var _domElementId = e.target.getAttribute('href')
				var _target = document.getElementById(_domElementId);

				_self.goTo(_target);
			});
		}
	}

	this.getCurrentPosition = function() {
		_self.currentPosition = window.pageYOffset;
	}

	this.getNewPosition = function(target) {
		_self.newPosition = target.getBoundingClientRect().y;
	}

	this.getDisplacement = function() {
		_self.displacement = _self.currentPosition + _self.newPosition;
	}

	this.goTo = function(target) {
		_self.getCurrentPosition();
		_self.getNewPosition(target);
		_self.getDisplacement();

		window.scroll(0, _self.displacement);
	}
}