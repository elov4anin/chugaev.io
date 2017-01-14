/*menu*/

var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');
navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});


/*login form*/
/*var link = document.querySelector(".main-nav__user-login");
var loginWindow = document.querySelector(".login-window");
var menu = document.querySelector(".main-nav");
var btnClose = document.querySelector(".login-window--close");

link.addEventListener("click", function (event) {
  event.preventDefault();
  menu.classList.add("main-nav--closed")
  menu.classList.remove("main-nav--opened")
  loginWindow.classList.add("login-window--show");

});
btnClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  loginWindow.classList.remove("login-window--show");
})*/


/*svg sprite*/
;(function(window, document) {
  'use strict';
  var file = 'img/symbols.svg', // путь к файлу спрайта на сервере
      revision = 2;            // версия спрайта
  if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return true;
  var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
      request,
      data,
      insertIT = function() {
        document.body.insertAdjacentHTML('afterbegin', data);
      },
      insert = function() {
        if (document.body) insertIT();
        else document.addEventListener('DOMContentLoaded', insertIT);
      };
  if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
    data = localStorage.getItem('inlineSVGdata');
    if (data) {
      insert();
      return true;
    }
  }
  try {
    request = new XMLHttpRequest();
    request.open('GET', file, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        data = request.responseText;
        insert();
        if (isLocalStorage) {
          localStorage.setItem('inlineSVGdata', data);
          localStorage.setItem('inlineSVGrev', revision);
        }
      }
    }
    request.send();
  } catch (e) {}
}(window, document));