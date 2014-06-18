controller = {

	init: function init() {
		this.$el = $('#main');
		this.$contact = $('#contact');
		console.log('Ready');
	},

	//TODO: psuh/popstate: https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history
	toggleContact: function toggleContact() {
		var $el = this.$contact;
		if ($el.is(':visible')) {
			$el.animate({'opacity': 0}, 1000, function() {
				$el.css({'display': 'none', 'opacity': 0});
				$('#contact_button').toggleClass('active');
			});
		} else {
			$el.css('display', 'block');
			$el.animate({'opacity': 1}, 1000, function() {
				$('#contact_button').toggleClass('active');
			});
		}
	},

	oops: function oops(msg) {
		alert(msg);
	}

};