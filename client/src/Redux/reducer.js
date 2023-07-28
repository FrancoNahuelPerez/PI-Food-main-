import {
  GET_RECIPES,
  GET_DIETS,
  GET_RECIPES_ID,
  GET_RECIPES_NAME,
} from "./actions-type";

const initialState = {
  recipes: [], //almaceno las recetas
  recipesDetail: [],
  diets: [], //almaceno las dietas
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
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
        recipes: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
