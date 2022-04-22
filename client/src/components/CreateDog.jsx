import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import s from './Create.module.css'
import { postDog, getTemperament } from "../actions/indexActions";
import Nav from "./NavBar";
export default function CreateDog() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temp);
  const [error, setError] = useState({});
  const [info, setInfo] = useState({
    name: "",
    height: "",
    weight: "",
    image: "",
    life_span: "",
    temperament: [],
  });
  
  function handleChange(e) {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
    setError(
      validation({
        ...info,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSelect(e) {
    setInfo({
      ...info,
      temperament: [...info.temperament, e.target.value],
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if(!error.submit){
      return alert("Faltan datos")
    }
    dispatch(postDog(info));
    console.log("submit", info);
    alert("Tu cachorrito se agregó exitosamente");
    setInfo({
      name: "",
      height: "",
      weight: "",
      image: "",
      life_span: "",
      temperament: [],
    });
  }
  function validation(info) {
    let error = {};
    if (!info.name) {
      error.name = "No olvides de colocarle el Nombre de Raza!";
    } else if (!info.height) {
      error.height = "Se te olvdió la altura!";
    } else if (!info.weight) {
      error.weight = "Se te olvdió el peso!";
    } else if (!info.life_span) {
      error.life_span = "Especifica su edad";
    }else{
      error.submit= "ok"
    }
    return error;
  }
  function handleDelete(e){
    setInfo({
      ...info,
      temperament: info.temperament.filter(t=>t !== e)
    })
  }
  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);
  return (
    <div className={s.lapri}>
      <NavLink to="/home">
        <button className={s.btnVolver}>Volver</button>
      </NavLink>
      <h1 className={s.h1}>Crea tu personaje</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={s.name}>
          <h3>Nombre:</h3>
          <input
          className={s.lista}
            type="text"
            value={info.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {error.name && <p className="error">{error.name}</p>}
        </div>
        <div className={s.altura}>
          <h3>Altura:</h3>
          <input
          className={s.lista}
            type="text"
            value={info.height}
            name="height"
            onChange={(e) => handleChange(e)}
          />
          {error.height && <p className="error">{error.height}</p>}
        </div>
        <div className={s.peso}>
          <h3>Peso:</h3>
          <input
          className={s.lista}
            type="text"
            value={info.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
          />
          {error.weight && <p className="error">{error.weight}</p>}
        </div>
        <div className={s.edad}>
          <h3>Tiempo de vida:</h3>
          <input
          className={s.lista}
            type="text"
            value={info.life_span}
            name="life_span"
            onChange={(e) => handleChange(e)}
          />
          {error.life_span && <p className="error">{error.life_span}</p>}
        </div>
        <div className={s.imagen}>
          <h3>Imagen:</h3>
          <input
          className={s.lista}
            type="text"
            value={info.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={s.temp}>
          <h3>Temperamentos:</h3>
          <select className={s.lista} onChange={(e) => handleSelect(e)}>
            {temperaments.map((temp) => (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
        </div>
        <ul >
          {info.temperament.map((e) => e + " ")}
        </ul>
        <button className={s.btnCrear}type="submit">Crearlo</button>
        {info.temperament.map((e) => (
        <div>
          <p>{e}</p>
          <button className={s.btnVolver} type="button" onClick={()=>handleDelete(e)}>
            x
          </button>
        </div>
      ))}
       
      </form>
      
    </div>
  );
}
