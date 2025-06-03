import path from 'path'
import Licencia from '../models/Licencia.js'

const procesarLicencia = async (req, res) => {
  try {
    const { apellido, nombre, motivo, desde, hasta } = req.body
    const archivo = req.file

    if (!apellido || !nombre) {
      return res.status(400).json({ error: 'Apellido y nombre son obligatorios.' })
    }
    const nombreLimpio = nombre.trim()
    const apellidoLimpio = apellido.trim()

    const nombreRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ \-']+$/
    if (!nombreRegex.test(nombreLimpio) || !nombreRegex.test(apellidoLimpio)) {
      return res.status(400).json({ error: 'Nombre o apellido inválido. Solo se permiten letras y espacios.' })
    }

    const motivosValidos = ['Licencia médica', 'Licencia familiar', 'Causas particulares']
    if (!motivo || !motivosValidos.includes(motivo)) {
      return res.status(400).json({ error: 'Motivo de licencia inválido.' })
    }

    if (!desde || !hasta) {
      return res.status(400).json({ error: 'Las fechas desde y hasta son obligatorias.' })
    }

    const fechaDesde = new Date(desde)
    const fechaHasta = new Date(hasta)

    if (isNaN(fechaDesde.getTime()) || isNaN(fechaHasta.getTime())) {
      return res.status(400).json({ error: 'Fechas inválidas.' })
    }

    if (fechaDesde > fechaHasta) {
      return res.status(400).json({ error: 'La fecha de inicio debe ser anterior a la de finalización.' })
    }

    let nombreArchivo = ''
    if (archivo) {
      const tiposPermitidos = ['.pdf', '.jpg', '.jpeg', '.png']
      const extension = path.extname(archivo.originalname).toLowerCase()

      if (!tiposPermitidos.includes(extension)) {
        return res.status(400).json({ error: 'Tipo de archivo no permitido.' })
      }

      const maxSize = 5 * 1024 * 1024 
      if (archivo.size > maxSize) {
        return res.status(400).json({ error: 'El archivo excede el tamaño permitido (5MB).' })
      }

      nombreArchivo = archivo.filename 
    }

    console.log('Guardando licencia para:', apellido, nombre, motivo, desde, hasta)

    const nuevaLicencia = new Licencia({
      apellido,
      nombre,
      motivo,
      desde: fechaDesde,
      hasta: fechaHasta,
      archivo: nombreArchivo
    })

    const licenciaGuardada = await nuevaLicencia.save()

    console.log('Licencia guardada con ID:', licenciaGuardada._id)

    if (!licenciaGuardada || !licenciaGuardada._id) {
      return res.status(500).json({ error: 'No se pudo guardar la licencia en la base de datos.' })
    }

    return res.status(200).json({ mensaje: 'Solicitud registrada correctamente.', licencia: licenciaGuardada })

  } catch (error) {
    console.error('Error en procesarLicencia:', error)
    return res.status(500).json({ error: 'Error interno del servidor.' })
  }
}

const obtenerLicencias = async (req, res) => {
  try {
    const licencias = await Licencia.find().sort({ createdAt: -1 })
    res.status(200).json(licencias)
  } catch (error) {
    console.error('Error al obtener licencias:', error)
    res.status(500).json({ error: 'Error al obtener las licencias.' })
  }
}

const obtenerUltimaLicencia = async (req, res) => {
  try {
    const ultima = await Licencia.findOne().sort({ createdAt: -1 })
    if (!ultima) return res.status(404).json({ error: 'No hay licencias registradas.' })
    res.status(200).json(ultima)
  } catch (error) {
    console.error('Error al obtener la última licencia:', error)
    res.status(500).json({ error: 'Error al obtener la última licencia.' })
  }
}

const eliminarLicencia = async (req, res) => {
  try {
    const { id } = req.params
    const licenciaEliminada = await Licencia.findByIdAndDelete(id)

    if (!licenciaEliminada) {
      return res.status(404).json({ error: 'Licencia no encontrada.' })
    }

    res.status(200).json({ mensaje: 'Licencia eliminada correctamente.' })
  } catch (error) {
    console.error('Error al eliminar licencia:', error)
    res.status(500).json({ error: 'Error al eliminar la licencia.' })
  }
}

export default {
  procesarLicencia,
  obtenerLicencias,
  obtenerUltimaLicencia,
  eliminarLicencia
}