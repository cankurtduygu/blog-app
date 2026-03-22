import React from 'react';
import { FiShare2 } from 'react-icons/fi';
import { FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/authSlice';
import { toast } from 'react-toastify';

export default function Card({
  blog,
  categoryName,
  toggleLike,
  currentUserId,
}) {
  const plainText = blog.content.replace(/<[^>]+>/g, '');

  const isLiked = blog.likes?.includes(currentUserId);

  // console.log('currentUserId:', currentUserId);
  // console.log('blog.likes:', blog.likes);
  // console.log('first like:', blog.likes?.[0]);
  // console.log('typeof currentUserId:', typeof currentUserId);
  // console.log('typeof first like:', typeof blog.likes?.[0]);

  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const handleReadMore = () => {
    if (!currentUser) {
      toast.error("To read more, please register first or log in if you have an account.");
      return;
    }
    navigate(`/blogs/${blog._id}`);
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md p-4 gap-4 max-w-3xl mx-auto items-stretch border border-gray-100">
      {/* Görsel */}
      <div className="w-full h-40 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-gray-100 mb-2">
        <img
          src={blog.image}
          alt={blog.title}
          className="object-cover w-full h-full"
        />
      </div>
      {/* İçerik */}
      <div className="flex flex-col flex-1 justify-between w-full">
        {/* Üst: Etiketler ve durumlar */}
        <div className="flex items-center gap-2 mb-1">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path
                fill="#fbbf24"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
            Public
          </span>
          {blog.categoryName && (
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded">
              {blog.categoryName}
            </span>
          )}
          {blog.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        <Link to={`/blogs/${blog._id}`} className="block hover:underline">
          <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {blog.title}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {plainText.slice(0, 120)}
          {plainText.length > 120 ? '...' : ''}
        </p>
        {/* Alt: Profil, yazar, tarih, ikonlar ve Read More */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-2 w-full gap-2">
          {/* Sol: Profil ve yazar info */}
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={
                blog.userId?.profileImage ||
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
              }
              alt={blog.userId?.username || 'author'}
              className="w-8 h-8 rounded-full object-cover border flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-gray-700 font-medium truncate max-w-[120px]">
                {blog.userId?.username || 'Unknown'}
              </span>
              <span className="text-xs text-gray-500 truncate max-w-[120px]">
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Unknown date'}{' '}
                - 6 min read
              </span>
            </div>
          </div>
          {/* Sağ: İkonlar ve Read More */}
          <div className="flex items-center gap-4 ml-0 sm:ml-auto w-full sm:w-auto">
            <button
              type="button"
              title="Like"
              className="flex items-center gap-1 text-red-400 hover:text-red-600 transition"
              onClick={() => toggleLike(blog._id)}
            >
              <FaHeart className="w-5 h-5" />
              <span className="text-xs text-gray-700">
                {blog.likes?.length || 0}
              </span>
            </button>
            <span className="flex items-center gap-1">
              <FaRegComment className="w-5 h-5" />
              <span className="text-xs text-gray-700">
                {blog.comments?.length || 0}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  fill="#6b7280"
                  d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8a3 3 0 100 6 3 3 0 000-6z"
                />
              </svg>
              <span className="text-xs text-gray-700">
                {blog.countOfVisitors || 0}
              </span>
            </span>
            <button
              className="bg-blue-200 text-blue-800 px-4 py-1 rounded-full font-medium hover:bg-blue-300 transition text-sm w-full sm:w-auto ml-auto sm:ml-2"
              onClick={handleReadMore}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
