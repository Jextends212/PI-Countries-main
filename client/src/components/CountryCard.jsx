import React from "react";
import { Link } from "react-router-dom";
import s from "../Styles/Detail.module.css";

const CountryCard = ({ flag, name, region, id }) => {
  
  const {card, content, front, back} = s;

  return (
    <div className= {card}>
      <div className={content}>
        <div className= {front}>
          <Link to={`/home/${id}`}>
            <img src={flag} alt="img NOT found"></img>
            <h4>{region}</h4>
          </Link>
          </div>
          <div className={back}>
          <Link to={`/home/${id}`}>
            <h3>{name}</h3>
            </Link>
            
          </div>
          
           
            
  
      </div>
    </div>
  );
};

export default CountryCard;
