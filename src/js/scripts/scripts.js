$(function() {

	



	$('.slider').slick({
	  dots: true,
	  infinite: true,
	  speed: 500,
	  fade: false,
	  arrows: false,
	  cssEase: 'linear'
	});

	$(document).on("reinit", function(){
		$('.slider').slick({
		  dots: true,
		  infinite: true,
		  speed: 500,
		  fade: false,
		  arrows: false,
		  cssEase: 'linear'
		});

		$(".js-bottom").on("click", function(e){
			var address = String(window.location).substr(0, String(window.location).lastIndexOf("/"));
			e.preventDefault();
			$(this).addClass("full");
			$(".case-single__bottom-title").addClass("slide-out-bottom");
			$(".case-single__bottom-link").addClass("slide-out-bottom");
			$(".case-single__bottom-bg").removeClass("blur");
			$(".case-single__section").remove();
	    $(".header__link-cont").addClass("width-rise-18 width-rise-22 width-rise-26");
			$(this).one(
	          "transitionend",
	          function() {
	          	$('html,body').animate({ scrollTop: 0 }, 0);
	          	history.pushState(null, null, address + $(".js-bottom").attr("href"));
	          	changePage();
	          }
	        );
		});

		var appears = [];
		$(".js-appear").each(function(index){
			appears[index] = new Scrolling($(this),130);
		});
	})

	$(window).on("load", function() {
     $(".preloader").fadeOut('slow');

  });

	$(window).on("scroll", function(){		
		var vh = $(window).height();
		var scrollState = false;

		if ($(window).scrollTop() > (vh - $(".header").height())){
			$(".header").attr("style","transform: translateY(-100px);");
			
		} else {
			$(".header").attr("style","transform: translateY(0);");
			
		}

		if ($(window).scrollTop() > ($(".js-top").height())){
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
		var address = String(window.location).substr(0, String(window.location).lastIndexOf("/"));
		e.preventDefault();
		$(this).addClass("full");
		$(".case-single__bottom-title").addClass("slide-out-bottom");
		$(".case-single__bottom-link").addClass("slide-out-bottom");
		$(".case-single__bottom-bg").removeClass("blur");
		$(".case-single__section").remove();
    $(".header__link-cont").addClass("width-rise-18 width-rise-22 width-rise-26");
		$(this).one(
          "transitionend",
          function() {
          	$('html,body').animate({ scrollTop: 0 }, 0);
          	
          	history.pushState(null, null, address + $(".js-bottom").attr("href"));
          	changePage();
          }
        );
	});

	function loadPage(url) {
	  return fetch(url, {
	    method: 'GET'
	  }).then(function(response) {
	    return response.text();
	  });
	}

	var main = document.querySelector('body');
	var getHeader = $(".header");
	function changePage() {
	  // Заметьте, что URL уже изменился
	  var url = window.location.href;

	  loadPage(url).then(function(responseText) {
	    var wrapper = document.createElement('div');
	        wrapper.innerHTML = responseText;

	    var oldContent = document.querySelector('.page');
	    var newContent = wrapper.querySelector('.page');

	    main.appendChild(newContent);
	    animate(oldContent, newContent);
	  });
	}

	function animate(oldContent, newContent) {
		
	  oldContent.style.position = 'absolute';

	  var fadeOut = oldContent.animate({
	    opacity: [1, 0]
	  }, 1000);

	  var fadeIn = newContent.animate({
	    opacity: [0, 1]
	  }, 1000);

	  fadeIn.onfinish = function() {
	    oldContent.parentNode.removeChild(oldContent);
	    $(document).trigger("reinit");
	  };
	}










});