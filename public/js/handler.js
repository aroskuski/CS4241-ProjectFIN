/**
 * Created by Zack on 12/15/2014.
 */

//Attaches Event listener to buttons


function onStart(){
    document.getElementById("print").addEventListener("click", function(){printPage()});
    document.getElementById("email").addEventListener("click", function(){emailPage()});
}

function printPage(){
        var divToPrint=document.getElementById("tableprint");
        newWin= window.open("");
        var items = "";
        for(var i = 1; i <= 5; i++){
            if ($('#item' + i + 'Name').val() != "" && $('#item' + i + 'Link').val() != "" && $('#item' + i + 'Price').val() != "") {
                var name = $('#item' + i + 'Name').val();
                var link = $('#item' + i + 'Link').val();
                var price = $('#item' + i + 'Price').val();
                items += name + " which costs: $"+price+ " and can be found here: "+link+"<br>";
            }
        }
        newWin.document.write(items);
        newWin.print();
        newWin.close();
}

function emailPage(){
    document.getElementById("emailDiv").style.visibility = 'visible';
    var items = "";
    for(var i = 1; i <= 5; i++){
        if ($('#item' + i + 'Name').val() != "" && $('#item' + i + 'Link').val() != "" && $('#item' + i + 'Price').val() != "") {
            var name = $('#item' + i + 'Name').val();
            var link = $('#item' + i + 'Link').val();
            var price = $('#item' + i + 'Price').val();
            items += name + " which costs: $"+price+ " and can be found here: "+link+" ";
        }
    }

    $("#emailText").text("Dear Santa, I have been awfully good this year! I cant wait for" +
    " you to come sliding down my chimney on Christmas Eve! There are a few things I've" +
    " been wishing for this year which are: " +items+
    " I will leave you milk and cookies which I hope you enjoy! " +
    "Thanks again Santa for making all our dreams come true! Merry Christmas!");
}

$(document).ready(function(req, res) {
    $('#sub').submit(function(evt) {
        evt.preventDefault();

        submitToDatabase(1);

    });
});

function submitToDatabase(i){
    if(i == 6){
        // only 5 rows to check
    }
    else {
        if ($('#item' + i + 'Name').val() != "" && $('#item' + i + 'Link').val() != "" && $('#item' + i + 'Price').val() != "") {
            var name = $('#item' + i + 'Name').val();
            var link = $('#item' + i + 'Link').val();
            var price = $('#item' + i + 'Price').val();

            console.log(name + ", " + link + ", " + price);
            $.ajax({
                url: '/addlistitem'
                , type: 'POST'
                , cache: false
                , data: {item: name, link: link, price: price}
                , complete: function(data){
                    console.log("made it here!!");
                    submitToDatabase(i+1);
                }
            })
        }
        else{
            submitToDatabase(i+1);
        }
    }
}


window.addEventListener("load", onStart, false);