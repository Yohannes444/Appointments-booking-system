var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require ('multer');
var fs = require ('fs');
var path = require ('path');


var db = require.main.require ('./models/db_controller');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});



var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "public/assets/images/upload_images");
    },
    filename: function(req, file, cb) {
      console.log(file); 
      cb(null, file.originalname); 
    }
  });

  var upload = multer({ storage: storage });


router.get('/',function(req,res){

    db.getAllDoc(function(err,result){
        if(err)
        throw err;
        res.render('doctors.ejs',{list : result})
    });
    
});

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/add_doctor',function(req,res){
    db.getalldept(function(err,result){
        res.render('add_doctor.ejs',{list:result});
    });

    
});

router.post('/add_doctor',upload.single("image"),function(req,res){
var first_name =  req.body.first_name;
var last_name =   req.body.last_name;
var email =   req.body.email;
var dob =  req.body.dob;
var gender =    req.body.gender;
var address =    req.body.address;
var phone =   req.body.phone;
var filename =    req.file.filename;
var department =    req.body.department;
var biography  =  req.body.biography;
        db.add_doctor(first_name,last_name,email,dob,gender,address,phone,filename,department,biography,function(err,result){
        console.log('1 doctor inserted');
        res.redirect('/doc2');
        });
    });

    router.get('/edit_doctor/:id',function(req,res){
        var id = req.params.id;

        db.getDocbyId(id,function(err,result){

            
                res.render('edit_doctor.ejs' ,{list : result});
           
            
        });
    });

    router.post('/edit_doctor/:id',function(req,res){
        var id = req.params.id;
        db.editDoc(id,req.body.first_name,req.body.last_name,req.body.email,req.body.dob,req.body.gender,req.body.address,req.body.phone,req.body.image,req.body.department,req.body.biography,function(err,result){
            if (err) throw err;
            
            //res.render('edit_doctor.ejs',{list:result});
        res.redirect('/doc2');
         
        
            
        });
});

router.get('/delete_doctor/:id',function(req,res){
    var id = req.params.id;
    db.getDocbyId(id,function(err,result){
        res.render('delete_doctor.ejs',{list:result})
    });

    
});

router.post('/delete_doctor/:id',function(req,res){
    var id = req.params.id;
    db.deleteDoc(id,function(err,result){

        res.redirect('/doc2');
    });
});


    router.get('/',function(req,res){

        db.getAllDoc(function(err,result){
            if(err)
            throw err;
            res.render('doctors.ejs',{list : result})
        });
        
    });


    router.post('/search',function(req,res){
        var key = req.body.search;
        db.searchDoc(key,function(err,result){
            console.log(result);
            
            res.render('doctors.ejs',{list : result});
        });
    });

module.exports = router;