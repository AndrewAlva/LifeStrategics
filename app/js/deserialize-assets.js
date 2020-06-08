function getCircleHighlight(stringLength, drawColor) {
	var _circleHighlight = {};

	if (stringLength <= 4) {
		_circleHighlight.svg = hl_circle_open_round.cloneNode(true);

		if (stringLength <= 3) {
			_circleHighlight.classes = 'dw-highlight circle-open-round bolder lifted-short';
		} else {
			_circleHighlight.classes = 'dw-highlight circle-open-round';
		}
	
	} else if (stringLength <= 7) {
		_circleHighlight.svg = hl_circle_open.cloneNode(true);

		if (stringLength <= 5) {
			_circleHighlight.classes = 'dw-highlight circle-open offset';
		} else {
			_circleHighlight.classes = 'dw-highlight circle-open offset long bolder';
		}
	
	} else if (stringLength <= 11) {
		_circleHighlight.svg = hl_circle_open_long.cloneNode(true);
		_circleHighlight.classes = 'dw-highlight circle-open-long lifted bolder larger offset';
	
	} else {
		_circleHighlight.svg = hl_circle_open_long.cloneNode(true);
		
		if (stringLength <= 17) {
			_circleHighlight.classes = 'dw-highlight circle-open-long sublifted';
		} else {
			_circleHighlight.classes = 'dw-highlight circle-open-long sublifted lighter';
		}
	}

	_circleHighlight.svg.classList.add(drawColor);

	return _circleHighlight;
}