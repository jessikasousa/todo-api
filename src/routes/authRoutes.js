const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const pool = require('../db')

const router = express.Router()

// Registro de Usuário
router.post('/register', async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8)

  try {
    const [rows] = await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
      req.body.name,
      req.body.email,
      hashedPassword
    ])
    const token = jwt.sign({ id: rows.insertId }, 'secret-key', {
      expiresIn: 86400 // expira em 24 horas
    })
    res.status(200).send({ auth: true, token: token })
  } catch (err) {
    res.status(500).send('There was a problem registering the user.')
  }
})

// Login de Usuário
router.post('/login', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [req.body.email])

    if (rows.length === 0) return res.status(404).send('No user found.')

    const passwordIsValid = bcrypt.compareSync(req.body.password, rows[0].password)
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })

    const token = jwt.sign({ id: rows[0].id }, 'secret-key', {
      expiresIn: 86400 // expira em 24 horas
    })

    res.status(200).send({ auth: true, token: token })
  } catch (err) {
    res.status(500).send('Error on the server.')
  }
})

module.exports = router
