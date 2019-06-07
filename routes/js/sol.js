var sku
var sol={
sol:function(req){
if(req.query){
sku=req.query.rsku
return sku
}//if
}//fun
}
module.exports=sol

