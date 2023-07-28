const { Router } = require("express");
const routerRecipes = Router();
const {
  getRecipesHandler,
  getRecipesByIdHandler,
  postRecipesHandler
} = require("../handlers/recipeHandler");

routerRecipes.get("/", getRecipesHandler);
routerRecipes.get("/:id", getRecipesByIdHandler);
routerRecipes.post('/', postRecipesHandler)

module.exports = routerRecipes;
