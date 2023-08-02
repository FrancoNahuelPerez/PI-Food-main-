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
      `${URL}/complexSearch?apiKey=${API_KEY}&number=18&addRecipeInformation=true`)
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
      const dietsBd = recipe.diets.map((dietss) => dietss.Diet);
      const { id, image, title, analyzedInstructions, healthScore, summary } = recipe;
      return {id,image,title,analyzedInstructions,healthScore,summary,dietsBd};
    });
  }

  if (source === "api") {
    const {
      id,
      title,
      image,
      healthScore,
      summary,
      analyzedInstructions,
      diets,
    } = response.data;

    return {id, title, image, healthScore, summary, analyzedInstructions, diets };
  } else {
    return response;
  }
};
//
//jharol trucos bulkCreate, findOrCreate, [Op.iLike]
//   const dbRecipes = cleanArray(allRecipeFromDB)
//   const api = cleanArray(apii)
//   return [...dbRecipes,...api]

// const getRecipes = async () => {
//   // Obtener todas las recetas de la API externa
//   const apiRecipesRaw = (await axios.get(`${URL}/complexSearch?apiKey=${KEY}&number=10&addRecipeInformation=true`)).data.results;

//   // Obtener todas las recetas de la base de datos, incluyendo los tipos de dietas asociados
//   const dbRecipesRaw = await Recipe.findAll({
//     include: [{
//       model: Diet,
//       attributes: ['id', 'diet'],
//     }],
//   });

//   // Limpiar los datos de las recetas obtenidas

//   // Combinar los resultados de la base de datos y la API
//   return [...dbRecipesRaw, ...apiRecipesRaw];
// };

// const getRecipesByName = async (title) =>{
//   if(title){
//     const recetazzz = ( await axios.get( `${URL}/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`)).data.results;
//     const recipesForNameApi = recetazzz.filter((recipesApi) => recipesApi.title === title)
//     return recipesForNameApi
//   }else{
//     const recipesForNameDb = await Recipe.findAll({
//       include:[
//         {
//           model: Diet,
//           [Op.iLike]: `${title}%`
//         }
//       ]
//     })
//     return recipesForNameDb
//   }
// }

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
      `${URL}/complexSearch?apiKey=${API_KEY}&number=10&query=${title}&addRecipeInformation=true`
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

// Crear una nueva receta en la base de datos
// Encontrar o crear instancias de los tipos de dietas asociados con la receta
// Asociar los tipos de dietas con la receta
// Obtener los tipos de dietas asociados con la receta
// objeto que contenga la información de la receta y los tipos de dietas
//create

// const postDriver = async (newDriver) => {
// 	try {
// 		const driver = await Driver.create({
// 			name: newDriver.name,
// 			surname: newDriver.surname,
// 			description: newDriver.description,
// 			nationality: newDriver.nationality,
// 			image: newDriver.image,
// 			date: newDriver.date,
// 		});

// 		const teamsArray = newDriver.team.split(',');

// 		teamsArray.forEach(async (t) => {
// 			const team = await Team.findOne({
// 				where: { name: t },
// 			});

// 			if (team) {
// 				await driver.setTeams(team);
// 			}
// 		});

// 		const driverWithTeam = await Driver.findOne({
// 			where: { id: driver.id },
// 			include: [
// 				{
// 					model: Team,
// 					attributes: ['name'],
// 					through: {
// 						attributes: [],
// 					},
// 				},
// 			],
// 		});

// 		const teams = driverWithTeam.Teams.map((team) => team.name).join(', ');
// 		return { ...driverWithTeam.dataValues, Teams: teams };
// 	} catch (error) {
// 		res.status(4104).json({ error: error.message });
// 	}
// };

// const createRecipes = async (props) => {

//   let nuevaReceta = {
//     title: props.title,
//     image: props.image,
//     healthScore: props.healthScore,
//     summary: props.summary,
//     analyzedInstruction: props.analyzedInstruction,
//     diets: props.diets
//   };
// let arrrrr = [];

//   for(const dietita of props.diets) {
//     console.log('dietasssss------------------------>', props.diets)
//     console.log('adietr------------------------>', dietita)
//     const tiposDeDietas = await Diet.findOne({
//       where: {
//         // id:dietita.id, see
//         diets: dietita,
//       },//mepa que esta mal, onda lo que me sale en el console es que la propiedad dieta es null, una esta llegando, la otra no, averrrr
//     });
//     console.log('tipos de diestas----------------------->', tiposDeDietas)
//     arrrrr.push(tiposDeDietas.diets)
//   }
//   const nuevaRecetita = await Recipe.create(nuevaReceta)

//     await nuevaRecetita.addDiets(arrrrr);

//   return nuevaRecetita;
// };
// //ajjajajaj yo tampcoo
// module.exports = createRecipes;
// const createRecipe = async (title, image, summary, healthScore, analyzedInstructions, diet) => {
//   // Crear una nueva receta en la base de datos
//   const newRecipe = await Recipe.create({ title, image, summary, healthScore, analyzedInstructions });

//   // Encontrar o crear instancias de los tipos de dietas asociados con la receta
//   const dietInstances = await Promise.all(diet.map(diet => Diet.findOrCreate({ where: { diet } })));
//   console.log('dietInstances', dietInstances)

//   // Asociar los tipos de dietas con la receta
//   await newRecipe.setDiets(dietInstances.map(diets => diets[10].id));

//   // Obtener los tipos de dietas asociados con la receta
//   const recipeDiets = await newRecipe.getDiets();

//   // Devolver un objeto que contenga la información de la receta y los tipos de dietas
//   const result = [newRecipe, recipeDiets]; //
//   return result;
// };
// const createRecipe = async (title, image, summary, healthScore, analyzedInstructions, diets) => {
//   const newRecipe = await Recipe.create({title, image, summary, healthScore, analyzedInstructions })

//   const dietDB = await Diet.findAll({
//       where: {
//         diets: diets
//       }
//     });

//     await newRecipe.addDiet(dietDB);

//     return newRecipe;
//   };

const createRecipe = async (title,image,summary,healthScore,analyzedInstructions,diets) => {
  // Crear una nueva receta en la base de datos
 
  const newRecipe = await Recipe.create({ title, image,summary, healthScore,analyzedInstructions,});

  // Buscar o crear las instancias de las dietas asociadas con la receta
  const dietInstances = await Promise.all(diets.map((diet) => Diet.findOrCreate({ where: { diets: diet.trim() } }))
  );

  // Asociar las dietas con la receta
  await newRecipe.addDiet(dietInstances.map((diet) => diet[10].id));
   
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
