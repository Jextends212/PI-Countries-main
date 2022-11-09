const { DataTypes,Op } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo


  sequelize.define('Activity', {

    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },

    dificultad: {
      type: DataTypes.INTEGER,
      [Op.between]: [0,5],
      allowNull: false
    },

    duracion: {

      type:DataTypes.INTEGER,
      allowNull: true
    },

    temporada: {

      type: DataTypes.ENUM('Verano', 'Otoño', 'Primavera', 'Invierno', 'Summer', 'Autumn', 'Winter', 'Spring'),
      allowNull: false
    },
  },
  {
    timestamps:false
  }
  );

};