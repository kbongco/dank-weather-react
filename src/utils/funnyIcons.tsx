import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faTrowelBricks } from '@fortawesome/free-solid-svg-icons';
export function meetRequirements(temperature) {
  return temperature > 85 || temperature < 32 ? true : false;
}

export function generateSpecialIcon(requirementsMet, temperature) {
  if (requirementsMet) {
    if (temperature > 85) {
      return (
        <FontAwesomeIcon icon={faFire} />
      )
    } else if (temperature < 32) {
      return ( 
        <FontAwesomeIcon icon={faTrowelBricks} />
      )
    }
  } else {
    return '';
  }
}