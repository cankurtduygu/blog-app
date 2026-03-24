import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Blogs from '../components/Blogs';
import Carousel from '../components/Carousel';
import CategoryList from '../components/CategoryList';
import LatestNews from '../components/LatestNews';
import { selectBlogs, selectCategories } from '../features/blogSlice';
import { selectNews } from '../features/newsSlice';
import useNewsCall from '../hooks/useNewsCall';
import { useState } from 'react';

export default function Home() {
  const categories = useSelector(selectCategories);
  const news = useSelector(selectNews);
  const blogs = useSelector(selectBlogs);
  const { getNews } = useNewsCall();


  useEffect(() => {
    getNews();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(null);


  return (
    <div>
      <Carousel blogs={blogs} />
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 order-2 lg:order-0">
          <Blogs selectedCategory={selectedCategory} />
        </div>
        <div className="lg:col-span-1 order-1 lg:order-0 flex flex-col gap-6">
          <CategoryList categories={categories} onSelect={setSelectedCategory} />
          <LatestNews news={news} />
        </div>
      </div>
    </div>
  );
}
