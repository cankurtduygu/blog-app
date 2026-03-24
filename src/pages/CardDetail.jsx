import { useSelector, useDispatch } from 'react-redux';
import { selectBlog, fetchBlogByIdSuccess } from '../features/blogSlice';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { FaRegCommentDots } from 'react-icons/fa';
import { selectCurrentUser } from '../features/authSlice';
import useBlogCall from '../hooks/useBlogCall';
import Sidebar from '../components/Sidebar';

export default function CardDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { getBlogsById, toggleLike, postComment } = useBlogCall();
  const blog = useSelector(selectBlog);
  const currentUser = useSelector(selectCurrentUser);

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  // Yorum gönderme fonksiyonu
  const handleSubmitComment = async (commentText) => {
    await postComment(blog.data._id, commentText);
    await getBlogsById(blog.data._id);
    setIsCommentOpen(false);
  };

  useEffect(() => {
    getBlogsById(id);
  }, [id]);

  if (!blog?.data) return <div className="text-center mt-10">Loading...</div>;

  // console.log(blog.data.comments);

  const filteredMessages =
    blog.data.comments?.filter(
      (comment) => comment.userId._id === currentUser?._id
    ) || [];
  // console.log(filteredMessages);

  const {
    title,
    content,
    image,
    createdAt,
    categoryId,
    userId,
    likes,
    comments,
    countOfVisitors,
    isPublish,
    _id,
  } = blog.data;

  const currentUserId = currentUser?._id;
  const isLiked = likes?.includes(currentUserId);

  const handleLike = async () => {
    await toggleLike(_id);
    
    // likes'ı local olarak güncelle (getBlogsById tekrar çağrılırsa countOfVisitors artar)
    const updatedLikes = isLiked
      ? likes.filter((uid) => uid !== currentUserId)
      : [...(likes || []), currentUserId];
    dispatch(
      fetchBlogByIdSuccess({
        data: { ...blog, data: { ...blog.data, likes: updatedLikes } },
      })
    );
  };

  return (
    <>
      <Sidebar
        isOpen={isCommentOpen}
        setIsOpen={setIsCommentOpen}
        handleSubmitComment={handleSubmitComment}
        filteredMessages={filteredMessages}
      />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 mt-10 border border-brandAccent/40">
        {/* Üst görsel */}
        <div className="w-full overflow-hidden rounded-2xl mb-6">
          <img
            src={image}
            alt={title}
            className="w-full h-72 md:h-96 object-cover"
          />
        </div>
        {/* Başlık ve kategori */}
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-brandPrimary text-center mb-2">
            {title}
          </h1>
          <span className="bg-brandAccent/40 text-brandDark text-sm px-4 py-1 rounded mb-2">
            {categoryId?.name || 'Category'}
          </span>
        </div>
        {/* Blog yazar ve ikonlar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brandAccent/30 flex items-center justify-center font-bold text-brandDark">
              {userId?.username?.[0]?.toUpperCase() || '?'}
            </div>
            <span className="text-brandDark font-semibold">
              @{userId?.username}
            </span>
            <span className="text-xs text-brandDark/50 ml-2">
              {createdAt
                ? new Date(createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Unknown date'}
            </span>
            <span className="text-xs text-brandDark/50 ml-2">6 min read</span>
          </div>
          <div className="flex items-center gap-6">
            {/* Like */}
            <button
              type="button"
              title="Like"
              className="flex items-center gap-1 text-red-400 hover:text-red-600 transition"
              onClick={handleLike}
            >
              {isLiked ? (
                <FaHeart className="w-6 h-6" />
              ) : (
                <FaRegHeart className="w-6 h-6" />
              )}
              <span className="text-xs">{likes?.length || 0}</span>
            </button>

            {/* Comment */}
            <button
              className="flex items-center gap-1 text-brandSecondary hover:text-brandPrimary transition"
              onClick={() => setIsCommentOpen(true)}
            >
              <FaRegCommentDots className="w-5 h-5" />
              <span className="text-sm font-semibold">
                {comments?.length || 0}
              </span>
            </button>

            {/* Visitor */}
            <div className="flex items-center gap-1 text-brandSecondary">
              <FaEye className="w-5 h-5" />
              <span className="text-sm font-semibold">
                {countOfVisitors || 0}
              </span>
            </div>
          </div>
        </div>
        {/* İçerik */}
        <div
          className="prose prose-sm md:prose-lg text-brandDark mb-8 mx-auto max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {/* Yorumlar */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-brandPrimary mb-4 text-center">
            Comments
          </h2>
          {comments?.length ? (
            <ul className="space-y-4">
              {comments.map((c) => (
                <li key={c._id} className="bg-brandBackground rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-brandAccent/30 flex items-center justify-center font-bold text-brandDark">
                      {c.username?.[0]?.toUpperCase() || '?'}
                    </div>
                    <span className="text-brandDark font-bold">
                      {c.username}
                    </span>
                    <span className="text-xs text-brandDark/50 ml-auto">
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleString()
                        : ''}
                    </span>
                  </div>
                  <div className="text-brandDark text-sm">{c.comment}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-brandDark/60 text-center">
              No comments yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
