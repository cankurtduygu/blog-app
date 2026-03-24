import React from 'react';
import LoginForm from '../components/LoginForm';

export default function SignIn() {
  return (
    <div className="min-h-screen flex">
      {/* Sol: Görsel / Marka alanı */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brandPrimary via-brandDark to-brandPrimary items-center justify-center p-12">
        <div className="max-w-md text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Start your journey with us
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <div className="mt-10 flex justify-center gap-2">
            <span className="w-8 h-1.5 bg-brandSecondary rounded-full" />
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Sağ: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <LoginForm />
      </div>
    </div>
  );
}
