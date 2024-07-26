import { useState, useEffect } from 'react';
import search from './assets/Icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard, HourlyForecast } from './Components'; // Import WeatherMap

function App() {
  const [input, setInput] = useState('');
  const { weather, values, place, setPlace } = useStateContext();
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      recognitionInstance.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setInput(result);
        setPlace(result);
      };
      setRecognition(recognitionInstance);
    } else {
      console.log('SpeechRecognition API not supported');
    }
  }, []);

  const startVoiceSearch = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const submitCity = () => {
    setPlace(input);
    setInput('');
  };

  return (
    <div className='w-full h-screen text-white px-9'>
      <nav className='w-full p-3 flex flex-col md:flex-row justify-between items-center md:justify-between'>
        <h1 className='font-bold tracking-wide text-2xl sm:text-3xl mb-4 md:mb-0 whitespace-nowrap  '>Climatic Weather App</h1>
        <div className='flex justify-center items-center w-full md:w-auto'>
          <div className='bg-black w-full md:w-[20rem] shadow-2xl rounded-full flex items-center p-2 gap-2'>
            <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
            <input
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  submitCity();
                }
              }}
              type="text"
              placeholder='Search city'
              className='focus:outline-none w-full text-white bg-black text-lg rounded-full p-2'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={startVoiceSearch} className='bg-green-500 p-2 rounded-full text-white'>
              🎤
            </button>
          </div>
        </div>
      </nav>
      <BackgroundLayout />
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard
          place={place}
          windspeed={weather.windspeed}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.feelslike}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />
        <div className='flex justify-center gap-4 flex-wrap w-full md:w-[60%]'>
          {values?.slice(1, 7).map(curr => (
            <MiniCard
              key={curr.datetime}
              time={curr.datetime}
              temp={curr.temp}
              iconString={curr.conditions}
            />
          ))}
        </div>
        <HourlyForecast />
      </main>
    </div>
  );
}

export default App;
