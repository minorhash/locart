var express = require("express")
var router = express.Router()
var paypal = require("paypal-rest-sdk")
// === db
var adb = require("usrdb")

var sess=null,sar=null,usr=null,email=null
var pid=null,payid=null,exeJson=null
var red=0,sum=0,suma=null,item=null,ist=null

var cnf=require("./son/pal.json")
paypal.configure({
mode: cnf.sand,
client_id:cnf.tid,
client_secret:cnf.tsc
})

// === get
var getSes= function(req, res, next) {
    if(req.session){
        sess=req.session
    }else{console.log("no req")}
usr= sess.usr
if(usr){
    email=usr.email
}else{console.log("no usr")}

sar= sess.sar
next()}

var getSum=function(req, res, next) {
if(sar){
suma=[]
for(var i=0;i<sar.length;i++){
suma.push(sar[i].pri*sar[i].uni)
}
if(suma.length!==0){
red=suma.reduce(function(total, num){ return total + num });
sum=Math.round(red*1.08)+650
    console.log("=== sum")
    console.log(sum)

}else{console.log("no suma")}
}else{console.log("==no sar")}
next()}

var getPid= function(req, res, next) {
pid = req.query.paymentId
payid = req.query.PayerID
var det={subtotal:null,tax:null,shipping:null}
    det.subtotal=red
    det.tax=Math.round(red*.08)
    det.shipping=650
exeJson = {
payer_id: payid,
transactions: [{amount: {currency: "JPY",total: sum,details:det}}],
}
next()}

var chk= function(req, res, next) {
    console.log("=== suc ===")
    console.log(email)
    console.log(usr)
    next()}

var exePal= function(req, res) {
var utc = new Date().toJSON().slice(0,10)

paypal.payment.execute(pid, exeJson, function(err, pay) {
if (err) {console.log("=== exe fail");
console.log(err)
res.redirect("cancel")
}else {
item=    pay.transactions[0].item_list.items
ist=    JSON.stringify(pay.transactions[0].item_list.items)

    try{adb.insPal(email,pay.id,sum,ist,utc)}
    catch(err){console.log(err)}
console.log("=== suc===")
console.log(email)
console.log(pay)
console.log(pay.id)
console.log(item)

}//else

})
}//exePal

var cb= function(req, res) {
var obj={usr:usr,title:"buyer",pid: pid,payid:payid,pay:pay,item:item,sar:sar}
res.render("success",obj )}

var arr=[getSes,getSum,getPid,exePal,chk,cb]
router.get("/success", arr)
module.exports = router
