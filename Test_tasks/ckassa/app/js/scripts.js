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


/**
 jQuery-viewport-checker - v1.8.7 - 2015-12-17
 * https://github.com/dirkgroenen/jQuery-viewport-checker
 *
 * Copyright (c) 2015 Dirk Groenen
 * Licensed MIT <https://github.com/dirkgroenen/jQuery-viewport-checker/blob/master/LICENSE>
 */

!function(a){a.fn.viewportChecker=function(b){var c={classToAdd:"visible",classToRemove:"invisible",classToAddForFullView:"full-visible",removeClassAfterAnimation:!1,offset:100,repeat:!1,invertBottomOffset:!0,callbackFunction:function(a,b){},scrollHorizontal:!1,scrollBox:window};a.extend(c,b);var d=this,e={height:a(c.scrollBox).height(),width:a(c.scrollBox).width()},f=-1!=navigator.userAgent.toLowerCase().indexOf("webkit")||-1!=navigator.userAgent.toLowerCase().indexOf("windows phone")?"body":"html";return this.checkElements=function(){var b,g;c.scrollHorizontal?(b=a(f).scrollLeft(),g=b+e.width):(b=a(f).scrollTop(),g=b+e.height),d.each(function(){var d=a(this),f={},h={};if(d.data("vp-add-class")&&(h.classToAdd=d.data("vp-add-class")),d.data("vp-remove-class")&&(h.classToRemove=d.data("vp-remove-class")),d.data("vp-add-class-full-view")&&(h.classToAddForFullView=d.data("vp-add-class-full-view")),d.data("vp-keep-add-class")&&(h.removeClassAfterAnimation=d.data("vp-remove-after-animation")),d.data("vp-offset")&&(h.offset=d.data("vp-offset")),d.data("vp-repeat")&&(h.repeat=d.data("vp-repeat")),d.data("vp-scrollHorizontal")&&(h.scrollHorizontal=d.data("vp-scrollHorizontal")),d.data("vp-invertBottomOffset")&&(h.scrollHorizontal=d.data("vp-invertBottomOffset")),a.extend(f,c),a.extend(f,h),!d.data("vp-animated")||f.repeat){String(f.offset).indexOf("%")>0&&(f.offset=parseInt(f.offset)/100*e.height);var i=f.scrollHorizontal?d.offset().left:d.offset().top,j=f.scrollHorizontal?i+d.width():i+d.height(),k=Math.round(i)+f.offset,l=f.scrollHorizontal?k+d.width():k+d.height();f.invertBottomOffset&&(l-=2*f.offset),g>k&&l>b?(d.removeClass(f.classToRemove),d.addClass(f.classToAdd),f.callbackFunction(d,"add"),g>=j&&i>=b?d.addClass(f.classToAddForFullView):d.removeClass(f.classToAddForFullView),d.data("vp-animated",!0),f.removeClassAfterAnimation&&d.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){d.removeClass(f.classToAdd)})):d.hasClass(f.classToAdd)&&f.repeat&&(d.removeClass(f.classToAdd+" "+f.classToAddForFullView),f.callbackFunction(d,"remove"),d.data("vp-animated",!1))}})},("ontouchstart"in window||"onmsgesturechange"in window)&&a(document).bind("touchmove MSPointerMove pointermove",this.checkElements),a(c.scrollBox).bind("load scroll",this.checkElements),a(window).resize(function(b){e={height:a(c.scrollBox).height(),width:a(c.scrollBox).width()},d.checkElements()}),this.checkElements(),this}}(jQuery);
//# sourceMappingURL=jquery.viewportchecker.min.js.map

jQuery(document).ready(function() {
  jQuery('.scroll').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated fadeIn',
    offset: 100
  });
});

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
var body = document.querySelector("body");
var link = document.querySelector(".main-nav__login");
var loginWindow = document.querySelector(".login-window");
var btnClose = document.querySelector(".login-window--close");
var loginForm = loginWindow.querySelector(".login-form");
var login = loginWindow.querySelector("[name=username]");
var password = loginWindow.querySelector("[name=password]");
var storage = localStorage.getItem("login");
var p = loginWindow.querySelector("p") ;

link.addEventListener("click", function (event) {
  event.preventDefault();
  loginWindow.classList.add("login-window--show");
  body.classList.add("overlay");

})

btnClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  loginWindow.classList.remove("login-window--show");
  body.classList.remove("overlay")
})

loginForm.addEventListener("submit", function (event) {

  if (!login.value || !password.value) {
    event.preventDefault();
    p.classList.add("sign-error");
  } else {
    localStorage.setItem("login", login.value);
  }
});

/*sign up- form */

var sign = document.querySelector(".main-nav__sign-up");
var signWindow = document.querySelector(".sign-window");
var signClose = document.querySelector(".sign-window--close");
var signForm = signWindow.querySelector(".sign-form");
var signLogin = signWindow.querySelector("[name=username]");
var signPassword = signWindow.querySelector("[name=password]");
var signEmail = signWindow.querySelector("[name=email]");
var signPhone = signWindow.querySelector("[name=phone]");
var re =/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
var reEmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
var label = signWindow.querySelector(".sign-form__label");

sign.addEventListener("click", function (event) {
  event.preventDefault();
  signWindow.classList.add("sign-window--show");
  body.classList.add("overlay");
});

signClose.addEventListener("click", function (event) {
  event.preventDefault();
  signWindow.classList.remove("sign-window--show");
  body.classList.remove("overlay");
})

signForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!signLogin.value || !signPassword.value||!signEmail.value||!signPhone.value) {
    label.innerHTML="Please enter your login,password, email, phone";
  } else if (!reEmail.test(signEmail.value)) {
    label.innerHTML = "Invalid Email";
    signEmail.classList.add("sign-error");
  } else if (!re.test(signPhone.value)) {
    label.innerHTML = "Invalid phone number";
    signPhone.classList.add("sign-error");
  } else {
    label.innerHTML="All right!";
  }
});