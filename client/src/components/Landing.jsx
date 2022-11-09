import React from "react";
import {Link} from "react-router-dom";
import st from "../Styles/land.module.css";


export default function Landing() {

    const {land} = st;
  
    return(
        <div className={land}>

            <Link to= '/home'>
                <button>Please Click Here To Continue</button>
            </Link>





        </div>
    )
};