import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  news: [],
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    fetchNewsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNewsFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    fetchNewsSuccess: (state, { payload }) => {
      state.error = null;
      state.news = payload.articles;
    },
    fetchNewsFinish: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fetchNewsStart,
  fetchNewsFail,
  fetchNewsSuccess,
  fetchNewsFinish,
} = newsSlice.actions;

export const selectNews = (state) => state.news.news;
export const selectNewsLoading = (state) => state.news.loading;
export default newsSlice.reducer;
