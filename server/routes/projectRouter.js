// Importando el Router de Express
import { Router } from 'express';

// Importar el controlador de proyectos
import projectController from '../controllers/projectController';

// Crear la instancia del Router
const router = new Router();

/* ------ GET ------ */
// Citas Pendientes
// GET /projects | GET /projects/index
router.get(['/', '/index'], projectController.index);

// Agendando una cita
// GET /projects/add
router.get('/add', projectController.add);

// Exportando el enrutador Projects
export default router;
