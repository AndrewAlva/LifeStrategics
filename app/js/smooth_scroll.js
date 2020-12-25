var SmoothScroll = function(args){
	if (!args) args = {};

	var _this = this;
	
	this.ui = {
		el: document.querySelector('.js-scroll'),
		heightEl: null      
	}
	
	this.state = {
		scroll: {
			target: 0,
			current: 0,
			ease: 0.095,
			displacement: 0 // Extra property to trigger inview animations
		},

		bounds: {
			scrollHeight: 0
		},
		
		isResizing: false,
		initDelay: 1000
	}
   

	this.init = function(){
		_this.bindAll();
		_this.setInitial();
		_this.addListeners();

		setTimeout(function(){
			_this.setFakeHeight();
		}, _this.state.initDelay);

		// Remove special classes from not-scroll-js elements
		var _notScrollElements = document.getElementsByClassName('not-scroll-js');
		for (var i = 0; i < _notScrollElements.length; i++) {
			_notScrollElements[i].classList.remove('not-scroll-js');
		}
	}

	this.bindAll = function(){
		['onScroll', 'onResize', 'render'].forEach(function (fn) {
			return _this[fn] = _this[fn].bind(_this);
		});
	}

	this.render = function(){
		var scroll = _this.state.scroll;

		_this.state.displacement = (scroll.target - scroll.current) * scroll.ease;
		scroll.current += _this.state.displacement;

		if (scroll.current < .1) {
			scroll.current = 0;
		}

		_this.translateContainer();

		// After smooth scroll has been completed,
		// scroll a tiny bit to trigger inview animations 
		if (inviewTriggerInSmoothScroll == true && _this.state.displacement < 1 && _this.state.displacement > -1) {
			window.scroll(0, window.scrollY + 1);
			inviewTriggerInSmoothScroll = false;
			// console.log('window scrolled a little bit more')
		}
	}

	this.translateContainer = function() {
		var _state = _this.state;
		var isResizing = _state.isResizing;
		var scroll = _state.scroll;

		var translate = "translate3d(0, " + -scroll.current + "px, 0)";

		_this.ui.el.style.transform = translate;
	}

	this.setInitial = function(){
		var el = _this.ui.el;

		Object.assign(el.style, {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%'
		});

		document.body.classList.add('is-smooth-scroll');
	}

	this.setFakeHeight = function(){
		// console.log('setFakeHeight');
		var _state = _this.state;
		var bounds = _state.bounds;


		if (!_this.ui.heightEl) {
			_this.ui.heightEl = document.createElement('div');
			_this.ui.heightEl.classList.add('js-fake-scroll');
			document.body.appendChild(_this.ui.heightEl);
		}

		var bottom = _this.ui.el.getBoundingClientRect().height;

		bounds.scrollHeight = bottom;

		_this.ui.heightEl.style.height = bottom + 'px';
	}

	this.onScroll = function(){
		var scroll = _this.state.scroll;
		scroll.target = window.scrollY;
	}

	this.onResize = function(){
		_this.state.isResizing = true;

		_this.setFakeHeight();
		_this.translateContainer();

		_this.state.isResizing = false;
	}

	this.addListeners = function(){
		window.addEventListener('scroll', _this.onScroll);
		window.addEventListener('resize', debounce(_this.onResize, 1000));
	}

}















