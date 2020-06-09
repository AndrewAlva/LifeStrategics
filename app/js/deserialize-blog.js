function deserializeBlog() {
	var container = document.getElementById('json-blog-list');
	var defaultContent = document.getElementById('default-blog-list');

	var requestURL = "http://192.168.15.5:3000/cms/blog-data.json";
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);

	request.responseType = 'json';
	request.send();

	request.onload = function() {
		if(request.response) {
			if (defaultContent.parentNode) {
				defaultContent.parentNode.removeChild(defaultContent);
			}
			

			var blogArticles = request.response;
			for (var i = 0; i < blogArticles.length; i++) {
				// console.log(blogArticles[i]);

				formatBlogEntry(blogArticles[i], container, i);
			}
		}
	}
}

function formatBlogEntry(entry, container, index) {
	var _index = formatIndex(index);

	// get title
	var _title = entry.titulo;

	// get word to highlight
	var _high = entry.resaltar;

	// measure word to highlight
	var _highSize = _high.length;

	// clone highlight svg according to size needed
	var _circleHighlight = getCircleHighlight(_highSize, 'blue');


	// Clone arrow svg
	var _blogpost_arrow_svg = getArrowSVG('blue');

	


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
		var _blogpost = document.createElement('article');
		_blogpost.className = 'ls-row blogpost-row no-img post-margin';

			var _bpLink = document.createElement('a');
			_bpLink.setAttribute('href', entry.url);
			_bpLink.setAttribute('target', '_blank');
			_bpLink.setAttribute('rel', 'nofollow noopener noreferrer');
			_bpLink.className = 'link-container offset-2 ls-col-20 offset-xs-4 ls-col-xs-16 offset-sm-2 ls-col-sm-21 offset-lg-3 ls-col-lg-18 offset-xxl-4 ls-col-xxl-16 motion-cascade';

				var _bpRow = document.createElement('div');
				_bpRow.className = 'ls-row'

					var _bpIndex = document.createElement('div');
					_bpIndex.className = 'index-container h1 ls-col-20 ls-col-xs-16 ls-col-sm-4'

						var _bpIMask = document.createElement('span');
						_bpIMask.className = '_text cascade-mask inline-block'

							var _bpIText = document.createElement('span');
							_bpIText.setAttribute('data-cascade', 'mask-up');
							_bpIText.setAttribute('data-cascade-delay-mobile', '0');
							_bpIText.setAttribute('data-cascade-delay', '0');
							_bpIText.innerHTML = _index;

							_bpIMask.appendChild(_bpIText);

						_bpIndex.appendChild(_bpIMask);

					_bpRow.appendChild(_bpIndex);


					var _bpInfo = document.createElement('div');
					_bpInfo.className = 'info-container ls-col-20 ls-col-xs-16 offset-sm-1 ls-col-sm-15 ls-col-lg-13 ls-col-xxl-11';
						
						var _bpInfoRow = document.createElement('div');
						_bpInfoRow.className = 'ls-row'

							var _bpInfo_title = document.createElement('h2');
							_bpInfo_title.className = 'h2 _title ls-col-19 ls-col-xs-14 ls-col-sm-13 ls-col-lg-11 ls-col-xxl-9';
							_bpInfo_title.setAttribute('data-cascade', 'slide-up');
							_bpInfo_title.setAttribute('data-cascade-delay-mobile', '2');
							_bpInfo_title.setAttribute('data-cascade-delay', '3');
							
								// insert first part of text
								_bpInfo_title.innerHTML += _titleStart;

								// create highlight wrap
								var _bpInfo_title_highlight = document.createElement('span');
								_bpInfo_title_highlight.className = _circleHighlight.classes;
								
									// insert highlighted word
									var _bpInfo_title_highlight_text = document.createElement('span');
									_bpInfo_title_highlight_text.className = '_text';
									_bpInfo_title_highlight_text.innerHTML = _high;
									_bpInfo_title_highlight.appendChild(_bpInfo_title_highlight_text);

									// insert svg
									_bpInfo_title_highlight.appendChild(_circleHighlight.svg);

								_bpInfo_title.appendChild(_bpInfo_title_highlight);


								// insert rest of text
								_bpInfo_title.innerHTML += _titleEnd;

							_bpInfoRow.appendChild(_bpInfo_title);
						_bpInfo.appendChild(_bpInfoRow);
						
						var _bpInfoRowBottom = document.createElement('div');
						_bpInfoRowBottom.className = 'ls-row bottom-wrap';

							var _bpInfoRowBottom_Tags = document.createElement('p');
								_bpInfoRowBottom_Tags.className = '_tags p3 ls-col-13 push-1 ls-col-xs-11 ls-col-sm-10 ls-col-md-10 ls-col-lg-9 ls-col-xxl-7';
								_bpInfoRowBottom_Tags.setAttribute('data-cascade', 'slide-up');
								_bpInfoRowBottom_Tags.setAttribute('data-cascade-delay-mobile', '3');
								_bpInfoRowBottom_Tags.setAttribute('data-cascade-delay', '4');

								for (var i = 0; i < entry.temas.length; i++) {
									_bpInfoRowBottom_Tags.innerHTML += entry.temas[i];
									if (i < entry.temas.length - 1){ _bpInfoRowBottom_Tags.innerHTML += " · "}
								}
							_bpInfoRowBottom.appendChild(_bpInfoRowBottom_Tags);

							var _bpInfoRowBottom_CTA = document.createElement('div');
							_bpInfoRowBottom_CTA.className = 'cta-wrap ls-col-6 ls-col-xs-4 ls-col-lg-3';

								var _bpInfoRowBottom_CTA_button = document.createElement('div');
								_bpInfoRowBottom_CTA_button.className = '_cta arrow-button';
								_bpInfoRowBottom_CTA_button.setAttribute('data-cascade', 'slide-up');
								_bpInfoRowBottom_CTA_button.setAttribute('data-cascade-delay-mobile', '4');
								_bpInfoRowBottom_CTA_button.setAttribute('data-cascade-delay', '5');

									var _bpInfoRowBottom_CTA_button_label = document.createElement('span');
									_bpInfoRowBottom_CTA_button_label.className = '_label';
									_bpInfoRowBottom_CTA_button_label.innerHTML = "Leer";
									_bpInfoRowBottom_CTA_button.appendChild(_bpInfoRowBottom_CTA_button_label);
								
									var _bpInfoRowBottom_CTA_button_icon = document.createElement('span');
									_bpInfoRowBottom_CTA_button_icon.className = '_icon right';

										// insert arrow svg
										_bpInfoRowBottom_CTA_button_icon.appendChild(_blogpost_arrow_svg);
									_bpInfoRowBottom_CTA_button.appendChild(_bpInfoRowBottom_CTA_button_icon);
								

								_bpInfoRowBottom_CTA.appendChild(_bpInfoRowBottom_CTA_button);
							
							_bpInfoRowBottom.appendChild(_bpInfoRowBottom_CTA);

						_bpInfo.appendChild(_bpInfoRowBottom);

						var _bp = document.createElement('div');
						_bp.className = 'ls-row';

					_bpRow.appendChild(_bpInfo);
				

				_bpLink.appendChild(_bpRow);
			
			_blogpost.appendChild(_bpLink);




	// insert Blog Post into container
	container.appendChild(_blogpost);
}