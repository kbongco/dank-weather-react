export default function checkSouthernHemisphere(lat, currentMonth, southernHemisphereSzn) {
  if (lat < 0) {
    const southernHemisphereSzns = southernHemisphereSzn[0];

    for (const season in southernHemisphereSzns) {
      if (southernHemisphereSzns[season].includes(currentMonth)) {
        return season;
      }
    }
  }
}