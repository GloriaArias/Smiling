import log from '../config/winston';

// Importando el modelo Project
import ProjectModel from '../models/ProjectModel';

/* Action Methods */
// Lista los proyectos
// GET /projects | GET /projects/index
const index = async (req, res) => {
  // 1.Pedirle a la base de datos
  // que me dé todos los proyectos que tiene
  // db.projects.find*()
  try {
    log.info('Listando proyectos ... ⌛');
    const projectsDocs = await ProjectModel.find();
    log.info('Proyectos listados con éxito ... 🎉');
    res.json(projectsDocs);
  } catch (error) {
    log.error(`💥 Error al listar proyectos: ${error.message}`);
    res.status(500).json(error);
  }
};

// Agrega ideas de proyectos
// GET /projects/add
const add = (req, res) => {
  res.render('projects/addProjectView', {});
};

// Procesa el formulario que Agrega ideas de Proyectos
// POST /projects/add
const addPost = async (req, res) => {
  // Desestructurando la información del formulario o de un posible error
  const { errorData, validData } = req;

  // Crar view models para este action mehtod
  let project = {};
  let errorModel = {};

  // Verifico si hay error de validación
  if (errorData) {
    log.error('💥 Se retorna objeto de error de validacion 💥');
    // Rescatando el objeto validado
    project = errorData.value;
    // Usamos un reduce para generar un objeto
    // de errores a partir del inner
    errorModel = errorData.inner.reduce((prev, curr) => {
      // Creamos una variable temporal para evitar
      // el error "no-param-reassign" el cual me
      // exorta a evitar reasignar los valores de los argumentos de una función
      const newVal = prev;
      newVal[`${curr.path}Error`] = curr.message;
      return newVal;
    }, {});

    // Lavalidacion fallo
    return res.render('projects/addProjectView', { project, errorModel });
  }
  log.info('Se retorna objeto Project valido');
  // Crear un documento con los datos provistos
  // por el formulario y guardar dicho documento
  // en projectModel
  log.info('Se salva objeto Project');
  const projectModel = new ProjectModel(validData);
  // Siempre que se ejecuta una operacion
  // que depende de un tercero, es una buena practica
  // envolver esa operacion en un bloque try
  try {
    log.info('Salvando el Proyecto... ⌛');
    // Se salva el documento project
    project = await projectModel.save();
    log.info('🎉 Proyecto salvado con éxito 🎉');
    // Redireccionando al recurso que lista los proyectos
    // GET /projects
    return res.redirect('/projects');
  } catch (error) {
    log.error(`Ha fallado el intento de salvar un proyecto: ${error.message}`);
    return res.status(500).json({ error });
  }
};

// Exportando el controlador
export default {
  index,
  add,
  addPost,
};
