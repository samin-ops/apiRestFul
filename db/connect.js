const { MongoClient, Db } = require("mongodb"); // 

// Data base connect
let client = null;

// creation de l'url
function connect(url, callback){
    if(client===null){
        client = new MongoClient(url);
        client.connect((err)=>{
            if(err){
                client=null;
                callback(err);
            }else{
                callback();
            }
        });
    }else{
        callback();
    }
}
// creation de la base de donnees
function db(){
    let db = new Db(client, "api_mongodb"); // le client et le nom de la base de donnees
    return db;
}
// fermeture du client cree.
function fermer(){
    if(client){
        client.close();
        client=null
    }
}

module.exports = {connect, client, db, fermer }