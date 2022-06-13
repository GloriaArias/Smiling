/* Actions Methods */

// Citas Pendientes
// GET /projects | GET /projects/index
const index = (req, res) => {
  res.send('Citas Pendientes 🚧');
  // TODO: Agregar codigo de listado de proyectos
};

// Agendar Cita
// GET /projects/add
const add = (req, res) => {
  res.send('Agendar Cita 🚧');
  // TODO: Agregar codigo para agregar proyectos
};

// Exportando el controlador
export default {
  index,
  add,
};
