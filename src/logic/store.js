import create from "zustand";
import axios from "axios";

export const useStore = create((set, get) => {
  return {
    //Toggle between search and display weather
    displaySearch: true,
    setDisplaySearch: () => {
      set((state) => {
        return { displaySearch: true, cityResults: [], citySelected: null };
      });
    },
    //Search for a city and set the search
    citySearch: "",
    setCitySearch: (event) => {
      set((state) => {
        return { citySearch: event.target.value };
      });
    },
    //Result from search, set restuls from search
    cityResults: [],
    setCityResults: () => {
      try {
        const state = get();
        axios
          .get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${state.citySearch}&language=fr`
          )
          .then((response) => {
            set((state) => {
              return { cityResults: response.data.results };
            });
          });
      } catch (error) {
        console.log(error.message);
      }
    },
    //List all cities and add / remove cities
    cityList: [],
    addToCityList: (newCity) => {
      const state = get();
      const existingCityIndex = state.cityList.findIndex((city) => {
        return city.id === newCity.id;
      });
      const newCityList =
        existingCityIndex !== -1
          ? state.cityList.filter((city, index) => {
              return index !== existingCityIndex;
            })
          : [...state.cityList, newCity];
      set({ cityList: newCityList });
      if (newCityList.length === 0) {
        set({ citySelected: null });
      }
    },
    //Select a city to find weather
    citySelected: null,
    addCitySelected: (city) => {
      set((state) => {
        return { citySelected: city, displaySearch: false };
      });
    },
  };
});
