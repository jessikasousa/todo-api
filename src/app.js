const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Rotas de autenticação
app.use('/api', authRoutes)

// Rotas de tarefas
app.use('/api/tasks', taskRoutes)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
