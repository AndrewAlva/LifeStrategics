var Circles = function() {
	var _self = this;

	this.index = 0;
	this.blocks = document.getElementsByClassName('focus-info-block');
	this.triggers = document.getElementsByClassName('graph-circle');
	this.defaultTriggers = document.getElementsByClassName('default-info-trigger');
	this.circlesContainer = document.getElementById('graph-circles-container');
	this.transitionDelay = 700; // time in ms

	this.init = function() {
		this.addListeners();
	}

	this.addListeners = function() {
		// Shift info triggers
		for (var i = 0; i < _self.triggers.length; i++) {
			_self.triggers[i].addEventListener('click', function() {
				if (this.classList.contains('seb') && _self.index != 1) {
					_self.shiftCircles('seb');
				} else if (this.classList.contains('cps') && _self.index != 2) {
					_self.shiftCircles('cps');
				} else if (this.classList.contains('sc') && _self.index != 3) {
					_self.shiftCircles('sc');
				}
			});
		}

		// Default info trigger
		for (var i = 0; i < _self.defaultTriggers.length; i++) {
			_self.defaultTriggers[i].addEventListener('click', function() {
				_self.shiftCircles();
			});
		}
	}

	this.shiftCircles = function(id) {
		switch(id) {
			case 'seb':
				_self.switchBlocks(1);
				_self.switchIndex(1);
				_self.switchCircles(0);
				break;

			case 'cps':
				_self.switchBlocks(2);
				_self.switchIndex(2);
				_self.switchCircles(1);
				break;

			case 'sc':
				_self.switchBlocks(3);
				_self.switchIndex(3);
				_self.switchCircles(2);
				break;

			default:
				_self.switchBlocks(0);
				_self.switchIndex(0);
				_self.defaultCircles();
		}
	}

	this.switchBlocks = function(index) {
		for (var i = 0; i < _self.blocks.length; i++) {
			_self.blocks[i].classList.add('invisible');
		}

		setTimeout(function(){
			for (var i = 0; i < _self.blocks.length; i++) {
				_self.blocks[i].querySelector('.wrap').classList.add('hide');
			}

			_self.blocks[index].querySelector('.wrap').classList.remove('hide');
			_self.blocks[index].classList.remove('invisible');

		}, _self.transitionDelay)
	}

	this.switchCircles = function(index) {
		this.defaultCircles();
		this.triggers[index].classList.add('active');
		this.circlesContainer.classList.add('active');
	}

	this.defaultCircles = function() {
		for (var i = 0; i < _self.triggers.length; i++) {
			_self.triggers[i].classList.remove('active');
		}
		this.circlesContainer.classList.remove('active');
	}

	this.switchIndex = function(index) {
		this.index = index;
	}
}

