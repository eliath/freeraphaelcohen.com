controller = {

	init: function init() {
		$('body').animate({'opacity': 1}, 1500);
		this.$el = $('#main');
		this.$contact = $('#contact');
		console.log('Ready');
	},

	//TODO: psuh/popstate: https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history
	toggleContact: function toggleContact() {
		$('#contact_button').toggleClass('active');
		var $el = this.$contact;
		if ($el.is(':visible')) {
			$el.animate({'opacity': 0}, 1000, function() {
				$el.css('display', 'none');
			});
		} else {
			$el.css('display', 'block');
			$el.animate({'opacity': 1}, 1000);
		}
	},

	oops: function oops(msg) {
		alert(msg);
	}

};