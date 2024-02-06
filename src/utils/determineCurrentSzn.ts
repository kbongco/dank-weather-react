export function displaySznInfo(temperature, currentMonth, the12Seasons) {
  if (temperature > 45 && currentMonth === 'February') {
    return the12Seasons[1];
  } else if (currentMonth === 'February') {
    return the12Seasons[2]
  } else if (currentMonth === 'January' || currentMonth === 'December' || currentMonth === 'February') {
    return the12Seasons[0];
  } else if (currentMonth === "March" && temperature > 55) {
    return the12Seasons[3];
  } else if (currentMonth === "March" && temperature < 40) {
    return the12Seasons[4];
  } else if (currentMonth === 'April') {
    return the12Seasons[5];
  } else if (currentMonth === 'May') {
    return the12Seasons[6];
  } else if ((currentMonth === 'July' || currentMonth === 'August') || temperature > 87) {
    return the12Seasons[8]
  } else if ((currentMonth === 'June') || (currentMonth === 'July') || (currentMonth === 'August')) {
    return the12Seasons[7];
  } else if (currentMonth === 'September' && temperature < 60) {
    return the12Seasons[9]
  } else if ((currentMonth === 'September') || (currentMonth === 'October') && temperature > 70) {
    return the12Seasons[10]
  } else if ((currentMonth === 'October') || (currentMonth === 'November') && temperature < 65) {
    return the12Seasons[11];
  }
}
// The 12 seasons 
// Winter -- December, January, February 
// Fools Spring --> February > 45
// Second Winter --> February 
// Spring of Deception --> March >  55
// Third Winter --> March and temp < 40
// The Pollening --> April 
// Actual Spring --> May 
// Summer -> June, July, August 
// Hells Front Porch --> July and August temperature > 87
// False Fall --> September and temperature < 60
// Second Summer --> September, October and temperature > 70
// Actual Fall --> October, November and temperature < 65


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