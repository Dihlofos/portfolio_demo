'use strict';

svg4everybody();

var APP = {};
$(function () {

	$('.js-parallax-first').parallax({
		imageSrc: 'assets/img/bg-samsung-tab.jpg',
		speed: 0
	});

	$('.slider').slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		arrows: false,
		cssEase: 'linear'
	});

	$(window).on("scroll", function () {
		var vh = $(window).height();
		if ($(window).scrollTop() > vh - $(".header").height()) {
			$(".header").attr("style", "transform: translateY(-100px);");
		} else {
			$(".header").attr("style", "transform: translateY(0);");
		}
		if ($(window).scrollTop() > 0) {
			$(".parallax-slider").addClass("blur");
		} else {
			$(".parallax-slider").removeClass("blur");
		}
	});

	function Scrolling(item, offset) {
		this.item = item;
		this.position;
		this.trigger = Math.round(item.offset().top - offset) > 0 ? Math.round(item.offset().top - offset) : 10;
		this.init();
	}

	Scrolling.prototype = {
		init: function init() {
			this.bindScroll();
		},
		bindScroll: function bindScroll() {
			var obj = this;

			$(window).on("scroll", function () {
				obj.position = Math.round($(window).scrollTop());
				if (obj.position > obj.trigger) {
					$(obj.item).addClass("fade-out");
				}
				if (obj.position < obj.trigger) {
					$(obj.item).removeClass("fade-out");
				}
			});
		}
	};

	var appears = [];
	$(".js-appear").each(function (index) {
		appears[index] = new Scrolling($(this), 130);
	});
});
//# sourceMappingURL=main.js.map
