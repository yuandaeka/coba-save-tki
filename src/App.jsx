import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import BlockID from './pages/BlockID';
import EduPrep from './pages/EduPrep';
import JobLink from './pages/JobLink';
import LexAI from './pages/LexAI';
import FormPermohonan from './pages/FormPermohonan';
import SafeSOS from './pages/SafeSOS';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<BlockID />} />
          <Route path="/form-permohonan" element={<FormPermohonan />} />
          <Route path="/eduprep" element={<EduPrep />} />
          <Route path="/joblink" element={<JobLink />} />
          <Route path="/lexai" element={<LexAI />} />
          <Route path="/safesos" element={<SafeSOS />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
