import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function meetRequirements(temperature) {
  return temperature > 85 || temperature < 32 ? true : false;
}

export function useSpecialIcon(requirementsMet, icon, temperature) {
  if (requirementsMet) {
    if (temperature > 85) {
      return (
        <FontAwesomeIcon icon={faFire} />
      )
    }
  }
}