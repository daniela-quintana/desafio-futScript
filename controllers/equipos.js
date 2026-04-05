const { getTeams, addTeam } = require('../db/consultas')

const obtenerEquipos = async (req, res) => {
    try {
        const equipos = await getTeams()
        res.json(equipos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const agregarEquipo = async (req, res) => {
    try {
        const equipo = req.body
        await addTeam(equipo)
        res.status(201).json({ message: "Equipo agregado con éxito" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { obtenerEquipos, agregarEquipo }