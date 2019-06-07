const express = require('express');
const router = express.Router();
const adb=require("usrdb")
let par=null,sess=null,sar=null
let usr=null,email=null,adr=null
const cnf= require('./son/aid.json');
//const pub=cnf.pub;
const pub=cnf.pkl;

const getPar=function(req, res, next) {
par=req.params.id
next()}

const getSku=function(req, res, next) {
if(req.session){
sess=req.session
sar=sess.sar
usr=sess.usr
}else{
sess=null
console.log("no sess")}
next()}

var getSum=function(req, res, next) {
if(sar){
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

const getAdr=function(req, res, next) {
if(usr){
email=usr.email
}else{console.log("==no usr")}

if(email){
adr=adb.emaAdr(email)
}else{console.log("==no email")}
next()}

const chk=function(req, res, next) {
    console.log(email)
    console.log(sar)
    console.log(usr)
    next()}

const cb=function(req, res ) {
const obj={par:par, sar:sar,pub:pub,usr:sess.usr,sum:red,adr:adr}
res.render('pay',obj);
}
const arr=[getPar,getSku,getSum,getAdr,chk,cb]
router.get('/pay-:id',arr );
module.exports = router;
