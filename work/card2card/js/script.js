var mySwiper;
var cardFront = document.getElementById("cardFront");
var cardBack = document.getElementById("cardBack");
var textCard = document.querySelectorAll(".card2ck__form-card label");
var btn = document.getElementById("btnTranslate");
var currentNumber;
var maxCardLength;
var errorWindow =document.querySelector(".error-window");
var errorWindowBtn =document.querySelector(".error-window__btn");
var successWindow =document.querySelector(".success-window");
var succesWindowBtn =document.querySelector(".success-window__btn");
var cvcWindow =document.querySelector(".cvc-window");
var cvcBtn =document.querySelector(".card2ck__cvc-btn");
var cvcWindowBtn =document.querySelector(".cvc-window__btn");
var paginationWrap = document.getElementById("swpWrap");
var cardType;
var paySpan = document.querySelector(".card2ck__pay-span");
var allSum = paySpan.textContent;

s1 = allSum.slice(0, (allSum.length-2));
s2 = allSum.slice(-2);
s3 = s1 +". <sub>" + s2 +"</sub>";
paySpan.innerHTML = s3;


/**
 * Расширение Jquery для работы с параметрами адресной строки
 */
$.extend({
    getUrlVars: function(){
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
	    hash = hashes[i].split('=');
	    vars.push(hash[0]);
	    vars[hash[0]] = hash[1];
	}
	return vars;
    },
    getUrlVar: function(name){
	return $.getUrlVars()[name];
    }
});

/**
 * Для мобильных разрешений подключем слайдер Swiper.js для анимации карт
 */
if (document.body.clientWidth < 1160) {

    var count = 0;
    mySwiper = new Swiper('.swiper-container', {
	// Optional parameters
	direction: 'horizontal',
	loop: false,
	effect: 'flip',
	flipEffect: {
	    rotate: 30,
	    slideShadows: false,
	},
	centeredSlides: true,
	slidesPerView: 'auto',

	// If we need pagination
	pagination: {
	    el: '.swiper-pagination',
	    clickable: true,
	    type: "bullets",
	    bulletActiveClass: "card2ck__item-text--active",
	    bulletClass: "card2ck__item-text",
	    renderBullet: function (mySwiper, index, className) {
		count++;
		if (count === 1) {
		    return '<span class="card2ck__item-text" id="bull1">Номер карты и срок действия</span>';
		}
		if (count === 2) {
		    return '<span class="card2ck__item-text" id="bull2">CVV/CVC</span>';
		}
	    }
	},

	// And if we need scrollbar
	scrollbar: {
	    el: '.swiper-scrollbar',
	    draggable: true
	}
    });
    /*При изменении слайда изменить контролы*/
    mySwiper.on('slideChange', function () {
	    if (paginationWrap.classList.contains("swiper-pagination--init")) {
		paginationWrap.classList.remove("swiper-pagination--init");
		paginationWrap.classList.add("swiper-pagination--left");
	    } else {
		paginationWrap.classList.remove("swiper-pagination--left");
		paginationWrap.classList.add("swiper-pagination--init");
	    }
    });
}



$(document).ready(function(){
    $('#month').mask('99');
    $('#year').mask('00');
    $('#cvc').mask('999');
    $('#cardNum').mask('0000 0000 0000 0000');
});

/**
 * Массив  типов платежных систем(тип, паттерн, длинна) и классами их оформления
 * @type {[*]}
 */
var cards = [
	{
	    type: 'visa',
	    patterns: [4],
	    format: "",
	    length: [16],
	    cvcLength: [3],
	    logo:  'url(img/pay-system/visa.png)',
	    luhn: true,
	    changeCss :  function (cardFront, cardBack) {
	        cardFront.classList.add("card2ck__form-card--visa");
		cardFront.classList.remove("card2ck__form-card--mastercard");
		cardFront.classList.remove("card2ck__form-card--mir");
		cardFront.classList.remove("card2ck__form-card--maestro");
	    }
	},
	{
	    type: 'mastercard',
	    patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
	    format: "",
	    length: [16],
	    cvcLength: [3],
	    luhn: true,
	    logo:  'url(img/pay-system/mastercard.png)',
	    changeCss :  function (cardFront, cardBack) {
		cardFront.classList.add("card2ck__form-card--mastercard");
		cardFront.classList.remove("card2ck__form-card--visa");
		cardFront.classList.remove("card2ck__form-card--mir");
		cardFront.classList.remove("card2ck__form-card--maestro");
	    }
	},
	{
	    type: 'mir',
	    patterns: [220],
	    format: "",
	    length: [19],
	    cvcLength: [3],
	    luhn: true,
	    logo:  'url(img/pay-system/mir.png)',
	    changeCss :  function (cardFront, cardBack) {
		cardFront.classList.add("card2ck__form-card--mir");
		cardFront.classList.remove("card2ck__form-card--visa");
		cardFront.classList.remove("card2ck__form-card--mastercard");
		cardFront.classList.remove("card2ck__form-card--maestro");
	    }
	},
	{
	    type: 'maestro',
	    patterns: [3, 50, 56, 57, 58, 60, 61, 63, 64, 67],
	    format: "",
	    length: [19],
	    cvcLength: [3],
	    luhn: true,
	    logo:  'url(img/pay-system/maestro-bg.png)',
	    changeCss :  function (cardFront, cardBack) {
		cardFront.classList.add("card2ck__form-card--maestro");
		cardFront.classList.remove("card2ck__form-card--visa");
		cardFront.classList.remove("card2ck__form-card--mir");
		cardFront.classList.remove("card2ck__form-card--mastercard");
	    }
	}

    ];

/**
 * luhnCheck Проверка номера карты алгоритмом Луна
 * @param num
 * @returns {boolean}
 */
luhnCheck = function(num) {
    var digit, digits, odd, sum, _i, _len;
    odd = true;
    sum = 0;
    digits = (num + '').split('').reverse();
    for (_i = 0, _len = digits.length; _i < _len; _i++) {
	digit = digits[_i];
	digit = parseInt(digit, 10);
	if ((odd = !odd)) {
	    digit *= 2;
	}
	if (digit > 9) {
	    digit -= 9;
	}
	sum += digit;
    }
    return sum % 10 === 0;
};
/**
 * modelCardNum - Модель для работы с номером карты
 * @type {{cardNum: Element, label: *, valid: boolean, show: modelCardNum.show, error: modelCardNum.error, success: modelCardNum.success, validate: modelCardNum.validate, blur: modelCardNum.blur}}
 */
var modelCardNum= {
    cardNum:  document.getElementById("cardNum"),
    label:  textCard[0],
    valid: false,
    show: function () {
	this.label.classList.add('card2ck__card-num-label--show')
    },
    error: function() {
	this.label.classList.remove('card2ck__card-num-label--success');
	this.cardNum.classList.remove('card2ck__card-num--success');
	this.label.classList.add('card2ck__card-num-label--no-validate');
	this.cardNum.classList.add('card2ck__card-num--no-validate');
	cardFront.classList.add('card2ck__form-card--no-validate');

    },
    success: function() {
	cardFront.classList.remove('card2ck__form-card--no-validate');
	this.label.classList.remove('card2ck__card-num-label--no-validate');
	this.cardNum.classList.remove('card2ck__card-num--no-validate');
	this.label.classList.add('card2ck__card-num-label--success');
	this.cardNum.classList.add('card2ck__card-num--success');


    },
    validate: function () {
	var value = this.cardNum.value.replace(/ /g, "");
	if (value !="" &&  value.length !=0 && value.length >=16 && value.length < 20 && luhnCheck(value) ) {
	    this.valid = true;

	} else {
	    this.valid = false;

	}
	return this.valid;
    },
    blur: function () {
	this.label.classList.remove("card2ck__card-num-label--show");
	if (this.cardNum.value.length === 0) {
	    this.label.classList.remove('card2ck__card-num-label--no-validate');
	    this.cardNum.classList.remove('card2ck__card-num--no-validate');
	    this.cardNum.classList.remove('card2ck__card-num--success');
	}
    }
};
/**
 * modelMonth - Модель для работы с параметром месяц срока истечения карты
 * @type {{month: Element, label: *, valid: boolean, show: modelMonth.show, error: modelMonth.error, success: modelMonth.success, validate: modelMonth.validate, blur: modelMonth.blur}}
 */
var modelMonth = {
    month: document.getElementById("month"),
    label:  textCard[1],
    valid: false,
    show: function () {
	this.label.classList.add('card2ck__card-date-label--show');
	this.label.classList.remove('card2ck__card-date-label--no-validate');
	this.label.classList.remove('card2ck__card-date-label--success');
    },
    error: function() {
	this.label.classList.remove('card2ck__card-date-label--success');
	this.month.classList.remove('card2ck__card-date-month--success');
	this.label.classList.add('card2ck__card-date-label--no-validate');
	this.month.classList.add('card2ck__card-date-month--no-validate');
    },
    success: function() {
	this.label.classList.remove('card2ck__card-date-label--no-validate');
	this.month.classList.remove('card2ck__card-date-month--no-validate');
	this.label.classList.add('card2ck__card-date-label--success');
	this.month.classList.add('card2ck__card-date-month--success');
    },
    validate: function () {

	if ( this.month.value.length === 2 && this.month.value> 0 && this.month.value<13 ) {
	    this.valid = true;
	} else {
	    this.valid = false;
	}
	return this.valid;
    },
    blur: function () {
	this.label.classList.remove("card2ck__card-date-label--show");
	if (this.month.value.length === 0) {
	    this.month.classList.remove('card2ck__card-date-month--no-validate');
	    this.month.classList.remove('card2ck__card-date-month--success');
	}
    }
};
/**
 * modelYear - Модель для работы с параметром год срока истечения карты
 * @type {{year: Element, label: *, valid: boolean, show: modelYear.show, error: modelYear.error, success: modelYear.success, validate: modelYear.validate, blur: modelYear.blur}}
 */
var modelYear = {
    year: document.getElementById("year"),
    label:  textCard[1],
    valid: false,
    show: function () {
	this.label.classList.add('card2ck__card-date-label--show');
	this.label.classList.remove('card2ck__card-date-label--success');
	this.label.classList.remove('card2ck__card-date-label--no-validate');
    },
    error: function() {
	this.label.classList.remove('card2ck__card-date-label--success');
	this.year.classList.remove('card2ck__card-date-year--success');
        this.label.classList.add('card2ck__card-date-label--no-validate');
        this.year.classList.add('card2ck__card-date-year--no-validate');
    },
    success: function() {
	this.label.classList.remove('card2ck__card-date-label--no-validate');
	this.year.classList.remove('card2ck__card-date-year--no-validate');
	this.label.classList.add('card2ck__card-date-label--success');
	this.year.classList.add('card2ck__card-date-year--success');
    },
    validate: function () {
	var currentYear =  new Date().getFullYear().toString();

	currentYear = currentYear[2] + currentYear[3];

	if (
	    this.year.value.length === 2 &&
	    this.year.value>= +currentYear &&
	    this.year.value<+currentYear+15
	) {
	    this.valid = true;
	} else {
	    this.valid = false;
	}
	 return this.valid;
    },
    blur: function () {
	this.label.classList.remove("card2ck__card-date-label--show");

	if (this.year.value.length === 0) {
	    this.year.classList.remove('card2ck__card-date-year--no-validate');
	    this.year.classList.remove('card2ck__card-date-year--success');
	}
    }
};
/**
 * modelCVC - Модель для работы с параметром CVC карты
 * @type {{cvc: Element, label: *, valid: boolean, show: modelCVC.show, error: modelCVC.error, success: modelCVC.success, validate: modelCVC.validate, blur: modelCVC.blur}}
 */
var modelCVC = {
    cvc: document.getElementById("cvc"),
    label:  textCard[2],
    valid: false,
    show: function () {
	this.label.classList.add('card2ck__cvc-label--show');
	this.label.classList.remove('card2ck__cvc-label--success');
	this.label.classList.remove('card2ck__cvc-label--no-validate');
    },
    error: function() {
	this.label.classList.remove('card2ck__cvc-label--success');
	this.cvc.classList.remove('card2ck__cvc--success');
	this.label.classList.add('card2ck__cvc-label--no-validate');
	this.cvc.classList.add('card2ck__cvc--no-validate');
    },
    success: function() {
	this.label.classList.remove('card2ck__cvc-label--no-validate');
	this.cvc.classList.remove('card2ck__cvc--no-validate');
	this.label.classList.add('card2ck__cvc-label--success');
	this.cvc.classList.add('card2ck__cvcr--success');
    },
    validate: function () {
	if (this.cvc.value.length === 3 && this.cvc.value> 0&& this.cvc.value<1000) {
	    this.valid = true;
	} else {
	    this.valid = false;
	}
	return this.valid;
    },
    blur: function () {
	this.label.classList.remove("card2ck__cvc-label--show");
	if (this.cvc.value.length === 0) {
	    this.cvc.classList.remove('card2ck__cvc-label--no-validate');
	    this.cvc.classList.remove('card2ck__cvc-label--success');
	}
    }
};

/**
 * checkAllInputs - проверка значений инпутов
 * @returns {boolean}
 */
function checkAllInputs() {

    if (modelCardNum.valid === false) {
	if (document.body.clientWidth < 1160) {
	    mySwiper.slidePrev(1000);
	}
	modelCardNum.cardNum.focus();
	return false;
    }
    if (modelMonth.valid === false) {
	if (document.body.clientWidth < 1160) {
	    mySwiper.slidePrev(1000);
	}
	modelMonth.month.focus();
	return false;
    }

    if (modelYear.valid === false) {
	if (document.body.clientWidth < 1160) {
	    mySwiper.slidePrev(1000);
	}
	modelYear.year.focus();
	return false;
    }

    if (modelMonth.valid === true && modelYear.valid === true ){
	var expDate = new Date().setFullYear(20+modelYear.year.value, +modelMonth.month.value-1);
	if (expDate < +new Date()) {
	    modelMonth.month.focus();
	    modelMonth.error();
	    return false
	}
    }
    if (modelCVC.valid === false) {


	if (document.body.clientWidth < 1160) {

	    mySwiper.slideNext(1000, modelCVC.cvc.focus());
	} else {
	    modelCVC.cvc.focus()
	}

	$(".card2ck__cvc").attr('type','text');

	return false;
    }
    if (modelCVC.valid === true) {
	$(".card2ck__cvc").attr('type','password');

    }
    jQuery("html,body").animate({scrollTop: 430}, 1000);

    btn.focus();
    btn.classList.remove("card2ck__btn--disabled");
    return true;
}
/**
 * Обработчики кликов, нажатии клавиш, фокуса и потери фокуса на инпуты
 */
modelCardNum.cardNum.addEventListener("click", function (e) {
    if (modelCardNum.label.classList.contains("card2ck__card-num-label--show")) {
       return
    }
    modelCardNum.show();
});

modelCardNum.cardNum.addEventListener("focus", function (e) {
    if (modelCardNum.label.classList.contains("card2ck__card-num-label--show")) {
	return
    }
    modelCardNum.show();
},true);

modelCardNum.cardNum.addEventListener("blur", function (e) {
   modelCardNum.blur();
},true);

modelCardNum.cardNum.addEventListener("keyup", function (e) {

    currentNumber = modelCardNum.cardNum.value.replace(/ /g, "");
    modelCardNum.show();
	for (var i=0; i < cards.length; i++) {
	    for(var j= 0; j < cards[i].patterns.length; j ++) {

		var currentNumberForPS = currentNumber;
		currentNumberForPS = currentNumberForPS.substring(0, cards[i].patterns[j].toString().length);
		if (+currentNumberForPS === cards[i].patterns[j]) {
		    cardType = cards[i].type;
		    maxCardLength = cards[i].length[0];
		    cards[i].changeCss(cardFront, cardBack);

		    if (maxCardLength === 19) {
			$("#cardNum").attr("maxlength", maxCardLength+4).mask('9999 9999 9999 9999 999');
		    }
		    break;
		}
	    }
	}

    if (e.key =="Backspace") {
	cardFront.classList.remove("card2ck__form-card--mastercard");
	cardFront.classList.remove("card2ck__form-card--visa");
	cardFront.classList.remove("card2ck__form-card--mir");
	cardFront.classList.remove("card2ck__form-card--maestro");
	cardFront.classList.remove("card2ck__form-card--no-validate");
	modelCardNum.label.classList.remove("card2ck__card-num-label--no-validate");
	btn.classList.add("card2ck__btn--disabled");
    }

    if (currentNumber.length >= 16 )  {
	if (modelCardNum.validate()) {
	    cardFront.classList.add("card2ck__form-card--success");
	    modelCardNum.success();
	    checkAllInputs();
	} else {
	    cardFront.classList.add("card2ck__form-card--error");
	    modelCardNum.error();
	}
    }
});

modelMonth.month.addEventListener("click", function (e) {
    if(modelMonth.label.classList.contains("card2ck__card-date-label--show")) {
        return;
    }
    modelMonth.show();
});
modelMonth.month.addEventListener("focus", function (e) {
    if(modelMonth.label.classList.contains("card2ck__card-date-label--show")) {
	return;
    }
    modelMonth.show();
},true);

modelMonth.month.addEventListener("blur", function (e) {
    modelMonth.blur();
},true);

modelMonth.month.addEventListener("keyup", function (e) {
    if (e.key =="Backspace") {
	modelMonth.label.classList.remove("card2ck__card-num-label--no-validate");
	btn.classList.add("card2ck__btn--disabled");
    }
    modelMonth.show();
    if (modelMonth.validate()) {
	modelMonth.success();
	checkAllInputs();
    } else if (modelMonth.month.value.length === 2) {
	modelMonth.error();
    }
});

modelYear.year.addEventListener("click", function (e) {
    if(modelYear.label.classList.contains("card2ck__card-date-label--show")) {
	return;
    }
    modelYear.show();
});

modelYear.year.addEventListener("focus", function (e) {
    if(modelYear.label.classList.contains("card2ck__card-date-label--show")) {
	return;
    }
    modelYear.show();
},true);

modelYear.year.addEventListener("blur", function (e) {
    modelYear.blur();
},true);

modelYear.year.addEventListener("keyup", function (e) {
    if (e.key =="Backspace") {
	modelYear.label.classList.remove("card2ck__card-num-label--no-validate");
	btn.classList.add("card2ck__btn--disabled");
    }
    modelYear.show();

    if (modelYear.validate()) {
	modelYear.success();
	checkAllInputs();
    }
    else if (modelYear.year.value.length === 2) {
	modelYear.error();
    }
});

modelCVC.cvc.addEventListener("click", function (e) {
    if(modelCVC.label.classList.contains("card2ck__cvc-label--show")) {
	return;
    }
    modelCVC.show();
});

modelCVC.cvc.addEventListener("focus", function (e) {
    if(modelCVC.label.classList.contains("card2ck__cvc-label--show")) {
	return;
    }
    modelCVC.show();
},true);

modelCVC.cvc.addEventListener("blur", function (e) {
    modelCVC.blur();
},true);

modelCVC.cvc.addEventListener("keyup", function (e) {

    modelCVC.show();
    if (modelCVC.validate()) {
	modelCVC.success();
	if (document.body.clientWidth < 1160) {
	    modelCVC.cvc.blur();
	    mySwiper.slidePrev(1000);
	}
	if (checkAllInputs() === false) return;
    }
    else if (modelCVC.cvc.value.length === 3){
	modelCVC.error();
    }
});

btn.addEventListener("click", function (e) {

    e.preventDefault();
    if (!modelCardNum.validate()) {
	jQuery("html,body").animate({scrollTop: 0}, 1000);
	if (document.body.clientWidth < 1160) {
	    mySwiper.slidePrev(1000);
	}
	modelCardNum.error();
	modelCardNum.cardNum.focus();
	btn.classList.add("card2ck__btn--disabled");
	/*errorWindow.classList.add("error-window--show");*/
	/*document.body.classList.add("overlay");*/
	return;
    }

    if (!modelMonth.validate()) {
	jQuery("html,body").animate({scrollTop: 0}, 1000);
	if (document.body.clientWidth < 1160) {
	    mySwiper.slidePrev(1000);
	}
	modelMonth.error();
	modelMonth.month.focus();
	/*cardFront.style.zIndex ="1";*/
	btn.classList.add("card2ck__btn--disabled");
	return;
    }

    if (!modelYear.validate()) {
	jQuery("html,body").animate({scrollTop: 0}, 1000);
	if (document.body.clientWidth < 1160) {
	    mySwiper.slidePrev(1000);
	}
	modelYear.error();
	modelYear.year.focus();
	/*cardFront.style.zIndex ="1";*/
	btn.classList.add("card2ck__btn--disabled");
	return;
    }

    if (!modelCVC.validate()) {
	jQuery("html,body").animate({scrollTop: 430}, 1000);
	if (document.body.clientWidth < 1160) {
	    mySwiper.slideNext(1000);
	}
	modelCVC.error();
	modelCVC.cvc.focus();
	btn.classList.add("card2ck__btn--disabled");
	return;
    }

    /*jQuery("html,body").animate({scrollTop: 50}, 1000);*/

    var order = $.getUrlVar('order');
    var form = $.getUrlVar('form');

    document.forms[0].exp.value = modelMonth.month.value +" / " + modelYear.year.value;
    document.forms[0].order.value =order;
    document.forms[0].type.value = cardType;
    document.forms[0].form.value =form;
    document.forms[0].operation.value ="pay";
    document.forms[0].holder.value ="TEST HOLDER";

    modelMonth.month.setAttribute("disabled", "disabled");
    modelYear.year.setAttribute("disabled", "disabled");

    /*
    На случай перехода на AJAX API
    var data =
     "form=payment&pan="+modelCardNum.cardNum.value+
     "&exp="+modelMonth.month.value +" / " + modelYear.year.value+
     "&sercet="+modelCVC.cvc.value+
     "&holder=TEST HOLDER&operation=pay&type="+cardType+
     "&order="+order;

     var d1 = "operation=pay&order=123&pan=4000 0000 0000 0002&exp=01 / 20&form=payment&secret=123&type=visa&holder=test";



     $.ajax({
     url: 'api/C/pay',
     data: "operation=pay&order="+order+"&pan="+modelCardNum.cardNum.value+"&exp="+modelMonth.month.value +" / " + modelYear.year.value+"&form=payment&secret="+modelCVC.cvc.value+"&type="+cardType+"&holder=test",
     dataType : "html",
     processData: false,
     contentType: "application/x-www-form-urlencoded",
     /!*contentType: "application/x-www-form-urlencoded; charset=UTF-8",*!/

     type: 'POST',
     beforeSend: function(xhr){xhr.setRequestHeader('Accept', 'image/webp,image/apng,*!/!*;q=0.8');},
     success: function (data) {
     console.log(data);
     /!*location.href="/cardpay/web-3/success.html"*!/

     },
     error: function (data) {
     console.log(data);
     }

     });*/
    if (modelCardNum.cardNum.value === "4000 0000 0000 0010") {
	errorWindow.classList.add("error-window--show");
	document.body.classList.add("overlay");
	return;
    }


    /*document.forms[0].submit(); //@todo Перед прод раскоментировать а location закоментировать или удалить */
      location.href ="success.html"
});

errorWindowBtn.addEventListener("click", function (e) {
    errorWindow.classList.remove("error-window--show");
    document.body.classList.remove("overlay");
});

cvcBtn.addEventListener("click", function (e) {
    cvcWindow.classList.add("cvc-window--show");
    document.body.classList.add("overlay");
});

cvcWindowBtn.addEventListener("click", function (e) {
    cvcWindow.classList.remove("cvc-window--show");
    document.body.classList.remove("overlay");
});


$(document).mouseup(function (e) {
    var container = $(".overlay");
    if (container.has(e.target).length === 0){
	cvcWindow.classList.remove("cvc-window--show");
	errorWindow.classList.remove("error-window--show");
	document.body.classList.remove("overlay");
    }
});

$(document).keydown(function(e){
    if(e.keyCode === 27)  {
	cvcWindow.classList.remove("cvc-window--show");
	errorWindow.classList.remove("error-window--show");
	document.body.classList.remove("overlay");
    }
});


