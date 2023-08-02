import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { getRecipesName } from '../../Redux/actions'
import style from "./SearchBar.module.css"

export default function SearchBar() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [error, setError] = useState("")

    const handleTitle = (event) =>{
        setTitle(event.target.value)
    }
    const handleSearch = (event) =>{
        if(title === ""){
            setError("Enter a search term")
        }
        dispatch(getRecipesName(title));
        setError("")
    }
  return (
    <div className={style.SearchBar}>
        <input
        type='search'
        value={title}
        onChange={handleTitle}
        placeholder='Search...'>
        </input>
        <button onClick={handleSearch}>SEARCH</button>
        {error && <p>{error}</p>}
    </div>
  )
}
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// export default function SearchBar() {
//   const [pokemonName, setPokemonName] = useState("");
//   const navigate = useNavigate();

//   const searchPokemon = async () => {
//     const response = await axios.get(
//       `http://localhost:3001/pokemons?name=${pokemonName}`
//     );
//     const pokemon = response.data;
//     const id = pokemon.id;
//     navigate(`detail/${id}`);
//   };

//   const handleChange = (event) => {
//     setPokemonName(event.target.value.toLowerCase());
//   };

//   return (
//     <div>
//       <input
//         placeholder="Search"
//         type="search"
//         value={pokemonName}
//         onChange={handleChange}
//       />
//       <button type="button" onClick={searchPokemon}>
//         Search
//       </button>
//     </div>
//   );
// }
