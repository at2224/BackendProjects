import express from 'express'
import db from '../db.js'

const router = express.Router();

// Get all todos for loggin in user
router.get('/', (req, res) => {});

// Create new todo
router.post('/', (req, res) => {});

// update a todo
router.put('/:id', (req, res) => {});

// delete todo
router.delete('/:id', (req, res) => {});

export default router;