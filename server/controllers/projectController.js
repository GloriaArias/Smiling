import log from '../config/winston';
// Importando el modelo Project
import ProjectModel from '../models/ProjectModel';

/* Actions Methods */

// Citas Pendientes
// GET /projects | GET /projects/index
const index = async (req, res) => {
  // 1 Pedirle a la base de datos
  // que me de todos lo proyectos que tiene
  // db.projects.find()
  try {
    log.info('Listando las citas pendientes ... ⌛');
    const projectsDocs = await ProjectModel.find();
    log.info('Citas cargadas con éxito ... 🎉');
    res.json(projectsDocs);
  } catch (error) {
    log.error(`💥 Error al mostrar las citas pendientes: ${error.message}`);
    res.status(500).json(error);
  }
};

// Agendar una cita
// GET /projects/add
const add = (req, res) => {
  res.render('projects/addProjectView', {});
  // TODO: Agregar codigo para agendar una cita
};

// Procesa el formulario que Agenda una cita
// POST /projects/add
const addPost = async (req, res) => {
  // Desestructurando la informacion
  // del formulario o de un posible error
  const { errorData, validData } = req;
  // Crear view models para este actio method
  let project = {};
  let errorModel = {};
  // Verifico si hay error de validacion
  if (errorData) {
    log.error('💥 Se retorna objeto de error de validacion 💥');
    // Rescantado los datos del formulario
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
    return res.render('projects/addProjectView', { project, errorModel });
  }
  log.info('✅ Se retorna objeto valido');
  // Crear un documento con los datos provistos
  // por el formulario y guardar dicho documento
  // en projectModel
  const projectModel = new ProjectModel(validData);
  // Siempre que se ejecuta una operacion
  // que depende de un tercero, es una buena practica
  // envolver esa operacion en un bloque try
  try {
    // Se salva el documento projecto
    log.info('Se salva objeto Projecto..⌛');
    // Se salva el documento projecto
    project = await projectModel.save();
    log.info('🎉 Cita guardada con exito 🎉');
    // Redireccionando al recurso que lista los proyectos
    // GET /projects
    return res.redirect('/projects');
  } catch (error) {
    log.error(`Ha fallado el intento de salvar una cita:${error.message}`);
    return res.status(500).json({ error });
  }
};

// Exportando el controlador
export default {
  index,
  add,
  addPost,
};
