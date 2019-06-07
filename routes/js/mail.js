// === db =============================
var adb = require('usrdb');
var age=require("superagent")
var snde = require('snd-ema');
// === glob =============================
var email, pid, usr, sku;
var mailusr=null;
var inspid, getpid, selpid, strbuy, strite;
var buy, ite, oite,gpid

var cnf=require("../son/aid.json")
var sec=cnf.sec;
var sec=cnf.skl;

var senEma=function(pid,ua){
age
.get('https://api.paidy.com/payments/'+pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+sec)
.then(res => {

var mnt=res.body.amount
var buy=res.body.buyer
var email=buy.email
var ite=res.body.order.items

console.log(buy);
//var sub=buy.name1+"さま"
var fin;

for (var i=0;i< ite.length;i++){
fin+="タイトル:"+ite[i].title+",sku:tms-"+ite[i].id
        +",price:"+ite[i].unit_price.toLocaleString()+" yen"
        +",unit:"+ite[i].quantity+"<br>"
}
var fin2=fin.replace(/undefined/,"")
var i18=null
if(ua=="ja"){
i18=require("../son.ja.json")
} else {
i18=require("../son/en.json")
}

var sub=i18.buy

var pre=
i18.lin1
+i18.cau1
+i18.lin1+"<br>"
+buy.name1+"様<br><br>"
+i18.cau2+"<br><br>"
+i18.cau3
+i18.cau4+"<br>"

+i18.cont+"<br>"
+i18.pid+pid+"<br><br>"

var mes=pre+fin2
console.log(mes)

if(pid){
snde.trEma(email,sub,mes);
}else{console.log("no pid")}

})//res
}//obj

module.exports=senEma

