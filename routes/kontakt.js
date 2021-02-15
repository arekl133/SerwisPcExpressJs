var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
  res.render('kontakt', {
    title: 'Kontakt'
  });
});

// Send Email//zezwól Allow less secure apps From your Google Account
router.post('/send', function(req, res, next){
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'lewinskiarek@gmail.com',
        pass: 'pass'
      },
    });

    var mailOptions = {
      from: 'lewinskiarek@gmail.com',
      to: 'lewinskiarek@gmail.com',
      subject: 'Hello from PCRepair',
      text: 'Wiadomosc od Name: '+req.body.name+' Email: '+req.body.email+' Message: '+req.body.message,
      html: '<p>You have a submission from...</p> <ul><li>Name: '+req.body.name+'</li><li> Email: '+req.body.email+'</li><li> Message: '+req.body.message+'</li></ul>'
    }

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
      console.log('Message Sent: '+ info.response);
      res.redirect('/');
    });
});

module.exports = router;