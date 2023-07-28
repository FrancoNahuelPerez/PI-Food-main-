const {Router} = require('express')
const routerDiets = Router()
const {
    getDietsHandler
} = require ('../handlers/dietsHandler')

routerDiets.get('/', getDietsHandler)

module.exports = routerDiets;