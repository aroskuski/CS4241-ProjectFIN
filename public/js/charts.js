/**
 * Created by Gallo on 12/15/2014.
 * Modified by Alexander W. Witt on 12/15/2014 at 6:11 PM
 */

// function to initialize the chart contents upon load since no button
// is provided for interactive use of the chart which is used to display
// the price change on top selling items.

$(function () {

    var response;

    var dataArrayBall = new Array();
    var dataArrayDino = new Array();
    var dataArrayShoes = new Array();
    var dataArrayBicycle = new Array();
    var dataArrayDoll = new Array();

    var urlReq = "/pricedata.json";


    $.ajax({url:"/topitems.html", success:function(result){
        var item1,item2,item3,item4,item5;
        var res = result;
        $( "#topItem1" ).prepend("1. "+res[0].item);
        $( "#topItem2" ).prepend("1. "+res[1].item);
        $( "#topItem3" ).prepend("1. "+res[2].item);
        $( "#topItem4" ).prepend("1. "+res[3].item);
        $( "#topItem5" ).prepend("1. "+res[4].item);

        $("#topLink1").text(res[0].link);
        $("#topLink2").text(res[1].link);
        $("#topLink3").text(res[2].link);
        $("#topLink4").text(res[3].link);
        $("#topLink5").text(res[4].link);

        $("#topLink1").attr("href", res[0].link);
        $("#topLink2").attr("href", res[1].link);
        $("#topLink3").attr("href", res[2].link);
        $("#topLink4").attr("href", res[3].link);
        $("#topLink5").attr("href", res[4].link);




    }})


    // JQuery function for performing AJAX to retrieve JSON string
    $.ajax({url:urlReq, success:function(result) {
        response = result;

        var ball = 0;
        var dino = 0;
        var shoes = 0;
        var bicycle = 0;
        var doll = 0;

        for (var i = 0; i < response.length; i++) {
            if (response[i].item == "ball") {
                dataArrayBall[ball] = parseFloat(response[i].price_avg);
                ball++;
            }
            if (response[i].item == "dino") {
                dataArrayDino[dino] = parseFloat(response[i].price_avg);
                dino++;
            }
            if (response[i].item == "shoes") {
                dataArrayShoes[shoes] = parseFloat(response[i].price_avg);
                shoes++;
            }
            if (response[i].item == "bicycle") {
                dataArrayBicycle[bicycle] = parseFloat(response[i].price_avg);
                bicycle++;
            }
            if (response[i].item == "doll") {
                dataArrayDoll[doll] = parseFloat(response[i].price_avg);
                doll++;
            }
        }

        $('#container').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                text: 'Price Change on Top Items'
            },
            xAxis: {
                categories: ['Last Month', 'This Month', 'Today']
            },
            yAxis: {
                title: {
                    text: 'Price $'
                }
            },
            series: [{
                name: 'Ball',
                data: dataArrayBall
            }, {
                name: 'Dino',
                data: dataArrayDino
            }, {
                name: 'Shoes',
                data: dataArrayShoes
            }, {
                name: 'Bicycle',
                data: dataArrayBicycle
            }, {
                name: 'Doll',
                data: dataArrayDoll
            }
            ]
        });
    }})
});