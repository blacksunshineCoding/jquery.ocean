$.fn.ocean = function(options){
	
	var container = this;
	
	options = $.extend({
		selector: $(this),
		target: 'element',
		horicontal: true,
		vertical: false,
		verticalWabber: true,
		wabberSpeed: 5,
		wabberAmount: 50,
		wabberStartDirection: 'down',
		bounce: true,
		bounceTimes: null, //null is infinite
		windowWidth: $(window).innerWidth()
	}, options);
	
	$(options.selector).each(function() {
		$(this).attr('data-ocean-bounces', '0');
		
		if (options.verticalWabber) {
			var maxTop = parseInt($(this).css('top')) - parseInt(options.wabberAmount);
			var maxBottom = parseInt($(this).css('top')) + parseInt(options.wabberAmount);
			$(this).attr('data-ocean-wabbering', options.wabberStartDirection);
			$(this).attr('data-ocean-wabber-top', maxTop);
			$(this).attr('data-ocean-wabber-bottom', maxBottom);
		}
		
		if ($(this).css('left') != 'auto') {
			$(this).attr('data-ocean-direction', 'right');			
		} else {
			$(this).attr('data-ocean-direction', 'left');
		}
	});
	
	$(window).scroll(function() {
		$(options.selector).each(function() {
			var vanish = 0;
			if ($(this).css('left') != 'auto') {
				
				var newLeft = $(this).css('left');
				
				if ((parseInt(newLeft) >= parseInt(options.windowWidth - $(this).width() ) )) {
					// right out
//					console.log('right out');
					
					var addBounces = parseInt($(this).attr('data-ocean-bounces')) + 1;
					$(this).attr('data-ocean-bounces', addBounces);
					
					if (options.bounce == 1 && options.bounceTimes != null && addBounces >= options.bounceTimes) {
						var vanish = 1;
					} else {
						$(this).attr('data-ocean-direction', 'left');
					}
					
					
					
				} else if (( parseInt(newLeft) <= $(this).width() )) {
					// left out
//					console.log('left out');
					
					var addBounces = parseInt($(this).attr('data-ocean-bounces')) + 1;
					$(this).attr('data-ocean-bounces', addBounces);
					
					if (options.bounce == 1 && options.bounceTimes != null && addBounces >= options.bounceTimes) {
						var vanish = 1;
					} else {
						$(this).attr('data-ocean-direction', 'right');
					}
					
				}
				
				if ($(this).attr('data-ocean-direction') == 'right') {
//					console.log('count plus');
					var newLeft = parseInt($(this).css('left')) + parseInt($(this).data('ocean-speed'));
				} else {
//					console.log('count minus');
					var newLeft = parseInt($(this).css('left')) - parseInt($(this).data('ocean-speed'));
				}
				
				$(this).css('left', newLeft);
				
				if (options.verticalWabber == true) {
					var wabbering = $(this).attr('data-ocean-wabbering');
					if (wabbering == 'down') {
						var newTop = parseInt($(this).css('top')) + parseInt(options.wabberSpeed);
					} else {
						var newTop = parseInt($(this).css('top')) - parseInt(options.wabberSpeed);
					}
					
					console.log(wabbering);
					
					if ((wabbering == 'down') && (newTop >= parseInt($(this).attr('data-ocean-wabber-bottom')))) {
						$(this).attr('data-ocean-wabbering', 'up');
						console.log('changed wabbering to up');
					} else if ((wabbering == 'up') && (newTop <= parseInt($(this).attr('data-ocean-wabber-top')))) {
						$(this).attr('data-ocean-wabbering', 'down');
						console.log('changed wabbering to down');
					}
					
					console.log(newTop);
					$(this).css('top', newTop);
				}
				
				if (newLeft >= options.windowWidth) {
					$(this).remove();
				}
				
			} else {
				
				if ($(this).data('ocean-direction') == 'inverse') {
					var newRight = parseInt($(this).css('right')) - parseInt($(this).data('ocean-speed'));
				} else {
					var newRight = parseInt($(this).css('right')) + parseInt($(this).data('ocean-speed'));
				}
				
				if ( (parseInt(newRight) >= parseInt(options.windowWidth - $(this).width() ) ) || ( parseInt(newRight) <= $(this).width() ) ) {
					console.log('out of view');
					$(this).data('ocean-direction', 'inverse');
				} else {
					
				}
				$(this).css('right', newLeft);
			}
			
			/*
			var leftPosition = $(this).css('left');
			var speed = $(this).data('ocean-speed');
			var direction = $(this).data('ocean-direction');
			if (direction == 'right') {
				var newPosition = (parseInt(leftPosition)) + speed;
				if (newPosition >= ($(window).innerWidth() - $(this).width()) ) {
					console.log('lala');
					$(this).data('ocean-direction', 'left');
				}
			} else {
				var newPosition = (parseInt(leftPosition)) - speed;
			}
			
			if (newPosition > 0) {
				$(this).css('left', newPosition);
			} else {
				if (direction == 'right') {
					$(this).data('ocean-direction', 'left');
				} else {
					$(this).data('ocean-direction', 'right');
				}
			}
			*/
		});
	});
	
}