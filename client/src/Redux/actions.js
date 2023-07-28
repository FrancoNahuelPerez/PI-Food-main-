import axios from "axios";
import { GET_RECIPES, GET_DIETS, GET_RECIPES_ID, GET_RECIPES_NAME } from "./actions-type";

export const getRecipes = () => {
    return async (dispatch) => {
    try {
        const apiRecipes = await axios.get("http://localhost:3001/recipes");
        const recipe = apiRecipes.data.map((recipe) => ({
            ...recipe,
            source: "API"
          }));
       return dispatch({ type: GET_RECIPES, payload: recipe }); 
    } catch (error) {
        console.log(error.message)
    }
  };
};

export const getDiets = () =>{
    return async function (dispatch){
        try{
            const apiDiets = await axios.get("http://localhost:3001/diets");
            const dietas = apiDiets.data.diets;
            dispatch({ type:GET_DIETS, payload: dietas })
        }
        catch(error){
            console.log(error.message)
        }
    }
}

export const getRecipesId = (id) =>{
    return async function (dispatch){
        try {
            const recetasById = await axios.get(`http://localhost:3001/recipes/${id}`)
            const recetasId = recetasById.data.diets;
            dispatch({type:GET_RECIPES_ID, payload:recetasId})
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getRecipesName = (title) =>{
    return async function(dispatch){
        try{
            const recetasByName = await axios.get(`http://localhost:3001/recipes/?title=${title}`)
            const recetasName = recetasByName.data.results;
            dispatch({type:GET_RECIPES_NAME, payload:recetasName})
        }
        catch(error){
            console.log(error.message)
        }
    }
}