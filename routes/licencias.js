import express from 'express'
const router = express.Router()
import multer from 'multer'
import Licencia from '../models/Licencia.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

router.post('/', upload.single('archivo'), async (req, res) => {
  try {
    const { apellido, nombre, motivo, desde, hasta } = req.body
    const nuevaLicencia = new Licencia({
      apellido,
      nombre,
      motivo,
      desde,
      hasta,
      archivo: req.file ? req.file.filename : ''
    })

    await nuevaLicencia.save()
    res.status(201).json({ mensaje: 'Licencia guardada con éxito.' })
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar la licencia.' })
  }
})

export default router