import { AppDispatch } from "./store";
import { createSlice } from "@reduxjs/toolkit";
import { catalogAPI } from "../api/api";

export interface HouseType {
  id: number,
  photo: string[],
  price: string,
  guest: string,
  room: string,
  bed: string,
  title: string,
  address: string,
  metro: string,
  route: string,
  description: string,
  ownerPhoto: string,
  ownerName: string,
  ownerNumber: string,
  ownerEmail: string,
  label: string,
}

export interface FiltersType {
  town: string;
  room: string;
  bed: string;
  address: string;
  metro: string;
  from: string;
  to: string;
  sort: string;
}

export interface NewsState {
  houses: HouseType[];
  filters: FiltersType;
}

let initialState: NewsState = {
  houses: [],
  filters: {
    town: "Выберите",
    room: "Выберите",
    bed: "Выберите",
    address: "Выберите",
    metro: "Выберите",
    from: "",
    to: "",
    sort: "По умолчанию"
  },
};

export const catalogSlice = createSlice({
  name: "catalogPage",
  initialState,
  reducers: {
    setHouses: (state, action) => {
      state.houses = action.payload;
    },
    setFilter: (state, action) => {
      state.filters = action.payload
    },
    resetFilter: (state) => {
      state.filters = {
        ...state.filters,
        town: "Выберите",
        room: "Выберите",
        bed: "Выберите",
        address: "Выберите",
        metro: "Выберите",
        from: "",
        to: "",
        sort: "По умолчанию"
      }
    }
  },
});


export const getCatalogAC = () => async (dispatch: AppDispatch) => {
  let houses = await catalogAPI.getHouses();

  dispatch(setHouses(houses));
};

export const { setHouses, setFilter, resetFilter } = catalogSlice.actions;

export default catalogSlice.reducer;
