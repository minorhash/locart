var express = require('express');
var router = express.Router();

router.get('/mail', function(req, res, next) {
  res.render('mail', { title: 'mail' });
});

module.exports = router;
