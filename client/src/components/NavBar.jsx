import React, { Component } from "react";
import s from './Nav.module.css'
import { NavLink } from "react-router-dom";



export default class Nav extends Component {
  render() {
    return (
      <div>
        <NavLink style={{ textDecoration:'none'}}to="/"><botton className={s.botoncitos}>Inicio </botton></NavLink>

    
      </div>
    );
  }
};
