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

