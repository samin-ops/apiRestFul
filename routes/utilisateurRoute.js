
const express = require('express');
const router  = express.Router();
const { ajouterUtilisateur, 
    avoirToulesUtilisateurs, 
    avoirUnUtilisateur, 
    modifierUnUtilisateur, 
    supprimerUnUtilisateur  
} = require('../controllers/utilisateurController');


router.route('/utilisateurs').post(ajouterUtilisateur);
router.route('/utilisateurs').get(avoirToulesUtilisateurs);
router.route('/utilisateurs/:id').get(avoirUnUtilisateur);
router.route('/utilisateurs/:id').put(modifierUnUtilisateur);
router.route('/utilisateurs/:id').delete(supprimerUnUtilisateur);

module.exports = router;