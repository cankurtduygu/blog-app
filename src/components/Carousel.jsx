import React from 'react';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../features/authSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function Carousel({blogs}) {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  

  const filteredBlogs = [...blogs]
  .sort((a, b) => b.countOfVisitors - a.countOfVisitors)
  .slice(0, 3);


  const handleClick = (blogId) => {
    if (!user) {
      toast.info('Please log in or register to continue.');
      navigate('/');
      return;
    }

    navigate(`/blogs/${blogId}`);
  };


  return (
    <div className="carousel w-full">
      {filteredBlogs.map((blog, index) => (
        <div
          key={blog._id}
          id={`slide${index}`}
          className="carousel-item relative w-full"
        >
          <div className="grid w-full grid-cols-1 lg:grid-cols-2">
            <img
              src={blog.image}
              alt={blog.title}
              className="h-75 w-full object-cover lg:h-125"
            />

            <div className="flex flex-col justify-center bg-brandBackground px-8 py-10 lg:px-16">
              <p className="text-brandAccent text-sm uppercase tracking-[0.2em]">
                {blog.category}
              </p>

              <h2 className="mt-4 font-inter text-brandPrimary text-3xl lg:text-5xl font-bold leading-tight">
                {blog.title}
              </h2>

              <p className="mt-4 text-base text-brandDark/80 leading-relaxed">
                {blog.content.replace(/<[^>]+>/g, '').slice(0, 150) + '...'}
              </p>

              <button
                className="mt-8 w-fit bg-brandSecondary px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-brandPrimary"
                onClick={() => handleClick(blog._id)}
              >
                Read More
              </button>
            </div>
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
            <a
              href={`#slide${index === 0 ? filteredBlogs.length - 1 : index - 1}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brandPrimary text-white hover:bg-brandDark"
            >
              ❮
            </a>
            <a
              href={`#slide${index === filteredBlogs.length - 1 ? 0 : index + 1}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brandPrimary text-white hover:bg-brandDark"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
