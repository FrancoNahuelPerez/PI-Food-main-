import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css"

export default function Landing() {
  return (
    <div className={style.Landing}>
      <Link to="/home">
        <div className={style.buttonContainer}>
        <button className={style.button}>Ingresar</button>
        </div>
      </Link>
    </div>
  );
}
