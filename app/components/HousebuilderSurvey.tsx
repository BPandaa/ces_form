'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SurveyData {
  quality: string;
  qualityFeedback: string;
  deliveryUnderstanding: string;
  deliveryOnTime: string;
  deliveryDelayComment: string;
  deliveryProfessionalism: string;
  deliveryFeedback: string;
  installationQuality: string;
  installationFeedback: string;
  installationProfessionalism: string;
  installationProfessionalismFeedback: string;
  customerCare: string;
  serviceTeamRating: string;
  serviceTeamFeedback: string;
  overallSatisfaction: string;
  overallFeedback: string;
  recommend: string;
  improvements: string;
  positives: string;
}

const ratingOptions = [
  { value: '1', label: '1 – Needs Improvement' },
  { value: '2', label: '2 – Satisfactory' },
  { value: '3', label: '3 – Excellent' }
];

const customerCareOptions = [
  { value: '1', label: '1 – Needs Improvement' },
  { value: '2', label: '2 – Satisfactory' },
  { value: '3', label: '3 – Excellent' },
  { value: 'na', label: 'N/A' }
];

const recommendOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'no', label: 'No' }
];

interface HousebuilderSurveyProps {
  onBack?: () => void;
  onSubmit?: () => void;
  site?: string | null;
}

export default function HousebuilderSurvey({ onBack, onSubmit, site }: HousebuilderSurveyProps) {
  const [formData, setFormData] = useState<SurveyData>({
    quality: '',
    qualityFeedback: '',
    deliveryUnderstanding: '',
    deliveryOnTime: '',
    deliveryDelayComment: '',
    deliveryProfessionalism: '',
    deliveryFeedback: '',
    installationQuality: '',
    installationFeedback: '',
    installationProfessionalism: '',
    installationProfessionalismFeedback: '',
    customerCare: '',
    serviceTeamRating: '',
    serviceTeamFeedback: '',
    overallSatisfaction: '',
    overallFeedback: '',
    recommend: '',
    improvements: '',
    positives: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (field: keyof SurveyData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      { field: 'quality', label: 'Quality rating' },
      { field: 'deliveryUnderstanding', label: 'Delivery understanding' },
      { field: 'deliveryOnTime', label: 'Delivery on time' },
      { field: 'deliveryProfessionalism', label: 'Delivery professionalism' },
      { field: 'installationQuality', label: 'Installation quality' },
      { field: 'installationProfessionalism', label: 'Installation professionalism' },
      { field: 'customerCare', label: 'Customer care' },
      { field: 'serviceTeamRating', label: 'Service team rating' },
      { field: 'overallSatisfaction', label: 'Overall satisfaction' },
      { field: 'recommend', label: 'Recommendation' }
    ];

    const missingFields = requiredFields.filter(({ field }) => 
      !formData[field as keyof SurveyData] || formData[field as keyof SurveyData].trim() === ''
    );

    return missingFields.map(({ label }) => `${label} is required`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          site: site
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Survey submitted successfully:', result);
        onSubmit?.();
      } else {
        const error = await response.json();
        setErrors([error.error || 'Failed to submit survey']);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors(['Failed to submit survey. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <Image
              src="/rml_group_transparent.png"
              alt="RML Group Logo"
              width={200}
              height={100}
              className="mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Housebuilder Survey
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="mt-6 text-gray-600 hover:text-red-600 font-medium transition-colors"
            >
              ← Back to Landing Page
            </button>
          )}
        </div>

        {/* Error Display */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Please correct the following errors:
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <ul className="list-disc list-inside space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section 1: Quality */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-red-600 pb-2">
              Section 1: Quality
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  How would you rate the quality of our products? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {ratingOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer hover:text-red-600 transition-colors">
                      <input
                        type="radio"
                        name="quality"
                        value={option.value}
                        checked={formData.quality === option.value}
                        onChange={(e) => handleInputChange('quality', e.target.value)}
                        className="w-4 h-4 text-red-600 bg-white border-gray-300 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="text-black">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Additional feedback:
                </label>
                <textarea
                  value={formData.qualityFeedback}
                  onChange={(e) => handleInputChange('qualityFeedback', e.target.value)}
                  className="w-full h-24 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Please share any additional thoughts..."
                />
              </div>
            </div>
          </section>

          {/* Section 2: Delivery */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-red-600 pb-2">
              Section 2: Delivery
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Do you understand how the RML delivery confirmation works? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {['yes', 'no'].map(option => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer hover:text-red-600 transition-colors">
                      <input
                        type="radio"
                        name="deliveryUnderstanding"
                        value={option}
                        checked={formData.deliveryUnderstanding === option}
                        onChange={(e) => handleInputChange('deliveryUnderstanding', e.target.value)}
                        className="w-4 h-4 text-red-600 bg-white border-gray-300 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="capitalize text-black">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Are products delivered in line with the delivery confirmation schedule? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {['yes', 'no'].map(option => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer hover:text-red-600 transition-colors">
                      <input
                        type="radio"
                        name="deliveryOnTime"
                        value={option}
                        checked={formData.deliveryOnTime === option}
                        onChange={(e) => handleInputChange('deliveryOnTime', e.target.value)}
                        className="w-4 h-4 text-red-600 bg-white border-gray-300 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="capitalize text-black">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.deliveryOnTime === 'no' && (
                <div className="ml-6">
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Please provide additional comments:
                  </label>
                  <textarea
                    value={formData.deliveryDelayComment}
                    onChange={(e) => handleInputChange('deliveryDelayComment', e.target.value)}
                    className="w-full h-24 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Please explain the delivery issues..."
                  />
                </div>
              )}

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  How would you rate the professionalism of our delivery teams? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {ratingOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer hover:text-red-600 transition-colors">
                      <input
                        type="radio"
                        name="deliveryProfessionalism"
                        value={option.value}
                        checked={formData.deliveryProfessionalism === option.value}
                        onChange={(e) => handleInputChange('deliveryProfessionalism', e.target.value)}
                        className="w-4 h-4 text-red-600 bg-white border-gray-300 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="text-black">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Additional feedback:
                </label>
                <textarea
                  value={formData.deliveryFeedback}
                  onChange={(e) => handleInputChange('deliveryFeedback', e.target.value)}
                  className="w-full h-24 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Please share any additional thoughts..."
                />
              </div>
            </div>
          </section>

          {/* Section 3: Installation */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-red-600 pb-2">
              Section 3: Installation
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  How would you rate the installation of our kitchens? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {ratingOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer hover:text-red-600 transition-colors">
                      <input
                        type="radio"
                        name="installationQuality"
                        value={option.value}
                        checked={formData.installationQuality === option.value}
                        onChange={(e) => handleInputChange('installationQuality', e.target.value)}
                        className="w-4 h-4 text-red-600 bg-white border-gray-300 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="text-black">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Additional feedback:
                </label>
                <textarea
                  value={formData.installationFeedback}
                  onChange={(e) => handleInputChange('installationFeedback', e.target.value)}
                  className="w-full h-24 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Please share any additional thoughts..."
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  How would you rate the professionalism of our installation teams? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {ratingOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer hover:text-red-600 transition-colors">
                      <input
                        type="radio"
                        name="installationProfessionalism"
                        value={option.value}
                        checked={formData.installationProfessionalism === option.value}
                        onChange={(e) => handleInputChange('installationProfessionalism', e.target.value)}
                        className="w-4 h-4 text-red-600 bg-white border-gray-300 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="text-black">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Additional feedback:
                </label>
                <textarea
                  value={formData.installationProfessionalismFeedback}
                  onChange={(e) => handleInputChange('installationProfessionalismFeedback', e.target.value)}
                  className="w-full h-24 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Please share any additional thoughts..."
                />
              </div>
            </div>
          </section>

          {/* Section 4: Aftercare / Post-Occupation */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-red-600 pb-2">
              Section 4: Aftercare / Post-Occupation
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  How would you rate our customer care? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {customerCareOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer hover:text-red-600 transition-colors">
                      <input
                        type="radio"
                        name="customerCare"
                        value={option.value}
                        checked={formData.customerCare === option.value}
                        onChange={(e) => handleInputChange('customerCare', e.target.value)}
                        className="w-4 h-4 text-red-600 bg-white border-gray-300 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="text-black">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  How would you rate the communication and responsiveness of our service team? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {ratingOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer hover:text-red-600 transition-colors">
                      <input
                        type="radio"
                        name="serviceTeamRating"
                        value={option.value}
                        checked={formData.serviceTeamRating === option.value}
                        onChange={(e) => handleInputChange('serviceTeamRating', e.target.value)}
                        className="w-4 h-4 text-red-600 bg-white border-gray-300 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="text-black">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Additional feedback:
                </label>
                <textarea
                  value={formData.serviceTeamFeedback}
                  onChange={(e) => handleInputChange('serviceTeamFeedback', e.target.value)}
                  className="w-full h-24 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Please share any additional thoughts..."
                />
              </div>
            </div>
          </section>

          {/* Section 5: Overall */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-red-600 pb-2">
              Section 5: Overall
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Overall, how satisfied are you with Roundel&apos;s performance on this project? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {ratingOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer hover:text-red-600 transition-colors">
                      <input
                        type="radio"
                        name="overallSatisfaction"
                        value={option.value}
                        checked={formData.overallSatisfaction === option.value}
                        onChange={(e) => handleInputChange('overallSatisfaction', e.target.value)}
                        className="w-4 h-4 text-red-600 bg-white border-gray-300 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="text-black">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Additional feedback:
                </label>
                <textarea
                  value={formData.overallFeedback}
                  onChange={(e) => handleInputChange('overallFeedback', e.target.value)}
                  className="w-full h-24 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Please share any additional thoughts..."
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Would you recommend Roundel to another site or commercial team? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {recommendOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer hover:text-red-600 transition-colors">
                      <input
                        type="radio"
                        name="recommend"
                        value={option.value}
                        checked={formData.recommend === option.value}
                        onChange={(e) => handleInputChange('recommend', e.target.value)}
                        className="w-4 h-4 text-red-600 bg-white border-gray-300 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="text-black">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Open Comments */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-red-600 pb-2">
              Section 6: Open Comments
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  What is the one thing we could improve next time?
                </label>
                <textarea
                  value={formData.improvements}
                  onChange={(e) => handleInputChange('improvements', e.target.value)}
                  className="w-full h-32 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Your suggestions for improvement..."
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Any shout-outs or positive feedback?
                </label>
                <textarea
                  value={formData.positives}
                  onChange={(e) => handleInputChange('positives', e.target.value)}
                  className="w-full h-32 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Share any positive experiences or recognition..."
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="text-center pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-12 rounded-lg text-xl transition-colors duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Survey'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}