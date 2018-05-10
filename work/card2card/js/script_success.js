var backBrn = document.querySelector(".success__btn");
var paySpan = document.querySelector(".success__cost");
var allSum = paySpan.textContent;

s1 = allSum.slice(0, (allSum.length-3));
s2 = allSum.slice(-2);
s3 = s1 +".<sub> " + s2 +" </sub> &#8381;";
paySpan.innerHTML = s3;

backBrn.addEventListener("click", function (e) {
    e.preventDefault();
    /*location.href="http://10.10.118.74:8080/demo/";*/ /*@todo Для переноса в проект */
    window.history.back(); /*@todo Для теста */
});