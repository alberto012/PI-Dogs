
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperament } = require("../db");

const doguiListApi = async () => {
    const dogsUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds${API_KEY}`
    );
    const dogsData = await dogsUrl.data.map((d) => {
      return {
        id: d.id,
        name: d.name,
        weigth: d.weigth,
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
  
  module.exports= {todoDogs, doguisDataBase,doguiListApi,getAllTemperaments }