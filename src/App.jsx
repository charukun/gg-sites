import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Osaka from './pages/Osaka';
import Tokyo from './pages/Tokyo';
import Preparation from './pages/Preparation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Preparation />} />
            <Route path="/osaka" element={<Osaka />} />
            <Route path="/tokyo" element={<Tokyo />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;