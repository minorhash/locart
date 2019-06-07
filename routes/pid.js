var express = require('express');
var router = express.Router();
// === db =============================
var adb = require('usrdb');
var age=require("superagent")
// === glob =============================
var email=null, pid=null
var sess=null

var cnf=require("./son/aid.json")
var sec=cnf.sec;
//var sec=cnf.skl;

// === fun =============================
var getEma = function(req, res, next) {
console.log('=== get Ema =======================================');
if(req.session){
sess=req.session

if(sess.usr){
email=sess.usr.email
}else{console.log("no usr")}
}else{console.log("no req")}

next()}; //getEma

var putPid = function(req, res, next) {
console.log('=== putPid ===');
var utc = new Date().toJSON().slice(0,10);

if (req.body && email) {
    pid=req.body.id

age
.get('https://api.paidy.com/payments/'+pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+sec)
.then(res => {
    console.log(res)
 adb.insPid(email,pid,res.body.amount,
 JSON.stringify(res.body.buyer),
 JSON.stringify(res.body.order.items),
 utc);
})//res
} else {console.log("no pid");  }
next()};

var senEma = function(req, res, next) {
console.log('=== senEma =======================================');
    var ua=req.acceptsLanguages("en")
    var mail=require("./js/mail");
    try{mail(pid,ua)}
    catch(err){console.log(err)}
next()};

var chk = function() {
  console.log('=== PID =======================================');
  console.log(email);
  console.log(pid);
};

var fun=[getEma, putPid,senEma,chk]
router.put('/pid',fun);

module.exports = router;
