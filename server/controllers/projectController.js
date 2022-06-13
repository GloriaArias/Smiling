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
  // Desestructurando la informacion
  // del formulario
  const { name, service, date } = req.body;
  // Regresar un objeto con los datos
  // obtenidos del formulario
  res.status(200).json({ name, service, date });
};

// Exportando el controlador
export default {
  index,
  add,
  addPost,
};
