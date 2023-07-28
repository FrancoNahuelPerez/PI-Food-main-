import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipes } from "../../Redux/actions";
import CardConteiner from "../../Components/CardConteiner/CardConteiner";

export default function Home() {
  const dispatch = useDispatch();
//   const recipes = useSelector((state) => state.recipes)

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);
//   console.log("recipesssss", getRecipes());


  return (
    <>
      <h1>Home</h1>
      <CardConteiner />
    </>
  );
}
