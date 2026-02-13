
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import EntryPage from './components/EntryPage';
import PCMaintenancePage from './components/PCMaintenancePage';
import MobileMaintenancePage from './components/MobileMaintenancePage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/maintenance-pc" element={<PCMaintenancePage />} />
        <Route path="/maintenance-mobile" element={<MobileMaintenancePage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
