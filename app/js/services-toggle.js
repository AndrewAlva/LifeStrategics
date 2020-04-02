var Services_List = function() {
	var _self = this;

	this.index = 0;

	this.triggers = document.getElementsByClassName('toggle-wrap');
	this.text_wraps = [];

	this.init = function() {
		this.setTextWraps();
		this.addListeners();
	}

	this.setTextWraps = function() {
		// Save all text wraps
		for (var i = 0; i < _self.triggers.length; i++) {
			var _textWrap = _self.triggers[i].nextElementSibling;
			_self.text_wraps.push(_textWrap);
		}


		for (var i = 0; i < _self.text_wraps.length; i++) {
			// Save element height, and convert it to 0 to "close" service
			var _height = _self.text_wraps[i].querySelector('.inner-container').getBoundingClientRect().height;
			_self.text_wraps[i].style.height = 0;
			

			// Convert each element in text_wraps array into an object with the HTML object and its height
			var _obj = {
				el: _self.text_wraps[i],
				height : _height
			}

			_self.text_wraps[i] = _obj;
		}

		// Show first service
		_self.text_wraps[0].el.style.height = _self.text_wraps[0].height;
	}

	this.addListeners = function() {
		// Click triggers to show info
		for (var i = 0; i < _self.triggers.length; i++) {
			_self.triggers[i].addEventListener('click', function() {
				var _parent = this.parentNode;
				var _index = this.getAttribute('data-index');

				if( _parent.getAttribute('data-show') == "true" ) {
					_self.hideService(_index);
				} else {
					_self.hideAllServices();
					_self.showService(_index);
					_self.updateIndex(_index);
				}
			});
		}

		// Resize window for resizing info height
		window.addEventListener('resize', debounce(_self.resize, 800));
	}

	this.resize = function(){
		_self.getInfoHeight();
		_self.updateHeight();
	}

	this.getInfoHeight = function() {
		for (var i = 0; i < _self.text_wraps.length; i++) {
			// Save element height
			var _height = _self.text_wraps[i].el.querySelector('.inner-container').getBoundingClientRect().height;

			_self.text_wraps[i].height = _height;
		}
	}

	this.updateHeight = function() {
		_self.text_wraps[_self.index].el.style.height = _self.text_wraps[_self.index].height + "px";
	}

	this.updateIndex = function(index) {
		_self.index = index;
	}

	this.hideAllServices = function() {
		for (var i = 0; i < _self.triggers.length; i++) {
			_self.triggers[i].parentNode.setAttribute('data-show', false);
			_self.text_wraps[i].el.style.height = 0;
		}
	}

	this.showService = function(index) {
		_self.triggers[index].parentNode.setAttribute('data-show', true);
		_self.text_wraps[index].el.style.height = _self.text_wraps[index].height + "px";
	}
	this.hideService = function(index) {
		_self.triggers[index].parentNode.setAttribute('data-show', false);
		_self.text_wraps[index].el.style.height = 0;
	}
}



