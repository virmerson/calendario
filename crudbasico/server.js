const express = require('express'); //importa
const bodyParser = require ('body-parser');
const app= express(); //instancia
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

//Sets
app.set('view engine', 'ejs');
app.use(express.static('public'));
//Ler requests em Json
app.use(bodyParser.json());

var db;

MongoClient.connect('mongodb://crud-virmerson:mongo2016@ds019996.mlab.com:19996/crud-virmerson', (err, database) => {
  
    if (err) return console.log(err);
        
    db = database;
  
    //Só libera o serviço quando a conexão estiver estabelecida
    app.listen (3000,function (){
       //console.log('listening 3000'); 
    });
  
    
});



//Plugando o Body Parser ao Express com um middleware (mediador)
app.use(bodyParser.urlencoded({extend:true}));


//ES6
//GET - localhost:3000/
app.get('/',  (req, res)=>{
    res.render('index');
});


app.get('/quotes',  (req, res)=>{
    
     var cursor = db.collection('quotes').find().toArray(function (err,result){
        if(err) return console.log(err);
       
        res.send(result);
    });

});

//POST - localhost:3000/quotes
app.post('/quotes', (req, res) => {
delete req.body.id;
 db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
         res.send(req.body);
        console.log("A new register got created." + req.body);
    });
});

app.put('/quotes', (req, res) => {
 
 db.collection('quotes')
    .findOneAndUpdate({'_id':ObjectId(req.body._id)},
    {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
    }, 
    {
        
        sort: {_id: -1},
        returnOriginal:false
    }
    , (err, result) => {
        if (err) 
            return res.send(err)
        console.log("A register got updated." + result)
        res.send(result.value)
    })
    
})


app.delete('/quotes/:id', (req, res) => {
   
    db.collection('quotes').remove({"_id": ObjectId(req.params.id)}
       
        , function (err, result) {
            if (err) 
                return res.send(500, err)
            console.log('A register got deleted')
             res.send(result)
    });
    
})

console.log("May Node be with you!");