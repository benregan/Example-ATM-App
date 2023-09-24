import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/userContext';
import './App.css';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import AuthedRoute from './components/authComponent/authComponent';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <AuthedRoute>
              <Dashboard />
            </AuthedRoute>} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;