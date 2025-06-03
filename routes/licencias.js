import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import licenciasController from '../controllers/licenciasController.js'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})

const upload = multer({ storage })

router.post('/', upload.single('archivo'), licenciasController.procesarLicencia)
router.get('/ultima', licenciasController.obtenerUltimaLicencia)
router.get('/', licenciasController.obtenerLicencias)
router.delete('/:id', licenciasController.eliminarLicencia)

export default router