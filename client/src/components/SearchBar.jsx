import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../redux/actions/index";

export default function SearchBar() {
  const dispatch = useDispatch();
  //Estado local name
  const [name, setName] = useState("");

  //Handlers ************************

  //Este handler lee el input y modifica el estado local name ante cualquier cambio.
  function handlerinputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  //Este handler despacha la action una vez el usuario de click en search.
  function handlerSubmit(e) {
    e.preventDefault();
    if (!name) {
      return alert("Please type something...");
    }

    const pattern = new RegExp("^[a-zA-Z ]+$");

    if (!pattern.test(name)) {
      return alert("Sorry we just admit letters.");
    }

    dispatch(actions.getNameCountry(name));

    setName('');
    
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search a Country..."
        onChange={(e) => handlerinputChange(e)}
      ></input>

      <button type="submit" onClick={(e) => handlerSubmit(e)}>
        Search
      </button>
    </div>
  );
}
