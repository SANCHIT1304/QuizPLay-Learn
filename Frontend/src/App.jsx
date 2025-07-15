import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Rewards from './pages/Rewards';
import Leaderboard from './pages/Leaderboard';
import SubjectsByYear from './pages/SubjectsByYear';
import SubjectDetail from './pages/SubjectDetail';
import PlacementTopic from './pages/PlacementTopic';
import SkillTrack from './pages/SkillTrack';
import ProtectedRoute from './components/ProtectedRoute';
import PlaylistDetail from './pages/PlaylistDetail';
import QuizPage from './pages/QuizPage'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/subjects/:year" element={<SubjectsByYear />} />
            <Route path="/subjects/:year/:subject" element={<SubjectDetail />} />
            <Route path="/dashboard/placement/:topic" element={<PlacementTopic />} /> */}
            {/* <Route path="/dashboard/skills/:track" element={<SkillTrack />} /> */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/rewards" element={
              <ProtectedRoute>
                <Rewards />
              </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } />
            <Route path="/subjects/:year" element={
              <ProtectedRoute>
                <SubjectsByYear />
              </ProtectedRoute>
            } />
            <Route path="/subjects/:year/:subject" element={
              <ProtectedRoute>
                <SubjectDetail />
              </ProtectedRoute>
            } />
            <Route path="/playlists/:id" element={
              <ProtectedRoute>
                <PlaylistDetail />
              </ProtectedRoute>
            } />
            <Route path="/quiz/:videoId" element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/placement/:topic" element={
              <ProtectedRoute>
                <PlacementTopic />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/skills/:track" element={
              <ProtectedRoute>
                <SkillTrack />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;