const dryAndWetTropics = [{
  dry: ['December', 'January', 'February', 'March', 'April', 'May'],
  wet: ['June', 'July', 'August', 'September', 'October', 'November']
}];

export default function isTropicSzn(lon, lat, setState, currentMonth) {
  if (lat < 23.5 && lat > -23.5) {
    const tropicsInfo = dryAndWetTropics[0];
    if (tropicsInfo.dry.includes(currentMonth)) {
      setState('dry');
    } else if (tropicsInfo.wet.includes(currentMonth)) {
      setState('wet');
    }
  } else {
    setState('');
  }
}