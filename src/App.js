import React, { useState } from 'react';
import './App.css';

function App() {
  let [city, setCity] = useState('');

  let [wdetails, setWdetails] = useState();

  let[loading, setLoading] = useState(false);

  let getData = (e) => {
    setLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=751d66e130befad396405dc13796a57c`)
      .then((res) => res.json())
      .then((finalresponse) => {
        if (finalresponse.cod === '404') {
          setWdetails(undefined);
        } else {
          setWdetails(finalresponse);
          console.log(finalresponse);
        }
      });
    setLoading(false);

    e.preventDefault();
    // console.log(city);
    setCity('');
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#4aacb1] to-[#348f91] flex items-center justify-center px-4">
      <div className="max-w-[600px] w-full bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-[#4aacb1] mb-8">Simple Weather App</h1>

        <form onSubmit={getData} className="flex items-center justify-center gap-4 mb-8">
          <input
            type="text" value={city} onChange={(e) => setCity(e.target.value)}
            placeholder="Search city name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#4aacb1]"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#4aacb1] text-white font-semibold rounded-xl hover:bg-[#348f91] transition-all"
          >
            Search
          </button>
        </form>

        <div className="bg-[#f0f9fa] rounded-2xl p-6 text-center shadow-md">
          
          <div className={`flex justify-center items-center ${loading ? '' : 'hidden'}`} >
            <img
              src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
              alt="Loading..."
              className="w-20 h-20"
            />
          </div>


          {wdetails !== undefined ?
            (
              <>
                <h3 className="font-bold text-3xl text-gray-700 mb-2">
                  {wdetails.name} <span className="text-yellow-400">{wdetails.sys.country}</span>
                </h3>
                <h2 className="font-bold text-5xl text-[#4aacb1] mb-4">{wdetails.main.temp}°C</h2>
                <div className="flex justify-center mb-2">
                  <img
                    src={`https://openweathermap.org/img/wn/${wdetails.weather[0].icon}@2x.png`}
                    alt="weather icon"
                    className="w-16 h-16"
                  />

                </div>
                <p className="text-gray-600 text-lg">{wdetails.weather[0].main}</p>
              </>
            )
            :
            (
              "No Data Found"
            )

          }
        </div>
      </div>
    </div>

  );
}

export default App;
