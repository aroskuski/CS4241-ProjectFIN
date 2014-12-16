/**
 * Created by Zack on 12/15/2014.
 */

//Attaches Event listener to buttons


function printPage(){
    window.print();
    addToDatabase();
}

function emailPage(){
    document.getElementById("emailDiv").style.visibility = 'visible';
    addToDatabase();
}

$(document).ready(function(req, res) {
    $('#sub').submit(function(evt) {
        evt.preventDefault();

        for(var i = 1; i <= 5; i++){
            if($('#item'+i+'Name').val() != "" && $('#item'+i+'Link').val() != "" && $('#item'+i+'Price').val() != ""){
                var name = $('#item'+i+'Name').val();
                var link = $('#item'+i+'Link').val();
                var price = $('#item'+i+'Price').val();

                console.log(name+", "+link+", "+price);
                $.ajax({
                    url:'/addlistitem'
                    ,type: 'POST'
                    ,cache: false
                    ,data:
                    { item:name, link:link, price:price }
                })
            }
        }





    });
});