function deserializeEvents(limit) {
	var container = document.getElementById('json-events-list');
	var defaultContent = document.getElementById('default-events-list');

	var requestURL = window.location.origin + "/cms/events-data.json";
	// var requestURL = "http://192.168.15.5:3000/cms/events-data.json";
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);

	request.responseType = 'json';
	request.send();

	request.onload = function() {
		if(request.response) {
			if (defaultContent.parentNode) {
				defaultContent.parentNode.removeChild(defaultContent);
			}
			

			var eventsArray = request.response;
			var _limit;
			if (limit) {_limit = limit;} else {_limit = eventsArray.length}
			for (var i = 0; i < _limit; i++) {
				// console.log(eventsArray[i]);

				formatEventRow(eventsArray[i], container, i);
			}

			removeSVGhelpers();
		}
	}
}

function formatEventRow(entry, container, index) {
	var _index = formatIndex(index);

	var _title = entry.titulo;
	var _high = entry.resaltar;
	var _img = entry.imagen;

	// measure word to highlight
	var _highSize = _high.length;

	var _circleHighlight = getCircleHighlight(_highSize, 'yellow');
	// _circleHighlight.svg;
	// _circleHighlight.svg.classList.add('yellow');
	// _circleHighlight.classes;

	// Clone arrow svg
	var _event_arrow_svg = getArrowSVG('yellow');



	// find word start and end position in the title
	var _titleArray = _title.split(" ");
	var _highStart = _titleArray.indexOf(_high);


	// Split title in 3 parts: start, highlight, end
	var _titleStart = "";
	for (var i = 0; i < _highStart; i++) {
		_titleStart += _titleArray[i];
		// if (i < _highStart - 1){ _titleStart += " "}
		if (i < _highStart){ _titleStart += " "}
	}
	
	var _titleEnd = "";
	for (var i = _highStart + 1; i < _titleArray.length; i++) {
		_titleEnd += " ";
		_titleEnd += _titleArray[i];
	}

	// console.log(_title);
	// console.log(_titleArray);
	// console.log(_highStart);
	// console.log(_titleStart + ".");
	// console.log(_high);
	// console.log(_titleEnd + ".");
	// console.log(_highSize);
	// console.log("");
	// console.log("");

	// create DOM elements in order
		// article
		var _eventRow = document.createElement('article');
		_eventRow.className = 'ls-row event-row event-margin';

			// a
			var _erLink = document.createElement('a');
			_erLink.setAttribute('href', entry.url);
			_erLink.setAttribute('target', '_blank');
			_erLink.setAttribute('rel', 'nofollow noopener noreferrer');
			_erLink.className = 'link-container motion-cascade offset-3 ls-col-19 offset-xs-4 ls-col-xs-16 offset-sm-2 ls-col-sm-21 ls-col-xl-20 offset-xxl-3 ls-col-xxl-18';

				// div
				var _erRow = document.createElement('div');
				_erRow.className = 'ls-row';

					// h2
					var _erTitle = document.createElement('h2');
					_erTitle.className = 'h2 _title ls-col-19 ls-col-xs-16 ls-col-sm-10 ls-col-lg-11 ls-col-xl-12 ls-col-xxl-10';

						// span
						var _erTitle_wrap = document.createElement('span');
						_erTitle_wrap.className = '_wrap';

							// span
							var _erTitle_index = document.createElement('span');
							_erTitle_index.className = 'p2 _index';
							_erTitle_index.setAttribute('data-cascade', 'slide-up');
							_erTitle_index.innerHTML = _index;

							_erTitle_wrap.appendChild(_erTitle_index);

							// span
							var _erTitle_text = document.createElement('span');
							_erTitle_text.setAttribute('data-cascade', 'slide-up');
							_erTitle_text.setAttribute('data-cascade-delay-mobile', '1');
							_erTitle_text.setAttribute('data-cascade-delay', '1');
							_erTitle_text.innerHTML += _titleStart;
								// span
								var _erTitle_text_highlight = document.createElement('span');
								_erTitle_text_highlight.className = _circleHighlight.classes;
									// span
									var _erTitle_text_highlight_text = document.createElement('span');
									_erTitle_text_highlight_text.className = '_text';
									_erTitle_text_highlight_text.innerHTML = _high;
									_erTitle_text_highlight.appendChild(_erTitle_text_highlight_text);

									// svg
									_erTitle_text_highlight.appendChild(_circleHighlight.svg);

								_erTitle_text.appendChild(_erTitle_text_highlight);

							_erTitle_text.innerHTML += _titleEnd;
						
							_erTitle_wrap.appendChild(_erTitle_text);

						_erTitle.appendChild(_erTitle_wrap);

					_erRow.appendChild(_erTitle);


					// figure
					var _erCover = document.createElement('figure');
					_erCover.className = '_cover ls-col-9 ls-col-xs-6 offset-sm-1 ls-col-sm-4 offset-xl-1 ls-col-xl-3';

						// div
						var _erCover_wrap = document.createElement('div');
						_erCover_wrap.className = 'image-wrap';
						_erCover_wrap.setAttribute('data-cascade', 'slide-up');
						_erCover_wrap.setAttribute('data-cascade-delay-mobile', '3');
						_erCover_wrap.setAttribute('data-cascade-delay', '3');

							// img
							var _erCover_img = document.createElement('img');
							_erCover_img_alt = 'Imagen del evento: ' + _title;
							_erCover_img_src = 'cms/events-images/' + _img;
							_erCover_img.setAttribute('alt', _erCover_img_alt);
							_erCover_img.src = _erCover_img_src;
							_erCover_wrap.appendChild(_erCover_img);
					
						_erCover.appendChild(_erCover_wrap);

					_erRow.appendChild(_erCover);

					// div
					var _erInfo = document.createElement('div');
					_erInfo.className = '_abstract offset-1 ls-col-9 offset-xs-4 ls-col-xs-6 offset-sm-1 ls-col-sm-5 ls-col-lg-4 offset-xl-1 ls-col-xl-3';

						// div
						var _erInfo_wrap = document.createElement('div');
						_erInfo_wrap.className = '_info';

							// h4
							var _erInfo_date = document.createElement('h4');
							_erInfo_date.className = 'h4 _date';
							_erInfo_date.setAttribute('data-cascade', 'slide-up');
							_erInfo_date.setAttribute('data-cascade-delay-mobile', '4');
							_erInfo_date.setAttribute('data-cascade-delay', '4');
							_erInfo_date.innerHTML = entry.fecha;
							_erInfo_wrap.appendChild(_erInfo_date);

							// p
							var _erInfo_place = document.createElement('p');
							_erInfo_place.className = 'p3 _location';
							_erInfo_place.setAttribute('data-cascade', 'slide-up');
							_erInfo_place.setAttribute('data-cascade-delay-mobile', '5');
							_erInfo_place.setAttribute('data-cascade-delay', '5');
							_erInfo_place.innerHTML = entry.lugar;
							_erInfo_wrap.appendChild(_erInfo_place);

						_erInfo.appendChild(_erInfo_wrap);

						// div
						var _erInfo_arrow = document.createElement('div');
						_erInfo_arrow.className = 'arrow-button _cta';
						_erInfo_arrow.setAttribute('data-cascade', 'slide-up');
						_erInfo_arrow.setAttribute('data-cascade-delay-mobile', '6');
						_erInfo_arrow.setAttribute('data-cascade-delay', '6');

							// span
							var _erInfo_arrow_label = document.createElement('span');
							_erInfo_arrow_label.className = '_label';
							_erInfo_arrow_label.innerHTML = entry.cta;
							_erInfo_arrow.appendChild(_erInfo_arrow_label);

							// span
							var _erInfo_arrow_icon = document.createElement('span');
							_erInfo_arrow_icon.className = '_icon right';

								// svg
								_erInfo_arrow_icon.appendChild(_event_arrow_svg);
							
							_erInfo_arrow.appendChild(_erInfo_arrow_icon);

						_erInfo.appendChild(_erInfo_arrow);

					_erRow.appendChild(_erInfo);


				_erLink.appendChild(_erRow);
			_eventRow.appendChild(_erLink);

	// insert Event Row into container
	container.appendChild(_eventRow);
}



























