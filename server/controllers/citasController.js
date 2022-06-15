import log from '../config/winston';

// Importando el modelo Project
import CitasModel from '../models/CitasModel';

/* Action Methods */
// Lista las citas
// GET /projects | GET /projects/index
const index = async (req, res) => {
  // 1.Pedirle a la base de datos
  // que me dé todas las citas que tiene
  // db.projects.find*()
  try {
    log.info('Listando citas ... ⌛');
    // Para obtener las vistas en hbs vamos a renderizar las mismas, cambiamos el res.json
    // por render y lo siguiente será convertir nuestra constante en un arreglo {citasDocs}
    // En este caso estamos usando un método de fábrica de mongoose para que nos ayude a obtener la lista
    const citasDocs = await CitasModel.find().lean().exec();
    log.info('Citas Listadas con éxito ... 🎉');
    res.render('projects/listView', { citasDocs });
  } catch (error) {
    log.error(`💥 Error al listar las citas: ${error.message}`);
    res.status(500).json(error);
  }
};

// Agenda citas
// GET /projects/add
const add = (req, res) => {
  res.render('projects/addCitasView', { add });
};

const service = (req, res) => {
  res.render('projects/serviceView', {});
};

const list = (req, res) => {
  res.render('projects/listView', {});
};

// Procesa el formulario que Agenda las Citas
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
    return res.render('projects/addCitasView', { project, errorModel });
  }
  log.info('Se retorna objeto Citas valido');
  // Crear un documento con los datos provistos
  // por el formulario y guardar dicho documento
  // en citasModel
  log.info('Se salva objeto Citas');
  const citasModel = new CitasModel(validData);
  // Siempre que se ejecuta una operacion
  // que depende de un tercero, es una buena practica
  // envolver esa operacion en un bloque try
  try {
    log.info('Salvando las Citas... ⌛');
    // Se salva el documento project
    project = await citasModel.save();
    log.info('🎉 Citas salvadas con éxito 🎉');
    // Redireccionando al recurso que lista los proyectos
    // GET /projects
    return res.redirect('/projects');
  } catch (error) {
    log.error(`Ha fallado el intento de salvar una cita: ${error.message}`);
    return res.status(500).json({ error });
  }
};

// Exportando el controlador
export default {
  index,
  add,
  addPost,
  service,
  list,
};
