import express from 'express'
import bcrypt, { hashSync } from 'bcryptjs' // encryption
import jwt from 'jsonwebtoken' // auth so user can sign in
import db from '../db.js'

// when routes are not in server.js file...
const router = express.Router();

// register new user endpoint /auth/register
router.post('/register', (req, res) => {
    const {username, password} = req.body; // stores variable from username key in req.body js object into const username
    console.log(username, password);
    // encrypt password
    const hashedPassowrd = bcrypt.hashSync(password,8);

    // save new userand hashed password to db
    try {
        const insertUser = db.prepare(`
                INSERT INTO users(username, password) VALUES (?, ?)
            `);
        const result = insertUser.run(username, hashedPassowrd);

        // default to do for user
        const defaultTodo = `Hello! Add your first todo!`;
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`);
        insertTodo.run(result.lastInsertRowid, defaultTodo); // use run to not return rows

        // create a token
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'});
        res.json({token});
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }

    res.sendStatus(201);
});  


router.post('/login', (req, res) => {
    // pass is encrypted - encrypt login password and check against encrypted pass in db
    const {username, password} = req.body;

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?');
        const user = getUser.get(username); // use get to return a row

        // if username does not match
        if (!user) {return res.status(404).send({message: "user not found"})}
        
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        // if password does not match
        if (!passwordIsValid) {return res.status(401).send({message: "invalid password"})}

        //successful auth
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'});
        res.json({token});
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }

});

export default router;