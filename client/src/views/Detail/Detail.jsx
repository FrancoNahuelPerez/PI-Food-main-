// import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./Detail.module.css";

export default function Detail() {
  const { id } = useParams();

  const [recipes, setRecipes] = useState({});
  // const dispatch = useDispatch()
  // const recipes = useSelector((state) => state.recipes)
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

  // Corregimos el acceso a la variable currentSteps
  const currentSteps = recipes.analyzedInstructions?.[0]?.steps || [];
  const dietitas = recipes.diets?.join(", ") || "";

  return (
    <div className={style.container}>
      <div className={style.infoColumn}>
        <h1>{recipes.title}</h1>
        <div className={style.dietitas}>
        <div className={style.healthScore}>
        <h4>⭐ {recipes.healthScore}</h4>
        </div>
          <h4>Diets:{dietitas}</h4>
          </div>
        <img src={recipes.image} alt={recipes.title} />
        <h3>{recipes.id}</h3>
        <article dangerouslySetInnerHTML={{ __html: recipes.summary }} />
      </div>
      <div className={style.stepsContainer}></div>
      {currentSteps.map((step) => (
        <div className={style.step} key={step.number}>
          <h3 className={style.stepNumber}>
            Step:{step.number}
          </h3>
          <p className={style.stepContent}>{step.step}</p>
        </div>
      ))}
    </div>
  );
}
