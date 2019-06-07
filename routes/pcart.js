var express = require('express');
var router = express.Router();
var db=require("cardb")
let par=null,usr=null
    let sku=0,uni=0,red=0
let skumer=null,sess=null,ite=null
   let sar=null,sst=null
let sum=null,email=null,etmp=null

var getSes=function(req, res, next) {
sess=req.session
    if(sess.usr){
usr=sess.usr
email=usr.email
}else{console.log("no usr")}

next()}
var posSku=function(req, res, next) {
sku=req.body.sku
uni=req.body.uni
skumer=db.skuMer(sku)

ite={sku:"",pri:"",uni:"",name:""}
if(sku){
    ite.name=skumer.name
    ite.sku=sku
    ite.uni=uni
    ite.pri=skumer.pri
    console.log(ite)
}else{console.log("no sku")}
if(sess.sar){
sar=sess.sar
sar.push(ite)

}else{
console.log("=== no sar")
sar=[]
sar.push(ite)
sess.sar=sar
}
res.redirect("cart")
next()}//pos sku

var getSum=function(req, res, next) {
console.log("==get sum")
if(sar){
    sum=[]
    for(var i=0;i<sar.length;i++){
sum.push(sar[i].pri*sar[i].uni)
}
if(sum.length!==0){
red=sum.reduce(function(total, num){ return total + num });
}else{console.log("no sum")}
}else{console.log("==no sar")}
next()}//get sum

var chk=function(req, res, next) {
    console.log("==p cart")
    console.log(sku)
    console.log(email)
    console.log(etmp)
    console.log(sst)
    next()}

var cb=function(req, res ,next) {
var obj={ par:par,sku:sku,mer:skumer,sar:sar,sum:red,usr:sess.usr}
res.render('cart',obj)
    next()}//cb
var arr=[getSes,posSku,getSum,chk,cb]
router.post('/cart',arr );
module.exports = router;
