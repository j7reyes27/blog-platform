import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;
