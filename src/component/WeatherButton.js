import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity }) => {
  console.log(cities);
  return (
    <div>
      <Button variant="warning">Current Location</Button>

      {cities.map((item, index) => (
        <Button
          variant="warning"
          key={index}
          onClick={() => setCity(item)}
        >{item}</Button>
      ))}
      console.log("sd")
    </div>
  )
}

export default WeatherButton
