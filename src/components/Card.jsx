import React from 'react';
import { FiShare2 } from 'react-icons/fi';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';

export default function Card({ blog }) {
  return (
    <div className="bg-brandBackground rounded-lg shadow p-6 max-w-md mx-auto">
      <div className="overflow-hidden rounded-lg">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-56 object-cover"
        />
      </div>
      <div className="mt-4">
        <span className="inline-block bg-brandAccent/30 text-brandDark text-xs px-3 py-1 rounded mb-2">
          on{' '}
          {blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Unknown date'}
        </span>
        <div className="uppercase text-xs text-brandAccent tracking-widest font-semibold mt-2 mb-1">
          {blog.category || 'LIFESTYLE'}
        </div>
        <h2 className="text-2xl font-bold text-brandPrimary mb-2">
          {blog.title}
        </h2>
        <p className="text-brandDark/80 mb-6">
          {blog.description?.slice(0, 120) ||
            'Phasellus blandit mattis ipsum, ac laoreet lorem lacinia et...'}
        </p>
        <div className="flex items-center justify-between mt-4">
          <button className="bg-brandAccent text-brandDark px-6 py-2 rounded tracking-widest font-semibold hover:bg-brandPrimary hover:text-white transition">
            READ MORE
          </button>
          <div className="flex items-center gap-4">
            {/* Share Icon */}
            <button
              title="Share"
              className="text-brandPrimary hover:text-brandSecondary transition"
            >
              <FiShare2 className="w-6 h-6" />
            </button>
            {/* Comment Icon */}
            <button
              title="Comments"
              className="relative text-brandAccent hover:text-brandPrimary transition"
            >
              <FaRegComment className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-brandAccent text-xs text-white rounded px-1.5 py-0.5">
                {blog.comments?.length || 0}
              </span>
            </button>
            {/* Like Icon */}
            <button
              title="Like"
              className="flex items-center gap-1 text-red-400 hover:text-red-600 transition"
            >
              <FaRegHeart className="w-6 h-6" />
              <span className="text-xs">{blog.likes?.length || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
