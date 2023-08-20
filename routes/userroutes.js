const express = require('express');

const { getAllUser, signup, login , deleteUserById } = require('../controller/usercontroller');


const router = express.Router();

router.get('/',getAllUser);

router.post('/signup',signup);

router.post('/login',login);

router.delete('/delete/:id',deleteUserById);




module.exports = router;