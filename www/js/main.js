controller = {

	init: function init() {
		$('body').animate({'opacity': 1}, 1500);
		this.$el = $('#main');
		this.$contact = $('#contact');
		window.history.pushState({page: 'home'}, '');
		window.onpopstate = this.popHandler;
		console.log('Ready');
	},

	//TODO: psuh/popstate: 
	toggleContact: function toggleContact(x) {
		var $el = this.$contact;
		//show or hide (test visibility)
		if (x === undefined) {
			$('#contact_button').toggleClass('active');
			if ($el.is(':visible')) { //Hide
				$el.animate({'opacity': 0}, 1000, function() {
					$el.css('display', 'none');
					window.history.pushState({page: 'home'}, 'Raphael Cohen', '/');
				});
			} else { //Show
				$el.css('display', 'block');
				window.history.pushState({page: 'contact'}, 'Contact | Raphael Cohen', 'contact');
				$el.animate({'opacity': 1}, 1000);
			}
		} 

		//hide only
		else {
			$('#contact_button').removeClass('active');
			$el.animate({'opacity': 0}, 1000, function() {
				$el.css('display', 'none');
				window.history.pushState({page: 'home'}, 'Raphael Cohen', '/');
			});
		}
	},

	popHandler: function popHandler(event) {
		if (event.state.page === 'home') {
			event.preventDefault();
			controller.toggleContact(1);
		}
	},

	oops: function oops(msg) {
		alert(msg);
	}

};