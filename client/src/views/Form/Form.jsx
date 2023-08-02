import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { getDiets } from "../../Redux/actions";
import { postRecipes } from "../../Redux/actions";
import style from "./Form.module.css"

export default function Form() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const dietitas = useSelector((state) => state.diets);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthScore: "",
    analyzedInstructions: [],
    diets: [],
    image: "",
  });
  const [error, setError] = useState({
    title: "",
    summary: "",
    healthScore: "",
    analyzedInstructions: "",
    diets: "",
    image: "",
  });

  const changeSelectHandler = (event) => {
    const value = event.target.value;
    if (!form.diets.includes(value)) {
      setForm({ ...form, diets: [...form.diets, value] });
    }
  };
  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    validation({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const submitHandler = (event) => {
    if (!error.title) {
      dispatch(postRecipes(form));
      setForm({
        title: "",
        image: "",
        summary: "",
        analyzedInstructions: [],
        diets: [],
        healthScore: "",
      });
      alert("Se ha creado la receta");
    } else {
      alert("No se ha podido crear la receta");
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
    const newError = {}; // Crear un nuevo objeto para almacenar los errores para cada campo

    if (!title) {
      newError.title = "Title cannot be empty";
    } else if (title.length > 40) {
      newError.title = "Title cannot exceed 40 characters";
    } else if (title.length < 3) {
      newError.title = "Title must be at least 3 characters long";
    } else if (/[^\w\s]/.test(title)) {
      newError.title = "Title contains invalid characters";
    }

    if (!summary) {
      newError.summary = "Summary cannot be empty";
    } else if (summary.length > 500) {
      newError.summary = "Summary cannot exceed 500 characters";
    } else if (/<[^>]+>/.test(summary)) {
      newError.summary = "Summary cannot contain HTML tags";
    } else if (summary.length < 10) {
      newError.summary = "Summary must be at least 10 characters long";
    }

    if (!healthScore) {
      newError.healthScore = "HealthScore cannot be empty";
    } else if (!/^\d+$/.test(healthScore)) {
      newError.healthScore =
        "Invalid health score. Must be an integer between 0 and 100.";
    } else {
      const parsedScore = parseInt(healthScore, 10);
      if (parsedScore < 0 || parsedScore > 100) {
        newError.healthScore = "The health score must be between 0 and 100.";
      }
    }

    if (!image) {
      newError.image = "Image URL cannot be empty";
    } else if (!/^https?:\/\/\S+$/.test(image)) {
      newError.image = "Invalid image URL";
    } else if (image.length > 300) {
      newError.image = "Image URL cannot exceed 300 characters";
    }

    if (!diets || diets.length === 0) {
      newError.diets = "Please select at least one diet";
    } else if (diets.length > 6) {
      newError.diets = "Please select a maximum of 6 diets";
    }

    if (!analyzedInstructions) {
      newError.analyzedInstructions = "Instruction cannot be empty";
    } else if (analyzedInstructions > 300) {
      newError.analyzedInstructions =
        "Instruction cannot exceed 400 characters";
    }

    setError(newError);
  };

  return (
    <form className={style["form-container"]} onSubmit={submitHandler}>
      <div>
        <h1>Create Recipes</h1>
        <label>Title:</label>
        <input
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
        <label>Instructions:</label>
        <textarea
          value={form.analyzedInstructions}
          onChange={changeHandler}
          name="analyzedInstructions"
          placeholder="Insert Instruction"
        />
        {error.analyzedInstructions && (
          <span>{error.analyzedInstructions}</span>
        )}
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
