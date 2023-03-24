
const express = require('express');
const { connect } = require('./db/connect');
const routeUtilisateurs = require('./routes/utilisateurRoute');


const app = express();
const port = 3000;

// Les middlewares
app.use(express.urlencoded({extended: true})) 
app.use(express.json());


app.use('/api/v1', routeUtilisateurs); // 

app.get('/',(_req, res)=>{
    res.send('Le serveur tourne bien !');
})

connect("mongodb://127.0.0.1:27017/",(err)=>{
    if(!err){
        console.log("Connection a la base de donnees etablie.");
    }else{
        console.log("La connection a la base de donnees a echoue !");
        process.exit(-1);
    }
});

app.listen(port, ()=>{
    console.log(`Le server a bien demarrer au port:${port}`);
})



