import React from "react";
import s from './paginado.module.css'
export default function Paginado({ dogsPerPage, AllDogs, paginado }) {
  const pageNumber = [];
  for (let i = 0; i <= Math.ceil(AllDogs / dogsPerPage) - 1; i++) {
    pageNumber.push(i+1);
  }

  
  return (
    <nav>
      <div className={s.paginado}>
      <ul className= 'paginado'>
      
         
        
        {pageNumber && 
        pageNumber.map(number => (
           <button  className= {s.paginado} key={number}>

             <a onClick={() => paginado(number)}>{number}</a>
       
           </button>
          ))}
          
      </ul>
      </div>
      </nav>
  );
}
