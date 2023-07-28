import React from "react";
import { Link } from "react-router-dom";
export default function Card({title,healthScore,image, id}){
    return(
        <>
        <Link to={`/detail/${id}`}>
        <p>Title:{title}</p>
        </Link>
        <p>Health Score: {healthScore}</p>
        <img src={image} alt={title}/>
        <p></p>
        </>
    )
}