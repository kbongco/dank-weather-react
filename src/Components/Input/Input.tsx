import { Input, InputProps } from '@chakra-ui/react'
import './Input.css';

export default function WeatherInput({ label, placeholder, size }: InputProps) { 
  return ( 
    <div className='input-container'>
      <label>{label}</label>
    <Input placeholder={placeholder}
        size={size} />
    </div>
  )
}