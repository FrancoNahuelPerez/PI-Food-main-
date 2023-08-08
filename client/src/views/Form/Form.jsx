import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { getDiets } from "../../Redux/actions";
import { postRecipes } from "../../Redux/actions";
import style from "./Form.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const dispatch = useDispatch();

  const dietitas = useSelector((state) => state.diets);

  const navigate = useNavigate();

  const [error, setError] = useState({
    title: "",
    summary: "",
    healthScore: "",
    analyzedInstructions: "",
    diets: "",
    image: ""
  });
  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthScore: "",
    analyzedInstructions: [],
    diets: [],
    image: "",
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const [stepCount, setStepCount] = useState(0);

  const changeSelectHandler = (event) => {
    const value = event.target.value;
    if (!form.diets.includes(value)) {
      setForm({ ...form, diets: [...form.diets, value] });
    }
  };
  
  // Manejador de cambios del número de pasos en las instrucciones
  const handleStepsChange = (event) => {
    const { value } = event.target;
    const stepsCount = parseInt(value);

    if (!isNaN(stepsCount) && stepsCount >= 0 && stepsCount <= 10) {
      const updatedSteps = [];

      for (let i = 0; i < stepsCount; i++) {
        updatedSteps.push({ step: "" });
      }

      setForm((prevForm) => ({
        ...prevForm,
        analyzedInstructions: updatedSteps,
      }));
      setStepCount(stepsCount);
    }
  };

  // Manejador de cambios de un paso en las instrucciones
  const handleStepChange = (index, value) => {
    const updatedSteps = [...form.analyzedInstructions];
    updatedSteps[index] = { step: value };

    setForm((prevForm) => ({
      ...prevForm,
      analyzedInstructions: updatedSteps,
    }));

    const newErrors = validation({
      ...form,
      analyzedInstructions: updatedSteps,
    });
    setError(newErrors);
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  
    const newErrors = validation({
      ...form,
      [name]: value,
    });
    setError(newErrors);
  };
  
  
  // Manejador del envío del formulario
  const submitHandler = (event) => {
    event.preventDefault();

    // Verificar si hay algún paso vacío
    const hasEmptyStep = form.analyzedInstructions.some(
      (step) => step.step.trim() === ""
    );

    if (hasEmptyStep) {
      setError((prevErrors) => ({
        ...prevErrors,
        analyzedInstructions: "Please fill in all steps",
      }));
      return; // Evita que el formulario se envíe
    } else {
      // Creación de las instrucciones analizadas para enviar al backend
      const analyzedInstructions = [
        {
          name: "",
          steps: form.analyzedInstructions.map((step, index) => ({
            number: index + 1,
            step: step.step,
            ingredients: [],
            equipment: [],
          })),
        },
      ];

      const updatedForm = {
        ...form,
        analyzedInstructions,
      };

      // Envío del formulario al servidor usando axios  
    
        // Envío del formulario al servidor usando axios
        const res =  axios.post("http://localhost:3001/recipes", updatedForm);
    
        // Verificar si la respuesta del servidor es exitosa
        if (res) {
          alert(`The recipe was created successfully`);
          navigate("/home"); // Redireccionar al home después de crear la receta
        } else {
          // Manejo de errores en caso de una respuesta no exitosa
          alert(`The recipe has not been created.`);
        }
    }
  };

  const validation = ({
    title,
    summary,
    healthScore,
    analyzedInstructions,
    diets,
    image,
  }) => {
    const newError = {...error}; // Crear un nuevo objeto para almacenar los errores para cada campo
    const parsedScore = parseInt(healthScore, 10)



    if (!title) {
      newError.title = "Title cannot be empty";
    } else if (title.length > 40) {
      newError.title = "Title cannot exceed 40 characters";
    } else if (title.length < 3) {
      newError.title = "Title must be at least 3 characters long";
    } else if (/[^\w\s]/.test(title)) {
      newError.title = "Title contains invalid characters";
    }else{
      newError.title = "";
    }

    if (!summary) {
      newError.summary = "Summary cannot be empty";
    } else if (summary.length > 500) {
      newError.summary = "Summary cannot exceed 500 characters";
    } else if (/<[^>]+>/.test(summary)) {
      newError.summary = "Summary cannot contain HTML tags";
    } else if (summary.length < 10) {
      newError.summary = "Summary must be at least 10 characters long";
    } else{
      newError.summary= "";
    }

    if (!healthScore) {
      newError.healthScore = "HealthScore cannot be empty";
    } else if (!/^\d+$/.test(healthScore)) {
      newError.healthScore =
        "Invalid health score. Must be an integer between 0 and 100.";
    } else if(parsedScore < 0 || parsedScore > 100){  
        newError.healthScore = "The health score must be between 0 and 100.";    
    } else{
      newError.healthScore = "";
    }

    if (!image) {
      newError.image = "Image URL cannot be empty";
    } else if (!/^https?:\/\/\S+$/.test(image)) {
      newError.image = "Invalid image URL";
    } else if (image.length > 300) {
      newError.image = "Image URL cannot exceed 300 characters";
    }else{
      newError.image = "";
    }

    if (!diets || diets.length === 0) {
      newError.diets = "Please select at least one diet";
    } else if (diets.length > 6) {
      newError.diets = "Please select a maximum of 6 diets";
    }else{
      newError.diets = "";
    }

    if (!analyzedInstructions) {
      newError.analyzedInstructions = "Instruction cannot be empty";
    } else if (analyzedInstructions > 300) {
      newError.analyzedInstructions =
        "Instruction cannot exceed 400 characters";
    }

    return newError
  };

  return (
    <form className={style["form-container"]} onSubmit={submitHandler}>
      <div>
        <h1>Create Recipes</h1>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={changeHandler}
          name="title"
          placeholder="Insert Title..."
        ></input>
        {error.title && <span>{error.title}</span>}
        <hr></hr>
        <label>Summary:</label>
        <input
          type="text"
          value={form.summary}
          onChange={changeHandler}
          name="summary"
          placeholder="Insert Summary..."
        ></input>
        {error.summary && <span>{error.summary}</span>}
        <hr></hr>
        <label>Health Score:</label>
        <input
          type="number"
          value={form.healthScore}
          onChange={changeHandler}
          name="healthScore"
          placeholder="Insert HealthScore"
        ></input>
        {error.healthScore && <span>{error.healthScore}</span>}
        <hr></hr>
        <label>Image:</label>
        <input
          type="text"
          value={form.image}
          onChange={changeHandler}
          name="image"
          placeholder="Insert URL..."
        ></input>
        {error.image && <span>{error.image}</span>}
        <hr></hr>
        <div>
          <label htmlFor="steps">Steps For Recipe: </label>
          <input
            type="number"
            id="steps"
            name="steps"
            value={form.analyzedInstructions.length}
            min="0"
            onChange={handleStepsChange}
          />
        </div>
        <hr></hr>
        {error.analyzedInstructions && (
          <span className={style.error}> {error.analyzedInstructions}</span>
        )}
        {form.analyzedInstructions.slice(0, stepCount).map((step, index) => (
          <div key={index}>
            <label htmlFor={`step-${index}`}>Step {index + 1}: </label>
            <input
              type="text"
              id={`step-${index}`}
              name={`step-${index}`}
              value={step.step}
              onChange={(event) => handleStepChange(index, event.target.value)}
            />
            {step.step.trim() === "" && (
              <span className={style.error}>Step cannot be empty</span>
            )}
          </div>
        ))}
        <hr></hr>
        <label htmlFor="diets">Diets:</label>
        <select name="diets" onChange={changeSelectHandler}>
          {dietitas ? (
            dietitas?.map((element) => {
              return (
                <option value={element.diets} key={element.id}>
                  {element.diets}
                </option>
              );
            })
          ) : (
            <h3>...Loading</h3>
          )}
        </select>
        <h3>Diets</h3>
        {form.diets.map((element) => {
          return <p>{element}</p>;
        })}

        <hr></hr>
        <img src={form.image} alt={form.title}></img>

        <hr></hr>
        <button
          disabled={
            !form.title ||
            !form.summary ||
            !form.healthScore ||
            !form.image ||
            !form.analyzedInstructions
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
}
