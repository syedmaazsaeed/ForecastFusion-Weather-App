import { useState } from 'react';
import search from './assets/Icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';

function App() {
  const [input, setInput] = useState('');
  const { weather, thisLocation, values, place, setPlace } = useStateContext();

  const submitCity = () => {
    setPlace(input);
    setInput('');
  };

  return (
    <div className='w-full h-screen text-white px-9'>
      <nav className='w-full p-3 flex flex-col md:flex-row justify-between items-center md:justify-between'>
        <h1 className='font-bold tracking-wide text-3xl mb-4 md:mb-0'>Climatic Weather App</h1>
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
          </div>
        </div>
      </nav>
      <BackgroundLayout />
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />

        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {
            values?.slice(1, 7).map(curr => (
              <MiniCard
                key={curr.datetime}
                time={curr.datetime}
                temp={curr.temp}
                iconString={curr.conditions}
              />
            ))
          }
        </div>
      </main>
    </div>
  );
}

export default App;
