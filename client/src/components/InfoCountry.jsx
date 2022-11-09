import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from "../redux/actions/index";
import { area, numerar } from "../libs";
import styles from "../Styles/Info.module.css";

export default function InfoCountry() {
  const dispatch = useDispatch();
  const link = useParams();
  const { card } = styles;

  useEffect(() => {
    dispatch(actions.getDetail(link.id));
  }, [dispatch]);

  const countryDetail = useSelector((state) => state.searched);

  return (
    <div>
      {countryDetail ? (
        <nav>
          <div>
            <div>
              <div className={card}>
                <img src={countryDetail.bandera} alt="img NOT found"></img>
                <h2>{countryDetail.name}</h2>

                <div className={card}>
                  <p>Country Identificator: </p>
                  <h4>{countryDetail.id}</h4>
                </div>
              </div>
              <div className={card}>
                <p>Continent: </p>
                <h4>{countryDetail.continente}</h4>
              </div>
              <div className={card}>
                <p>Capital: </p>
                <h4>{countryDetail.capital}</h4>
              </div>

              <div className={card}>
                <p>Subregion: </p>
                <h4>{countryDetail.Subregion}</h4>
              </div>

              <div className={card}>
                <p>Area: </p>
                <h4>{area(countryDetail.area)}</h4>
              </div>

              <div className={card}>
                <p>Population number: </p>
                <h4>{numerar(countryDetail.poblacion)}</h4>
              </div>

              {countryDetail.activity ? (
                <div className={card}>
                  <p>Activities: </p>
                  <h4>
                    | {countryDetail.activity} | Activity ID:{" "}
                    {countryDetail.activityid} |
                  </h4>
                </div>
              ) : (
                <h4>This Country Dont Have Any Activities Yet</h4>
              )}
            </div>
          </div>
        </nav>
      ) : (
        <h1>404 Information Not Found</h1>
      )}
    </div>
  );
}
