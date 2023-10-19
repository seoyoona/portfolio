// lang_bar
// $(function () { 
//     $('[data-toggle="tooltip"]').tooltip({trigger: 'manual'}).tooltip('show');
//   });  
  
//   // $( window ).scroll(function() {   
//    // if($( window ).scrollTop() > 10){  // scroll down abit and get the action   
//     $(".progress-bar").each(function(){
//       each_bar_width = $(this).attr('aria-valuenow');
//       $(this).width(each_bar_width + '%');
//     });
         
   //  }  
  // });

// tab_btn
const tabWrapper = document.querySelectorAll('.tab_wrap');
function singleTab() {
	const tabContent = document.querySelectorAll('.tab_content>div');
	const targetLink = document.querySelectorAll('.tab_btn a');
	for (let i = 0; i < targetLink.length; i++) {
		targetLink[i].addEventListener('click', (e) => {
			e.preventDefault();

			for (let j = 0; j < targetLink.length; j++) {
				targetLink[j].classList.remove('active');
				e.target.classList.add('active');
			}
			let orgTarget = e.target.getAttribute('href');
			console.log(orgTarget);
			for (let x = 0; x < tabContent.length; x++) {
				tabContent[x].style.display = 'none';
			}
			document.querySelector(orgTarget).style.display = 'block';
		});
		document.querySelector('#tabs-1').style.display = 'block';
	}
}

for (const el of tabWrapper) {
	const targetLink = el.querySelectorAll('ul.tab_btn a');
	let tabContent = el.querySelectorAll('.tab_content > div');
	targetLink.forEach(function (el) {
		el.addEventListener('click', function (e) {
			e.preventDefault();
			let tg = this;
			let currentLink = tg.getAttribute('href');
			controlClass(targetLink);
			controlClass(tabContent);
			document.querySelector(currentLink).classList.add('active');
			tg.classList.add('active');
		});
	});
}

function controlClass(old) {
	let elements = Array.from(old);
	elements.forEach(function (elem) {
		elem.classList.remove('active');
	});
}

// projects
const win = $(window);
const sections = $('.project_wrap');
let speed = Math.floor(win.height() * 0.5);
let topArr = [];
let winSCT;
console.log(speed);
//sections.offsetTop
sections.each(function (i, o) {
	const sectionTop = $(o).offset().top;
	topArr.push(sectionTop);
});
win.on('scroll', () => {
	winSCT = win.scrollTop();
	if (winSCT > topArr[0] && winSCT < topArr[1]) {
		sections.eq(0).addClass('is-animated').siblings().removeClass('is-animated');
	}
	if (winSCT > topArr[1] - speed && winSCT < topArr[2]) {
		sections.eq(1).addClass('is-animated').siblings().removeClass('is-animated');
	}
	if (winSCT > topArr[2] - speed && winSCT < topArr[3]) {
		sections.eq(2).addClass('is-animated').siblings().removeClass('is-animated');
		pipScroll();
	}
	if (winSCT > topArr[3] - speed && winSCT < topArr[4]) {
		sections.eq(3).addClass('is-animated').siblings().removeClass('is-animated');
		pipScroll();
	}
	if (winSCT > topArr[4] - speed) {
		sections.eq(4).addClass('is-animated').siblings().removeClass('is-animated');
		pipScroll();
		console.log(topArr[4],winSCT);
	}
});
function pipScroll(params) {
	const devices = ['.mockup.pc', '.mockup.mobile','.mockup.tablet'];
	$.each(devices, function (i, deviceEl) {
		const device = $(deviceEl);
		const screen = device.find('.screen');
		const mask = device.find('.mask');
		const hightDifference = screen.innerHeight() - mask.innerHeight();
		console.log(hightDifference);
		device.on({
			mouseenter: function () {
				screen.stop().animate({ top: -hightDifference }, 1000);
			},
			mouseleave: function () {
				screen.stop().animate({ top: 0 }, 1000);
			},
		});
	});
}
win.on('resize', function () {
	pipScroll();
});


// modal
$(document).ready(function() {
    $('.tab_photo').on('click', function() {
        $('#modal').css('display', 'block');
    });

    $('#modal').on('click', function() {
        $(this).css('display', 'none');
    });

	$('.modal_close_btn').on('click',function(){
		$('#modal').css('display','none')
	})
});
