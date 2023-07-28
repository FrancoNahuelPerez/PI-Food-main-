const { Router } = require('express');
const routerRecipes = require('./routerRecipes');
const routerDiets = require('./routerDiets')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', routerRecipes)
router.use('/diets', routerDiets)



module.exports = router;
