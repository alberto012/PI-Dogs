import axios from "axios";


export function perrito() {
  return async function (dispatch) {

    try{
const perros = await axios.get("http://localhost:3001/dogs");

return dispatch({
  type: "GET_DOGS",
  payload: perros.data,
  loading: false,
});
    }
    catch (err) {
      return err
    }

  } }


export function getTemperament(){
  return async function(dispatch){
    var temp= await axios.get('http://localhost:3001/temperament', {});
    return dispatch({
      type: "GET_TP",
      payload:temp.data
    })
  }
}
export function postDog(payload){
  return async function(dispatch){
    const data= await axios.post("http://localhost:3001/dog", payload)
    return data
  }
}



export function FiltrosPorTemp() {
  return async function (dispatch) {
    try {
      const temperamento = await axios.get("http://localhost:3001/temperament");

      return dispatch({
        type: "GET_TEMP",
        payload: temperamento.data,
      });
    } catch (err) {
      return err;
    }
  };
}
export function filtros(payload){
  return {
    type:'FILTER_TEMPERAMENT',
    payload,
  }
}
export function orderWeight (payload){
  return {
    type:'ORDEN_WEIGHT',
    payload,
  }
}
export function ordenAZ (payload){
  return {
    type:'GET_ORDER',
    payload,
  }
}
export function razasCreadas(payload){
  return {
    type: "FILTER_RAZA",
    payload,
  }
  
}
export default function getNameDogs(payload){
  return async function (dispatch) {
    try {
      var doguis = await axios.get("http://localhost:3001/dogs?name=" + payload);
      return dispatch ({
        type: "GET_NAME",
        payload:doguis.data
      })
    }
    catch (err) {
      return err
    }
  }
}
export function getDetails(id){
return async function (dispatch) {
  try {
    var info= await axios.get(`http://localhost:3001/dogs/${id}`)
    return dispatch({
      type: "GET_DETAIL",
      payload: info.data
    })
  }catch (err) {
    return err
  }
}
}
export function deleteDog(id){
  return async function (dispatch) {
    try {
      var info= await axios.get(`http://localhost:3001/dogs/${id}`)
      return dispatch({
        type: "DELETE_DOG",
        payload: info.data
      })
    }catch (err) {
      return err
    }
  }
  }