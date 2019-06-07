var express = require("express")
var router = express.Router()
var sess=null,usr=null,sar=null

var getSes=function(req, res, next) {
    if(req.session){
sess=req.session
    if(sess){
usr=sess.usr
sar=sess.sar
}else{console.log("=== no sess")}
}else{console.log("=== no req")}
next()}

var chk = function(req, res, next) {
    console.log("=== cancel ===")
    next()
}

var gcb = function(req, res) {
var obj={title: "cancelled",usr:usr}
res.render("cancel",obj)}

router.get("/cancel", [getSes,chk, gcb])
module.exports = router
