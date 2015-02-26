slideshow = {

	init: function init(path, video) {
			this.video = (video) ? true:false; //video parameter is optional.

			this.base = path;
			this.bodyW = $('body').width(); 
			
			this.fetch(); //fetch content
			this.render(); //render wraps
	},

	render: function render() {
		//Show the back button
		$('<a>', {class: 'back-btn', href: '/projects', html: '&larr;'}).appendTo('body');

		//Insert the media container
		this.$main = $('.main-container');
		var $wrap = $('<div>', {class: 'media-wrap'}).appendTo(this.$main);

		$('<p>', {id: 'title', class: 'caption noselect'}).appendTo(this.$main); //Insert caption container

		// size & center content wrap
		this.resize();
		window.onresize = this.resize;

		//render controls
		this.keyBinder();
	},

	fetch: function fetch() {
		var _this = this;
		$.getJSON(this.base + "data.json")
			.done(function(resp) {
				_this.index = 0;
				//console.log("Media List:", resp.list);
				_this.media = resp.list;
				_this.renderOne();
			})
			.fail(function(jqxhr, textStatus, error ) {
				var err = textStatus + ", " + error;
				$('html').empty().append($('<div>', {class: 'big-error'}).html('<p>Sorry, there has been an error.</p><p>Please go back and try again.</p>'));
				console.error( "Request Failed: \n\t" + err );
			});
	},


	keyBinder: function keyBinder() {
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
		this.index = (this.index === 0) ? this.media.length - 1 : this.index - 1;
		this.renderOne();
	},

	next: function next() {
		console.log("- next");
		this.index = (this.index === this.media.length - 1) ? 0 : this.index + 1;
		this.renderOne();
	},

	renderOne: function renderOne() {
		$wrap = $('.media-wrap').empty();
		if (this.video) this.renderVideo($wrap);
		else this.renderImage($wrap);
	},

	renderImage: function renderImage($wrap) {
		var image = this.media[this.index];
		var bg = 'url(' + this.base + image.file + ') center center no-repeat'; //prepare bg

		//Render image
		$('<div>', {class: 'image'}).css({'background': bg, 'background-size': 'auto'}).appendTo($wrap); //append new image div

		$('#title').html(image.title); //insert caption
	},

	renderVideo: function renderVideo($wrap) {
		var video = this.media[this.index];

		// var embed = "<iframe id='yt-video' class='video' width='800' height='600' src='https://www.youtube.com/embed/"+ video.youtubeID +"?&loop=1&rel=0&controls=0&showinfo=0&autoplay=1&color=white&disablekb=1&autohide=1' frameborder='0' allowfullscreen></iframe>";
		var embed = "<iframe id='yt-video' class='video' width='800' height='600' src='https://www.youtube.com/v/" + video.youtubeID + "?&loop=1&autoplay=1&playlist=" + video.youtubeID + "&controls=0&showinfo=0&autohide=1&modestbranding=1&disablekb=1&color=white' frameborder='0'></iframe>";
		$wrap.append(embed);
		$('#title').html(video.title); //insert caption

		var player;

	},

	resize: function resize() {
		var $wrap = $('.media-wrap');
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