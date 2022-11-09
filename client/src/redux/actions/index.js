import axios from "axios";
import { Touppercase } from "../../libs";
//Action Types:
export const GET_ALL_COUNTRYS = "GET_ALL_COUNTRYS";
export const GET_COUNTRY_DETAILS = "GET_COUNTRY_DETAILS";
export const GET_ALL_COUNTRYS_ORDER = "GET_ALL_COUNTRYS_ORDER";
export const GET_ALL_ACTIVITY = "GET_ALL_ACTIVITY";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const COUNTRYS_W_ACTIVITIES = "COUNTRYS_W_ACTIVITIES";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";

export const getAllCountrys = () => {
  return async function (dispatch) {
    const response = await fetch("http://localhost:3001/country/all");
    const json = await response.json();
    return dispatch({ type: GET_ALL_COUNTRYS, payload: json });
  };
};

export const getAllActivities = () => {
  return async function (dispatch) {
    const response = await fetch(
      "http://localhost:3001/country/all/activities"
    );
    const json = await response.json();
    return dispatch({ type: GET_ALL_ACTIVITY, payload: json });
  };
};

export const filterCountry = (payload) => {
  return {
    type: COUNTRYS_W_ACTIVITIES,
    payload,
  };
};

export const AscDes = (payload) => {
  return {
    type: GET_ALL_COUNTRYS_ORDER,
    payload,
  };
};

export const getNameCountry = (payload) => {
  try {
    const payload2 = Touppercase(payload);

    return async function (dispatch) {
      const response = await fetch(
        `http://localhost:3001/country?name=${payload2}`
      );
      const json = await response.json();
      if (json.error) {
        return alert("Country Not Found");
      }
      return dispatch({ type: SEARCH_COUNTRY, payload: json });
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

export const postActivity = (payload) => {

  return async function (dispatch) {

    const response = await axios.post("http://localhost:3001/country/activities",payload);
    console.log(response);
    return response;
  }


};

export const getDetail = (payload) =>{

  return async function (dispatch) {
    try{

      let json = await axios.get("http://localhost:3001/country/"+payload);

      return dispatch({
        type:GET_COUNTRY_DETAILS,
        payload: json.data
      })

    }catch(err){

      console.error(err.message);

    }
  }
};
