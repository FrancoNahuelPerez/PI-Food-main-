import {
  GET_RECIPES,
  GET_DIETS,
  GET_RECIPES_ID,
  GET_RECIPES_NAME,
  POST_RECIPES,
  ASC_AZ_RECIPES,
  DES_ZA_RECIPES,
  ASC_HS,
  DES_HS,
  FILTRAR_API,
  FILTRAR_BD,
  FILTRAR_DIETAS,
  LIMPIAR_FILTROS,
  FILTER_SOURCE
} from "./actions-type";

const initialState = {
  recipes: [], //almaceno las recetas
  recipesDetail: [],
  diets: [], //almaceno las dietas
  allRecipes: [],
  filters: {}
}


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case GET_RECIPES_ID:
      return {
        ...state,
        recipesDetail: action.payload,
      };
    case GET_RECIPES_NAME:
      return {
        ...state,
        recipes:action.payload,
      };
      case POST_RECIPES:
        return{
          ...state,
          recipes: [...state.recipes, action.payload]
        }
      case ASC_AZ_RECIPES:
        const ordenarRecipeAsc = [...state.recipes].sort((a,b) =>
          a.title.localeCompare(b.title)
        );
        return{
          ...state,
          recipes: ordenarRecipeAsc,

        };
      case DES_ZA_RECIPES:
        const ordenarRecipeDesc = [...state.recipes].sort((a,b) =>
          b.title.localeCompare(a.title)
        );
        return{
          ...state,
          recipes: ordenarRecipeDesc,
  
        };
      case ASC_HS:
        const sortHsAsc = [...state.recipes].sort(
          (a,b) =>b.healthScore - a.healthScore
          );
        return{
          ...state,
          recipes: sortHsAsc,
        };
      case DES_HS:
        const sortHsDesc= [...state.recipes].sort(
          (a,b) => a.healthScore - b.healthScore
        );
        return{
          ...state,
          recipes: sortHsDesc,
        };
      case FILTRAR_BD:
        const filterRecipesBd = state.allRecipes.filter(
          (recipe) => typeof recipe.id === "string"
        );
        return{
          ...state,
          recipes: filterRecipesBd,
        };
      case LIMPIAR_FILTROS:
        return{
          ...state,
          recipes: state.allRecipes,
          filters: {}
        }
      case FILTRAR_API:
        const filterRecipesApi = state.allRecipes.filter(
          (recipe) => typeof recipe.id === "number"
        );
        return{
          ...state,
          recipes:filterRecipesApi,
        };
      case FILTER_SOURCE:
        return{
          ...state,
          recipes: state.allRecipes 
        }
      case FILTRAR_DIETAS:
        if(action.payload === "all"){
          return {
            ...state,
            recipes: state.allRecipes,
            error: null
          }
        }
        const filterByDiets = state.allRecipes.filter((recipe) =>
        recipe.diets.includes(action.payload)
        );
      if(filterByDiets.length === 0){
        return{
          ...state,
          recipes: [],
          error: "No se encontraron recetas para las dietas seleccionadas"
        }
      }
      return{
        ...state,
        recipes: filterByDiets,
        error: null,
      }
    default:
      return { ...state };
  }
};

export default rootReducer;
