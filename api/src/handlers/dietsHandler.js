const {
    createDiets
} = require('../controllers/dietsControllers')

const getDietsHandler = async (req, res) =>{
    try {
      const traerDiets = await createDiets()
      res.status(200).json(traerDiets)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }


  module.exports = {
    getDietsHandler
  }