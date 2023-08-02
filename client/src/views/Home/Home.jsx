import React, { useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { useEffect } from "react";
import CardConteiner from "../../Components/CardConteiner/CardConteiner";
import { getRecipes,
filterApi,
filterClean,
filterDietas,
filtrarBd,
filterr,
ordenDescendente,
ordenAscendente,
healthScoreAsc,
healthScoreDesc,
getDiets
 } from "../../Redux/actions";
 import style from './Home.module.css'




function Home({filterr, ordenDescendente, ordenAscendente, healthScoreAsc, healthScoreDesc, filterDietas}) {
  const dispatch = useDispatch();
  const alldiets = useSelector(state => state.diets)

  const recipes = useSelector(state => state.recipes)

  useEffect(() =>{
    dispatch(getDiets())
  }, [dispatch])

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const handleReset = () =>{
    dispatch(filterClean())
  }


  const handleSortAZChange = (event) =>{
    if(event.target.value === "asc"){
      ordenAscendente()
      
    }else if(event.target.value === "des"){
      ordenDescendente()
      
    }
  }

  const handleSortHS= (event) =>{
    if(event.target.value === "asc"){
      healthScoreAsc()
    }else if(event.target.value === "des"){
      healthScoreDesc()
    }
  }

  const handleSourceChange= (creator) =>{
    if(creator === "API"){
      dispatch(filterApi())
      
    }else if(creator === "Database"){
      dispatch(filtrarBd())
      
    }else{
      dispatch(filterr("none"))
      
    }
  }

  const handleDietsChange = (event) =>{
    filterDietas(event.target.value === "" ? "all" : event.target.value)
    
  }

  return (
    <>
    <div className={style["form-container"]}>
      <form>
        <div>
          <label>Ordenar A-Z:</label>
          <select onChange={handleSortAZChange}>
            <option value="">Select</option>
            <option value="asc">A-Z Ascending</option>
            <option value="des">Z-A Descending</option>
          </select>
        </div>
        <div>
          <label>Ordenar HS:</label>
          <select onChange={handleSortHS}>
            <option value="">Select</option>
            <option value="asc">100-0 Descending</option>
            <option value="des">0-100 Ascending</option>
          </select>
        </div>
        <div>
          <label>Filtrar Por:</label>
          <select onChange={(event) =>handleSourceChange(event.target.value)}>
            <option value="none">All Recipes</option>
            <option value="API">Api Recipes</option>
            <option value="Database">Database Recipes</option>
          </select>
        </div>
        <div>  
          <label>Filtrar Dietas:</label>
          <select onChange={handleDietsChange}>
            <option value="">All Diets</option>
            {alldiets?.map((diet) =>(
            <option key={diet.id} value={diet.diets}>
              {diet.diets}
            </option>
           ))}
          </select>
        </div>
        <div>
          <button onClick={handleReset}>Reset Filters</button>
        </div>
      </form>
    </div>
    <div className={style["card-container"]}>
      {/* className={style["card-container"]} */}
    <CardConteiner/>
    </div>
    </>
  );
}

const mapStateToProps = (state) =>{
  return{
    diets:state.diets
  }
}

const mapDispatchToProps = {
  ordenAscendente,
  ordenDescendente,
  healthScoreAsc,
  healthScoreDesc,
  filterr,
  filterDietas
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)