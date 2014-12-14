var express = require('express');
var router = express.Router();
var wishlist = require('../js/wishlist.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/wishlist.html', function(req, res){
  res.render('wishlist', { title: 'Wishlist' });
});

router.get('/pricedata.json', wishlist.pricedata);

router.get('/topitems.html', wishlist.topitems);

router.post('/addlistitem', wishlist.additem);

router.post('/modifylistitem', wishlist.modifyitem);

module.exports = router;
