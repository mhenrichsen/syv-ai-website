import React from 'react';
import Header from './Header';

const PromptingGuide = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pt-20 px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-4">Prompting Guide</h1>
        {/* Add your prompting guide content here */}
      </main>
    </div>
  );
};

export default PromptingGuide;