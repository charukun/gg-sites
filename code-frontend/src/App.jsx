import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Therapists from './pages/Therapists';
import Pricing from './pages/Pricing';
import Schedule from './pages/Schedule';
import HowToUse from './pages/HowToUse';
import Reserve from './pages/Reserve';
import NotFound from './pages/NotFound';
import Recruit from './pages/Recruit';
import Mypage from './pages/mypage/Mypage';
import ParalyzeMuseum from './paralyze/ParalyzeMuseum';
import ParalyzeAdmin from './paralyze/ParalyzeAdmin';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';

function SiteRoutes() {
  const location = useLocation();
  const paralyze = location.pathname.startsWith('/paralyze-area');

  if (paralyze) {
    return (
      <Routes>
        <Route path="/paralyze-area" element={<ParalyzeMuseum />} />
        <Route path="/paralyze-area/admin" element={<ParalyzeAdmin />} />
        <Route path="/paralyze-area/area/:slug" element={<ParalyzeMuseum />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <div className="app">
      <div className="fixed-header-wrapper"><Header /></div>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/therapists" element={<Therapists />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/howtouse" element={<HowToUse />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/mypage/*" element={<Mypage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return <HelmetProvider><Router><SiteRoutes /></Router></HelmetProvider>;
}

export default App;