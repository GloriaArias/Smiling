// Usando el patron Factory para la creación
// de un middleware de validacion
const Validator =
  ({ shape, getObject }) =>
  async (req, res, next) => {
    // 1.Construir un objeto a validar
    const dataObject = getObject(req);
    // 2.Se realiza el proceso de validación
    try {
      // 2.1.Se valida el objeto con el shape
      // validate acepta 2 argumentos
      // arg1: Objeto a validar
      // arg2: Opciones de validacion
      const validData = await shape.validate(dataObject, {
        abortEarly: false,
      });
      // Incrustar el objeto valido en la petición
      req.validData = validData;
    } catch (error) {
      // Crear un objeto que reporta el error
      req.errorData = error;
    }
    // 3.Continuamos la cadena de middlewares
    return next();
  };

// Exportando Factory de validación
export default Validator;
