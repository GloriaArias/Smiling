// 1 Importaremos la biblioteca de validación
import * as Yup from 'yup';

// 2 Crear el esquema de validación
const projectSchema = Yup.object().shape({
  name: Yup.string().required('Se requiere el nombre del paciente'),
  service: Yup.string()
    .max(500, 'El nombre del servicio esta limitada a 200 caracteres')
    .required('Se requiere el nombre del servicio'),
  date: Yup.string().required('Debe seleccionar la fecha de su servicio'),
});

// 3 Creamos el middleware de validacion
const getProject = (req) => {
  // Extraemos la info del formualrio
  const { name, service, date } = req.body;
  // Armar un objeto con los datos del proyecto
  return {
    name,
    service,
    date,
  };
};

export { projectSchema, getProject };
