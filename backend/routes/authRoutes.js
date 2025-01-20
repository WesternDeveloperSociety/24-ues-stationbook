const express = require('express');

const {test, register, login, returnAccess, verifyJWT} = require('../controllers/auth')

const router = express.Router();

router.post('/test', test);

router.post('/register', register);

router.post('/login', login);

router.post('/returnAccessToken', returnAccess);

router.post('/isUserAuth', verifyJWT);

module.exports = router;