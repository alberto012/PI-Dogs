import React from "react";

import s from "./Home.module.css"
import { useEffect, useState } from "react";
import {
  perrito,
  FiltrosPorTemp,
  filtros,
  ordenAZ,
  orderWeight,
  razasCreadas,
} from "../actions/indexActions";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Dogs from "./Dog";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

import Nav from "./NavBar";
export default function Home() {
  const dispatch = useDispatch();
  const AllDogs = useSelector((state) => state.dogs);
  const AllTemps = useSelector((state) => state.temperament);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexLD = currentPage * dogsPerPage;
  const indexFD = indexLD - dogsPerPage;
  const currentDogs = AllDogs.slice(indexFD, indexLD);

  const [acumulador, setAcumulador] = useState("");
  const [orderAZ, setOrderAZ] = useState("");
  const [weight, setWeigth] = useState("");
  const [razas, setRazas] = useState("");

  const paginado = (pageNum) => {
    setCurrentPage(pageNum);
  };
  useEffect(() => {
    dispatch(perrito());
  }, [dispatch]);
  useEffect(() => {
    dispatch(FiltrosPorTemp());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(perrito());
    setCurrentPage(1);
  }
  function handleTemp(e) {
    e.preventDefault();
    dispatch(filtros(e.target.value));
    setCurrentPage(1);
    setAcumulador(e.target.value);
  }
  function handleOrder(e) {
    e.preventDefault();
    dispatch(ordenAZ(e.target.value));
    setCurrentPage(1);
    setOrderAZ(e.target.value);
  }
  function handleWeigth(e) {
    e.preventDefault();
    dispatch(orderWeight(e.target.value));
    setCurrentPage(1);
    setWeigth(e.target.value);
  }
  function handleRazas(e) {
    e.preventDefault();
    dispatch(razasCreadas(e.target.value));
    setCurrentPage(1);
    setRazas(e.target.value);
  }
  return (
    
    <div className= {s.fondos}>
      <Nav/>
      <NavLink style={{textDecoration: "none"}} to="/dog"><button className={s.boton1}>Crear Cachorro</button></NavLink>
      <h1 className= {s.h1}>Welcome to DogStore</h1>
      <button
      className= {s.boton1}
        onClick={(e) => {
          handleClick(e);
          console.log(handleClick(e));
        }}
      >
        Recargalos!
      </button>
      
      <div>
        <select  className= {s.barra} onChange={(e) => handleOrder(e)}>
          <option  value="All">Ordenar</option>
          <option value="asc">Orden ascendente</option>
          <option value="desc">Orden Descendete</option>
        </select>
        <select className= {s.barra} onChange={(e) => handleTemp(e)}>
          <option value="temperament">Temperament</option>
          {AllTemps?.map((e) => (
            <option value={e.name} key={e.id}>
              {e.name}
            </option>
          ))}
        </select>
        <select className= {s.barra} onChange={(e) => handleWeigth(e)}>
          <option value="All">Peso</option>
          <option value="weight_max">Pesados</option>
          <option value="weight_min">Livianos</option>
        </select>
        <select className= {s.barra} onChange={(e) => handleRazas(e)}>
          <option value="All">Razas</option>
          <option value="created">Creadas</option>
          <option value="api">Existentes</option>
        </select>
        
        <SearchBar />

        <Paginado
          dogsPerPage={dogsPerPage}
          AllDogs={AllDogs.length}
          paginado={paginado}
        />
        <div className={s.contenedor}>{currentDogs.map((e) => {
          return (
            <NavLink style={{ textDecoration: 'none' }}to={`/dog/${e.id}`} key={e.id}>
            <Dogs
              key={e.id}
              name={e.name}
              weight={e.weight}
              height={e.height}
              image={e.image? e.image : e.image}
              temperament={
                !e.CreateInDB ? e.temperament + " "
                : e.temperaments.map((e)=>e.name + " ")
              }
            />
            </NavLink>
          );
        })}
        </div>
      </div>
    </div>
  );
}
