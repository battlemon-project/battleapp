function parallaxElement() {
	let windowHeight = $(window).height();
	let scrollTop = $(window).scrollTop();
	$('.parallax').each(function () {
		let positionTop = $(this).offset().top;
		let elementHeight = $(this).outerHeight();
		if (scrollTop + windowHeight > positionTop && scrollTop < positionTop) {
			let pIndex = Math.abs((positionTop - scrollTop) / windowHeight * 100);
			let valueData = Math.abs($(this).data('from-x-parallax') - $(this).data('to-x-parallax'));
			let percent = valueData / 100 * pIndex;
			let thisTransform = Math.abs($(this).data('to-x-parallax')) - percent;
			if (parseInt($(this).data('to-x-parallax')) < 0) {
				thisTransform = $(this).data('to-x-parallax') + percent;
			}
			$(this).css('transform', 'translateX(' + thisTransform + 'px)');

		}
	});

}

function mechanicsSlider() {
	if ($('.mechanics-slider').length) {
		$(".mechanics-slider.swiper-container").each(function (index, value) {
			let mechanicsSlider = undefined;
			function initSwiper() {
				var screenWidth = $(window).width();
				if (screenWidth > 575 && mechanicsSlider == undefined) {
					mechanicsSlider = new Swiper(value, {
						slidesPerView: 1,
						spaceBetween: 0,
						loop: false,
						observer: true,
						observeParents: true,
						watchOverflow: true,
						touchReleaseOnEdges: true,
						speed: 700,
						pagination: {
							el: ".mechanics-slider__pagination",
							clickable: true
						},
						breakpoints: {
							576: {
								slidesPerView: 2,
								spaceBetween: 30,
							},
							992: {
								slidesPerView: 3,
								spaceBetween: 30,
							},
							1200: {
								slidesPerView: 4,
								spaceBetween: 30,
							},
						}
					});
				} else if (screenWidth < 576 && mechanicsSlider != undefined) {
					mechanicsSlider.destroy();
					mechanicsSlider = undefined;
					$('.mechanics-slider').find('.swiper-wrapper').removeAttr('style');
					$('.mechanics-slider').find('.swiper-slide').removeAttr('style');
				}
			}
			initSwiper();
			$(window).resize(function () {
				initSwiper();
			});
		});
	}
}
// function changeSliderDirection() {

// 	let items = sliderOffer.slides.length;
// 	let activSlide = sliderOffer.activeIndex;
// 	console.log(sliderOffer);
// 	setTimeout(() => {
// 		sliderOffer.slideNext(900, true)
// 	}, 2900);
// }
function offerSlider(element) {
	var timer;
	let sliderOffer = new Swiper(".offer-slider.swiper-container", {
		slidesPerView: 1,
		spaceBetween: 0,
		effect: "creative",
		loop: false,
		speed: 900,
		effect: "coverflow",
		centeredSlides: true,
		initialSlide: 2,
		// autoplay: {
		// 	delay: 2000,
		// 	disableOnInteraction: false,
		// },
		coverflowEffect: {
			rotate: 0,
			stretch: 60,
			depth: 200,
			modifier: 3,
			slideShadows: false,
			scale: 1
		},
		breakpoints: {
			500: {
				slidesPerView: 1,
				spaceBetween: 0,
				coverflowEffect: {
					rotate: 0,
					stretch: 100,
					depth: 200,
					modifier: 3,
					slideShadows: false,
					scale: 1
				},
			}
		},
		on: {
			slideChange: function () {
				setTimeout(() => {
					let items = sliderOffer.slides.length;
					let activSlide = sliderOffer.activeIndex;
					if (activSlide + 1 == items) {
						$(sliderOffer.el).addClass('prev')

					} else if (activSlide === 0) {
						$(sliderOffer.el).removeClass('prev')
					}
				}, 500);

				clearTimeout(timer);
				timer = setTimeout(() => {
					if (!$(sliderOffer.el).hasClass('prev')) {
						sliderOffer.slideNext(900, true)
					} else {
						sliderOffer.slidePrev(900, true)
					}
				}, 5000);
			},
		},

	});
	setTimeout(() => {
		sliderOffer.slideNext(900, true)
	}, 5000);
}


$(window).scroll(function () {
	parallaxElement();
})

$(window).on('scroll', function () {
	if ($(this).scrollTop() > $('.header').outerHeight()) {
		$('.header').addClass('fixed');

	} else {
		$('.header').removeClass('fixed');
	}
});
$(document).ready(function () {

	if ($('.mystery-box-items').length) {
		var scene = $('.mystery-box-items').get(0);
		var parallaxInstance = new Parallax(scene);
	}


	parallaxElement();
	mechanicsSlider();
	offerSlider();
	if ($('.carouselTicker').length) {
		$('.carouselTicker').carouselTicker({
			speed: 1,
			delay: 30,
		});
	}
})

$(document).on('click', '.js-menu__btn', function () {
	$('.js-menu').addClass('open');
	$('body').addClass('lock');
});
$(document).on('click', '.js-menu__close', function () {
	$(this).parents('.js-menu').removeClass('open');
	$('body').removeClass('lock');
});

$(document).on('click', '.js-menu', function (e) {
	if (!$(e.target).closest('.js-menu__btn').length && !$(e.target).closest('.js-menu__body').length) {
		$('.js-menu').removeClass('open');
		$('body').removeClass('lock');
	}
});


$(document).ready(function () {
	if ($('.block-home__animation').length) {
		var canvas = document.getElementById('block-home__animation');
		const context = canvas.getContext("2d");
		let isPower = false;
		let maxPower = 200;
		let power = 10;
		let entities = [];
		let colors = [
			{ red: 255, green: 255, blue: 255 },
			{ red: 250, green: 250, blue: 250 },
		];

		function random(value, offset) {
			return value + Math.floor((Math.random() - 0.5) * offset);
		}

		function spawnEntity() {
			let x = canvas.width / 2;
			let y = canvas.height / 2;
			let velocity = {
				x: (Math.random() - 0.5) * 20,
				y: (Math.random() - 0.5) * 20
			};
			let offset = {
				x: random(125, 50) * velocity.x,
				y: random(125, 50) * velocity.y
			};

			entities.push({
				x: x + offset.x,
				y: y + offset.y,
				previousPosition: {},
				velocity,
				isSpawned: false,
				color: colors[Math.floor(Math.random() * colors.length)],
				opacity: 0
			});
		}

		function update(time) {
			context.fillStyle = 'rgba(14, 29, 43)';
			context.fillRect(0, 0, canvas.width, canvas.height);

			entities.forEach((entity, index) => {
				if (isPower) {
					if (entity.opacity <= 0.75 && !entity.isSpawned) {
						entity.opacity = Math.min(0.75, entity.opacity + 0.125);

						if (entity.opacity === 0.75) {
							entity.isSpawned = true;
						}
					}
				} else {
					if (!entity.isSpawned) {
						entity.opacity = 0.75;
						entity.isSpawned = true;
					}
				}

				context.globalCompositeOperation = "lighter";

				const distance = Math.hypot(
					canvas.width / 2 - entity.x,
					canvas.height / 2 - entity.y
				);
				const multiplier = distance / 200;
				context.beginPath();
				context.arc(entity.x, entity.y, 0.5 * multiplier, Math.PI * 2, false);
				context.closePath();
				context.fillStyle = `rgba(${entity.color.red}, ${entity.color.green}, ${entity.color.blue}, ${entity.opacity})`;
				context.fill();

				context.beginPath();
				context.moveTo(entity.x, entity.y);
				context.lineTo(
					entity.previousPosition.x || entity.x,
					entity.previousPosition.y || entity.y
				);
				context.closePath();
				context.lineWidth = multiplier;
				context.strokeStyle = `rgba(${entity.color.red}, ${entity.color.green}, ${entity.color.blue}, ${entity.opacity})`;
				context.stroke();

				context.globalCompositeOperation = "source-over";

				[entity.previousPosition.x, entity.previousPosition.y] = [
					entity.x,
					entity.y
				];

				entity.x += entity.velocity.x * (power / (maxPower / 1.25));
				entity.y += entity.velocity.y * (power / (maxPower / 1.25));

				if (entity.isSpawned) {
					entity.opacity *= 0.9875;
				}

				if (isPower) {
					entity.velocity.x *= 1.25;
					entity.velocity.y *= 1.25;
				}

				if (
					entity.previousPosition.x < 0 ||
					entity.previousPosition.x > canvas.width ||
					entity.previousPosition.y < 0 ||
					entity.previousPosition.y > canvas.height ||
					entity.opacity <= 5e-2
				) {
					entities.splice(index, 1);
				}
			});

			for (let i = 0; i < Math.floor(power); i++) {
				spawnEntity();
			}

			if (isPower) {
				power = Math.min(maxPower, power + 0.35);
			} else {
				power = Math.max(1, power * 0.85);
			}

			requestAnimationFrame(update);
		}

		function resize() {
			const canvasHeight = document.getElementById('block-home');
			if (canvasHeight) {
				[canvas.width, canvas.height] = [innerWidth, canvasHeight.clientHeight];
			}

			entities = [];
		}

		function init() {
			["mousedown", "touchstart"].forEach((type) => {
				canvas.addEventListener(type, (event) => {
					event.preventDefault();

					isPower = true;
				});
			});

			["mouseup", "touchend"].forEach((type) => {
				canvas.addEventListener(type, (event) => {
					event.preventDefault();

					isPower = false;
				});
			});

			// window.addEventListener("mousemove", () => {
			// 	power = Math.min(maxPower, power * 1.125);
			// });

			resize();

			requestAnimationFrame(update);
		}

		window.addEventListener("load", init);
		window.addEventListener("resize", resize);
	}
})



