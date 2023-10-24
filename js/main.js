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

// text
var string = "세상의 모든 색을 담는 컬러링북 퍼블리셔 서유나입니다";
var str = string.split("");
var el = document.getElementById('str');

(function animate() {
    if(str.length === 0) {
        str = string.split(""); // Reset the array

        // Wait for 2 seconds before clearing the output and starting again
        setTimeout(function() {
            el.innerHTML = ""; // Clear the output
            animate();
        }, 10000);
    } else {
        el.innerHTML += str.shift();
        
        setTimeout(animate, 90);
    }
})();


// gnb
const winGnb = $(window);
const gnb = $('.gnb>ul>li');
const sectionsGnb = $('.section');

function scrollToSection(index) {
	let section = sectionsGnb.eq(index);
	let offset = section.offset().top;
	$('html,body').stop().animate({ scrollTop: offset }, 1000, 'easeOutCirc');
}
gnb.on({
	click: function (e) {
		e.preventDefault();
		let index = $(this).index();
    scrollToSection(index)
	},
});

winGnb.on('scroll', function () {
	let sct = winGnb.scrollTop();
	sectionsGnb.each(function (i) {
		if (sct >= sectionsGnb.eq(i).offset().top - 300) {
			//gnb.removeClass('on')
			gnb.eq(i).addClass('on').siblings().removeClass('on');
			sectionsGnb.eq(i).addClass('on').siblings().removeClass('on');
		}
	});
	sct > 400 ? $('nav').addClass('sticky') : $('nav').removeClass('sticky');
});

// go-top
$(function () {

	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			$('.go-top').fadeIn(200);
		} else {
			$('.go-top').fadeOut(200);
		}
	});

	$('.go-top').click(function (e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 500, 'easeOutQuart');
	});
});

// intro_info anim
$(window).on('scroll', () => {
	let winSCT;
	const sections = $('section');
	winSCT = $(window).scrollTop();
	sections.each(function (idx, o) {
		const tg = $(this);
		const tgtop = tg.offset().top;
		if (winSCT > tgtop) {
			tg.find('.info_col_left').css('transform', 'translateX(0%)');
			tg.find('.info_col_left').css('opacity', 1);
			tg.find('.info_col_right').css('transform', 'translateX(0%)');
			tg.find('.info_col_right').css('opacity', 1);
		} else if (winSCT > tgtop) {
			tg.find('.info_col_right').css('transform', 'translateX(0%)');
			tg.find('.info_col_right').css('opacity', 1);
		} 
	});
});

// animation
function scroll(){
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.screenY;

    document.querySelectorAll(".section").forEach(item => {
        if(scrollTop > item.offsetTop - window.innerHeight / 2.5){
            item.classList.add("show");
        }
    });

    requestAnimationFrame(scroll);
}

scroll();


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

// skill

(function ($){

	$.fn.bekeyProgressbar = function(options){
	
		options = $.extend({
		  animate     : true,
		  animateText : true
		}, options);
	
		const $this = $(this);
	  
		const $progressBar = $this;
		const $progressCount = $progressBar.find('.progress-bar-percentage--count');
		const $circle = $progressBar.find('.progress-bar-circle');
		const percentageProgress = $progressBar.data('progress');
		const percentageRemaining = (100 - percentageProgress);
		const percentageText = percentageProgress;
	  
		//Calcule la circonférence du cercle
		const radius = $circle.attr('r');
		const diameter = radius * 2;
		const circumference = Math.round(Math.PI * diameter);
	
		//Calcule le pourcentage d'avancement
		const percentage =  circumference * percentageRemaining / 100;
	
		$circle.css({
		  'stroke-dasharray' : circumference,
		  'stroke-dashoffset' : percentage
		})
		
		//Animation de la barre de progression
		if(options.animate === true){
		  $circle.css({
			'stroke-dashoffset' : circumference
		  }).animate({
			'stroke-dashoffset' : percentage
		  }, 3000 )
		}
		
		//Animation du texte (pourcentage)
		if(options.animateText == true){
	
		  $({ Counter: 0 }).animate(
			{ Counter: percentageText },
			{ duration: 3000,
			 step: function () {
			   $progressCount.text( Math.ceil(this.Counter)+'%');
			 }
			});
	
		}else{
		  $progressCount.text( percentageText+'%');
		}
		
	};
	
	})(jQuery);

	$(function() {
		var animated = false;
	
		$(window).on('scroll', function () {
			var scrollTop = $(this).scrollTop();
			var advantageOffset = $('.advantage').offset().top;
			var windowHeight = $(this).height();
	
			if (!animated & scrollTop + windowHeight >= advantageOffset) {
				$('.progress-bar--animate-circle').each(function () {
					$(this).bekeyProgressbar({
						animate: true,
						animateText: true
					});
				});
	
				animated = true;  
			}
		});
	});



// projects
const win = $(window);
const sections = $('.project_wrap');
let speed = Math.floor(win.height() * 0.5);
let topArr = [];
let winSCT;
console.log(speed);

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
	if (winSCT > topArr[3] - speed ) {
		sections.eq(3).addClass('is-animated').siblings().removeClass('is-animated');
		pipScroll();
	}
})

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
