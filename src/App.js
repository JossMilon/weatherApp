//https://react-meteo.netlify.app/

import "./App.css";
import { useStore } from "./logic/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { CitySearch } from "./components/citySearch";
import { CitySelect } from "./components/citySelected";
import { CityWeather } from "./components/cityWeather";

const queryClient = new QueryClient();

function App() {
  const displaySearch = useStore((state) => {
    return state.displaySearch;
  });
  const citySelected = useStore((state) => {
    return state.citySelected;
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gray-400 flex h-full justify-center font-sans flex items-center">
        <div className="flex w-1/2 bg-gray-200 mt-12 mb-10 min-h-screen rounded-md">
          <CitySelect />
          {displaySearch ? (
            <CitySearch />
          ) : (
            <CityWeather citySelected={citySelected} />
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
