function getCircleHighlight(stringLength, drawColor) {
	var _circleHighlight = {};

	var hl_circle_open = document.getElementsByClassName('cms-circle-open')[0];
	var hl_circle_open_round = document.getElementsByClassName('cms-circle-open-round')[0];
	var hl_circle_open_long = document.getElementsByClassName('cms-circle-open-long')[0];

	if (stringLength <= 4) {
		_circleHighlight.svg = hl_circle_open_round.cloneNode(true);

		if (stringLength == 1) {
			_circleHighlight.classes = 'dw-highlight circle-open-round bolder super-big';

		} else if (stringLength == 2) {
			_circleHighlight.classes = 'dw-highlight circle-open-round sub-bolder longer';

		} else {
			_circleHighlight.classes = 'dw-highlight circle-open-round';

		}
	

	} else if (stringLength <= 8) {
		_circleHighlight.svg = hl_circle_open.cloneNode(true);

		if (stringLength == 4) {
			_circleHighlight.classes = 'dw-highlight circle-open bolder';

		} else if (stringLength <= 6) {
			_circleHighlight.classes = 'dw-highlight circle-open';

		} else {
			_circleHighlight.classes = 'dw-highlight circle-open short';
		}
	

	} else if (stringLength <= 12) {
		_circleHighlight.svg = hl_circle_open_long.cloneNode(true);
		_circleHighlight.classes = 'dw-highlight circle-open-long larger bolder';


	} else {
		_circleHighlight.svg = hl_circle_open_long.cloneNode(true);
		
		if (stringLength <= 16) {
			_circleHighlight.classes = 'dw-highlight circle-open-long';

		} else {
			_circleHighlight.classes = 'dw-highlight circle-open-long shorter lighter';
		}
	}

	_circleHighlight.svg.classList.add(drawColor);

	return _circleHighlight;
}

function getArrowSVG(color) {
	var link_arrow_right = document.getElementsByClassName('cms-arrow-right')[0];
	var _arrow_clone = link_arrow_right.cloneNode(true);
	_arrow_clone.classList.add(color);

	return _arrow_clone;
}


function formatIndex(index) {
	var _index = index + 1;
	if (_index <= 9) {
		_index = '0' + _index + '.';
	} else {_index = _index + '.';}

	return _index;
}


function removeSVGhelpers() {
	var svgHelpers = document.getElementsByClassName('cms-svgs')[0];
	if (svgHelpers.parentNode) {
		svgHelpers.parentNode.removeChild(svgHelpers);
	}
}