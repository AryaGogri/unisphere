import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { OverviewPage } from './pages/OverviewPage';
import { MemoryPage } from './pages/MemoryPage';
import { ExchangePage } from './pages/ExchangePage';
import { ConnectPage } from './pages/ConnectPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { ExplorePage } from './pages/ExplorePage';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<LoginPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/dashboard" element={<OverviewPage />} />
            <Route path="/memory" element={<MemoryPage />} />
            <Route path="/exchange" element={<ExchangePage />} />
            <Route path="/connect" element={<ConnectPage />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
}
