export function displaySznInfo(temperature, currentMonth, the12Seasons) {
  if (
    currentMonth === "January" ||
    currentMonth === "February" ||
    currentMonth === "December"
  ) {
    return the12Seasons[0];
  } else if (
    (currentMonth === "January" && temperature > 50) ||
    (currentMonth === "February" && temperature > 50)
  ) {
    return the12Seasons[1];
  } else if (
    (currentMonth === "March" && temperature < 40) ||
    (currentMonth === "April" && temperature < 40)
  ) {
    return the12Seasons[2];
  } else if (currentMonth === "March" && temperature > 40) {
    return the12Seasons[3];
  } else if (currentMonth === "March" && temperature < 40) {
    return the12Seasons[4];
  } else if (currentMonth === "April") {
    return the12Seasons[5];
  } else if (currentMonth === "April" || currentMonth === "May") {
    return the12Seasons[6];
  } else if (
    currentMonth === "June" ||
    currentMonth === "July" ||
    currentMonth === "August"
  ) {
    return the12Seasons[7];
  }
}


export function determineSeason(lat, currentMonth, temperature, dryAndWetTropics, the12Seasons, southernHemisphereSzn) {
  // Check if the location is in the tropics
  if (lat < 23.5 && lat > -23.5) {
    for (const tropicSeason in dryAndWetTropics[0]) {
      if (dryAndWetTropics[0][tropicSeason].includes(currentMonth)) {
        console.log(dryAndWetTropics[0][tropicSeason].includes(currentMonth))
        return tropicSeason;
      }
    }
  }

  // Check if the location is in the Southern Hemisphere
  if (lat < 0) {
    const southernHemisphereSzns = southernHemisphereSzn[0];
    for (const southernSeason in southernHemisphereSzns) {
      if (southernHemisphereSzns[southernSeason].includes(currentMonth)) {
        return southernSeason;
      }
    }
  } else {
    return displaySznInfo(temperature, currentMonth, the12Seasons);
  }
}