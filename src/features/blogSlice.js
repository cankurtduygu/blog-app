import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  blogs: [],
  blog: null,
  categories: [],
  comments: [],
};

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
      state.error = null;
      state.blogs = payload.data;
    },
    fetchCategoriesSuccess: (state, { payload }) => {
      state.error = null;
      state.categories = payload.data;
    },
    fetchBlogByIdSuccess: (state, { payload }) => {
      state.error = null;
      state.blog = payload.data;
    },
    fetchFinish: (state) => {
    state.loading = false;
  },
  },
});

export const { fetchStart, fetchFail, fetchSuccess, fetchCategoriesSuccess, fetchBlogByIdSuccess, fetchFinish } = blogSlice.actions;

export const selectBlogs = (state) => state.blog.blogs;
export const selectBlog = (state) => state.blog.blog;
export const selectCategories = (state) => state.blog.categories;
export const selectBlogLoading = (state) => state.blog.loading;
export const selectBlogError = (state) => state.blog.error;
export default blogSlice.reducer;
