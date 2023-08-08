const { Op } = require("sequelize");
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY, URL } = process.env;

const cleanA = (recipes) => {
  return recipes.map((recipe) => {
    const diets = recipe.diets
      ? recipe.diets.map((diet) => {
          if (typeof diet === "string") {
            return diet;
          } else {
            return diet.diet;
          }
        })
      : [];

    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      diets: diets,
      healthScore: recipe.healthScore,
    };
  });
};

const getRecipes = async () => {
  const apii = (
    await axios.get(
      `${URL}/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
 ).data.results;
  // console.log("api::::",apii )
  const allRecipeFromDB = await Recipe.findAll({
    include: [
      {
        model: Diet,
        attributes: ["id", "diets"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  const limpiarApi = cleanA(apii);
  const limpiarDb = cleanA(allRecipeFromDB);

  const result = [...limpiarApi, ...limpiarDb];
  return result;
};

const getRecipesById = async (id, source) => {
  let response;
  if (source === "api") {
    response = await axios.get(`${URL}/${id}/information?apiKey=${API_KEY}`);
  } else {
    response = await Recipe.findByPk(id, {
      include: [
        {
          model: Diet,
          attributes: ["id", "diets"],
        },
      ],
    }).then((recipe) => {
      if (!recipe) {
        throw new Error("La receta de ese Id no existe");
      }
  
      const diets = recipe.Diets.map(element => (element.diets));

      const { id, image, title, analyzedInstructions, healthScore, summary } = recipe;
      return {id,image,title,analyzedInstructions,healthScore,summary,diets};   
    });
  }

  if (source === "api") {
    const { id,title,image,healthScore,summary,analyzedInstructions,diets } = response.data;

    return {id, title, image, healthScore, summary, analyzedInstructions, diets };
  } else {
    return response;
  }
};
//


const getRecipesByName = async (title) => {
  const recipesForNameDb = await Recipe.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
      },
    },
    limit: 15,
  });
  const recetazzz = (
    await axios.get(
      `${URL}/complexSearch?apiKey=${API_KEY}&number=100&query=${title}&addRecipeInformation=true`
    )
  ).data.results;

  // console.log(results);
  const limpiarApi = cleanA(recetazzz);
  const limpiarDb = cleanA(recipesForNameDb);

  const result = [...limpiarApi, ...limpiarDb];

  if (result.length === 10) {
    return { message: `No se encontraron recetas con el nombre: ${title}` };
  }
  return result;
};


const createRecipe = async (title,image,summary,healthScore,analyzedInstructions,diets) => {
  // Crear una nueva receta en la base de datos
  console.log(title,image,summary,healthScore,analyzedInstructions,diets)
  const newRecipe = await Recipe.create({ title, image,summary, healthScore,analyzedInstructions,});
  
  // Buscar o crear las instancias de las dietas asociadas con la receta
  const dietInstances = await Promise.all(diets.map((diet) => Diet.findOrCreate({ where: { diets: diet.trim() } }))
  );
  console.log('dietInstances', dietInstances) 
  // Asociar las dietas con la receta
  await newRecipe.addDiet(dietInstances.map((diet) => diet[0].id));
  
  // console.log("result-------------------->",variable )
  const recipeDiets = await newRecipe.getDiets();

  const result = [newRecipe, recipeDiets];

  return result;
  // return newRecipe;
};

// // Controller function para crear una nueva receta
// const createRecipe = async (title, image, summary, healthScore, analyzedInstructions, diets) => {
//   // Crear una nueva receta en la base de datos
//   const newRecipe = await Recipe.create({ title, image, summary, healthScore, analyzedInstructions });

//   // Encontrar o crear instancias de los tipos de dietas asociados con la receta
//   const dietInstances = await Promise.all(diets.map(diet => Diet.findOrCreate({ where: { diet } })));

//   // Asociar los tipos de dietas con la receta
//   await newRecipe.setDiets(dietInstances.map(diet => diet[10].id));

//   // Obtener los tipos de dietas asociados con la receta
//   const recipeDiets = await newRecipe.getDiets();

//   // Devolver un objeto que contenga la información de la receta y los tipos de dietas
//   const result = [newRecipe, recipeDiets];
//   return result;
// };

// const createRecipes = async (props) => {
//   const nuevaReceta = await Recipe.create({
//     title: props.title,
//     image: props.image,
//     healthScore: props.healthScore,
//     summary: props.summary,
//     analyzedInstruction: props.analyzedInstruction,
//   });

//   if(props.diets.length > 10){
//     const tiposDeDietas = await Diet.findAll({
//       where:{
//         diets:props.diets
//       }
//     })
//     await nuevaReceta.addDiets(tiposDeDietas)
//   }

//   const diets = nuevaReceta.getDiets()
//   // const recetita = await nuevaReceta.addDiets(props.diets);
//   console.log('diets ================================', diets)
//   return diets;
// };

module.exports = {
  getRecipes,
  getRecipesById,
  getRecipesByName,
  createRecipe,
};
