/**
 * Created by Zack on 12/15/2014.
 */

//Attaches Event listener to buttons
function onStart(){
    document.getElementById("print").addEventListener("click", function(){printPage()});
    document.getElementById("email").addEventListener("click", function(){emailPage()});
}

function printPage(){
    window.print();
    addToDatabase();
}

function emailPage(){
    document.getElementById("emailDiv").style.visibility = 'visible';
    addToDatabase();
}

function addToDatabase(){

}

window.addEventListener("load", onStart, false);