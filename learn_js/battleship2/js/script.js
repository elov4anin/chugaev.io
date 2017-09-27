var select = '#city';
var city = "Пермь";
var district = "Все";
var arrCashes;
var myMap,
    myPlacemark;

var count = 0;
var countPartner = 0;

/**
 * Открыть/закрыть меню
 * @param e для отмены события по умолчанию
 */
function openMenu(e) {
    e.preventDefault();
    var menu =  document.querySelector(".cash__list");
    var btn = document.querySelector(".btn-menu span");
    if (menu.classList.contains("cash__list--show")) {
	menu.classList.remove("cash__list--show");
	btn.innerText = "Открыть меню";
    } else
    {
	menu.classList.add("cash__list--show");
	btn.innerText = "Закрыть меню";
    }
}
/**
 * скрыть/показать кнопку "Вверх" при скроле
 */
function hideBlock() {

    var block = $('.btn-up');
    if($('html, body').scrollTop() >= 300) {
	block.addClass("btn-up--show");
    }
else {
	block.removeClass("btn-up--show");
    }
}
$(window).scroll(hideBlock);

/**
 * Проверка массива на уникальность значений
 * @param arr Входящий массив
 * @returns {Array} Возращает массив уникальных значений
 */
function unique(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
	var str = arr[i];
	obj[str] = true; // запомнить строку в виде свойства объекта
    }
    return Object.keys(obj); // или собрать ключи перебором для IE8-
}
/**
 * Для кнопки наверх
 */
function moveUp() {
    $('html, body').animate({scrollTop:0}, 'slow');
}

/**
 * Загрузка карты после готовности
 */
function yandexMap() {
    if (ymaps) {
	ymaps.ready(init);
    }
}

/**
 * Инициализация карты
 */
function init(){
    myMap = new ymaps.Map("map", {
	center: [57.993976, 56.194348],
	zoom: 12
    });
    /*myPlacemark = new ymaps.Placemark([57.993976, 56.194348], {
     hintContent: 'Центральная касса',
     balloonContent: 'Офис. Центральная касса.\<br\>+7 (495) 221 29 60, +7 (342) 240 20 37, +7 (342) 240 38 56'
     });

     myMap.geoObjects.add(myPlacemark);*/
    cashList(arrCashes, city, district);
}

/**
 * Выбор города
 * @param e событие по клику
 */
function selectCity (e) {
    city = e.target.value;
    if (city === "Оса") {
	$("#district").attr('disabled', 'disabled');
	$('#district[value="Все"]').prop('selected', true);
	$("#district")[0].selectedIndex = 0;
    } else if (city === "Пермь") {
	$("#district").removeAttr('disabled', 'disabled');
    }
    cashList(arrCashes, city, district);
}

/**
 * Выбор района
 * @param e событие по клику
 */
function selectDistrict (e) {
    var arrDistrict= [];
    if (city === "Пермь") {
	district = e.target.value;
	for (var i=0; i < arrCashes.length; i++) {
	    if (arrCashes[i].district === district) {
		arrDistrict.push(arrCashes[i])
	    }
	}
    }
    if (e.target.value ==="Все") {
	arrDistrict = arrCashes;
    }
    cashList(arrDistrict, city, district);
}

/**
 * Переместиться по клику к метке на карте  и  выделить кассу в списке
 * @param latitude широта
 * @param length долгота
 * @param e событие по клику
 */
function goToBaloon(latitude, length, e) {
    var act = document.getElementsByClassName("tractive");
    var evt = window.event || e;
    var tr = evt.path[1];
    var tr1 = evt.path[5];

    if (act.length != 0) {
	for (var i=0; i < act.length; i++) {
	    act[i].classList.remove("tractive");
	}
    }
    if (evt.path.length === 13) {
	tr.classList.add("tractive");
    } else {
	tr1.classList.add("tractive");
    }

    myMap.panTo(
	    // Координаты нового центра карты
	    [latitude, length], {
		/* Опции перемещения:
		 разрешить уменьшать и затем увеличивать зум
		 карты при перемещении между точками
		 */
		flying: true
	    }
    );

    $('html, body').animate({scrollTop:220}, 'slow');
}


/**
 * Отрисовка таблицы касс
 * @param cashItem  Экземпляр кассы из файла с кассами
 */
function drawTable(cashItem) {

    var shedule1 =[" ", " ", " ", " "];
    var shedule2 =[" ", " ", " ", " "];
    var shedule3 =[" ", " ", " ", " "];

    if (cashItem.shedule1.length !="") {
	shedule1 = cashItem.shedule1.split('|');
    }
    if (cashItem.shedule2.length !="") {
	shedule2 = cashItem.shedule2.split('|');
    }
    if (cashItem.shedule3.length !="") {
	shedule3 = cashItem.shedule3.split('|');
    }
    count++;

    $('#results').append(
	    "<tr onclick='goToBaloon("+cashItem.latitude+", "+cashItem.length+")'>" +
		"<td>"+ count+"</td>"+
		"<td class='address" + checkType(cashItem.type) +"'>"+ /*+ cashItem.city +", "+ cashItem.district +"<br>"+*/ cashItem.address + "</td>" +
		"<td class='cash__name'>" + cashItem.name + "</td>" +
		"<td class='cash__shedule'>" +
		    "<table>" +
			"<tr>" +
			    "<td>"+shedule1[0]+"</td>" +
			    "<td>"+shedule1[1]+"</td>" +
			    "<td>"+shedule1[2]+"</td>" +
			    "<td>"+shedule1[3]+"</td>" +
			"</tr>" +
			"<tr>" +
			    "<td>"+shedule2[0]+"</td>" +
			    "<td>"+shedule2[1]+"</td>" +
			    "<td>"+shedule2[2]+"</td>" +
			    "<td>"+shedule2[3]+"</td>" +
			"</tr>" +
			"<tr>" +
			    "<td>"+shedule3[0]+"</td>" +
			    "<td>"+shedule3[1]+"</td>" +
			    "<td></td>" +
			    "<td></td>" +
			"</tr>" +
		    "</table>" +
		"</td>" +
	    "</tr>"
    );
}

/**
 * Отрисовка таблицы Ждущих открытия касс
 * @param cashItem  Экземпляр кассы из файла с кассами
 */
function drawTableWait(cashItem) {
    countPartner++;

    var shedule1 =[" ", " ", " ", " "];
    var shedule2 =[" ", " ", " ", " "];
    var shedule3 =[" ", " ", " ", " "];

    if (cashItem.shedule1.length !="") {
	shedule1 = cashItem.shedule1.split('|');
    }
    if (cashItem.shedule2.length !="") {
	shedule2 = cashItem.shedule2.split('|');
    }
    if (cashItem.shedule3.length !="") {
	shedule3 = cashItem.shedule3.split('|');
    }

    $('#results_wait').append(
	    "<tr>" +
	    "<td>" + countPartner+"</td>" +
	    "<td>"+ /*+ cashItem.city +", "+ cashItem.district +"<br>"+*/ cashItem.address + "</td>" +
	    "<td class='cash__name'>" + cashItem.name + "</td>" +
	    /*"<td class='cash__shedule'>" +
	    "<table>" +
	    "<tr>" +
	    "<td>"+shedule1[0]+"</td>" +
	    "<td>"+shedule1[1]+"</td>" +
	    "<td>"+shedule1[2]+"</td>" +
	    "<td>"+shedule1[3]+"</td>" +
	    "</tr>" +
	    "<tr>" +
	    "<td>"+shedule2[0]+"</td>" +
	    "<td>"+shedule2[1]+"</td>" +
	    "<td>"+shedule2[2]+"</td>" +
	    "<td>"+shedule2[3]+"</td>" +
	    "</tr>" +
	    "<tr>" +
	    "<td>"+shedule3[0]+"</td>" +
	    "<td>"+shedule3[1]+"</td>" +
	    "<td></td>" +
	    "<td></td>" +
	    "</tr>" +
	    "</table>" +
	    "</td>" +*/
	    "</tr>"
    );
}

/**
 * проверка типа кассы
 * @param type - тип кассы
 * @returns {*}  возращает класс для добавления в DOM
 */
function checkType (type) {
    if (type === "BUS_TICK_IDEN") {
        return " cash__address cash__address--bus";
    }
    if (type === "TICK_IDEN") {
	return " cash__address";
    }
    if (type === "BUS_IDEN") {
	return " cash__address cash__address--bus cash__address--notick";
    }
}

/**
 * Функция для отрисовки таблиц парнтеров
 * @param cashItem - данные кассы
 * @param idTable id таблицы
 *  @param showCity скрыть или показать города и запятую
 */
function drawTablePartner(cashItem, idTable, showCity) {
    var zpt =", ";
    countPartner++;

    if (showCity) {
	cashItem.city ="";
	zpt = "";
    }

    var shedule1 =[" ", " ", " ", " "];
    var shedule2 =[" ", " ", " ", " "];
    var shedule3 =[" ", " ", " ", " "];

    if (cashItem.shedule1.length !="") {
	shedule1 = cashItem.shedule1.split('|');
	var count = shedule1.length;
	while (count < 4) {
	    shedule1.push(" ");
	    count++;
	}
    }
    if (cashItem.shedule2 !="") {
	shedule2 = cashItem.shedule2.split('|');
	var count = shedule2.length;
	while (count < 4) {
	    shedule2.push(" ");
	    count ++;
	}
    }
    if (cashItem.shedule3.length !="") {
	shedule3 = cashItem.shedule3.split('|');
	var count = shedule3.length;
	while (count < 4) {
	    shedule3.push(" ");
	    count ++;
	}
    }

    $(idTable).append(
	    "<tr>" +
	    "<td>"+countPartner+"</td>" +
		"<td class='cash__address-rgs'>" + cashItem.city +zpt+ cashItem.address + "</td>" +
		"<td class='cash__name'>" + cashItem.name + "</td>" +
		"<td class='cash__shedule'>" +
		    "<table>" +
			"<tr>" +
			    "<td>"+shedule1[0]+"</td>" +
			    "<td>"+shedule1[1]+"</td>" +
			    "<td>"+shedule1[2]+"</td>" +
			    "<td>"+shedule1[3]+"</td>" +
			"</tr>" +
			"<tr>" +
			    "<td>"+shedule2[0]+"</td>" +
			    "<td>"+shedule2[1]+"</td>" +
			    "<td>"+shedule2[2]+"</td>" +
			    "<td>"+shedule2[3]+"</td>" +
			"</tr>" +
			"<tr>" +
			    "<td>"+shedule3[0]+"</td>" +
			    "<td>"+shedule3[1]+"</td>" +
			    "<td>"+shedule3[2]+"</td>" +
			    "<td>"+shedule3[3]+"</td>" +
			"</tr>" +
		    "</table>" +
		"</td>" +
	    "</tr>"
    );
}

/**
 * Метки на карте
 * @param cashItem Экземпляр кассы из файла с кассами
 */
function addBallons(cashItem) {
    var shedule1 =[" ", " ", " ", " "];
    var shedule2 =[" ", " ", " ", " "];
    var shedule3 =[" ", " ", " ", " "];

    if (cashItem.shedule1.length !="") {
	shedule1 = cashItem.shedule1.split('|');
	var count = shedule1.length;
	while (count < 4) {
	    shedule1.push(" ");
	    count++;
	}
    }
    if (cashItem.shedule2 !="") {
	shedule2 = cashItem.shedule2.split('|');
	var count = shedule2.length;
	while (count < 4) {
	    shedule2.push(" ");
	    count ++;
	}
    }
    if (cashItem.shedule3.length !="") {
	shedule3 = cashItem.shedule3.split('|');
	var count = shedule3.length;
	while (count < 4) {
	    shedule3.push(" ");
	    count ++;
	}
    }

    myPlacemark = new ymaps.Placemark([cashItem.latitude, cashItem.length], {
		hintContent: 'Центральная касса',
		balloonContent: '<b>Центральная касса</b>' + '\<br\>' +
		"<table>" +
		    "<tr>" +
			"<td>"+shedule1[0]+"</td>" +
			"<td>"+shedule1[1]+"</td>" +
			"<td>"+shedule1[2]+"</td>" +
			"<td>"+shedule1[3]+"</td>" +
		    "</tr>" +
		    "<tr>" +
			"<td>"+shedule2[0]+"</td>" +
			"<td>"+shedule2[1]+"</td>" +
			"<td>"+shedule2[2]+"</td>" +
			"<td>"+shedule2[3]+"</td>" +
		    "</tr>" +
		    "<tr>" +
			"<td>"+shedule3[0]+"</td>" +
			"<td>"+shedule3[1]+"</td>" +
			"<td>"+shedule3[2]+"</td>" +
			"<td>"+shedule3[3]+"</td>" +
		    "</tr>" +
		"</table>" +
		'Расположение'+ '\<br\>' +
		cashItem.name + '\<br\>' +
		cashItem.city +', ' +cashItem.address
	    },
	    {
		// Необходимо указать данный тип макета.
		iconLayout: 'default#image',
		// Своё изображение иконки метки.
		iconImageHref: 'img/yd-wallet.png',
		// Размеры метки.
		iconImageSize: [36, 36],
		// Смещение левого верхнего угла иконки относительно
		// её "ножки" (точки привязки).
		iconImageOffset: [-3, -42]
	    }
    );
    myMap.geoObjects.add(myPlacemark);
}

/**
 * Работа со списком касс
 * @param cashItems Список касс из файла с кассами
 * @param city Город
 * @param district Район
 */
function cashList(cashItems, city, district) {
    $('#results').empty();
    myMap.geoObjects.remove();
    $('#results').append(
	    "<caption align='right'>" +
		"<ul>" +
		    "<li><sup>*</sup> Две&nbsp;первые субботы месяца работают все кассы с&nbsp;10:00 до&nbsp;14:00.<br>&nbsp;&nbsp;Точное расписание у&nbsp;кассира</li>" +
		    "<li><sup>**</sup> В&nbsp;дни матча ПН-ПТ с&nbsp;10:00 до&nbsp;20:00. СБ-ВС с&nbsp;11:00 до&nbsp;19:00</li>" +
		"</ul>" +
	    "</caption>" +
	    "<tr>" +
		"<th></th>" +
	    	"<th>Адрес</th>" +
		"<th>Где находится</th>" +
		"<th>Время работы</th>" +
	    "</tr>"
    );

    /**
     * Сортировка по алфавиту
     */
    cashItems.sort(function (a, b) {
	if (a.address > b.address) {
	    return 1;
	}
	if (a.address < b.address) {
	    return -1;
	}
	return 0;
    });

    for (i=0; i<cashItems.length; i++) {

	if (cashItems[i].city === city) {
	    myMap.setCenter([ cashItems[i].latitude, cashItems[i].length], 13, {
		checkZoomRange: true
	    });
	    addBallons(cashItems[i]);
	    drawTable(cashItems[i]);
	}
    }
}

$.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'db/cash_db.json',
    success: function(data) {
	var cities = [];
	var district = [];
	arrCashes = data.ckassa;
	arrRgsCashes = data.rgs;
	arrWaitCashes = data.wait;
	arrInkomusCashes = data.inkomus;
	arrOtherCashes = data.other;
	arrPrMagicCashes = data.pr_magic;
	arrUnifiedCashes = data.unified_cash;

	if (data.wait != undefined || data.wait != []) {
	    $('#header_wait').text("Готовятся к открытию");

	    $('#results_wait').append(

		    "<tr>" +
		    "<th></th>" +
		    "<th>Адрес</th>" +
		    "<th>Где находится</th>" +
		    /*"<th>Время работы</th>" +*/
		    "</tr>"
	    );

	    /**
	     * Сортировка по алфавиту
	     */
	    arrWaitCashes.sort(function (a, b) {
		if (a.address > b.address) {
		    return 1;
		}
		if (a.address < b.address) {
		    return -1;
		}
		return 0;
	    });

	    for(var l=0; l < arrWaitCashes.length; l++){
		drawTableWait(arrWaitCashes[l]);
	    }
	    countPartner = 0;

	}
	/*Кассы РГС*/
	if (data.rgs != undefined || data.rgs != []) {

	    $('#header_rgs').text("Кассы партнера ПАО «Росгосстрах Банк»");
	    /**
	     * Сортировка по алфавиту
	     */
	    arrRgsCashes.sort(function (a, b) {
		if (a.city > b.city) {
		    return 1;
		}
		if (a.city < b.city) {
		    return -1;
		}
		return 0;
	    });

	    $('#results_rgs').append(
		    "<tr>"  +
		    "<th></th>" +
		    "<th>Адрес</th>" +
		    "<th>Где находится</th>" +
		    "<th>Время работы</th>" +
		    "</tr>"
	    );

	    for(var m=0; m < arrRgsCashes.length; m++){
		drawTablePartner(arrRgsCashes[m], "#results_rgs" ,false);
	    }
	    countPartner = 0;
	}

	/*ИНкумус*/
	if (data.inkomus != undefined || data.inkomus != []) {

	    $('#header_inkomus').text(" АО ВЦ Инкомус (Пермь)");
	    /**
	     * Сортировка по алфавиту
	     */
	    arrInkomusCashes.sort(function (a, b) {
		if (a.address > b.address) {
		    return 1;
		}
		if (a.address < b.address) {
		    return -1;
		}
		return 0;
	    });

	    $('#results_inkomus').append(
		    "<tr>"  +
		    "<th></th>" +
		    "<th>Адрес</th>" +
		    "<th>Где находится</th>" +
		    "<th>Время работы</th>" +
		    "</tr>"
	    );

	    for(var m=0; m < arrInkomusCashes.length; m++){
		drawTablePartner(arrInkomusCashes[m], "#results_inkomus", false);
	    }
	    countPartner = 0;
	}

	/*Практическая магия*/
	if (data.pr_magic != undefined || data.pr_magic != []) {

	    $('#header_pr_magic').text("Практическая магия");
	    /**
	     * Сортировка по алфавиту
	     */
	    arrPrMagicCashes.sort(function (a, b) {
		if (a.address > b.address) {
		    return 1;
		}
		if (a.address < b.address) {
		    return -1;
		}
		return 0;
	    });

	    $('#results_pr_magic').append(
		    "<tr>" +
		    "<th></th>" +
		    "<th>Адрес</th>" +
		    "<th>Где находится</th>" +
		    "<th>Время работы</th>" +
		    "</tr>"
	    );

	    for(var m=0; m < arrPrMagicCashes.length; m++){
		drawTablePartner(arrPrMagicCashes[m], "#results_pr_magic", false);
	    }
	    countPartner = 0;
	}

	/*Единая касса*/
	if (data.unified_cash != undefined || data.unified_cash != []) {

	    $('#header_unified_cash').text("Единая касса");
	    /**
	     * Сортировка по алфавиту
	     */
	    arrPrMagicCashes.sort(function (a, b) {
		if (a.address > b.address) {
		    return 1;
		}
		if (a.address < b.address) {
		    return -1;
		}
		return 0;
	    });

	    $('#results_unified_cash').append(
		    "<tr>" +
		    "<th></th>" +
		    "<th>Адрес</th>" +
		    "<th>Где находится</th>" +
		    "<th>Время работы</th>" +
		    "</tr>"
	    );

	    for(var m=0; m < arrUnifiedCashes.length; m++){
		drawTablePartner(arrUnifiedCashes[m], "#results_unified_cash", false);
	    }
	    countPartner = 0;
	}

	/*Другие партнеры*/
	if (data.other != undefined || data.other != []) {

	    $('#header_other').text("Другие партнеры");
	    /**
	     * Сортировка по алфавиту
	     */
	    arrOtherCashes.sort(function (a, b) {
		if (a.address > b.address) {
		    return 1;
		}
		if (a.address < b.address) {
		    return -1;
		}
		return 0;
	    });

	    $('#results_other').append(
		    "<tr>" +
		    "<th></th>" +
		    "<th>Адрес</th>" +
		    "<th>Партнеры</th>" +
		    "<th>Время работы</th>" +
		    "</tr>"
	    );

	    for(var m=0; m < arrOtherCashes.length; m++){
		drawTablePartner(arrOtherCashes[m], "#results_other" ,false);
	    }
	}

	for(var i=0; i < arrCashes.length; i++){
	    cities.push(arrCashes[i].city);
	    if(arrCashes[i].district !="") {
		district.push(arrCashes[i].district);
	    }
	}
	/*Отбираем уникальные города и районы*/
	cities = unique(cities);
	district = unique(district);
	district.sort(function (a, b) {
	    if (a > b) {
		return 1;
	    }
	    if (a < b) {
		return -1;
	    }
	    return 0;
	});

	/*Генерация селектов и списков, вызов карты*/
	for(var j=0; j < cities.length; j++){
	    $("#city").append('<option>'+ cities[j]+'</option>');
	}

	for(var k=0; k < district.length; k++){
	    $("#district").append('<option>'+ district[k]+'</option>');
	}

	yandexMap();
    }
});