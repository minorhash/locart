var adb = require('usrdb');
var cred = {

ema: function(req) {
if (req.body) {
email = req.body.email;
    //mailusr = adb.mailUsr(email)
return email;
} else {
    email= null;
    //email="successful.payment@paidy.com"
        return email
console.log('no sess');    }
}
};

module.exports = cred;
