var adb = require('usrdb');
var cred = {

ema: function(req) {
if (req.body) {
email = req.body.email;
mailusr = adb.mailUsr(email)
return mailusr;
} else {
    mailusr = null;
    //email="successful.payment@paidy.com"
    return mailusr
    console.log('no req');    }
}
};

module.exports = cred;
