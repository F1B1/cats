
import '../libs/inputmask.min.js'
import '../libs/just-validate.min.js'

// import { isMobile } from "./functions.js";
window.onload = function () {
	let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

	//Burger=================================================================
	if (window.innerWidth < 768 && isMobile.any()) {
		const menuBurger = document.querySelector('.menu__body');
		const menuIcon = document.querySelector('.icon-menu')
		menuIcon.addEventListener("click", function () {
			menuIcon.classList.toggle('_active')
			menuBurger.classList.toggle('_active')
		})
	}



//Scroll============================================================================================


	const headerElemenet = document.querySelector('.header')
	const callback = function (entries, boserver) {
		if (entries[0].isIntersecting) {
			headerElemenet.classList.remove('_scroll')
		} else {
			headerElemenet.classList.add('_scroll')
		}
	}
	const headerObserver = new IntersectionObserver(callback)
	headerObserver.observe(headerElemenet)


		//Form============================================================================================

		const form = document.querySelector('.form');
		const telSelector = form.querySelector('.input[type="tel"]')
		const inputMask = new Inputmask('+7 (999) 999-99-99')
		const emailSelector = form.querySelector('.input[type="email"]')

		
		inputMask.mask(telSelector)

		new window.JustValidate('.form',{
			rules:{
				tel:{
					
					function:()=>{
						const phone = telSelector.inputmask.unmaskedvalue()
						return Number(phone) && phone.length === 10
					}
				}
			},
			messages:{
				name:{
								required:'Введите имя',
								minLength:'Введите 3 и более символа',
								maxLength:'Запрещено вводить более 15 символов'
							},
							email:{
								email:'Введите корректный email',
								required:'Введите email'
							},
							tel:{
								required:'Введите телефон',
								function:'Укажите свой номер телефона'
							}
			},
			submitHandler:function(thisForm){}
		})

//Map============================================================================================

	function initMap() {
		let pos = new google.maps.LatLng(59.938761, 30.323042)
	let myMap = new google.maps.Map(document.getElementById("map"), {
		center: pos,
		zoom: 16,
	})
	let marker = new google.maps.Marker({
		position: pos,
		map: myMap,
		title: 'Я здесь',
		icon:'../../img/map/01.png'
	})
	}
	initMap()
	
	//Slider=================================================================
	const imgAfter = document.querySelector('.example__image-before');
	const imgBefore = document.querySelector('.example__image-after');
	const btnBefore = document.querySelector('.example__button-before');
	const btnAfter = document.querySelector('.example__button-after');
	const range = document.querySelector('.example__range');

	if (window.innerWidth > 768) {
		const progress = document.querySelector('.example__images')
		if (progress) {

			range.addEventListener('input', function () {
				imgBefore.style.width = (100 - range.value) + '%';
				imgAfter.style.width = range.value + '%';
			})

			btnAfter.addEventListener('click', function () {
				imgBefore.style.width = '100%';
				imgAfter.style.width = '0%';
				range.value = 0;
			})

			btnBefore.addEventListener('click', function () {
				imgBefore.style.width = '0%';
				imgAfter.style.width = '100%';
				range.value = 100;
			})
		}
	} else {
		range.disabled = !range.disabled
		btnAfter.addEventListener("click", function (e) {
			imgBefore.classList.add('_active')
			imgAfter.classList.remove('_active')
			if (imgBefore.classList.contains('_active')) {
				imgBefore.style.display = "flex"
			}
			range.value = 0;
		});
		btnBefore.addEventListener("click", function (e) {
			imgAfter.classList.add('_active')
			imgBefore.classList.remove('_active')
			if (imgAfter.classList.contains('_active')) {
				imgBefore.style.display = "none"
			}
			range.value = 100;
		});
	}

	//ShowMore====================================================================================

	const showMore = document.querySelector('.show-more');
	const productLength = document.querySelectorAll('.catalog__item').length;
	const showBlock = document.querySelector('.item-catalog-add');
	let items = 3;

	if(showMore){
		showMore.addEventListener("click", (e)=>{
			e.preventDefault()
			items +=4
			const array = Array.from(document.querySelector('.catalog__items').children)
			const visItems = array.slice(0, items)
	
			visItems.forEach(el => el.classList.add('_visible'))
			if(visItems.length === productLength){
				showBlock.style.display = 'none'
			}
		})
	}

}
