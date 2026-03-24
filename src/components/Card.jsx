import { FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/authSlice';
import { toast } from 'react-toastify';
import useBlogCall from '../hooks/useBlogCall';

export default function Card({
  blog,
  categoryName,
  toggleLike,
  currentUserId,
}) {
  const plainText = blog.content.replace(/<[^>]+>/g, '');

  const isLiked = blog.likes?.includes(currentUserId);

  const { getBlogs } = useBlogCall();

  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const handleReadMore = () => {
    if (!currentUser) {
      toast.error(
        'To read more, please register first or log in if you have an account.'
      );
      return;
    }
    navigate(`/blogs/${blog._id}`);
  };

  const handleLike = async (_id) => {
    await toggleLike(_id);
    await getBlogs();
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md p-4 gap-4 max-w-3xl mx-auto items-stretch border border-brandAccent/40">
      {/* Sol: Görsel */}
      <div className="w-full md:w-64 h-48 md:h-auto rounded-lg overflow-hidden shrink-0 bg-gray-100">
        <img
          src={blog.image}
          alt={blog.title}
          className="object-cover w-full h-full"
        />
      </div>
      {/* Sağ: İçerik */}
      <div className="flex flex-col flex-1 justify-between">
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
            <span className="bg-brandAccent/40 text-brandDark text-xs px-2 py-0.5 rounded">
              {blog.categoryName}
            </span>
          )}
          {blog.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-brandBackground text-brandPrimary text-xs px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        <Link to={`/blogs/${blog._id}`} className="block hover:underline">
          <h2 className="text-lg font-semibold text-brandDark mb-1 line-clamp-2">
            {blog.title}
          </h2>
        </Link>
        <p className="text-brandDark/70 text-sm mb-2 line-clamp-2">
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
              className="w-8 h-8 rounded-full object-cover border shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-gray-700 font-medium truncate max-w-30">
                {blog.userId?.username || 'Unknown'}
              </span>
              <span className="text-xs text-gray-500 truncate max-w-30">
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
              className="flex items-center gap-1 text-red-500 hover:text-red-600 transition"
              onClick={() => handleLike(blog._id)}
            >
              {isLiked ? (
                <FaHeart className="w-6 h-6" />
              ) : (
                <FaRegHeart className="w-6 h-6" />
              )}
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
              className="bg-brandSecondary/20 text-brandPrimary px-4 py-1 rounded-full font-medium hover:bg-brandSecondary/40 transition text-sm w-full sm:w-auto ml-auto sm:ml-2"
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
