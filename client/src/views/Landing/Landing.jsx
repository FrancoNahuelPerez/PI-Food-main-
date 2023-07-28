import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </>
  );
}
