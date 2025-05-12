const express = require('express');
const { register, login,logout,profile } = require('../controllers/auth.controllers');
const { authMiddleware } = require('../middleware/auth.middleware');

const { checkRole } = require('../middleware/role.middleware');
// auth.routes.js
const { deleteUser } = require('../controllers/auth.controllers');  // Adjust the path if necessary

const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.get('/me',authMiddleware,profile)
router.delete('/admin/delete-user/:id', authMiddleware, checkRole(['admin']), deleteUser);


module.exports = router