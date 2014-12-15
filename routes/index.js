var express = require('express');
var router = express.Router();
var wishlist = require('../js/wishlist.js');

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });
  res.redirect(301, 'wishlist.html');
});

router.get('/wishlist.html', function(req, res){
  res.render('wishlist', { title: 'Wishlist' });
});

//takes no arguments, returns the json to put in the chart
//returns array of format {item, item_count}
router.get('/pricedata.json', wishlist.pricedata);

//takes no arguments, returns html fragment
router.get('/topitems.html', wishlist.topitems);

//name, link, and price must be in body, returns wishlist item id
// returns HTTP 400 if error, but this shouldn't happen
router.post('/addlistitem', wishlist.additem);

//id, name, link, and price must be in body
//returns HTTP 204 on success, HTTP 400 in error
router.post('/modifylistitem', wishlist.modifyitem);

module.exports = router;
