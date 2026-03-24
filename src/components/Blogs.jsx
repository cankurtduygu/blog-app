import { useEffect } from 'react';
import useBlogCall from '../hooks/useBlogCall';
import { useSelector } from 'react-redux';
import {
  selectBlogLoading,
  selectBlogs,
  selectCategories,
} from '../features/blogSlice';
import Card from './Card';
import { selectCurrentUser } from '../features/authSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Blogs({selectedCategory}) {
  const { getBlogPageData, toggleLike } = useBlogCall();
  const blogs = useSelector(selectBlogs);
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectBlogLoading);

  const currentUser = useSelector(selectCurrentUser);
  // console.log('currentUser:', currentUser);

  const currentUserId = currentUser?._id;
  // console.log('currentUserId:', currentUserId);
  // console.log(blogs);

  const filteredBlogs = selectedCategory
  ? blogs.filter(( blog )=> blog.categoryId === selectedCategory)
  : blogs;

  useEffect(() => {
    getBlogPageData();
  }, []);

  const categoryMap = categories.reduce((acc, category) => {
    acc[category._id] = category.name;
    return acc;
  }, {});
  
  return (
    <section>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-5 grid-cols-1 ">
          {filteredBlogs.map((blog) => (
            <Card
              key={blog._id}
              blog={blog}
              categoryName={categoryMap[blog.categoryId]}
              toggleLike={toggleLike}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </section>
  );
}
