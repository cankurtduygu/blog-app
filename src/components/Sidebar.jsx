import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

// Yorum ekleme için Sidebar
export default function Sidebar({
  isOpen,
  setIsOpen,
  handleSubmitComment,
  filteredMessages,
}) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setLoading(true);
      await handleSubmitComment(comment);
      setComment('');
      setLoading(false);
    }
  };

  console.log(filteredMessages);

  // Fonksiyon en üste eklenir
const getInitials = (user) => {
  if (!user) return '';
  const first = user.username ? user.username[0].toUpperCase() : '';
  return first ;
};

  return (
    <div className="drawer drawer-end z-50">
      <input
        id="my-drawer-5"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-5"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 min-h-full w-90 p-6 flex flex-col gap-4 font-inter">
          <h2 className="text-xl font-bold mb-2">Add a Comment</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
            <textarea
              className="textarea textarea-bordered resize-none h-32"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !comment.trim()}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
          <ul className="list bg-base-100 rounded-box shadow-md flex-1 overflow-y-auto">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
              Previous Comment
            </li>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <li key={msg._id} className="list-row">
                  <div className="size-10 rounded-full bg-brandDark text-white flex items-center justify-center font-bold">
                    {getInitials(msg.userId)}
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="font-medium">
                      {msg.userId.username} {msg.userId.lastName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : ''}
                    </span>
                  </div>
                  <p className="list-col-wrap text-base font-normal">
                    {msg.comment}
                  </p>
                  <button className="btn btn-square btn-ghost">
                    <FaEllipsisV className="size-[1.2em] text-gray-400 hover:text-gray-600" />
                  </button>
                </li>
              ))
            ) : (
              <li className="p-4 text-sm text-center text-gray-500">
                No comments yet. Be the first to comment!
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
