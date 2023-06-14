import { AppDispatch } from "./store";
import { createSlice } from "@reduxjs/toolkit";
import { newsAPI } from "../api/api";

export interface NewsType {
  id: number;
  photo: string;
  title: string;
  description: string;
  date: string;
}

export interface NewsState {
  news: NewsType[];
  // filteredNews: NewsType[];
  filter: string
}

let initialState: NewsState = {
  news: [],
  // filteredNews: [],
  filter: "",
};

export const newsSlice = createSlice({
  name: "newsPage",
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
    setFilteredNews: (state, action) => {
      state.filter = action.payload
      // state.filteredNews = state.news.filter( (n)=> n.description.toLowerCase().includes(state.filter.toLowerCase()))
    }
  },
});


export const getNewsAC = () => async (dispatch: AppDispatch) => {
  let news = await newsAPI.getNews();

  dispatch(setNews(news));
};

export const { setNews, setFilteredNews } = newsSlice.actions;

export default newsSlice.reducer;
