slideshow = {

	init: function init(path) {
		this.base = path;
		this.bodyW = $('body').width(); 
		this.fetch();
		this.render();
	},

	fetch: function fetch() {
		var _this = this;
		$.getJSON(this.base + "data.json")
			.done(function(resp) {
				console.log("Image List:", resp.list);
				_this.images = resp.list;
				_this.index = 0;
				_this.renderImage();
			})
			.fail(function(jqxhr, textStatus, error ) {
				var err = textStatus + ", " + error;
				console.error( "Request Failed: \n\t" + err );
			});
	},

	render: function render() {

		//Insert the image-wrap
		this.$main = $('.main-container');
		var $wrap = $('<div>', {class: 'image-wrap'}).appendTo(this.$main);

		//Insert caption container
		$('<p>', {id: 'title', class: 'caption'}).appendTo(this.$main);

		// size & center content wrap
		this.resize();
		window.onresize = this.resize;

		//render controls
		this.renderControls();
	},

	renderControls: function renderControls() {
		//Click controls
		$('<div>', {class: 'left-panel', onclick: 'slideshow.prev()'}).appendTo('body');
		$('<div>', {class: 'right-panel', onclick: 'slideshow.next()'}).appendTo('body');

		//Key Controls
		var _this = this;
		$('body').keydown(function(event) {
			if (event.keyCode === 37) //left
				_this.prev();
			else if (event.keyCode === 39) //right
				_this.next();
		});
	},

	prev: function prev() {
		console.log("- prev");
		this.index = (this.index === 0) ? this.images.length - 1 : this.index - 1;
		this.renderImage();
	},

	next: function next() {
		console.log("- next");
		this.index = (this.index === this.images.length - 1) ? 0 : this.index + 1;
		this.renderImage();
	},

	renderImage: function renderImage() {
		var image = this.images[this.index];
		var bg = 'url(' + this.base + image.file + ') center center no-repeat'; //prepare bg
		var $wrap = $(".image-wrap");

		//Render new image (no transition)
		$wrap.empty(); //clear out
		$('<div>', {class: 'image'}).css({'background': bg, 'background-size': 'contain'}).appendTo($wrap); //append new image div

		//Insert caption
		$('#title').html(image.title);

		/* FADE TRANSITION:
		
		var SPEED = 300;
		$wrap.animate({'opacity': 0}, SPEED, function() {
			$wrap.empty(); //clear out
			$('<div>', {class: 'image'}).css({'background': bg, 'background-size': 'contain'}).appendTo($wrap); //append new image div
			$wrap.animate({'opacity': 1}, SPEED); //fade back in
		});
		
		*/
	},

	resize: function resize() {
		var $wrap = $('.image-wrap');
		this.bodyW = $('body').width();

		var MAX_HEIGHT = 600;
		var h = Math.min(MAX_HEIGHT, $('body').height() - 80);
		var m = (h/2) * (-1);
		$wrap.css({'height': h, 'margin-top': m });

		//reposition title:
		var offset = $wrap.position().top+$wrap.outerHeight(true);
		$("#title").css('top', offset);
	}

};