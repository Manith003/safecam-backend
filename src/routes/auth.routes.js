const express = require('express');
const Controller = require('../controllers/auth.controller');
const AuthRouter = express.Router();

AuthRouter.post('/register', Controller.registerUser);
AuthRouter.post('/login', Controller.loginUser);
AuthRouter.post('/logout', Controller.logoutUser);
AuthRouter.get('/user', Controller.userController);

module.exports = AuthRouter;