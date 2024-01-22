import { Button, ButtonGroup, ButtonProps } from '@chakra-ui/react'

export default function WeatherButton({colorScheme, size, buttonText } :ButtonProps) {
  return (
    <>
      <div className='button-container'>
        <Button colorScheme={colorScheme}
          size={size}>
          {buttonText}
          </Button>
      </div>
    </>
  )
}