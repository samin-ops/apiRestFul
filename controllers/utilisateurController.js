const { ObjectId } = require("mongodb");
const {Utilisateur}  = require("../Models/utilisateur"); 
const client = require('../db/connect');


const ajouterUtilisateur = async (req, res)=>{
    try {
        let utilisateur = new Utilisateur( 
            req.body.noms,
            req.body.addresse,
            req.body.telephone
        );
        let result = await client.db().collection("utilisateurs").insertOne(utilisateur);// utilisateurs: la table
        
        res.status(200).json({msg:"L'utilisateur a bien ete enregistre" ,result}) ;
    }catch(error){
        console.log(error);
        res.status(501).json(error);
    }
}
const avoirToulesUtilisateurs = async (_req, res)=>{
    try{
        let cursor = client.db().collection("utilisateurs").find();
        let result = await cursor.toArray();
        if(result.length>0){
            res.status(200).json(result);
        }else{
            res.status(204).json({msg:"Aucune donnees trouver !"})
        }
    }catch (error){
        console.log(error);
        res.status(501).json(error);

    }
}

const avoirUnUtilisateur = async (req, res)=>{
    try{
        let id = new ObjectId(req.params.id)
        let cursor = client.db().collection("utilisateurs").find({_id: id});
        let result = await cursor.toArray();
        if(result.length>0){
            res.status(200).json(result[0]);
        }else{
            res.status(204).json({msg:"Ce utilisateur nexiste pas !"})
        }
    }catch (error){
        console.log(error);
        res.status(501).json(error);

    }
}

const modifierUnUtilisateur = async(req, res)=>{
    try {
    let id = new ObjectId(req.params.id);
    let noms = req.body.noms;
    let addresse = req.body.addresse;
    let telephone = req.body.telephone;
    let result = await client
    .db()
    .collection("utilisateurs")
    .updateOne({_id:id}, {$set:{noms, addresse, telephone}});

    if(result.matchedCount == 1){
        res.status(200).json({msg: "Utilisateur modifie avec success !"});
    }else{
        res.status(404).json({msg: "Cet utilisateur n'existe pas !"});
    }
        
    } catch (error) {
        console.log(error);
        res.status(501).json(error);   
    }
}

const supprimerUnUtilisateur = async(req, res)=>{
    try {
    let id = new ObjectId(req.params.id);
    let result = await client
    .db()
    .collection("utilisateurs")
    .deleteOne(
        {_id:id});
    if(result.deletedCount == 1){
        res.status(200).json({msg: "Utilisateur supprime avec success !"});
    }else{
        res.status(404).json({msg: "Cet utilisateur n'existe pas !"});
    }   
    } catch (error) {
        console.log(error);
        res.status(501).json(error);   
    }
}

module.exports = { 
    ajouterUtilisateur, 
    avoirToulesUtilisateurs, 
    avoirUnUtilisateur, 
    modifierUnUtilisateur,
    supprimerUnUtilisateur
 };