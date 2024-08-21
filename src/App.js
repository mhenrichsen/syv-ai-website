import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import PromptingGuide from './PromptingGuide';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/prompting-guide" element={<PromptingGuide />} />
      </Routes>
    </Router>
  );
};

export default App;