$(function() {

	$('.js-parallax-first').parallax(
		{
			speed: 0,
			naturalWidth: 1024,
			naturalHeight: 600
		}
	);
	$('.js-parallax-first').attr("style", " ");

	$('.slider').slick({
	  dots: true,
	  infinite: true,
	  speed: 500,
	  fade: false,
	  arrows: false,
	  cssEase: 'linear'
	});

	$(window).on("scroll", function(){		
		var vh = $(window).height();
		var scrollState = false;

		if ($(window).scrollTop() > (vh - $(".header").height())){
			$(".header").attr("style","transform: translateY(-100px);");
			
		} else {
			$(".header").attr("style","transform: translateY(0);");
			
		}

		if ($(window).scrollTop() > ($(".js-parallax-first").height())){
			$(".js-bottom").addClass("is-clickable");
		} else {
			$(".js-bottom").removeClass("is-clickable");
		}



		if ($(window).scrollTop() > 0  && scrollState == false){
			$(".parallax-slider").addClass("blur");
			scrollState = true;
		} else {
			$(".parallax-slider").removeClass("blur");
			scrollState = false;
		}
	});

	function Scrolling(item,offset) {
		this.item = item;
		this.position;
		this.trigger = (Math.round(item.offset().top - offset) > 0 ? Math.round(item.offset().top - offset) : 10);
		this.init();
	}

	Scrolling.prototype = {
		init: function() {
			this.bindScroll();
		},
		bindScroll: function() {
			var obj = this;

			$(window).on("scroll", function(){
				obj.position = Math.round($(window).scrollTop());
				if (obj.position > obj.trigger ) {
					$(obj.item).addClass("fade-out");
				} 
				if (obj.position < obj.trigger) { 
					$(obj.item).removeClass("fade-out");
				}
			});
		}
	};

	var appears = [];
	$(".js-appear").each(function(index){
		appears[index] = new Scrolling($(this),130);
	});

	$(".header__link-cont").one(
    "animationend  animationend  webkitAnimationEnd  oanimationend MSAnimationEnd",
     function() {
      $(this).removeClass("width-rise-18 width-rise-22 width-rise-26");
      $(this).addClass("after-anim");
     }
   );

	$(".js-bottom").on("click", function(e){
		e.preventDefault();
		$(this).addClass("full");
		$(".case-single__bottom-title").remove();
		$(".case-single__bottom-link").remove();
		$(".case-single__bottom-bg").removeClass("blur");
		$(this).one(
          "transitionend",
          function() {
            location.href = $(this).attr("href")
          }
        );
		
	});










});