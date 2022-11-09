import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from "../redux/actions/index";
import styles from "../Styles/Info.module.css";

export default function AllActivities() {
  const dispatch = useDispatch();
  const { act } = styles;

  useEffect(() => {
    dispatch(actions.getAllActivities());
  }, [dispatch]);

  const allActivities = useSelector((state) => state.countryActivity);

  return (
    <div>
      {allActivities.allActivities ? (
        <div className={act}>
          <h1>Watch All The Activities!</h1>
          <img src="https://s1.1zoom.me/big0/769/Handbag_Radio_Suitcase_Hat_551263_1280x951.jpg" alt="Not found">
          </img>

          
          {allActivities.allActivities.map((a) => {
            return (
              <div>
                <div >
                 
                </div>
                <table>
                  <tr>
                    <th>Name Of Activity</th>
                    <th>Activity Difficult</th>
                    <th>Activity Duration</th>
                    <th>Activity Season</th>
                    <th>Activity ID</th>
                  </tr>

                  <tr>
                    <td>{a.nombre}</td>
                    <td>{a.dificultad}</td>
                    <td>{a.duracion} hours</td>
                    <td>{a.temporada}</td>
                    <td>{a.id}</td>
                  </tr>


                  
                </table>

               
              </div>
            );
          })}
        </div>
      ) : (
        <h1>
          Dont have Any Activities yet, please{" "}
          <Link to="/create-activity"></Link>create One!
        </h1>
      )}
    </div>
  );
}
