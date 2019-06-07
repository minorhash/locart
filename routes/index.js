var express = require('express');
var router = express.Router();
var db=require("cardb")
var mer
var sess

const getEma = (req, res, next)=> {
if(req.session ){
sess=req.session
}else{console.log("no req")}
next()};

var getIte=function(req, res, next) {
    mer=db.allMer()
    next()}
var chk=function(req, res, next) {
    next()}

var cb=function(req, res ) {
    var obj={ mer:mer,usr:sess.usr}
    res.render('index',obj);}//cb
var arr=[getEma,getIte,chk,cb];
router.get('/',arr)
module.exports = router;
