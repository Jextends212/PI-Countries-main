import React from "react";
import style from "../Styles/Paginado.module.css";

export default function Paginado({ countrysPerPage, allCountrys, paginado }) {
  const pageNumbers = [];

  const { topnav} = style;

  //Numero de Pags.

  for (let i = 1; i <= Math.ceil(allCountrys / countrysPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav  className={topnav}>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <a onClick={() => paginado(number)}>{number}</a>
          ))}
      </ul>
    </nav>
  );
}
