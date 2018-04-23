"use strict";

svg4everybody();

var APP = {};
$(function () {

	/*gloabla vars*/
	var main = document.querySelector("body");
	var getHeader = $(".header");
	var onBottom = false;
	var appears = [];

	/*functions start*/
	headerAnim();
	bottomEvent();

	/*sliders init*/
	$(".slider").slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: false,
		arrows: false,
		cssEase: "linear"
	});

	/*reinit content scripts*/
	$(document).on("reinit", function () {
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

		$(".js-appear").each(function (index) {
			appears[index] = new Scrolling($(this));
		});
	});

	/*Scroll events*/
	$(window).on("scroll", function () {
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

		if ($(window).scrollTop() > 0 && scrollState == false && !isMobile()) {
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
		if (isMobile) {
			this.trigger = 50;
		} else {
			this.trigger = 0;
		}
		this.init();
	}
	Scrolling.prototype = {
		init: function init() {
			this.bindScroll();
		},
		clearDelay: function clearDelay() {
			this.item.attr("style", "animation-delay: 0s;");
		},
		bindScroll: function bindScroll() {
			var obj = this;
			$(window).on("scroll", function () {
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

	$(".js-appear").each(function (index) {
		appears[index] = new Scrolling($(this));
	});

	function isMobile() {
		if ($(window).width() < 767) {
			return true;
		} else {
			return false;
		}
	};

	function bottomEvent() {
		if (!isMobile()) {
			$(".js-bottom").on("click", function (e) {
				var address = String(window.location).substr(0, String(window.location).lastIndexOf("/"));
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
				$("body").attr("style", "height: 200vh;");
				$(this).one("transitionend", function () {
					$("html,body").animate({ scrollTop: 0 }, 0);
					history.pushState(null, null, address + $(".js-bottom").attr("href"));
					changePage();
					onBottom = false;
				});
			});
		}
	}

	function headerAnim() {
		$(".header__link-cont").one("animationend  animationend  webkitAnimationEnd  oanimationend MSAnimationEnd", function () {
			$(this).removeClass("width-rise-18 width-rise-26");
			$(this).addClass("after-anim");
			$(".js-appear").addClass("slide-in-top");
		});

		$(".header__link-cont").find("i").one("animationend  animationend  webkitAnimationEnd  oanimationend MSAnimationEnd", function () {
			$(this).removeClass("width-rise-8");
			$(this).parents(".header__link-cont").addClass("after-anim");
		});
	}

	function loadPage(url) {
		return fetch(url, {
			method: "GET"
		}).then(function (response) {
			return response.text();
		});
	}

	function changePage() {
		// Заметьте, что URL уже изменился
		var url = window.location.href;

		loadPage(url).then(function (responseText) {
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
		var fadeOut = oldContent.animate({
			opacity: [1, 0]
		}, 1000);

		var fadeIn = newContent.animate({
			opacity: [0, 1]
		}, 1000);

		fadeIn.onfinish = function () {
			$("body").attr("style", " ");
			oldContent.parentNode.removeChild(oldContent);
			/*fix for anrdoid chrome*/
			if (!$(".js-appear").hasClass("slide-in-top")) {
				$(".js-appear").addClass("slide-in-top");
			}
		};
	}
});
//# sourceMappingURL=main.js.map
