import { useDispatch } from 'react-redux';
import { signUpSchema } from '../lib/schemas';
import axios from 'axios';
import { selectToken, updateUserInfo } from '../features/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  fetchCategoriesSuccess,
  fetchFail,
  fetchStart,
  fetchSuccess,
  fetchBlogByIdSuccess,
  fetchFinish,
} from '../features/blogSlice';
import { useSelector } from 'react-redux';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useBlogCall = () => {

  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const getBlogs = async () => {
    try {
      dispatch(fetchStart());

      const { data } = await axios(`${BASE_URL}blogs`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      dispatch(fetchSuccess(data));
      dispatch(fetchFinish());
    } catch (error) {
      dispatch(fetchFail(error.message));
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      dispatch(fetchStart());

      const { data } = await axios(`${BASE_URL}categories`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      dispatch(fetchCategoriesSuccess(data));
      dispatch(fetchFinish());
    } catch (error) {
      dispatch(fetchFail(error.message));
      console.log(error);
    }
  };

  const getBlogPageData = async () => {
    try {
      dispatch(fetchStart());

      const categoryRes = await axios(`${BASE_URL}categories`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      dispatch(fetchCategoriesSuccess(categoryRes.data));

      const blogRes = await axios(`${BASE_URL}blogs`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      dispatch(fetchSuccess(blogRes.data));

      dispatch(fetchFinish());
    } catch (error) {
      dispatch(fetchFail(error.message));
      console.log(error);
    }
  };


const getBlogsById = async (id) =>{
  try {
    dispatch(fetchStart());

    const { data } = await axios(`${BASE_URL}blogs/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    dispatch(fetchBlogByIdSuccess({ data }));
    dispatch(fetchFinish());
  } catch (error) {
    dispatch(fetchFail(error.message));
    console.log(error);
  }
}

const toggleLike = async (id) => {
  try {
    await axios.post(`${BASE_URL}blogs/${id}/postLike`, {}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    dispatch(fetchFail(error.message));
    console.log(error);
  }
};

const postComment = async (blogId, commentText) => {
  try {
    await axios.post(`${BASE_URL}comments`, { blogId: blogId, comment: commentText }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    toast.success('Yorum başarıyla eklendi!');
  } catch (error) {
    toast.error('Yorum eklenemedi!');
    dispatch(fetchFail(error.message));
    console.log(error);
  }
};

  return { getBlogs, getCategories, getBlogPageData, toggleLike, getBlogsById, postComment };
};

export default useBlogCall;
