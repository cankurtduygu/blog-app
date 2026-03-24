import { useDispatch } from 'react-redux';
import axios from 'axios';
import { cleanAuth, updateUserInfo } from '../features/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAxios from './useAxios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosWithoutToken, axiosWithToken } = useAxios();

  const signIn = async (userCredentials) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}auth/login`,
        userCredentials
      );
      console.log(data);
      navigate('/');
      dispatch(updateUserInfo(data));

      toast.success('Login başarılı');
    } catch (error) {
      toast.error('Login başarısız');
      console.log('error:', error);
    }
  };

  const signUp = async (userCredentials) => {

     try {
      const { data } = await axios.post(
        `${BASE_URL}users`,
        userCredentials
      );
      console.log(data);
      // dispatch(updateUserInfo(data));

      toast.success('Sign up successful');
      navigate('/')
    } catch (error) {
      toast.error('Sign up failed');
      console.log('error:', error);
    }
  };

  const signOut = async () => {
    await new Promise((res) => setTimeout(res, 2000));

    try {
      await axiosWithToken(`auth/logout`);

      dispatch(cleanAuth());
      navigate("/");
    } catch (error) {
      toast.error("Logout Failed", {
        description:
          error.response?.data?.message ||
          error?.message ||
          "Please check your credentials",
      });
    }
  };

  return { signIn, signUp, signOut };
};

export default useAuthCall;
