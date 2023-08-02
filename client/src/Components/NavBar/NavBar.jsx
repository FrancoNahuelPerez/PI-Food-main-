import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css"
export default function NavBar(params) {
    return(
        <div className={style.NavBar}>
        <Link to={'/home'}>
        <button>HOME</button>
        </Link>
        <SearchBar className={style.SearchBar}/>
        <Link to={'/create'}>
        <button>CREATE</button>
        </Link>
        <Link to={'/about'}>
        <button>ABOUT</button>
        </Link>
        <Link to={"/"}>
        <button>LOGOUT</button>
        </Link>
        </div>
    )    
}
