var express = require('express');
var router = express.Router();
var adb=require("usrdb")
let par="",email="",usr=null
let mailusr=null,sess=null,his=null
var cred=require("./js/cred.js")

const getSes = (req, res, next)=> {
    if(req.session){
    sess=req.session
        usr=sess.usr
        email=sess.usr.email
}else{console.log("no email")}
next()};

const getHis= (req, res, next)=> {
if(email){
his=adb.allPid(email)
}else{console.log("no email")}
next()};

var chk=function(req, res, next) {
    console.log(email)
    console.log(his)
    console.log(usr)
    console.log(sess)
    next()}

var cb=function(req, res) {
var obj={ par:par,usr:usr,his:his}
res.render('history',obj);
}
router.get('/history',[getSes,getHis,chk,cb] );
module.exports = router;
