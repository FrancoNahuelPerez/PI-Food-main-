import axios from "axios";
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
  FILTER_SOURCE,
} from "./actions-type";

export const getRecipes = () => {
  return async (dispatch) => {
    try {
      const apiRecipes = await axios.get("http://localhost:3001/recipes");
      const recipe = apiRecipes.data.map((recipe) => ({
        ...recipe,
        source: "API",
      }));
      return dispatch({ type: GET_RECIPES, payload: recipe });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    try {
      const apiDiets = await axios.get("http://localhost:3001/diets");
      const dietas = apiDiets.data;
      dispatch({ type: GET_DIETS, payload: dietas });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getRecipesId = (id) => {
  return async function (dispatch) {
    const recetasById = await axios.get(`http://localhost:3001/recipes/${id}`);
    const recetasId = recetasById.data;
    return dispatch({ type: GET_RECIPES_ID, payload: recetasId });
  };
};

export const getRecipesName = (title) => {
  return async function (dispatch) {
    try {
      const recetasByName = await axios.get(
        `http://localhost:3001/recipes/?title=${title}`
      );
      const recetasName = recetasByName.data;
      dispatch({ type: GET_RECIPES_NAME, payload: recetasName });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postRecipes = ({
  title,
  summary,
  image,
  healthScore,
  analyzedInstructions,
  diets,
}) => {
  return async function (dispatch) {
    try {
      const api = await axios.post("http://localhost:3001/recipes", {
        title,
        summary,
        image,
        healthScore,
        analyzedInstructions,
        diets,
      });
      dispatch({ type: POST_RECIPES, payload: api.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const ordenAscendente = () => {
  return function (dispatch) {
    dispatch({ type: ASC_AZ_RECIPES });
  };
};

export const ordenDescendente = () => {
  return function (dispatch) {
    dispatch({ type: DES_ZA_RECIPES });
  };
};

export const healthScoreAsc = () => {
  return function (dispatch) {
    dispatch({ type: ASC_HS });
  };
};

export const healthScoreDesc = () => {
  return function (dispatch) {
    dispatch({ type: DES_HS });
  };
};

export const filtrarBd = () => {
  return {
    type: FILTRAR_BD,
  };
};

export const filterApi = () => {
  return {
    type: FILTRAR_API,
  };
};

export const filterClean = () => {
  return {
    type: LIMPIAR_FILTROS,
  };
};

export const filterr = () => {
  return {
    type: FILTER_SOURCE,
  };
};

export const filterDietas = (payload) => {
  return {
    type: FILTRAR_DIETAS,
    payload,
  };
};
