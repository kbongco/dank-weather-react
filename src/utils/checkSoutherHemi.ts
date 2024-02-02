const southernHemisphereSzn = [{
  summer: ['December', 'January', 'February'],
  fall: ['March', 'April', 'May'],
  winter: ['June', 'July', 'August'],
  spring: ['September', 'Ocobter', 'November']

}]

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