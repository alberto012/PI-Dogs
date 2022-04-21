const initialState = {
  dogs: [],
  AllDogs: [],
  temperament: [],
  temp:[],
  weight: [],
  details: {},
};
const estados = initialState;
export default function rootReducer(state = estados, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        AllDogs: action.payload,
      };
    case "GET_TEMP": {
      return {
        ...state,
        temperament: action.payload,
      };
    }
    case "POST_DOGS":
      return {
        ...state,
      };
      case "GET_DETAIL":
      return {
        ...state,
        details: action.payload
      };
    case "GET_TP":
      return {
        ...state,
        temp: action.payload,
      };
    case "FILTER_TEMPERAMENT":
      const allTemp = state.AllDogs;
      const filter =
        action.payload === "temperament"
          ? allTemp
          : allTemp.filter((e) => e.temperament?.includes(action.payload));
      return {
        ...state,
        dogs: filter,
      };
      case "DELETE_DOG":
        return{
          ...state,
        }
    case "GET_ORDER":
      const abc =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: abc,
      };
    case "ORDEN_WEIGHT":
      function pFil(e) {
        let p = e.split("-");
        let min = parseInt(p[0]);
        let max = parseInt(p[1]);
        return Math.round((min + max) / 2);
      }

      let peso =
        action.payload === "weight_max"
          ? state.dogs.sort(function (a, b) {
              if (pFil(a.weight) < pFil(b.weight)) {
                return 1;
              }
              if (pFil(a.weight) > pFil(b.weight)) {
                return -1;
              } else {
                return 0;
              }
            })
          : state.dogs.sort(function (a, b) {
              if (pFil(a.weight) > pFil(b.weight)) {
                return 1;
              }
              if (pFil(a.weight) < pFil(b.weight)) {
                return -1;
              } else {
                return 0;
              }
            });
      // const peso =
      //   action.payload === "weight_max"
      //     ? state.dogs.sort(function (a, b) {
      //         if (pFil(a.weight) < pFil(b.weight)) {
      //           return 1;
      //         }
      //         if (pFil(a.weight) > pFil(b.weight)) {
      //           return -1;
      //         }
      //         return 0;
      //       })
      //     : state.dogs.sort(function (a, b) {
      //         if (pFil(a.weight) > pFil(b.weight)) {
      //           return 1;
      //         }
      //         if (pFil(a.weight) > pFil(b.weight)) {
      //           return -1;
      //         }
      //         return 0;
      //       });

      return {
        ...state,
        dogs: peso,
      };
    case "GET_NAME":
      return {
        ...state,
        dogs: action.payload,
      };
    case "FILTER_RAZA":
      const AllDogs = state.AllDogs;
      const razaFilter =
        action.payload === "created"
          ? AllDogs.filter((e) => e.CreateInDB)
          : AllDogs.filter((e) => !e.CreateInDB);
      return {
        ...state,
        dogs: action.payload === "All" ? state.AllDogs : razaFilter,
      };

    // };
    // case "ORDEN_WEIGHT":
    //   const peso =
    //     action.payload === "weight_max"
    //       ? state.dogs.sort(function (a, b) {
    //           if (a.weight > b.weight) {
    //             return -1;
    //           }
    //           if (b.weight > a.weight) {
    //             return 1;
    //           }
    //           return 0;
    //         })
    //       : state.dogs.sort(function (a, b) {
    //           if (a.weight > b.weight) {
    //             return 1;
    //           }
    //           if (b.weight > a.weight) {
    //             return -1;
    //           }
    //           return 0;
    //         });
    //   return {
    //     ...state,
    //     dogs: peso,
    //   };

    default:
      return estados;
  }
}
