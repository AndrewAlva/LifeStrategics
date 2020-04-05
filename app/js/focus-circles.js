var Circles = function() {
	var _self = this;


	// Circles interaction
	this.index = 0;
	this.blocks = document.getElementsByClassName('focus-info-block');
	this.triggers = document.getElementsByClassName('graph-circle');
	this.defaultTriggers = document.getElementsByClassName('default-info-trigger');
	this.circlesContainer = document.getElementById('graph-circles-container');
	this.transitionDelay = 700; // time in ms


	// Text blocks animation
	this.container = document.getElementById('focus-block_text-container');
	this.displacementTarget = document.getElementById('graph-circles-container');
	
	this.heights = [];
	this.currentHeight = 0;
	this.maxHeight = 0;
	
	this.displacement = 0;


	this.init = function() {
		this.addListeners();

		// Text blocks animation
		this.getHeights();
		this.getMaxHeight();
		this.setHeight();

		this.shiftBlocks(0);
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

		// Text blocks animation
		window.addEventListener('resize', debounce(_self.resize, 500) );
	}

	this.shiftCircles = function(id) {
		switch(id) {
			case 'seb':
				_self.switchBlocks(1);
				_self.switchIndex(1);
				_self.switchCircles(0);

				_self.shiftBlocks(1);
				break;

			case 'cps':
				_self.switchBlocks(2);
				_self.switchIndex(2);
				_self.switchCircles(1);

				_self.shiftBlocks(2);
				break;

			case 'sc':
				_self.switchBlocks(3);
				_self.switchIndex(3);
				_self.switchCircles(2);

				_self.shiftBlocks(3);
				break;

			default:
				_self.switchBlocks(0);
				_self.switchIndex(0);
				_self.defaultCircles();

				_self.shiftBlocks(0);
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

	this.resize = function() {
		_self.getHeights();
		_self.getMaxHeight();
		_self.setHeight();

		_self.shiftBlocks(_self.index);
	}

	this.getHeights = function() {
		this.heights = [];

		for (var i = 0; i < this.blocks.length; i++) {
			var _height = this.blocks[i].getBoundingClientRect().height;

			this.heights.push(_height);
		}
	}

	this.getCurrentHeight = function() {
		this.currentHeight = this.heights[this.index];
	}

	this.getMaxHeight = function() {
		this.maxHeight = Math.max(...this.heights);
	}

	this.getDisplacement = function() {
		if (window.innerWidth < 768) {
			this.displacement = this.currentHeight - this.maxHeight;
		} else {
			this.displacement = 0;
		}
	}

	this.setHeight = function() {
		if (window.innerWidth < 768) {
			this.container.style.height = this.maxHeight + "px";
		} else {
			this.container.style.height = "";
		}
	}
	

	this.translate = function() {
		this.displacementTarget.style.transform = "translate3d(0, " + this.displacement + "px, 0)";
	}

	this.shiftBlocks = function(index) {
		this.index = index;

		this.getCurrentHeight();
		this.getDisplacement();
		this.translate();
	}
}

