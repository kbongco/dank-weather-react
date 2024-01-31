import { Button } from '@mantine/core';
import ButtonProps from './button-interface';

export default function WeatherButton({variant, size, radius, buttonText } :ButtonProps) {
  return (
    <>
      <div className='button-container'>
        <Button 
          variant={variant}
          size={size}
          radius={radius}>
          {buttonText}
        </Button>
      </div>
    </>
  )
}