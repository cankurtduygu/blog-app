import { useDispatch } from 'react-redux';
import { signUpSchema } from '../lib/schemas';
import axios from 'axios';
import { selectToken, updateUserInfo } from '../features/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { fetchFail, fetchStart, fetchSuccess } from '../features/blogSlice';
import { useSelector } from 'react-redux';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useBlogCall = () => {

  const token = useSelector(selectToken);
  const dispatch = useDispatch();


  const getBlogs = async () => {
    try {
      dispatch(fetchStart());
      const {data} = await axios(`${BASE_URL}blogs`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(fetchSuccess(data));
      console.log(data);
    } catch (error) {
      dispatch(fetchFail(error));
      console.log(error);
    }
  };



  return { getBlogs };
};

export default useBlogCall;
