var express = require('express');
var router = express.Router();
var adb=require("usrdb")
var par,email,usr
var mailusr,sess
var cred=require("./js/cred.js")

const getEma = (req, res, next)=> {
email = cred.ema(req);
mailusr = adb.mailUsr(email);
    sess=req.session
    sess.usr=mailusr
next()};

const getUsr = function(req, res, next) {
if (sess.usr) {
usr = sess.usr.name;
} else {
usr = null;
console.log("no usr");
}next()};

var getPar=function(req, res, next) {
    par=req.params.id
    next()}

var logOut=function(req, res, next) {
    if(req.query.out=="yes"){
sess.usr=null
    }else{console.log("no out");}
    next()}


var chk=function(req, res, next) {
    console.log(par)
    console.log(mailusr)
    console.log(sess)
    console.log(usr)
    next()}

var cb=function(req, res) {
var obj={ par:par,usr:usr}
res.render('usr',obj);
}
router.post('/usr-:id',[getPar,getEma,getUsr,logOut,chk,cb] );
module.exports = router;
