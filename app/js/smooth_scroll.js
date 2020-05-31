var SmoothScroll = function(args){
	if (!args) args = {};

	var _self = this;
	
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
		this.bindAll();
		this.setInitial();
		this.addListeners();

		setTimeout(function(){
			_self.setFakeHeight();
		}, _self.state.initDelay);

		// Remove special classes from not-scroll-js elements
		var _notScrollElements = document.getElementsByClassName('not-scroll-js');
		for (var i = 0; i < _notScrollElements.length; i++) {
			_notScrollElements[i].classList.remove('not-scroll-js');
		}
	}

	this.bindAll = function(){
		['onScroll', 'onResize', 'render'].forEach(function (fn) {
			return _self[fn] = _self[fn].bind(_self);
		});
	}

	this.render = function(){
		var scroll = this.state.scroll;

		this.state.displacement = (scroll.target - scroll.current) * scroll.ease;
		scroll.current += this.state.displacement;

		if (scroll.current < .1) {
			scroll.current = 0;
		}

		this.translateContainer();

		// After smooth scroll has been completed,
		// scroll a tiny bit to trigger inview animations 
		if (inviewTriggerInSmoothScroll == true && this.state.displacement < 1 && this.state.displacement > -1) {
			window.scroll(0, window.scrollY + 1);
			inviewTriggerInSmoothScroll = false;
			// console.log('window scrolled a little bit more')
		}
	}

	this.translateContainer = function() {
		var _state = this.state;
		var isResizing = _state.isResizing;
		var scroll = _state.scroll;

		var translate = "translate3d(0, " + -scroll.current + "px, 0)";

		_self.ui.el.style.transform = translate;
	}

	this.setInitial = function(){
		var el = this.ui.el;

		Object.assign(el.style, {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%'
		});

		document.body.classList.add('is-smooth-scroll');
	}

	this.setFakeHeight = function(){
		var _state = this.state;
		var bounds = _state.bounds;


		if (!this.ui.heightEl) {
			this.ui.heightEl = document.createElement('div');
			this.ui.heightEl.classList.add('js-fake-scroll');
			document.body.appendChild(this.ui.heightEl);
		}

		var bottom = _self.ui.el.getBoundingClientRect().height;

		bounds.scrollHeight = bottom;

		this.ui.heightEl.style.height = bottom + 'px';
	}

	this.onScroll = function(){
		var scroll = this.state.scroll;
		scroll.target = window.scrollY;
	}

	this.onResize = function(){
		this.state.isResizing = true;

		this.setFakeHeight();
		this.translateContainer();

		this.state.isResizing = false;
	}

	this.addListeners = function(){
		window.addEventListener('scroll', this.onScroll);
		window.addEventListener('resize', debounce(this.onResize, 1000));
	}

}















