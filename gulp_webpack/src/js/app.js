import $ from 'jquery';

$(document).ready(()=>{
    let str = `window location is ${window.location}`;
    $(".text").text(str);

});