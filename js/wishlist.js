/**
 * Created by andrew on 12/14/14.
 */

var inspect = require('util').inspect;
var Client = require('mariasql');

//Runs the given query, then executes resultfunc
function runQuery(query, res, resultfunc){
    var out = [];
    var c = new Client();
    //var query;

    //login
    c.connect({
        host: '127.0.0.1',
        user: 'ajroskuski',
        password: 'ajroskuski_pw',
        db: 'ajroskuski_db'

    });

    //event handlers
    c.on('connect',function(){
        console.log('Connected to db');
    })
        .on('error', function (err){
            console.log('Client Error ' + err);
        })
        .on('close', function(){
            console.log('Client Closed');
        });

    //run query
    c.query(query)
        .on('result', function (result){
            result.on('row',function(row){
                out.push(row);
            })
                .on('error', function(err){
                    console.log("result error " + inspect(err));
                    res.status(400);// Something has gone wrong
                                    // Since all the SQL queries are hardcoded, it is probably not the server's fault
                })
                .on('end', function(){
                    console.log('Result finished successfully')
                });
        })
        .on('end', function(){
            console.log("Done with all results");
            //do callback
            resultfunc(res, out);
        });



    c.end();


    //return result;
}

//Wrapper for runquery to return JSON as the response
function requestJSON(query, res){
    console.log(query);
    runQuery(query, res,  function (res, result){
        console.log(JSON.stringify(result));
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    });

}


function requestHTML(query , res){
    console.log(query);
    runQuery(query, res,  function (res, result){
        console.log(JSON.stringify(result));
        //res.set('Content-Type', 'application/json');
        var topten = [];
        for(var i = 0; i < 10; i++){
            if (result[i] != undefined){
                topten[i] = result[i];
            }

        }
        console.log(JSON.stringify(topten));
        res.render('topitems', {data: topten});
    });
}

exports.pricedata = function(req, res){
    requestJSON('SELECT item, COUNT(item) AS item_count, DATE(time_added) AS date_added, ' +
    'AVG(price) AS price_avg FROM wishlist ' +
    'GROUP BY item, date_added ORDER BY date_added DESC , item_count DESC;', res);
};

exports.topitems = function(req, res){
    requestHTML('SELECT item, COUNT(item) AS item_count FROM wishlist GROUP BY item ORDER BY item_count DESC;', res);
};

exports.additem = function(req, res){
    if((req.body.item == undefined) || (req.body.link == undefined) || (req.body.price == undefined)){
        res.status(400).send();
        return;
    }
    runQuery("SELECT MAX(id) AS id_max FROM whishlist", res, function(res, result) {
        console.log(JSON.stringify(result));
        var query = 'INSERT INTO wishlist (id, item, link, price, time_added) VALUES (';
        query += parseInt(result[0].id_max + 1) + ", ";
        query += "'" + Client.escape(req.body.item) + "', ";
        query += "'" + Client.escape(req.body.link) + "', ";
        query += req.body.price + ", ";
        query += "NOW());";
        res.status(204);
        runQuery(query, res, function (res, result) {
            console.log(JSON.stringify(result));
            res.send();
        });
    });
};

exports.modifyitem = function(req, res){
    if((req.body.id == undefined) || (req.body.item == undefined) || (req.body.link == undefined) || (req.body.price == undefined) ){
        res.status(400).send();
        return;
    }
    var query = 'UPDATE wishlist SET ';
    query += "item='" + Client.escape(req.body.item) + "',";
    query += "link='" + Client.escape(req.body.link) + "',";
    query += "price=" +req.body.price + ",";
    query += "time_added=NOW()";
    query += " WHERE id = " + parseInt(req.body.id) + ";";
    res.status(204);
    runQuery(query, res, function(res, result){
        console.log(JSON.stringify(result));
        res.send();
    });
};