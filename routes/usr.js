var express = require('express');
var router = express.Router();
var par

var getPar=function(req, res, next) {
    par=req.params.id
    next()}

var chk=function(req, res, next) {
    console.log(par)
    next()}

var cb=function(req, res) {
res.render('usr',
{ par:par

});
}
router.get('/usr-:id',[getPar,
    chk,cb] );

module.exports = router;
