var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n-express');
var sess = require('cookie-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
//app.use(cookieParser());
app.use(logger('dev'));

app.use(
  sess({
    name: 'sess',
    keys: ['key1'],
    maxAge: 24 * 60 * 1000, // 1 hour
  })
);

//app.use('/', shop);
// i18n ======================================
var nat=["","mail","shop","gis","iusr"]

for(let i=0;i<nat.length;i++){
app.use(  i18n({    translationsPath: path.join(__dirname, 'i18n/'+nat[i]),
    siteLangs: ['en', 'ja'],    textsVarName: nat[i]  })
);
}

// route =================================
var arr=["index","gusr","pusr","item","info","cat","gcart","pcart","pay","aid","pal","pid"]
arr.forEach(function(ite){
ite=require('./routes/'+ite)
app.use('/', ite)
})

app.use(function(req, res, next){
res.status(404);

res.format({
html: function () {
res.render('404', { url: req.url })
}
})
});

//error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
