var express = require('express');
var router = express.Router();
var paypal = require("paypal-rest-sdk")
var par=null,sess=null,sar=null
var usr=null,sum=null,red=0,tax=0
var pal = require("mypal")
var mypal = pal.myPal()
var cnf=require("./son/pal.json")
paypal.configure({
  mode: cnf.sand,
  client_id:cnf.tid,
  client_secret:cnf.tsc
});
var tran=mypal.transactions[0]
var    ite=null

var getSes=function(req, res, next) {
if(req.session){
sess=req.session
sar=sess.sar
usr=sess.usr
}else{ console.log("no sess")}
next()}

var getSum=function(req, res, next) {
if(sar){
sum=[]
for(var i=0;i<sar.length;i++){
sum.push(sar[i].pri*sar[i].uni)
}
if(sum.length!==0){
red=sum.reduce(function(total, num){ return total + num });
}else{console.log("no sum")}

tran.amount.details.subtotal =red
tran.amount.details.tax=Math.round(red*.08)
tran.amount.details.shipping=650
tran.amount.total =(Math.round(red*1.08)+650)

}else{console.log("==no sar")}
next()}

var putIte=function(req, res, next) {
if(sar){
ite={name:null,sku:null,quantity:null,price:null,currency: "JPY"}
        console.log(sar.length)
        for (var i=0;i<sar.length;i++){
        console.log(sar[i])
        ite.name=sar[i].name
        ite.sku=sar[i].sku
        ite.price=sar[i].pri.toString()
 tax=Math.round(sar[i].pri*.08).toString()
       ite.quantity=sar[i].uni
}//for
tran.item_list.items.push(ite)
}else{console.log("==no sar")}

next()}

var chk=function(req, res, next) {
    console.log(sar)
    console.log(red)
    console.log(tax)
    console.log(mypal)
    console.log(mypal.transactions[0])
    console.log(mypal.transactions[0].item_list)
    next()}

var crPal = function(req, res) {
    paypal.payment.create(mypal, function(err, pay) {
        if (err) {
            console.log("== pal==")
            console.log(err)
            console.log("=== err.response.name")
            console.log(err.response.name)
            console.log(err.response.details)
            throw err.message
       res.redirect("cancel")
        }
        else {
            console.log(pay.links[1].href)
            console.log(pay)
            res.redirect(pay.links[1].href)
        } //else
    })//create
}//go pal

var cb=function(req, res ) {
var obj={par:par, sar:sar,usr:usr}
res.render('paypal',obj);}
router.get('/paypal',[getSes,getSum,putIte,chk,crPal] );
module.exports = router;
