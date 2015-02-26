controller = {

	intro: function intro() {
		//nada
	},

	init_scroll: function init_scroll() {
		var offset = ($('#mainBlock').offset().top) 
				   - ($(window).height()/2)
				   + ($('#centerpiece').height()/2)
				   + 60;
		console.log(offset);
		$('#stockimage').click(function(event) {
			$('html, body').animate({ scrollTop: offset });
		});
	},

	oops: function oops(msg) {
		alert(msg);
	}

};