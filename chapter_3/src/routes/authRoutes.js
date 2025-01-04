import express from 'express'
import bcrypt from 'bcryptjs' // encryption
import jwt from 'jsonwebtoken' // auth so user can sign in
import db from '../db.js'

// when routes are not in server.js file...
const router = express.Router();

router.post('/register', (req, res) => {});  

router.post('/login', (req, res) => {});

export default router;