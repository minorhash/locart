var express = require('express');
var router = express.Router();
var par,sku,pri,uni
var sess,ite,sob,sar=[],clr,num,skua

var getSes=function(req, res, next) {
sess=req.session
if(sess){
sar=sess.sar
hea=req.originalUrl

}else{console.log("=== sess")}
next()}

var chk=function(req, res) {
console.log("== put uni")
console.log(sess)
}

router.put('/uni',[getSes,chk] );
module.exports = router;
