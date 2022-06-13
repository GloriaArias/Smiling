import log from '../config/winston';
/* Actions Methods */

// Citas Pendientes
// GET /projects | GET /projects/index
const index = (req, res) => {
  res.send('Citas Pendientes 📅');
  // TODO: Agregar codigo de citas pendientes
};

// Agendar una cita
// GET /projects/add
const add = (req, res) => {
  res.render('projects/addProjectView', {});
  // TODO: Agregar codigo para agendar una cita
};

// Procesa el formulario que Agenda una cita
// POST /projects/add
const addPost = (req, res) => {
  const { errorData } = req;
  // Crear view models para este actio method
  let project = {};
  let errorModel = {};
  if (errorData) {
    log.info('Se retorna objeto de error de validacion');
    // Rescantado el objeto validado
    project = errorData.value;
    // Usamos reduce para generar un objeto
    // de errores a partir de inner
    errorModel = errorData.inner.reduce((prev, curr) => {
      // Creamos una vaiabre temporal para evitar
      // el error "no-param-reassign" el cual me
      // exorta a evitar reasignar los valores de
      // los argumentos una funcion
      const newVal = prev;
      newVal[`${curr.path}Error`] = curr.message;
      return newVal;
    }, {});
    // La validacion fallo
    // res.status(200).json(errorData);
  } else {
    log.info('Se retorna objeto valido');
    // Desestructurando la informacion
    // del formulario del objeto valido
    const { validData } = req;
    // Regresar un objeto con los datos
    // obtenidos del formulario
    // res.status(200).json(validData);
    project = validData;
  }
  // Respondemos con los viewModels generados
  res.render('projects/addProjectView', { project, errorModel });
  // res.status(200).json({ project, errorModel });
};

// Exportando el controlador
export default {
  index,
  add,
  addPost,
};
