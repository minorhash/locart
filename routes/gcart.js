var express = require('express');
var router = express.Router();
let par="",sku=0,skumer=null,rsku=0,rset=0
let sess=null,sar=null
let clr="no",skua=[],ind=0
let sum=0,red=0,usr=null
let etmp=null

var getSes=function(req, res, next) {
    if(req.session){
sess=req.session
    if(sess){
usr=sess.usr
sar=sess.sar
}else{console.log("=== no sess")}
}else{console.log("=== no req")}
next()}

var upUni=function(req, res, next) {
rsku=req.query.rsku
rset=req.query.rset

    skua=[]
if(sess){
sar=sess.sar
if(sar){
for (var i=0;i<sar.length;i++){
skua.push(sar[i].sku)
}

ind=    skua.indexOf(rsku)
    if(ind>-1){
    sar[ind].sku=rsku
    sar[ind].uni=rset
}else{console.log("=== no ind")}
}else{
   sar=null
    console.log("=== no sar")}
}else{
   usr=null
    console.log("=== no sess")}
next()}

/// get sum
var getSum=function(req, res, next) {
if(sar!==null){
console.log("==sar")
    sum=[]
    for(var i=0;i<sar.length;i++){
sum.push(sar[i].pri*sar[i].uni)
    }
if(sum.length!==0){
red=sum.reduce(function(total, num){ return total + num });
}else{console.log("no sum")}
}else{console.log("==no sar")}
    next()}

var clrSes=function(req, res, next) {
if(req.query){
clr=req.query.clr
try{
if(clr=="yes"){ sar=null;
    sess.sar=null;
red=0
}
}catch(err){console.log(err)}
}else{
   clr="no"
    console.log("no query")}
//res.redirect("back")

next()}//clr ses

var chk=function(req, res, next) {
    console.log("== get cart")
    console.log(red)
    console.log(sess)
    console.log(sar)
    console.log(etmp)
    next()}

var cb=function(req, res ) {
var obj={ par:par,sku:sku,mer:skumer,sar:sar,sum:red,usr:usr}
res.render('cart',obj);
}
var arr=[getSes,upUni,getSum,clrSes,chk,cb]
router.get('/cart',arr);
module.exports = router;
