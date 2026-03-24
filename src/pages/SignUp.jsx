import React from 'react';
import SignUpForm from '../components/SignUpForm';

export default function SignUp() {
  return (
    <div className="min-h-screen flex">
      {/* Sol: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <SignUpForm />
      </div>

      {/* Sağ: Görsel / Marka alanı */}
      <div className="hidden lg:flex lg:w-5/12 bg-linear-to-bl from-brandDark via-brandPrimary to-brandDark items-center justify-center p-12">
        <div className="max-w-md text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Share your story with the world
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Create, publish, and grow your audience. Join thousands of writers
            already on our platform.
          </p>
          <div className="mt-10 flex justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
            <span className="w-8 h-1.5 bg-brandSecondary rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
