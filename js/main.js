(function() {
	"use strict";
	
	$(document).ready(function() {	
		//Menu ========================
		$(window).on('scroll', function () {
			if ($(window).scrollTop() > 70)
			{
				$("#mainmenu").addClass('fixedHeader');
			}
			else
			{
				$("#mainmenu").removeClass('fixedHeader');
			}
			/************ Menu Active on Scroll **********************/
			Scroll();
		});
		$(".menuButton").on('click', function () {
			$(this).next('ul').slideToggle('slow');
			$(this).toggleClass('active');
		});
		$('.mainMenu ul li.scroll a').on('click', function () {
			if ($(window).width() < 991)
			{
				if ($(this).parent().hasClass('hsChildItem'))
				{
					$(this).parent('.mainMenu ul li.hsChildItem').toggleClass('active');
				}
				else
				{
					$('html, body').animate({scrollTop: $(this.hash).offset().top - 70}, 1000);
					$(".mainMenu ul").slideUp('slow');
					$(".menuButton").removeClass('active');
				}
			}
			else
			{
				$('html, body').animate({scrollTop: $(this.hash).offset().top - 70}, 1000);
			}
			return false;
		});
		// User define function
		function Scroll() {
			var contentTop = [];
			var contentBottom = [];
			var winTop = $(window).scrollTop();
			var rangeTop = 200;
			var rangeBottom = 500;
			$('.mainMenu').find('.scroll > a').each(function () {
				var atr = $(this).attr('href');
				if ($(atr).length > 0)
				{
					contentTop.push($($(this).attr('href')).offset().top);
					contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
				}
			});
			$.each(contentTop, function (i) {

				if (winTop > contentTop[i] - rangeTop) {

					$('.mainMenu li.scroll')
							.removeClass('active')
							.eq(i).addClass('active');
				}
			});
		};
	});
})(jQuery);



//подгрузка карты мультитест(на общую загрузку скриптов сайта не влияет)
(function() {
  var widget = document.createElement('script');
  widget.charset = "UTF-8";
  widget.type = 'text/javascript';
  widget.async = true;
  if(location.protocol === "file:") {
    widget.src = 'widget.js?hideinput=1&ispconfig={"lifecell-4g":1,"kyivstar-4g":1,"vodafone-4g":1,"lifecell-3g":1,"kyivstar-3g":1,"vodafone-3g":1,"intertelecom-reva":1,"intertelecom-revb":1,"trimob":1}&apikey=AIzaSyDQZ75n4Zbjb0fsRriAVIDZPFeJ7VJLnUQ'
  } else {
      widget.src = 'https://3gstar-widget.ip2isp.net/widget.js?hideinput=1&ispconfig={"lifecell-4g":1,"kyivstar-4g":1,"vodafone-4g":1,"lifecell-3g":1,"kyivstar-3g":1,"vodafone-3g":1,"intertelecom-reva":1,"intertelecom-revb":1,"trimob":1}'
  }
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(widget);
})();
//end карта мультитест


$(document).ready(function (){
    // animate button
    $('#buttonContactForm').click(function(){
        $('#contactForm').fadeIn(500);
        $('html, body').animate({
            scrollTop: $("#contactFormScroll").offset().top
        }, 1000);
    });
});