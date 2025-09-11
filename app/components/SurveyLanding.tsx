'use client';

import Image from 'next/image';

interface SurveyLandingProps {
  onStartSurvey: () => void;
}

export default function SurveyLanding({ onStartSurvey }: SurveyLandingProps) {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/sample-kitchen.png"
          alt="Roundel Kitchen"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative min-h-screen flex items-center justify-center p-6">
        {/* Centered Dark Card */}
        <div className="bg-black/85 backdrop-blur-md rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center border border-white/10">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/rml_group_transparent_01.png"
              alt="RML Group Logo"
              width={250}
              height={125}
              className="mx-auto"
            />
          </div>

          {/* Main Title */}
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
            Service Performance Survey
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            This survey includes six short questions and should take 30 seconds to complete.
          </p>

          {/* Start Survey Button */}
          <button
            onClick={onStartSurvey}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-xl text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mb-8"
          >
            Start Survey
          </button>

          {/* Footer Text */}
          <p className="text-gray-400 text-lg font-light">
            Thank you for helping us improve!
          </p>

          {/* Decorative Elements */}
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full opacity-70"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none"></div>
    </div>
  );
}