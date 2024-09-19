import React from 'react';
import Header from './Header';
import Guide from './components/Guide';

const PromptingGuide = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pt-20 px-4 md:px-8">
        <Guide />
      </main>
    </div>
  );
};

export default PromptingGuide;