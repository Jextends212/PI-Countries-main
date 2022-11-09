const { Router } = require('express');
const { getCountrys, getCountryById, getCountryByName, postActivity, getCWithActs } = require('../Controllers/mainRoute.controller');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/all",getCountrys);
router.get("/:id", getCountryById);
router.get("/", getCountryByName);
router.post("/activities",postActivity)

//FilterRoutes *******

router.get("/all/activities",getCWithActs);


module.exports = router;
