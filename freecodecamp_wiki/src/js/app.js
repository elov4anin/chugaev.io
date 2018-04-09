//it is js script!
import  $ from 'jquery';

$(document).ready(()=> {
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json&formatversion=2",
        /*url: "/ck-landings/Operators/php/callback.php",*/
        /*url: "/lp/test/taxi/php/callback.php",*/

        type: "GET",
        dataType: 'json',

        success: function (dat) {
            console.log(dat)



        },
        error: function(E){
           console.log(e)
        },
        complete: function(){

        }
    });
});