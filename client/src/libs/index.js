//LIBRARIES ...

//ORDER FUNCTIONS *************

export function sortArray(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export function reverseArray(a, b) {
  if (a.name > b.name) {
    return -1;
  }
  if (a.name < b.name) {
    return 1;
  }
  return 0;
}

//ORDER BY POPULATION ******
export function sortByPopulationPlus(a, b) {
  return b.poblacion - a.poblacion;
}

export function sortByPopulationMinus(a, b) {
  return a.poblacion - b.poblacion;
}

//CASE CHANGER ******
export function Touppercase(str) {
  if (str.length < 1) {
    return str.charAt(0).toUpperCase();
  } else {
    let str2 = str.toLowerCase();

    return str2.charAt(0).toUpperCase() + str2.slice(1);
  }
}

//ULTIMATE VALIDATORS ************************

export function validatorsname(value) {
  if (!value || value.length < 3 || value.length > 25) {
    return false;
  } else {
    return true;
  }
}

export function valitorsDifi(value) {
  const x = Math.round(value);

  if (x > 5 || x < 1) {
    return false;
  } else {
    return true;
  }
}

export function validatorsDura(value) {
  const x = Math.round(value);

  if (x > 48 || x < 0) {
    return false;
  } else {
    return true;
  }
}

export function validatorsSeason(value) {
  const converted = Touppercase(value);

  if (
    converted !== "Verano" &&
    converted !== "Invierno" &&
    converted !== "Primavera" &&
    converted !== "Otoño" &&
    converted !== "Summer" &&
    converted !== "Autumn" &&
    converted !== "Winter" &&
    converted !== "Spring"
  ) {
    return false;
  } else {
    return true;
  }
}

export function validatorsCountry(value, allCountrys) {
  const converted = Touppercase(value);
  const found = allCountrys.find((element) => element.name === converted);

  if (!found) {
    return false;
  } else {
    return true;
  }
}

export function area(value) {
  if (!value) return;
  if (value > 1000000) {
    return (
      Math.round((value / 1000000) * 100) / 100 + "Million square kilometers"
    );
  } else if (value > 100000) {
    return value / 1000 + " Square kilometers";
  } else if (value > 10000) {
    return value / 1000 + " Square kilometers";
  } else {
    return value + " Square Meters";
  }
}

export function numerar(value) {
  if (!value) return;
  let res = [];
  const newNumber = value.toString().split("").reverse().join("");
  for (let i = 1; i <= newNumber.length; i++) {
    if ((i % 3) - 1 === 0) res.push(".");
    res.push(newNumber[i - 1]);
  }
  res.shift();
  res = res.reverse().join("");
  return res;
}
