import { useStore } from "../logic/store";

export function CitySearch() {
  //Manage the search field
  const citySearch = useStore((state) => {
    return state.citySearch;
  });
  const setCitySearch = useStore((state) => {
    return state.setCitySearch;
  });
  //Manage the city result list
  const cityResults = useStore((state) => {
    return state.cityResults;
  });
  const setCityResults = useStore((state) => {
    return state.setCityResults;
  });
  //Manage the city selected list
  const addToCityList = useStore((state) => {
    return state.addToCityList;
  });
  //Need cityList to check if there're items in common with the city selected
  const cityList = useStore((state) => {
    return state.cityList;
  });
  return (
    <div className="bg-gray-200 w-1/2 rounded-md">
      <div className="bg-gray-400 m-1 rounded-md flex">
        <input
          type="text"
          placeholder="Choisissez une ville"
          onChange={(event) => {
            setCitySearch(event);
          }}
          className="bg-gray-400 mr-0 p-4 flex-1 rounded-l-md cursor-text placeholder-gray-900 outline-0 uppercase"
        />
        <input
          type="button"
          value="🔎"
          onClick={() => {
            setCityResults(citySearch);
          }}
          className="bg-gray-400 ml-0 p-2 rounded-r-md cursor-pointer text-l"
        />
      </div>
      {cityResults.length !== 0 && (
        <div>
          {cityResults.map((city, index) => {
            return (
              <div
                key={index}
                onClick={() => addToCityList(city)}
                className={
                  cityList.filter((cityFromList) => {
                    return cityFromList.id === city.id;
                  }).length > 0
                    ? "bg-blue-200 hover:bg-red-blue m-1 p-2 rounded-md cursor-pointer flex items-center"
                    : "bg-gray-200 hover:bg-gray-400 m-1 p-2 rounded-md cursor-pointer flex items-center"
                }
              >
                <img
                  className="w-10 mr-4"
                  src={`https://open-meteo.com/images/country-flags/${city.country_code.toLowerCase()}.svg`}
                  alt={`${city.country} flag`}
                />
                <div>
                  <p>{city.name}</p>
                  <p className="text-sm">{city.country}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
