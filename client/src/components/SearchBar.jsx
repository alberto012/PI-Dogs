import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import s from './Search.module.css'
import getNameDogs from "../actions/indexActions"



export default function SearchBar (){
  const dispatch= useDispatch()
  const [name, setName]=useState("")
  
  function handleInput(e){
    e.preventDefault()
    setName(e.target.value)
   
  }
function handleSubmit(e){
  e.preventDefault()
  dispatch(getNameDogs(name))
 setName('')

}
  return (
    <div >
      <input 
      className={s.search}
      type="text"
      placeholder="Buscar"
      onChange={(e)=> handleInput(e)}
      value= {name}
      />
      <button className={s.botoncito}type="submit"onClick={(e)=>handleSubmit(e)}>Buscar</button>
    </div>
  )
}