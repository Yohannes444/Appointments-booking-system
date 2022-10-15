var mysql =require('mysql');
var express = require ('express');
var cookie = require ('cookie-parser');
var db = require.main.require ('./models/db_controller');
const sweetalert=require("sweetalert2")

var router = express.Router();


router.get('/',function(req,res){
 
    res.render ('complain.ejs');
});

router.post('/',function(req,res){

    var message = req.body.message;
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;

    db.postcomplain(message,name,email,subject,function(err,result){
        sweetalert.fire('your complain have been send ');
    
        res.redirect('/');
        
    });

});




module.exports = router;