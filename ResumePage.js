// read local JSON file using jQuery
$(document).ready(function(e) {
    $.getJSON( "./Data.json" , function( data ){
        console.log(data);
    });
});