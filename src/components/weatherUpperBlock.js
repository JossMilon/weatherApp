import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
} from "phosphor-react";

export function WeatherUpperBlock({ weatherForecast, index }) {
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
  const currentDate = new Date(weatherForecast.data.data.daily.time[index]);
  const weatherCode = weatherForecast.data.data.daily.weathercode[index];
  return (
    <div className="flex items-center mb-2">
      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gray-100 mr-3">
        {weatherCode === 0 ? (
          <Sun size={32} />
        ) : weatherCode === (1 || 2) ? (
          <CloudSun Sun size={32} />
        ) : weatherCode === (3 || 45) ? (
          <Cloud Sun size={32} />
        ) : weatherCode === (48 || 51) ? (
          <CloudFog Sun size={32} />
        ) : weatherCode === (53 || 55 || 68 || 69 || 70 || 80 || 81 || 82) ? (
          <CloudRain Sun size={32} />
        ) : weatherCode ===
          (56 || 57 || 66 || 67 || 71 || 73 || 75 || 77 || 85 || 86) ? (
          <CloudSnow Sun size={32} />
        ) : (
          <CloudLightning Sun size={32} />
        )}
      </div>
      <div className="text-lg text-gray-100">
        <p>{`${weekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
        } `}</p>
      </div>
    </div>
  );
}
