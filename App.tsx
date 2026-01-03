
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Progress from './pages/Progress';
import Grammar from './pages/Grammar';
import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/grammar" element={<Grammar />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
