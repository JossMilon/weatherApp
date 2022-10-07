import { useQuery } from "react-query";
import axios from "axios";
import { weatherCode } from "../logic/weatherCode";

const getWeatherData = async (citySelected) => {
  if (!citySelected) {
    return;
  }
  const res = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${citySelected.latitude}&longitude=${citySelected.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant&timezone=Europe/Paris`
  );
  return res;
};

export function CityWeather({ citySelected }) {
  const weatherForecast = useQuery(["weather", citySelected], () =>
    getWeatherData(citySelected)
  );
  const weekDays = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  if (!citySelected) {
    return <div className="w-1/2">No city selected yet</div>;
  } else if (weatherForecast.isLoading) {
    return <div className="w-1/2">Loading...</div>;
  } else {
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weatherForecast.data.data.daily.time[i]);
      const windDir =
        -90 + weatherForecast.data.data.daily.winddirection_10m_dominant[i];
      return (
        <div className="w-1/2">
          <div className="bg-gray-600 m-1 p-3 rounded-md">
            <div className="flex items-center mb-2">
              {/* <p className="w-12 h-12 rounded-md bg-gray-100 mr-3"></p> */}
              <div className="text-lg text-gray-100">
                <p>{`${
                  weekDays[currentDate.getDay()]
                } ${currentDate.getDate()} ${
                  months[currentDate.getMonth()]
                } `}</p>
                <p className="text-gray-300 text-base uppercase">
                  {
                    weatherCode[weatherForecast.data.data.daily.weathercode[i]]
                      .desc
                  }
                </p>
              </div>
            </div>
            <ul className="flex justify-around font-semibold">
              <li className="text-orange-400 flex flex-col items-center">
                <p className="mb-3">
                  <label className="text-lg">
                    {weatherForecast.data.data.daily.temperature_2m_min[i]}
                  </label>
                  <label className="text-xs font-light">
                    {weatherForecast.data.data.daily_units.temperature_2m_min}
                  </label>
                </p>
                <p>MIN.</p>
              </li>
              <li className="text-red-400 flex flex-col items-center">
                <p className="mb-3">
                  <label className="text-lg">
                    {weatherForecast.data.data.daily.temperature_2m_max[i]}
                  </label>
                  <label className="text-xs font-light">
                    {weatherForecast.data.data.daily_units.temperature_2m_max}
                  </label>
                </p>
                <p>MAX.</p>
              </li>
              <li className="text-blue-400 flex flex-col items-center">
                <p className="mb-3">
                  <label className="text-lg">
                    {weatherForecast.data.data.daily.windspeed_10m_max[i]}
                  </label>
                  <label className="text-xs font-light">
                    {weatherForecast.data.data.daily_units.windspeed_10m_max}
                  </label>
                </p>
                <p>WIND.</p>
              </li>
              <li className="text-green-400 flex flex-col items-center">
                <p
                  className="mb-3"
                  style={{ transform: `rotate(${windDir}deg)` }}
                >
                  <label className="text-2xl">➢</label>
                </p>
                <p>DIR.</p>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }
}
