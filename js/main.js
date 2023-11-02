// text
const string = '세상의 모든 색을 담는 컬러링북 퍼블리셔 서유나입니다';
const el = document.getElementById('str');

function animate(str) {
	if (str.length === 0) {
		str = string.split(''); // Reset the array
		setTimeout(() => {
			el.innerHTML = ''; // Clear the output
			animate(str);
		}, 10000);
	} else {
		el.innerHTML += str.shift();
		setTimeout(() => animate(str), 90);
	}
}

animate(string.split(''));

// gnb
const win = $(window);
const gnb = $('.gnb>ul>li');
const sectionsGnb = $('.section');

function scrollToSection(index) {
	const offset = sectionsGnb.eq(index).offset().top;
	$('html,body').stop().animate({ scrollTop: offset }, 1000, 'easeOutCirc');
}

gnb.on('click', function (e) {
	e.preventDefault();
	const index = $(this).index();
	scrollToSection(index);
});

win.on('scroll', function () {
	const sct = win.scrollTop();
	const sections = $('section');
	sectionsGnb.each(function (i) {
		const offset = sectionsGnb.eq(i).offset().top - 300;
		if (sct >= offset) {
			gnb.eq(i).addClass('on').siblings().removeClass('on');
			sectionsGnb.eq(i).addClass('on').siblings().removeClass('on');
		}
	});
	sct > 400 ? $('nav').addClass('sticky') : $('nav').removeClass('sticky');
});

// go-top
$('.go-top').click(function (e) {
	e.preventDefault();
	$('html, body').animate({ scrollTop: 0 }, 500, 'easeOutQuart');
});

// animation
AOS.init();

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.querySelector('.item.left').style.transform = 'translateX(0)';
			observer.unobserve(entry.target);
		}
	});
});

document.querySelectorAll('.project_wrap').forEach((elem) => {
	observer.observe(elem);
});

// tab_btn
const tabWrapper = document.querySelectorAll('.tab_wrap');

function singleTab() {
	const tabContent = document.querySelectorAll('.tab_content>div');
	const targetLink = document.querySelectorAll('.tab_btn a');

	targetLink.forEach((el) => {
		el.addEventListener('click', (e) => {
			e.preventDefault();
			targetLink.forEach((link) => link.classList.remove('active'));
			el.classList.add('active');
			const orgTarget = el.getAttribute('href');
			tabContent.forEach((content) => (content.style.display = 'none'));
			document.querySelector(orgTarget).style.display = 'block';
		});
	});

	document.querySelector('#tabs-1').style.display = 'block';
}

tabWrapper.forEach(singleTab);

// skill
function animateChart() {
	const chart = $('.adv_box');
	chart.each(function () {
		const item = $(this);
		const title = item.find('h3.percentage');
		const tgNum = Number(title.attr('data-num'));
		$({ rate: 0 }).animate(
			{ rate: tgNum },
			{
				duration: 3000,
				step: function (now) {
					title.text(Math.floor(now) + '%');
				},
			}
		);
	});
}

win.on('scroll', function () {
	const winScrollTop = $(this).scrollTop();
	const sectionOffsetTop = $('.advantage').offset().top;

	if (winScrollTop > sectionOffsetTop - window.innerHeight) {
		animateChart();
		win.off('scroll');
	}
});

// projects
const sections = $('.project_wrap');

function pipScroll() {
	$('.project_wrap').each(function () {
		const pc = $(this).find('.mockup.pc');
		const mobile = $(this).find('.mockup.mobile');
		const tablet = $(this).find('.mockup.tablet');
		const devices = [pc, mobile, tablet];

		$.each(devices, function (index, device) {
			const screen = device.find('.mask>img');
			const mask = device.find('.mask');
			const hightDifference = screen.innerHeight() - mask.innerHeight();

			device.on({
				mouseenter: function () {
					screen.stop().animate({ top: -hightDifference }, 1000);
				},
				mouseleave: function () {
					screen.stop().animate({ top: 0 }, 1000);
				},
			});
		});
	});
}

win.on('resize load', pipScroll);

// modal_img
$('.hover_txt').on('click', function () {
	const imageUrl = $(this).data('img-url');
	const videoUrl = $(this).data('video-url');

	if (imageUrl) {
		$('.modal_img').attr('src', imageUrl).show();
	} else {
		$('.modal_img').hide();
	}

	if (videoUrl) {
		$('.modal_video source').attr('src', videoUrl);
		$('.modal_video')[0].load();
		$('.modal_video').show();
	} else {
		$('.modal_video').hide();
	}

	$('#modal').css('display', 'block');
});

// modal
$('#modal').on('click', function () {
	$(this).css('display', 'none');
	$('body').css('overflow', 'auto');
});

$('.modal_close_btn').on('click', function () {
	$('#modal').css('display', 'none');
	$('body').css('overflow', 'auto');
});

function showModal() {
	$('#modal').css('display', 'block');
	$('body').css('overflow', 'hidden');
}
