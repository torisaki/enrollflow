import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './login.tsx'
import App from './App.tsx'
import Admin from './admin.tsx'
import ApplicationDetail from './applicationDetail';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom'
import './index.css'

const Root = () => {
  return (
    <Router>
          <Routes>
          <Route path="/login" element={<Login onLoginSuccess={() => {}} onAdminLogin={() => {}} />} />
            <Route path="/app" element={<App />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/application-detail/:id" element={<ApplicationDetail />} />
          </Routes>
    </Router>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
