import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Landing.module.css";


export default function LandingPage() {
  return (
    <div className={s.fondo}>
        <div className={s.fondo}>
        <h1 className={s.h1}>
          <span>W</span>
          <span>e</span>
          <span>l</span>
          <span>c</span>
          <span>o</span>
          <span>m</span>
          <span>e</span>
          <br />
          <span>t</span>
          <span>o</span>
          <br />
          <span>D</span>
          <span>o</span>
          <span>g</span>
          <span>S</span>
          <span>t</span>
          <span>o</span>
          <span>r</span>
          <span>e</span>
        </h1>
      </div>
      <NavLink to="/home">
        <button className={s.botones}>Ingresar</button>
      </NavLink>
    </div>
  );
}
