// 1. Importaremos la biblioteca de validación
import * as Yup from 'yup';

// 2. Crear el esquema de validación
const citasSchema = Yup.object().shape({
  name: Yup.string().required('Se requiere un nombre para el proyecto'),
  description: Yup.string()
    .max(500, 'La descripción está limitada a 500 caracteres')
    .required('Se requiere una descripción para el proyecto'),
});

// 3. Creammos el middleware de validación
const getProject = (req) => {
  // Extraemos la info del formulario
  const { name, description } = req.body;
  // Armar un objeto con los datos del proyecto
  return {
    name,
    description,
  };
};

export default { citasSchema, getProject };
