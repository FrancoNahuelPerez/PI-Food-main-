import React from "react";
import {useSelector} from 'react-redux'
import Card from "../Card/Card";
    

export default function CardConteiner(){
    const recipes = useSelector((state) => state.recipes)
    console.log("recetitas--------------------",recipes)
    return(
        <div>
            {recipes.map((recetitas) =>{
                return (<Card
                id= {recetitas?.id}
                key={recetitas?.id}
                title= {recetitas?.title}
                image= {recetitas?.image }
                diets={recetitas?.diets}
                healthScore={recetitas?.healthScore}
                />)
            })}
        </div>
    )
}

