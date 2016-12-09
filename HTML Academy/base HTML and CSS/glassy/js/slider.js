var label1 = document.querySelector(".btn-slide-1");
var label2 = document.querySelector(".btn-slide-2");
var label3 = document.querySelector(".btn-slide-3");

var slide1 = document.querySelector(".slide-1");
var slide2 = document.querySelector(".slide-2");
var slide3 = document.querySelector(".slide-3");


label1.addEventListener("click", function () {

    if (!(slide1.classList.contains("slide-sow"))) {
        slide1.classList.add("slide-show");
        slide2.classList.remove("slide-show");
        slide3.classList.remove("slide-show");
    }
});

label2.addEventListener("click", function () {

    if (!(slide2.classList.contains("slide-sow"))) {
        slide2.classList.add("slide-show");
        slide1.classList.remove("slide-show");
        slide3.classList.remove("slide-show");
    }
});

label3.addEventListener("click", function () {

    if (!(slide3.classList.contains("slide-sow"))) {
        slide3.classList.add("slide-show");
        slide2.classList.remove("slide-show");
        slide1.classList.remove("slide-show");
    }
});