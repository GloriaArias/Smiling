// Importando el Router de Express
import { Router } from 'express';

// Importar el validador
import Validate from '../validators/validateFactory';
// Importamos el esquema de validación
import citasValidator from '../validators/citasValidator';

// Importar el controlador de proyectos
import citasController from '../controllers/citasController';

// Crear la instancia del Router
const router = new Router();

/* ------ GET ------ */
// Listar proyector
// GET /projects | GET /projects/index
router.get(['/', '/index'], citasController.index);

// Envia el formulario para registrar una idea de proyecto
// get /projects/add
router.get('/add', citasController.add);

/* ------ POST ------ */
// Procesa el formulario que Agrega ideas de proyectos
// POST /projects/add
router.post(
  '/add',
  Validate({
    shape: citasValidator.citasSchema,
    getObject: citasValidator.getProject,
  }),
  citasController.addPost
);

// Exportando el enrutador Projects
export default router;
