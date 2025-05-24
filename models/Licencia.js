import mongoose from "mongoose"

const licenciaSchema = new mongoose.Schema({
  apellido: String,
  nombre: String,
  motivo: String,
  archivo: String,
  desde: Date,
  hasta: Date,
}, { timestamps: true })

const Licencia = mongoose.model('Licencia', licenciaSchema)
export default Licencia