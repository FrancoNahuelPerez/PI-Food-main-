// import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./Detail.module.css";

export default function Detail() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/recipes/${id}`)
      .then(({ data }) => {
        if (data.id) {
          setRecipes(data);
        } else {
          window.alert("No se encontraron detalles de la receta");
        }
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de la receta:", error);
      });
  }, [id]);

  // Corregimos el acceso a la variable currentSteps
  const currentSteps = recipes.analyzedInstructions?.[0]?.steps || [];

  return (
    <div className={style.container}>
      <div className={style.infoColumn}>

      <h1>{recipes.title}</h1>
      <img src={recipes.image} alt={recipes.title} />
      <h3>{recipes.id}</h3>
      <article dangerouslySetInnerHTML={{ __html: recipes.summary }} />
      </div>
      <div className={style.stepsColumn}>
        
      </div>
      {currentSteps.map((step) => (
        <div className={`${style.step} step`}key={step.number}>
          <h3 className={`${style.stepNumber} step-number`}>Step:{step.number}</h3>
          <p className={`${style.stepContent} step-content`}>{step.step}</p>
        </div>
      ))}
      <h3>{recipes.diets}</h3>
      <h3>{recipes.healthScore}</h3>
    </div>
  );
}
