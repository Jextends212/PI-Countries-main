const { Op } = require("sequelize");
const {
  _DB_HOST,
  _DB_NAME,
  _DB_PASS,
  _DB_PORT,
  _DB_USER,
} = require("../config");
const axios = require("axios");
const { Pool } = require("pg");
const { Country, Activity } = require("../db.js");

const pool = new Pool({
  host: _DB_HOST,
  user: _DB_USER,
  password: _DB_PASS,
  database: _DB_NAME,
  port: _DB_PORT,
});

//GET METHODS **************

const getCountrys = async (req, res) => {
  try {
    const Allcountries = await pool.query('select * from "countries"');

    if (!Allcountries.rows[0]) {
      axios.get(`https://restcountries.com/v2/all`).then(async (data) => {
        await Country.sync({ alter: true });

        data.data.map(async (county) => {
          if (county.flags && county.capital) {
            await Country.create({
              id: county.alpha3Code,
              name: county.name,
              bandera: county.flags.svg,
              continente: county.region,
              capital: county.capital,
              Subregion: county.subregion,
              area: county.area,
              poblacion: county.population,
            });
          }
        });
        return res.json({
          message: "Loading Database, please reload the page with F5",
        });
      });
    } else {
      return res.json(Allcountries.rows);
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const getCountryById = async (req, res) => {
  const { id } = req.params;

  try {
    const CountryId = await pool.query(
      'select * from "countries" where id = $1',
      [id]
    );

    if (CountryId.rows[0]) {
      return res.json({
        Country: CountryId.rows
      });
    } else {
      throw new Error(
        "404 Country NOT found, please check the ID or the DB countries"
      );
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCountryByName = async (req, res) => {
  const { name } = req.query;

  try {
    const CountryName = await pool.query(
      'select * from "countries" where name = $1',
      [name]
    );

    if (CountryName.rows[0]) {
      return res.json(CountryName.rows);
    } else {
      const CountryLike = await Country.findAll({
        where: {
          name: { [Op.startsWith]: name },
        },
      });

      if (CountryLike[0]) {
        return res.json(CountryLike);
      } else {
        throw new Error(`404 The Country ${name} NOT found`);
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//POST METHOD **************************

const postActivity = async (req, res) => {
  const { nombre, dificultad, duracion, temporada, countryname } = req.body;

  try {
    if (!nombre || !countryname || !dificultad) {
      throw new Error("You need to complete all the fields...");
    } else {
      if (dificultad > 5 || dificultad < 1) {
        throw new Error("The range of dificult must be 1-5");
      }

      const Country = await pool.query(
        'select * from "countries" where name = $1',
        [countryname]
      );

      if (Country.rows[0]) {
        const newActivity = new Activity({
          nombre,
          dificultad,
          duracion,
          temporada,
        });

        await newActivity.save();
        const countryId = Country.rows[0].id;

        await newActivity.addCountries(Country.rows[0].id);

        const TRHIRD_TABLE = await pool.query(
          'select * from "CountryActivity" where "countryId" = $1',
          [countryId]
        );

        const updated = await pool.query('UPDATE "countries" SET activity = $1, activityid = $2 where id = $3',[nombre, TRHIRD_TABLE.rows[0].ActivityId,countryId])

        return res.status(201).json({
          message: `Activity: ${nombre} created sucessfully in ${countryname}`,
          details: newActivity,
          activityInfo: TRHIRD_TABLE.rows,
        });
      } else {
        throw new Error("404 Country NOT found");
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//FILTER METHODS *********************************

const getCWithActs = async (req, res) => {
  try {
    const AllActivities = await pool.query('select * from "CountryActivity"');

    if (!AllActivities.rows[0]) {
      throw new Error("Dont have Activities yet, please create one.");
    } else {
      //ALMACENAR CADA PAIS QUE CONTENGA UNA ACTIVIDAD EN UN ARRAY.
      let countrysWAct = [];

      for (let i = 0; i < AllActivities.rows.length; i++) {
        countrysWAct.push(AllActivities.rows[i].countryId);
      }

      //NO REPETIR PAISES EN EL ARRAY.

      const responseCountrys = countrysWAct.filter((item, index) => {
        return countrysWAct.indexOf(item) === index;
      });

      let auxArray = [];

      //****************Buscar cada pais que tenga una actividad y almacenarlo ************************************************************ */
      for (let i = 0; i < responseCountrys.length; i++) {
        let CountryId = await pool.query(
          'select * from "countries" where id = $1',
          [responseCountrys[i]]
        );

        auxArray.push(CountryId.rows[0]);
      }

      let Activitys = await pool.query('select * from "Activities"');

      return res.json({
        countrys: auxArray,
        allActivities: Activitys.rows,
        countryActivity: AllActivities.rows,
      });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getCountrys,
  getCountryById,
  getCountryByName,
  postActivity,
  getCWithActs,
};
