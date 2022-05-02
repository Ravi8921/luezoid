const express = require('express');
const router = express.Router();

const articleController = require('../controller/articlesController')
const userController= require("../controller/userController")

const subscriptionController= require("../controller/subscriptionController")
//USER ROUTES
router.post("/user/:username",  userController.createUser );
router.get("/userlogin",  userController.Login );



// ARTICLE ROUTES
router.post("/article",articleController.addarticle);
router.get("/article",articleController.getarticlebyId);



//SUBSCRIPTION ROUTES
router.post("/subscription",  subscriptionController.takeSubscription);

module.exports = router;