import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchNewsStart, fetchNewsSuccess, fetchNewsFinish, fetchNewsFail } from '../features/newsSlice';

const NEWS_URL = import.meta.env.VITE_NEWS_URL;

const useNewsCall = () => {
  const dispatch = useDispatch();

  const getNews = async () => {
    try {
      dispatch(fetchNewsStart())
      const { data } = await axios(`${NEWS_URL}`);

      console.log(data);
    //   navigate('/');
      dispatch(fetchNewsSuccess(data));
      dispatch(fetchNewsFinish());

    } catch (error) {
        dispatch(fetchNewsFail(error.message));
      console.log('error:', error);
    }
  };





  return { getNews };
};

export default useNewsCall;
