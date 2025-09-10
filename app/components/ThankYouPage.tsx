'use client';

import Image from 'next/image';

interface ThankYouPageProps {
  onNewSurvey?: () => void;
}

export default function ThankYouPage({ onNewSurvey }: ThankYouPageProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
        <div className="mb-8">
          <Image
            src="/rml_group_transparent.png"
            alt="RML Group Logo"
            width={200}
            height={100}
            className="mx-auto mb-8"
          />
        </div>
        
        <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-lg">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Thank You!
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          </div>
          
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              Your feedback has been successfully submitted and is greatly appreciated.
            </p>
            <p>
              We value your opinion and will use your responses to continue improving our services.
            </p>
            <p className="font-semibold text-gray-900">
              Thank you for taking the time to complete our survey.
            </p>
          </div>
          
          {onNewSurvey && (
            <div className="mt-8">
              <button
                onClick={onNewSurvey}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Submit Another Survey
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}