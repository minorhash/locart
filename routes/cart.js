var express = require('express');
var router = express.Router();
var db=require("cardb")
var par,sku,skumer,pri,uni,rsku,rset
var sess,ite,sob,sar=[],clr,skua,ind

var getPar=function(req, res, next) {
    par=req.params.id
    next()}

var getSku=function(req, res, next) {
rsku=req.query.rsku
rset=req.query.rset

sess=req.session
    skua=[]
if(sess.sar){
sar=sess.sar
    for (var i=0;i<sar.length;i++){
skua.push(sar[i].sku)
    }
ind=    skua.indexOf(rsku)
    if(ind>-1){
    sar[ind].sku=rsku
    sar[ind].uni=rset
    }

}else{
console.log("=== no sar")
}

next()}

var posRed=function(req, res, next) {
res.redirect("cart")
next()}

var posSku=function(req, res, next) {
sku=req.body.sku
uni=req.body.uni
skumer=db.skuMer(sku)

sess=req.session
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
res.redirect("cart")

}else{
console.log("=== no sar")
sar=sess.sar=[]
}

next()}//pos sku

var clrSes=function(req, res, next) {
if(req.query){
clr=req.query.clr
if(clr=="yes"){
req.session=null
sar=""
}else{sar=sess.sar}
}
next()}//clr ses

var chk=function(req, res, next) {
    console.log("== cart")
    console.log(sku)
    console.log(rsku)
    console.log(rset)
    console.log(ind)
    next()}

var cb=function(req, res ) {
res.render('cart',
{ par:par,
sku:sku,mer:skumer,
sar:sar
});
}

router.get('/cart',[getPar,getSku,clrSes,
chk,cb,posRed] );
router.post('/cart',[getPar,posSku,clrSes,
chk,cb] );

module.exports = router;
