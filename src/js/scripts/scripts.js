$(window).on("load", function(){
	$(".preloader").fadeOut();
})

$(function() {

	
	/*gloabla vars*/
	var main = document.querySelector("body");
	var getHeader = $(".header");
	var onBottom = false;
	var appears = [];

	/*functions start*/
	headerAnim();
	bottomEvent();
	contactsModal();
	worksModal();

	/*case sliders init*/
	$(".slider").slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: false,
		arrows: false,
		cssEase: "linear"
	});
	/*main slider init*/
	$(".slider-main").on('init', function(slick){
		$(".page-main").addClass("no-overflow");
		$(slick.currentTarget).addClass("is-loaded");
		$(".slick-dots li").each(function(index){
			$(this).addClass("slide-in-bottom");
			$(this).attr("style","animation-delay: " + (0.5+index*0.15) + "s;")
		})		
	})

	var sliderMain = $(".slider-main").slick({
		dots: true,
	  infinite: true,
	  speed: 100,
	  fade: true,
	  arrows: true,
	  nextArrow:'<button class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="23" viewBox="0 0 15 23"><path fill="#0D71FC" fill-rule="evenodd" d="M14.845 11.46l.075.076L3.536 22.92 0 19.385l7.925-7.925L0 3.536 3.536 0 14.92 11.385l-.075.075z"/></svg></button>',
	  prevArrow: '<button class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="23" viewBox="0 0 15 23"><path fill="#0D71FC" fill-rule="evenodd" d="M.075 11.46L0 11.385 11.385 0l3.535 3.536-7.924 7.924 7.924 7.925-3.535 3.535L0 11.536l.075-.076z"/></svg></button>',
	  cssEase: 'linear'
	});

	

	sliderMain.on('beforeChange', function(event, slick, currentSlide, nextSlide){
	  var temp = $(slick.$slides[nextSlide]).html();
	  $(".delay").removeClass("delay");
	  $(slick.$slides[nextSlide]).html("");
	  $(slick.$slides[nextSlide]).html(temp);
	});

	/*reinit content scripts*/
	$(document).on("reinit", function() {
		$(".slider").slick({
			dots: true,
			infinite: true,
			speed: 500,
			fade: false,
			arrows: false,
			cssEase: "linear"
		});

		bottomEvent();
		headerAnim();

		$(".js-appear").each(function(index) {
			appears[index] = new Scrolling($(this));
		});
	});

	/*Scroll events*/
	$(window).on("scroll", function() {
		var vh = $(window).height();
		var scrollState = false;

		if ($(window).scrollTop() > vh - $(".header").height() && !onBottom) {
			$(".header").attr("style", "transform: translateY(-100px);");
		} else {
			$(".header").attr("style", "transform: translateY(0);");
		}

		if ($(window).scrollTop() > $(".js-top").height()) {
			$(".js-bottom").addClass("is-clickable");
			$(".js-top-bg").removeClass("active");
		} else {
			$(".js-bottom").removeClass("is-clickable");
			$(".js-top-bg").addClass("active");
		}

		if ($(window).scrollTop() > 0 && scrollState == false && (!isMobile())) {
			$(".js-top-bg").addClass("blur");
			scrollState = true;
		} else {
			$(".js-top-bg").removeClass("blur");
			scrollState = false;
		}
	});

	function Scrolling(item) {
		this.item = item;		
		this.position;
		if (isMobile){
			this.trigger = 50;
			} else {
				this.trigger = 0;
			}		
		this.init();
	}
	Scrolling.prototype = {
		init: function() {
			this.bindScroll();
		},
		clearDelay: function(){
			this.item.attr("style", "animation-delay: 0s;")
		},
		bindScroll: function() {
			var obj = this;
			$(window).on("scroll", function() {
				obj.clearDelay();
				obj.position = Math.round($(window).scrollTop());
				if (obj.position > obj.trigger) {
					$(obj.item).addClass("fade-out");
				}
				if (obj.position <= obj.trigger) {
					$(obj.item).removeClass("fade-out");
				}
			});
		}
	};
	
	$(".js-appear").each(function(index) {
		appears[index] = new Scrolling($(this));
	});

	function contactsModal(){
		$(".js-contacts-open").on("click", function(e){
			e.preventDefault();	
			if (!$("body").hasClass("no-overflow")){
				$("body").addClass("no-overflow");
			}
			if (!isMobile()){
				$(".js-contacts").attr("style", "clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);");
			}	 else {
				$(".js-contacts").attr("style", "left: 0");
			}	
			
			$(".js-contacts").one("transitionend",function(){
				ledderAnim($(".js-contacts-anim"),true);
				$(".js-contacts-close").attr("style", "transform: translateX(0%);");
			});			
		});		
		$(".js-contacts-close").on("click", function(e){
			e.preventDefault();
			ledderAnim($(".js-contacts-anim"),false);
			$("body").removeClass("no-overflow");
			if (!isMobile()){
				$(".js-contacts").attr("style", "clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);");
				$(".js-contacts-close").attr("style", "transform: translateX(700%);");
			} else {
				$(".js-contacts").attr("style", "left: -100%");
			}			
		});

	}

	function worksModal(){

		$(".js-works-open").on("click", function(e){
			e.preventDefault();		
			if (!isMobile()){
				$(".js-works").attr("style", "transform: translateX(0%);");
			} else {
				$(".js-works").attr("style", "left: 0;");
			}
			
			$(".js-works").one("transitionend",function(){
				ledderAnim($(".js-works .works__item"),true);
				$(".js-works-close").attr("style", "transform: translateX(0%);");
			
			});
		});
		
		$(".js-works-close").on("click", function(e){
			e.preventDefault();	
			if (!isMobile()){
				$(".js-works").attr("style", "transform: translateX(100%);")
			} else {
				$(".js-works").attr("style", "left: -100%;");
			}
			
			ledderAnim($(".js-works .works__item"),false);
			$(".js-works").one("transitionend",function(){
				
				if (!isMobile()){
					$(".js-contacts-close").attr("style", "transform: translateX(700%);");
				}
				
				
			});
		});
	}
	
	function isMobile(){
		if ($(window).width()< 767){
			return true;
		} else {
			return false;
		}
	};

	function ledderAnim(object,todo){
		if (todo == true){
			object.each(function(index){
				$(this).addClass("slide-in-top active");
				$(this).attr("style","animation-delay: " + (0.5+index*0.2) + "s;")
			});
		}
		if (todo == false){
			object.each(function(index){
				$(this).removeClass("slide-in-top active");
				$(this).attr(" ")
			});
		}		
	}


	function bottomEvent() {
		if (!isMobile()) {
			$(".js-bottom").on("click", function(e) {
				var address = String(window.location).substr(
					0,
					String(window.location).lastIndexOf("/")
				);
				e.preventDefault();
				$(this).addClass("full");
				$(".case-single__bottom-title").addClass("slide-out-bottom");
				$(".case-single__bottom-link").addClass("slide-out-bottom");
				$(".case-single__bottom-bg").removeClass("blur");
				$(".case-single__section").remove();
				onBottom = true;			
				$(".header__link-cont").removeClass("after-anim");
				$(".header__link--works").find("i").removeClass("after-anim");
				$(".header__link--main").find(".header__link-cont").addClass("width-rise-18");
				$(".header__link--works").find("i").addClass("width-rise-8");
				$(".header__link--menu").find(".header__link-cont").addClass("width-rise-26");
				$("body").attr("style","height: 200vh;");
				$(this).one("transitionend", function() {
					$("html,body").animate({ scrollTop: 0 }, 0);
					history.pushState(null, null, address + $(".js-bottom").attr("href"));
					changePage();
					onBottom = false;
				});
			});
		}
	}

	function headerAnim() {
		$(".header__link-cont").one(
			"animationend  animationend  webkitAnimationEnd  oanimationend MSAnimationEnd",
			function() {
				$(this).removeClass("width-rise-18 width-rise-26");
				$(this).addClass("after-anim");
				$(".js-appear").addClass("slide-in-top");
			}
		);

		$(".header__link-cont").find("i").one(
			"animationend  animationend  webkitAnimationEnd  oanimationend MSAnimationEnd",
			function() {
				$(this).removeClass("width-rise-8");
				$(this).parents(".header__link-cont").addClass("after-anim");
			}
		);
	}

	function loadPage(url) {
		return fetch(url, {
			method: "GET"
		}).then(function(response) {
			return response.text();
		});
	}

	

	function changePage() {
		// Заметьте, что URL уже изменился
		var url = window.location.href;

		loadPage(url).then(function(responseText) {
			var wrapper = document.createElement("div");
			wrapper.innerHTML = responseText;

			var oldContent = document.querySelector(".page");
			var newContent = wrapper.querySelector(".page");

			main.appendChild(newContent);
			$(document).trigger("reinit");
			animate(oldContent, newContent);

		});
	}

	function animate(oldContent, newContent) {
		oldContent.style.position = "absolute";
		var fadeOut = oldContent.animate(
			{
				opacity: [1, 0]
			},
			1000
		);

		var fadeIn = newContent.animate(
			{
				opacity: [0, 1]
			},
			1000
		);

		fadeIn.onfinish = function() {
			$("body").attr("style"," ");
			oldContent.parentNode.removeChild(oldContent);
			/*fix for anrdoid chrome*/
			if (!$(".js-appear").hasClass("slide-in-top")){
				$(".js-appear").addClass("slide-in-top");
			}
			
			
		};
	}
});
