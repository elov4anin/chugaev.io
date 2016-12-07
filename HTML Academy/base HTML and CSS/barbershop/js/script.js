var link = document.querySelector(".user-block__login");
var popup = document.querySelector(".modal-window");
var close = popup.querySelector(".modal-window-close");
var form = popup.querySelector("form");
var login = popup.querySelector("[name=username]");
var password = popup.querySelector("[name=password]");
var storage = localStorage.getItem("login")
    ;
var mapOpen = document.querySelector(".map");
var mapPopup = document.querySelector(".modal-window-map");
var mapClose = mapPopup.querySelector(".modal-window-close");


link.addEventListener("click", function (event) {
    event.preventDefault();
    popup.classList.add("modal-window-show");

    if (storage) {
        login.value = storage;
        password.focus();
    } else {
        login.focus();
    }
});

close.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.remove("modal-window-show");
});

form.addEventListener("submit", function (event) {

    if (!login.value || !password.value) {
        event.preventDefault();
        alert("Введите логин и пароль");
    } else {
        localStorage.setItem("login", login.value);
    }

});
window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
        if (popup.classList.contains("modal-window-show")) {
            popup.classList.remove("modal-window-show");

        }
    }

});
mapOpen.addEventListener("click", function (event) {
    event.preventDefault();
    mapPopup.classList.add("modal-window-show");
});
mapClose.addEventListener("click", function(event) {
    event.preventDefault();
    mapPopup.classList.remove("modal-window-show");
});
window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
        if (mapPopup.classList.contains("modal-window-show")) {
            mapPopup.classList.remove("modal-window-show");

        }
    }

});

