var express = require('express');
var router = express.Router();
var db=require("cardb")
let par="",sku=0,catmer=null,mailusr=null
var usr=null,sess=null

var getPar=function(req, res, next) {
    par=req.params.id
    next()}

const getEma = (req, res, next)=> {
if(req.session){
sess=req.session
}else{
   sess.usr=null
    console.log("no sess")}
next()};

var getCat=function(req, res, next) {
    catmer=db.catMer(par)
    next()}

var chk=function(req, res, next) {
    console.log(par)
    console.log("==== catmer")
    console.log(catmer[0])
    console.log(sess)
    next()}

var cb=function(req, res ) {
    var obj={ par:par,mer:catmer,usr:sess.usr}
res.render('category',obj);
}
var arr=[getPar,getEma,getCat,chk,cb]
router.get('/category-:id',arr);
module.exports = router;
