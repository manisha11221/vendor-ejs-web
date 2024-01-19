const express = require('express');

const {indexView,adminLogin} = require('../controllers/homeEjsController');
const router = express.Router();


router.get('/dashboard', indexView);
router.get('/admin-login', adminLogin);


module.exports = {
    routes: router
}