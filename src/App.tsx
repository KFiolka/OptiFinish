import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardScreen } from './features/dashboard/DashboardScreen';
import { SettingsScreen } from './features/settings/SettingsScreen';
import './index.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <AppLayout>
            <DashboardScreen />
          </AppLayout>
        } />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
