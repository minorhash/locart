var express = require('express');
var router = express.Router();
var adb=require("usrdb")
var par=null,email=null,usr=null
var sess=null,pid=null,pal=null

var getPar=function(req, res, next) {
    par=req.params.id
    next()}

const getEma = (req, res, next)=> {
if(req.session){
sess=req.session
usr=sess.usr
if(usr){
email=usr.email
}else{console.log("no usr")}
}else{
    usr=null
    console.log("no sess")}
next()};

const getPid= (req, res, next)=> {
if(email){
pid=adb.allPid(email)
}else{
pid=null
console.log("no email")}
next()};

const getPal= (req, res, next)=> {
if(email){
pal=adb.allPal(email)
}else{
pal=null
console.log("no email")}
next()};

var chk=function(req, res, next) {
    console.log(par)
    console.log(email)
    console.log(pal)
    next()}

var cb=function(req, res) {
var obj={ par:par,usr:usr,pid:pid,pal:pal}
res.render('usr',obj);}
var arr=[getPar,getEma,getPid,getPal,chk,cb]
router.get('/usr-:id',arr);
module.exports = router;
