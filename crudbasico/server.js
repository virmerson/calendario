const express = require('express'); //importa
const bodyParser = require ('body-parser');
const app= express(); //instancia
const MongoClient = require('mongodb').MongoClient;


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
    
    var cursor = db.collection('quotes').find().toArray(function (err,result){
        if(err) return console.log(err);
            res.render('index', {quotes:result});
         // res.send(result);
        
    });
    
  
    
    //console.log(__dirname);
    //res.sendFile(__dirname+ '/index.html');
});


//POST - localhost:3000/quotes
app.post('/quotes', (req, res) => {
 db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
    });
});

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate(
    {name: 'Yoda'}, 

    {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
    }, 
    {
        sort: {_id: -1},
        upsert: true
    },
    
    (err, result) => {
        if (err) 
            return res.send(err)
        console.log(result)
        res.send(result)
    })
})


app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name}, 
  (err, result) => {
    if (err) return res.send(500, err)
    res.send('A darth vadar quote got deleted')
  })
})




console.log("May Node be with you!");