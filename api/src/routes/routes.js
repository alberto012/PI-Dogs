
require("dotenv").config();
const { Dog} = require("../db");
const  {todoDogs, doguisDataBase,doguiListApi,getAllTemperaments }= require("../functions.js/functionDogs")


/////// agregar por query
/////// LISTADO 

router.get("/dogs", async (req, res) => {
    const name = req.query.name;
    if (name) {
        const allDogs = await todoDogs();
      let dogsName = await allDogs.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      dogsName.length
        ? res.status(200).json(dogsName)
        : res.status(404).send("no encontrada");
    } else {
        const apiDoguis= await doguiListApi();
      res.status(200).json(apiDoguis);
    }
  });

//////////ENCONTRAR POR EL ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const allDogs = await todoDogs();
    const Filter = allDogs.find((e) => e.id == id);
    if (Filter) {
      res.status(200).json(Filter);
    } else {
      res.status(404).send("Ups! no existe");
    }
  });
  

//////AGREGAR PERRO

  router.post("/dog", async (req, res) => {
    try{
        const dogsDb= await Dog.findAll();
        if(!dogsDb.length){
         let dogsApi= await axios.get(`https://api.thedogapi.com/v1/breeds${API_KEY}`)
            dogsApi= await dogsApi.data.map((e)=>{
                return{
                    name:e.name
                };
            })
            await Dog.bulkCreate(dogsApi);
            return res.status(200).json(dogsApi);
        }
        res.status(200).json(dogsDb);
    }catch(error){
     console.log(error);
    }
});
/////// TEMPERAMENTO DEL PERRO
router.get("/temperament", async (req, res) => {
    let temperaments = await getAllTemperaments();
    res.status(200).send(temperaments);
  });
  module.exports= router;