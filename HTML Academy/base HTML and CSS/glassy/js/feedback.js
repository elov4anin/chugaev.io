var link = document.querySelector("#feedback-form");
var popup = document.querySelector(".feedback-window");
var close =  popup.querySelector(".feedback-close");

link.addEventListener("click", function (event) {
    event.preventDefault();
    popup.classList.add("feedback-show");
});
close.addEventListener("click", function (event) {
    event.preventDefault();
    popup.classList.remove("feedback-show");

});
window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
        if (popup.classList.contains("feedback-show")) {
            popup.classList.remove("feedback-show");

        }
    }
});
