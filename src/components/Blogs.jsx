import { useEffect } from 'react';
import useBlogCall from '../hooks/useBlogCall';
import { useSelector } from 'react-redux';
import { selectBlogLoading, selectBlogs } from '../features/blogSlice';
import Card from './Card';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Blogs() {
  const { getBlogs } = useBlogCall();
  const blogs = useSelector(selectBlogs);
  const isLoading = useSelector(selectBlogLoading);
  console.log(blogs);

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <section>
      {isLoading ? (<p>Loading...</p>) : 
      (<div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {blogs.map((blog) => (
          <Card key={blog._id} blog={blog} />
      ))}
      </div>)}

    </section>
  );
}
