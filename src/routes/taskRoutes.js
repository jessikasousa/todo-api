const express = require('express')
const jwt = require('jsonwebtoken')
const pool = require('../db')

const router = express.Router()

// Middleware para verificar token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' })

  jwt.verify(token.split(' ')[1], 'JWT_SECRET', (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })

    req.userId = decoded.id
    next()
  })
}

// Criar nova tarefa
router.post('/', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [
      req.body.title,
      req.body.description
    ])
    res.status(201).json({ id: rows.insertId, ...req.body })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// Obter todas as tarefas
router.get('/', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks')
    res.status(200).json(rows)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// Obter tarefa por ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).send('Task not found')
    res.status(200).json(rows[0])
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// Atualizar tarefa por ID
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const [result] = await pool.query('UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?', [
      req.body.title,
      req.body.description,
      req.body.completed,
      req.params.id
    ])
    if (result.affectedRows === 0) return res.status(404).send('Task not found')
    res.status(200).json({ id: req.params.id, ...req.body })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// Deletar tarefa por ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id])
    if (result.affectedRows === 0) return res.status(404).send('Task not found')
    res.status(200).send('Task deleted')
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router
