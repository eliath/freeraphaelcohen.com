controller = {

	init: function init() {
		$('body').animate({'opacity': 1}, 1500);
		this.$el = $('#main');
		this.$contact = $('#contact');
		window.history.replaceState({page: 'home'}, '');
		window.onpopstate = this.popHandler;
		console.log('Ready');
	},

	//TODO: psuh/popstate: 
	toggleContact: function toggleContact() {
		$('#contact_button').toggleClass('active');
		var $el = this.$contact;
		if ($el.is(':visible')) { //Hide
			$el.animate({'opacity': 0}, 1000, function() {
				$el.css('display', 'none');
				window.history.replaceState({page: 'home'}, 'Raphael Cohen', '/');
			});
		} else { //Show
			$el.css('display', 'block');
			window.history.replaceState({page: 'contact'}, 'Contact | Raphael Cohen', 'contact');
			$el.animate({'opacity': 1}, 1000);
		}
	},

	popHandler: function popHandler(event) {
		if (event.state.page === 'home') {
			event.preventDefault();
			controller.toggleContact();
		}
	},

	oops: function oops(msg) {
		alert(msg);
	}

};