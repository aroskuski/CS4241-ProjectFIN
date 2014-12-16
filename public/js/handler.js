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
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
}

function emailPage(){
    document.getElementById("emailDiv").style.visibility = 'visible';
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