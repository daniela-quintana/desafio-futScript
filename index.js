const express = require('express')
const jwt = require('jsonwebtoken')
const { secretKey } = require('./utils')
const { obtenerJugadores, registrarJugador } = require('./controllers/jugadores')
const { obtenerEquipos, agregarEquipo } = require('./controllers/equipos')

const app = express()
app.use(express.json())

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token no proporcionado' })
  try {
    jwt.verify(token, secretKey)
    next()
  } catch {
    res.status(401).json({ message: 'Token inválido' })
  }
}

app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username !== 'admin' || password !== '1234') {
    return res.status(400).json({ message: 'Credenciales incorrectas' })
  }
  const token = jwt.sign({ username }, secretKey)
  res.json({ token })
})

app.get('/equipos', obtenerEquipos)
app.post('/equipos', verificarToken, agregarEquipo)

app.get('/equipos/:teamID/jugadores', obtenerJugadores)
app.post('/equipos/:teamID/jugadores', verificarToken, registrarJugador)

module.exports = app

app.listen(3000, () => console.log('SERVER ON'))