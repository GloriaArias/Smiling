// 1 ODM - Mongoose
import mongoose from 'mongoose';

// 2 Desestructura el modulo
// de Schemas de Mongoose
const { Schema } = mongoose;

// 3 Creamos el Schema
const CitasSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  dateofservice: {
    type: Date,
    default: Date.now,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

// Generar el Modelo a partir de un Schema
// Compilar el modelo
export default mongoose.model('project', CitasSchema);
