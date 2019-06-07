var express = require('express');
var router = express.Router();

var cb=function(req, res, next) {
res.render('info',
{ title: 'info' });
}
router.get('/info-:id',[cb] );

module.exports = router;
