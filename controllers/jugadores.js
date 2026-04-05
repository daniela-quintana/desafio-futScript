const { getPlayers, addPlayer } = require('../db/consultas')

const obtenerJugadores = async (req, res) => {
    try {
        const { teamID } = req.params
        const jugadores = await getPlayers(teamID)
        res.json(jugadores)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const registrarJugador = async (req, res) => {
    try {
        const { teamID } = req.params
        const jugador = req.body
        await addPlayer({ jugador, teamID })
        res.status(201).json({ message: "Jugador agregado con éxito" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { obtenerJugadores, registrarJugador }