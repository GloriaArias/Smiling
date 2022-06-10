// Importamos Express
var express = require('express');
// Importamos el enrutador de Express
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  //render manda a renderizar (generar y entregar)
  res.render(
    'about',
    // Este es el View_Model

    {
      name: 'Gloria Arias Utrera',
      email: 'ariasutreragloria@gmail.com',
      url: 'www.itgam.com/gloria.arias',
    }
  );
});

module.exports = router;
