export default function funnyWeatherQuotes(temperature, feels_like) {
  if (temperature >= 90 && feels_like > 90) {
    return "Bro, it's way too fcking hot. Remember to hydrate!";
  } else if (temperature >= 80 && feels_like > 80) {
    return "It's getting hot in here, so take off all your clothes";
  } else if (temperature >= 70 && feels_like > 70) {
    return "It's pretty nice out";
  } else if (temperature <= 30 || feels_like < 30) {
    return "It's brick outside";
  } else if (temperature < 20 && feels_like < 20) {
    return "Okay, it's way too fcking cold. Why are you out?";
  } else {
    return "Nothing out of the ordinary here!";
  }
}

