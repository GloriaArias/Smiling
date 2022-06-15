// 1. Importaremos la biblioteca de validación
import * as Yup from 'yup';

// 2. Crear el esquema de validación
const citasSchema = Yup.object().shape({
  name: Yup.string().required('Debe ingresar el nombre del paciente'),
  service: Yup.string()
    .max(100, 'El nombre del servicio está limitado a 100 carácteres')
    .required('Debe ingresar el servicio requerido'),
  dateofservice: Yup.date()
    // .min(Yup.ref('startAt'), 'La fecha no debe ser menos a la fecha de entrada')
    .required('Se requiere la fecha de su servicio'),
});

// 3. Creammos el middleware de validación
const getCitas = (req) => {
  // Extraemos la info del formulario
  const { name, service, dateofservice } = req.body;
  // Armar un objeto con los datos del proyecto
  return {
    name,
    service,
    dateofservice,
  };
};

export default { citasSchema, getCitas };
