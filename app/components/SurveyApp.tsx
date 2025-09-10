'use client';

import { useState, useEffect } from 'react';
import SurveyLanding from './SurveyLanding';
import HousebuilderSurvey from './HousebuilderSurvey';
import ThankYouPage from './ThankYouPage';

export default function SurveyApp() {
  const [currentView, setCurrentView] = useState<'landing' | 'survey' | 'thankyou'>('landing');
  const [site, setSite] = useState<string | null>(null);

  useEffect(() => {
    // Extract site parameter from URL on component mount
    const urlParams = new URLSearchParams(window.location.search);
    const siteParam = urlParams.get('site');
    setSite(siteParam);
  }, []);

  const handleStartSurvey = () => {
    setCurrentView('survey');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const handleSurveySubmit = () => {
    setCurrentView('thankyou');
  };

  const handleNewSurvey = () => {
    setCurrentView('landing');
  };

  return (
    <>
      {currentView === 'landing' && (
        <SurveyLanding onStartSurvey={handleStartSurvey} />
      )}
      {currentView === 'survey' && (
        <HousebuilderSurvey 
          onBack={handleBackToLanding} 
          onSubmit={handleSurveySubmit}
          site={site}
        />
      )}
      {currentView === 'thankyou' && (
        <ThankYouPage onNewSurvey={handleNewSurvey} />
      )}
    </>
  );
}