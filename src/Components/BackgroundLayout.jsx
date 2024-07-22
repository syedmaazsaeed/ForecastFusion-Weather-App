import { useState , useEffect } from "react";
import { useStateContext } from "../Context";

import Clear from '../assets/Images/Clear.jpg';
import Fog from '../assets/Images/fog.png';
import Cloudy from '../assets/Images/Cloudy.jpg';
import Rainy from '../assets/Images/Rainy.jpg';
import Snow from '../assets/Images/snow.jpg';
import Stormy from '../assets/Images/Stormy.jpg';
// import Sunny from '../assets/Images/Sunny.jpg';

const BackgroundLayout = () => {
  const { weather } = useStateContext();
  const [image, setImage] = useState(Clear);

  console.log(weather);

  useEffect(() => {
    if (weather.conditions) {
      let imageString = weather.conditions;

      if (imageString.toLowerCase().includes('clear')) {
        setImage(Clear);
      } else if (imageString.toLowerCase().includes('cloud')) {
        setImage(Cloudy);
      } else if (imageString.toLowerCase().includes('rain') || imageString.toLowerCase().includes('shower')) {
        setImage(Rainy);
      } else if (imageString.toLowerCase().includes('snow')) {
        setImage(Snow);
      } else if (imageString.toLowerCase().includes('fog')) {
        setImage(Fog);
      } else if (imageString.toLowerCase().includes('thunder') || imageString.toLowerCase().includes('storm')) {
        setImage(Stormy);
      } 
    }
  }, [weather]);

  return (
    <img src={image} alt="weather_image" className="h-screen w-full fixed left-0 top-0 -z-[10]" />
  );
}

export default BackgroundLayout;
