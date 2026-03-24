import React from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';

export default function Write() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      {/* navbar yüksekligini cikarip min geri kalan yüksekligi almasi icin yazdik min-h-kismini */}
      {/* Continue Publishing Button */}
      <div className="flex justify-end p-8 ">
        <button className="btn bg-brandSecondary/60 hover:bg-brandSecondary text-white border-none rounded-full px-6 gap-2">
          <FaArrowCircleRight className="h-5 w-5" />
          Continue Publishing
        </button>
      </div>

      {/* Editor Area */}
      <div className="max-w-4xl mx-auto px-8">
        <form action="">
          <div>
            <input
              type="text"
              placeholder="Title"
              className="w-full text-4xl font-light outline-none border-none bg-transparent placeholder:text-gray-300 mb-4"
            />
          </div>
          <div>
            <textarea
              placeholder="Write your new blog..."
              className="w-full min-h-[65vh] text-lg outline-none border-none bg-transparent resize-none placeholder:text-gray-400 placeholder:italic leading-relaxed"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
