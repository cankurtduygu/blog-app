import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  blogs: [],
  categories: [],
  comments: [],
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    fetchSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.blogs = payload.data;
    },
    
  },
})

export const { fetchStart, fetchFail, fetchSuccess } = blogSlice.actions;


export const selectBlogs = (state) => state.blog.blogs;
export const selectBlogLoading = (state) => state.blog.loading;
export const selectBlogError = (state) => state.blog.error;
export default blogSlice.reducer