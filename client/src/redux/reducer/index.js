import {
  GET_ALL_COUNTRYS,
  GET_COUNTRY_DETAILS,
  COUNTRYS_W_ACTIVITIES,
  GET_ALL_ACTIVITY,
  GET_ALL_COUNTRYS_ORDER,
  SEARCH_COUNTRY,
  CREATE_ACTIVITY,
} from "../actions";

import {
  sortArray,
  reverseArray,
  sortByPopulationPlus,
  sortByPopulationMinus,
} from "../../libs";

const initialState = {
  countrys: [],
  auxCountrys: [],
  countryActivity: [],
  searched: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRYS:
      return {
        ...state,
        countrys: action.payload,
        auxCountrys: action.payload,
      };

    case GET_ALL_ACTIVITY:
      return {
        ...state,
        countryActivity: action.payload,
      };

    //FILTERS ************************************************************
    case COUNTRYS_W_ACTIVITIES:
      let allCountrys = state.countrys;
      allCountrys = state.auxCountrys;

      if (action.payload === "CountryOutActivities") {
        const filtered = allCountrys.filter((c) => c.activity === null);

        return {
          ...state,
          countrys: filtered,
        };
      } else {
        const filtered = allCountrys.filter((c) => c.activity !== null);

        return {
          ...state,
          countrys: filtered,
        };
      }

    case GET_ALL_COUNTRYS_ORDER:
      if (action.payload === "asc") {
        let y = state.countrys;
        let x = state.auxCountrys;

        var organizado = y.sort(sortArray);
        var organizado2 = x.sort(sortArray);

        return {
          ...state,
          countrys: organizado,
          auxCountrys: organizado2,
        };
      }
      if (action.payload === "des") {
        return {
          ...state,
          countrys: state.countrys.sort(reverseArray),
          auxCountrys: state.auxCountrys.sort(reverseArray),
        };
      }

      if (action.payload === "population asc number") {
        return {
          ...state,
          countrys: state.countrys.sort(sortByPopulationPlus),
          auxCountrys: state.auxCountrys.sort(sortByPopulationPlus),
        };
      }

      if (action.payload === "population des number") {
        return {
          ...state,
          countrys: state.countrys.sort(sortByPopulationMinus),
          auxCountrys: state.auxCountrys.sort(sortByPopulationMinus),
        };
      }

      if (action.payload === "Americas") {
        let allCountrys = state.countrys;
        allCountrys = state.auxCountrys;

        const filtered = allCountrys.filter((c) => c.continente === "Americas");

        return {
          ...state,
          countrys: filtered,
        };
      }

      if (action.payload === "AllContinents") {
        return {
          ...state,
          countrys: state.auxCountrys,
        };
      }

      if (action.payload === "Oceania") {
        let allCountrys = state.countrys;
        allCountrys = state.auxCountrys;

        const filtered = allCountrys.filter((c) => c.continente === "Oceania");

        return {
          ...state,
          countrys: filtered,
        };
      }

      if (action.payload === "Africa") {
        let allCountrys = state.countrys;
        allCountrys = state.auxCountrys;

        const filtered = allCountrys.filter((c) => c.continente === "Africa");

        return {
          ...state,
          countrys: filtered,
        };
      }

      if (action.payload === "Europe") {
        let allCountrys = state.countrys;
        allCountrys = state.auxCountrys;

        const filtered = allCountrys.filter((c) => c.continente === "Europe");

        return {
          ...state,
          countrys: filtered,
        };
      }

      if (action.payload === "Asia") {
        let allCountrys = state.countrys;
        allCountrys = state.auxCountrys;

        const filtered = allCountrys.filter((c) => c.continente === "Asia");

        return {
          ...state,
          countrys: filtered,
        };
      }

    case SEARCH_COUNTRY:
      return {
        ...state,
        countrys: action.payload,
      };

    case CREATE_ACTIVITY:
      return {
        ...state,
      };

    case GET_COUNTRY_DETAILS:
      return {
        ...state,
        searched: action.payload.Country[0],
      };

    default:
      return state;
  }
};

export default rootReducer;
