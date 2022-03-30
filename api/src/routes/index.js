require("dotenv").config();
const { API_KEY } = process.env;
// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { Router } = require("express");
const router = Router();


const doguiListApi = async () => {
  const dogsUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds${API_KEY}`
  );
  const dogsData = await dogsUrl.data.map((d) => {
    return {
      id: d.id,
      name: d.name,
      weight: d.weight,
      height: d.height,
      life_span: d.life_span,
      image: d.image,
      temperament: d.temperament,
    };
  });
  return dogsData;
};
const doguisDataBase = async () => {
  return await Dog.findAll({
    inlclude: {
      model: Temperament,
      attributes: ["name"],
      througth: {
        attributes: [],
      },
    },
  });
};
const todoDogs = async () => {
  let infoApi = await doguiListApi();
  let infoDB = await doguisDataBase();
  let allInfo = infoApi.concat(infoDB);
  return allInfo;
};
/////// agregar por query

// router.get("/", async (req, res) => {
//   const { name } = req.query;
//   const allDogs = await todoDogs();

//   if (name) {
//     const filterDog = allDogs.find((e) => e.name == name);
//     res.status(200).json(filterDog);
//   } else {
//     res.status(200).json(allDogs);
//   }
// });

/////// LISTADO 

  router.get("/dogs", async (req, res) => {
    const name = req.query.name;
    const allDogs = await todoDogs();
console.log(allDogs);
    if (name) {
      let dogsName = await allDogs.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      dogsName.length
        ? res.status(200).json(dogsName)
        : res.status(404).send("no encontrada");
    } else {
      res.status(200).json(allDogs);
    }
  });

//////////ENCONTRAR POR EL ID
router.get("/dogs/:id", async (req, res) => {
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

const getAllTemperaments = async () => {
  const apiTemperaments = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const temperamentsFilter = apiTemperaments.data.map((e) => e.temperament);

  const temperaments = temperamentsFilter.map((e) => e?.split(" "));

  temperaments.forEach((e) => {
    e?.map((e) => {
      e = e.replace(/,/i, "");

      Temperament.findOrCreate({
        where: { name: e },
      });
    });
  });
  const temperamentTypes = await Temperament.findAll();
  // console.log(temperamentTypes);
  return temperamentTypes;
};

/////// TEMPERAMENTO DEL PERRO
router.get("/temperament", async (req, res) => {
  let temperaments = await getAllTemperaments();
  res.status(200).send(temperaments);
});
module.exports = router;
