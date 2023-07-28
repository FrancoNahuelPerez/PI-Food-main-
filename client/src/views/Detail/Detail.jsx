import React from "react";
import { getRecipesId } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// const food = [
//     {
//       "id": "166905c2-cbad-410b-b0bd-5bb7d8b926a2",
//       "title": "Título de la receta",
//       "image": "URL de la imagen",
//       "summary": "Resumen de la receta",
//       "healthScore": 9.5,
//       "analyzedInstructions": [
//         "Paso 1",
//         "Paso 2"
//       ]
//     },
//     [
//       {
//         "id": 1,
//         "diets": "Dieta 1",
//         "recipe-diet": {
//           "RecipeId": "166905c2-cbad-410b-b0bd-5bb7d8b926a2",
//           "DietId": 1
//         }
//       },
//       {
//         "id": 2,
//         "diets": "Dieta 2",
//         "recipe-diet": {
//           "RecipeId": "166905c2-cbad-410b-b0bd-5bb7d8b926a2",
//           "DietId": 2
//         }
//       }
//     ]
//   ]

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [recipes, setRecipes] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:3001/recipes/${id}`).then(({ data }) => {
      if (data.id) {
        setRecipes(data);
      } else {
        window.alert("No se encontraron detalles de la receta");
      }
    });
    return setRecipes({});
  }, [id]);
// const { id } = useParams();
//   const [recipe, setRecipe] = useState({});

//   useEffect(() => {
//     // Buscar la receta con el id proporcionado en el arreglo 'food'
//     const foundRecipe = food.find((recipe) => recipe.id === id);

//     if (foundRecipe) {
//       setRecipe(foundRecipe);
//     } else {
//       window.alert("No se encontraron detalles de la receta");
//       // Opcionalmente, puedes redirigir al usuario a una página de no encontrado o manejar el error de otra manera.
//     }
//   }, [id]);



  return (
    <>
      <h1>{recipes.title}</h1>
      <img src={recipes.image} alt={recipes.title}></img>
      <h3>{recipes.diets}</h3>
      <h3>{recipes.healthScore}</h3>
    </>
  );
}
