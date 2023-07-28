const {
  getRecipesById,
  getRecipesByName,
  getRecipes,
  createRecipe
} = require("../controllers/recipeControllerss");

const getRecipesHandler = async (req, res) => {
  const {title} = req.query;
  const recipesss = title ? await getRecipesByName(title) : await getRecipes();
  try {
    res.send(await recipesss);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
};

const getRecipesByIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "db" : "api";
  try {
    const obtenerId = await getRecipesById(id, source);
    res.status(200).json(obtenerId);
  } catch (error) {
    if (source === "db") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message }); //no
    }
  }
};


const postRecipesHandler = async (req, res) => {
  const {title, image, summary, healthScore, analyzedInstructions, diets} = req.body;

  try {
    // Verificar si faltan datos obligatorios
    if (!title || !image || !summary || !healthScore || !analyzedInstructions || !diets) {
      throw Error("Missing data");
    }

    // Crear una nueva receta utilizando la función createRecipe
    const newRecipe = await createRecipe(title, image, summary, healthScore, analyzedInstructions, diets);

    // Responder con el objeto JSON de la nueva receta creada
    res.status(201).json(newRecipe);
  } catch (error) {
    // Manejar el error y responder con un código de estado 422 y un mensaje de error
    res.status(422).json({ error: error.message });
  }
};



// const getRecipesByNameHandler = async (req, res) => {
//     const {title} = req.query;
//     const idByName = await getRecipesByName(title);
//     try {
//         res.send(await idByName)
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// };


// const getRecipesByNameHandler = async (req, res) => {
//   const { title } = req.query;
//   try {
//     const recipes = await getRecipesByName(title);
//     if (recipes.length === 0) {
//       res.status(404).json({ message: `No se encontraron recetas con el nombre: ${title}` });
//     } else {
//       res.json(recipes);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




module.exports = {
  getRecipesHandler,
  getRecipesByIdHandler,
  postRecipesHandler
};
