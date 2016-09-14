const express = require('express'); //importa
const bodyParser = require ('body-parser');
const app= express(); //instancia

var mongoose = require('mongoose');
mongoose.connect('mongodb://crud-virmerson:mongo2016@ds019996.mlab.com:19996/crud-virmerson');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (err, database) => {
  
    if (err) return console.log(err);
        
    db = database;
  
    //Só libera o serviço quando a conexão estiver estabelecida
    app.listen (3000,function (){
       //console.log('listening 3000'); 
    });
  
    
});

// Schema  Definitions
var Schema=mongoose.Schema;

var clientSchema=new Schema({
    name:String,
    email:String
});

var Client = mongoose.model('Client', clientSchema);


//Sets
app.set('view engine', 'ejs');
app.use(express.static('public'));
//Ler requests em Json
app.use(bodyParser.json());


//Plugando o Body Parser ao Express com um middleware (mediador)
app.use(bodyParser.urlencoded({extend:true}));


//ES6
//GET - localhost:3000/
app.get('/',  (req, res)=>{
    res.render('index');
});



app.get('/clients', (req, res)=>{
    
    mongoose.model('Client').find(function (err,result){
        if(err) return console.log(err);
       
        res.send(result);
    });

});

app.get ('/clients/:id', (req,res)=>{
         
         mongoose.model('Client').find({_id:req.params.id}, function (err,result){
            res.send(result);
        });
});



//POST - localhost:3000/clients
app.post('/clients', (req, res) => {
  var cli=  new Client(req.body)
  cli.save(function (err, result){
      console.log("A new register got created." + req.body)
      res.send(result)  
  })
   
//delete req.body._id; //Workaround
/*  db.collection('clients').save(req.body, (err, result) => {
    if (err) return console.log(err)
         res.send(req.body);
        console.log("A new register got created." + req.body);
    }); */
});

app.put('/clients', (req, res) => {
 
    var cli=  new Client(req.body)
    cli.update(function (err, result){
      console.log("A new register got created." + req.body)
      res.send(result)  
    })

    
});

app.delete('/clients/:id', (req, res) => {
   
    /*   db.collection('clients').remove({"_id": ObjectId(req.params.id)}
       
        , function (err, result) {
            if (err) 
                return res.send(500, err)
            console.log('A register got deleted')
             res.send(result)
    });
    */
    
})

console.log("May Node be with you!");