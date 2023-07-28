import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(params) {
    return(
        <>
        <Link to={'/home'}>
        <button>HOME</button>
        </Link>
        <Link to={'/create'}>
        <button>CREATE</button>
        </Link>
        </>
    )    
}