const express=require('express');
const router=express.Router()
var db = require.main.require ('./models/db_controller');
var bodyPaser = require ('body-parser');

router.get('/',(req,res)=>{
    db.getcomplain((err,result)=>{
        res.render('Mview.ejs',{list :result})
    })
   
})



module.exports = router;