import React from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, deleteDog } from "../actions/indexActions";
import { useEffect } from "react";
import styles from "./Details.module.css"
// import { useParams } from "react-router-dom";

export default function Detail(props) {
  const navigation = useNavigate();
  const { dogId } = useParams();
  const dispatch = useDispatch();

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteDog(dogId));
    alert("Se ha ido");
    navigation("/home");
  }
  useEffect(() => {
    dispatch(getDetails(dogId));
  }, [dispatch, dogId]);
  const myDog = useSelector((state) => state.details);
  console.log(myDog);
  //   const cholito= myDog.temperaments.map((e) => {return(<p>{e.name}</p>)})
  return (
    <>
      <div className={styles.primero}>
        {myDog.name ? (
          <div className={styles.segundo} >
            <NavLink className={styles.bot} to="/home">Volver al Inicio</NavLink>
            <h1>Soy un: {myDog.name}</h1>
            <img src={myDog.img ? myDog.img : myDog.image} />
            <h4>Mido: {myDog.height} cm</h4>
            <h4>Mi peso: {myDog.weight}</h4>
            <h4>Mi tiempo de vida: {myDog.life_span} años</h4>
            <h5>Mis temperamentos: </h5>
            {myDog.CreateInDB
              ? myDog.temperaments.map((e, i) => {
                  return <p key={i}>{e.name}</p>;
                })
              : myDog.temperament + " "}
              {myDog.CreateInDB
              ? <button onClick={(e)=>handleDelete(e)}>Eliminar cachorro</button>:
              null}
          </div>
        ) : (
          <p className={styles.cargando}>Cargando...</p>
        )}
       
        
      </div>
    </>
  );
}
