var btnCommission = {
    classActive: "calc__comission-btn--active",
    classPanel: "calc__calculation-panel--hidden",
    supplier: document.getElementById("comissionSupplier"),
    payer: document.getElementById("comissionPayer"),
    panel: document.getElementById("calcPanel"),
    isPanelVisible: true,

    state: function (elem) {
		return elem.classList.contains(this.classActive);
    },
    removeActive: function () {
		this.supplier.classList.remove(this.classActive);
		this.payer.classList.remove(this.classActive);

    },
    click: function (elem) {
		if (!this.state(elem.target)) {
			this.removeActive();
			elem.target.classList.add(this.classActive);
			this.isPanelVisible = this.isPanelVisible === true ? false : true;
		}
		if (this.isPanelVisible) {
			this.panel.classList.remove(this.classPanel);
			calcModel.drawResult(calcModel.getProcent());
		} else {
			this.panel.classList.add(this.classPanel);
			calcModel.drawResult("3,1")
		}
    }
};

var bthTypes = {
    classActive: "calc__type-btn--active",
    operators: document.getElementById("operators"),
    inetShop: document.getElementById("inetShop"),
    taxi:  document.getElementById("taxi"),
    label: document.getElementById("labelGreenZone"),
    dops: document.getElementById("dops"),
    width: window.screen.availWidth,
    caclList:  document.getElementById("caclList"),

    state: function (elem) {
        this.removeActive();
		return elem.classList.contains(this.classActive);

    },

    removeActive: function () {
		this.operators.classList.remove(this.classActive);
		this.inetShop.classList.remove(this.classActive);
		this.taxi.classList.remove(this.classActive);
    },

    click: function (elem) {
		if (!this.state(elem.target)) {

			elem.target.classList.add(this.classActive);

			if (elem.target === this.operators) {

				this.label.innerHTML = "«Зелёная зона» (снижаем на 0.1%)";
				this.dops.style.opacity="1";
				//this.dops.style.display="block";
				calcModel.greenZone.checked = false;
				calcModel.isGreenZone =  false;
				if ((btnCommission.isPanelVisible)) {
                    calcModel.drawResult(calcModel.getProcent());
                } else {
                    calcModel.drawResult("3,1")
				}

			}

			if (elem.target === this.inetShop) {

				//this.label.innerHTML = "«Информационный сервис» (снижаем на 0.1%)";
				this.dops.style.opacity="0";
                calcModel.desc.style.opacity=0;
				//this.dops.style.display="none";
				calcModel.greenZone.checked = false;
				calcModel.isGreenZone =  false;
                if ((btnCommission.isPanelVisible)) {
                    calcModel.drawResult(calcModel.getProcent());
                } else {
                    calcModel.drawResult("3,1")
                }
			}

			if (elem.target === this.taxi) {
                calcModel.desc.style.opacity=0;
				//this.label.innerHTML = "«Поездки с оплатой по банковской карте» (снижаем на 0.1%)";
				this.dops.style.opacity="0";
				/*this.dops.style.display="none";*/
				calcModel.greenZone.checked = false;
				calcModel.isGreenZone =  false;
                if ((btnCommission.isPanelVisible)) {
                    calcModel.drawResult(calcModel.getProcent());
                } else {
                    calcModel.drawResult("3,1")
                }
			}
		} else {
            if (elem.target === this.operators) {

			}
		}
    }
};

var calcModel = {
    countPays:0,
    greenZone: document.getElementById('greenZone'),
    isGreenZone: false,
    percent:  document.getElementById('percent'),
    desc:  document.getElementById('desc'),
    sum:  document.getElementById('count'),

    setCountPays: function (count) {
		this.countPays =  parseInt(count.replace(/\D+/g,""));
    },
	drawCount: function(value) {
    	this.sum.innerHTML= "< " + value + "<span class='rubble'>q</span>" ;

	},
    drawResult: function(currentPercent) {
		this.percent.innerHTML = currentPercent + "<span> %</span>";
    },
    getProcent: function() {
		var procent = 0;
		switch (this.countPays) {
			case 100000:
			procent = 3.1;
			break;
			case 500000:
			procent = 2.9;
			break;
			case 1000000:
			procent = 2.7;
			break;
			case 5000000:
			procent = 2.6;
			break;
			case 10000000:
			procent = 2.5;
			break;
		}
		if (this.isGreenZone) {
			procent = procent - 0.1;
		}

		procent = procent.toString().replace('.',',');
		return procent;
    },
    drawUnderResult: function () {


    	var currentProcent = calcModel.getProcent().replace(',', '.');
        currentProcent = +currentProcent + 0.1;
        if (this.isGreenZone) {
            this.desc.innerHTML = currentProcent + "%  (снижаем на 0.1%) <span class='result__arrow'>&darr;</span>";
            this.desc.style.opacity=1;
		} else {
            this.desc.innerHTML = "<span class='result__arrow'>&darr;</span>";

            this.desc.style.opacity=0;

		}


    }
};


$("#range").ionRangeSlider(
	{
	    min: 0,
	    step: 1,
	    from: 2,
	    max: 5,
	    values: [
	    	"< 100 000 <span class='rubble'>q</span>",
		"< 500 000 <span class='rubble'>q</span>",
		"< 1 000 000 <span class='rubble'>q</span>",
		"< 5 000 000 <span class='rubble'>q</span>",
		"< 10 000 000 <span class='rubble'>q</span>"
	    ],
	    hide_min_max: true,
	    hide_from_to: false,
	    grid: true,
	    grid_snap: true,
	    /*prefix: ">",
	    postfix: "&#8381;",*/
	    keyboard: true,

	    onStart: function (val) {
		calcModel.setCountPays(val.from_value);
		calcModel.drawCount(calcModel.countPays);
		calcModel.drawResult(calcModel.getProcent());
	    },
	    onChange: function (val) {
		calcModel.setCountPays(val.from_value);
		calcModel.drawCount(calcModel.countPays);
		calcModel.drawResult(calcModel.getProcent());
		calcModel.drawUnderResult();
	    }
	}
);

var slider = $("#range").data("ionRangeSlider");
calcModel.greenZone.addEventListener('click', function (e) {

    calcModel.isGreenZone =  e.target.checked;
    calcModel.drawResult(calcModel.getProcent());
	calcModel.drawUnderResult();


});