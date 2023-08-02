const { Op } = require("sequelize");
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY, URL } = process.env;

const createDiets = async () => {
  //Traigo los datos de la api externa
  
  recetasFromApi = (
    await axios.get(
      `${URL}/complexSearch?apiKey=${API_KEY}&number=18&addRecipeInformation=true`
    )
  ).data.results;
  //Mapeo la propiedad diets y la guardo en un array
  
  const diet = recetasFromApi.map((element) => element.diets);
  //Itero sobre ese array usando un forEach, si no encuentro nada devuelvo un error
  diet.forEach((element) => {
    if (!element) {
      throw new Error("No se han encontrado dietas");
    } else {
  //Vuelvo a iterar ya que con el map hice un arrays de arrays, extrayendo
  //la dieta y luego la cargo en la base de datos
      element.forEach((dietas) => {
        Diet.findOrCreate({ 
          where: {
            diets: dietas.trim(),
          },
         
        });
      });
    }
  });
  // Finalmente, obtengo todas las dietas de la base de datos y las retorno.
  const allDiets = await Diet.findAll();
  return allDiets;
};
// const createDiets = async () => {
//     const response = await axios.get(
//       `${URL}/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`
//     );
//     const recetasFromApi = response.data.results;

//     for (const element of recetasFromApi) {
//       if (element.diets) {
//         const dietsArray = element.diets.split(",");
//         for (const diet of dietsArray) {
//           const trimmedDiet = diet.trim();
//           await Diet.create({
//             name: trimmedDiet,
//           });
//         }
//       }
//     }

//     const allDiets = await Diet.findAll();
//     return allDiets;
//   };

module.exports = {
  createDiets,
};
