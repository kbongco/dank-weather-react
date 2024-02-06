import { DryAndWetTropics } from "./interfaces/constant-interface";

export const dryAndWetTropics:DryAndWetTropics[] = [{
  dry: ['December', 'January', 'February', 'March', 'April', 'May'],
  wet: ['June', 'July', 'August', 'September', 'October', 'November']
}];

export const the12Seasons: string[] = [
  "Winter",
  "Fools Spring",
  "Second Winter",
  "Spring of Deception",
  "Third Winter",
  "The Pollening",
  "Actual Spring",
  "Summer",
  "Hells Front Porch",
  "False Fall",
  "Second Summer",
  "Actual Fall",
];
export const southernHemisphereSzn = [{
  summer: ['December', 'January', 'February'],
  fall: ['March', 'April', 'May'],
  winter: ['June', 'July', 'August'],
  spring: ['September', 'Ocobter', 'November']

}]
export const date = new Date();
export const month = date.getMonth() + 1;