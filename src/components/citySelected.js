import { useStore } from "../logic/store";

export function CitySelect() {
  const cityList = useStore((state) => {
    return state.cityList;
  });
  const setDisplaySearch = useStore((state) => {
    return state.setDisplaySearch;
  });
  const addCitySelected = useStore((state) => {
    return state.addCitySelected;
  });
  const cityClicked = useStore((state) => {
    return state.citySelected;
  });
  return (
    <div className="w-1/2">
      {cityList.length !== 0 &&
        cityList.map((city) => {
          return (
            <div
              key={city.id}
              onClick={() => {
                addCitySelected(city);
              }}
              className={
                cityClicked && cityClicked.id === city.id
                  ? "bg-gray-600 text-gray-100 m-1 p-2 rounded-md cursor-pointer flex items-center"
                  : "bg-blue-200  m-1 p-2 rounded-md cursor-pointer flex items-center"
              }
            >
              <img
                className="w-10 mr-4"
                src={`https://open-meteo.com/images/country-flags/${city.country_code.toLowerCase()}.svg`}
                alt={`${city.country} flag`}
              />
              <div>
                {" "}
                <p>{city.name}</p>
                <p className="text-xs">{city.country}</p>
              </div>
            </div>
          );
        })}
      <div
        onClick={setDisplaySearch}
        className="bg-blue-500 hover:bg-blue-700 m-1 p-4 rounded-md text-gray-100 uppercase cursor-pointer"
      >
        Ajouter une ville
      </div>
    </div>
  );
}
