// URL: Get /
const index = (req, res) => {
  // Calculando emojie
  const emojieDataset = [
    '💻',
    '👨‍💻',
    '🎈',
    '🎄',
    '🦺',
    '🎢',
    '🎁',
    '🚆',
    '🌍',
    '♥',
  ];
  const emojie =
    emojieDataset[Math.floor(Math.random() * emojieDataset.length)];
  // View-Models
  const viewModel = {
    title: 'Index Controller Working!!!',
    author: 'Gloria Arias',
    emojie,
  };
  res.render('home/indexView', viewModel);
};

// URL: Get /about
const about = (req, res) => {
  res.render('home/aboutView', {
    name: 'Dra. Gloria Arias',
    email: 'gloriaAriasU.dentalSmiling.com.mx',
    url: 'https://github.com/GloriaArias/Smiling/',
    description:
      'Smiling es una clínica que se preocupa por tu salud bucal, por ello hemos creado un espacio en el cuál podrás consultar servicios, revisar costos y agendar una cita desde tu hogar',
    version: '0.0.alpha',
  });
};

export default {
  // Action Methods
  index,
  about,
};
