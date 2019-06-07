var sku,uni,sess,sar
var gsku={
sku:function(req){
if(req.query){
sku=req.query.rsku
return sku
}//if
},//fun

uni:function(req){
if(req.query){
uni=req.query.rset
return uni
}//if
},//fun

sar:function(req){
if(req.session){
sess=req.session
    sar=sess.sar
return sar
}//if
}//fun

}
module.exports=gsku

