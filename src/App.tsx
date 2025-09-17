import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import Test from './pages/Test';
import Layout from './components/Layout';
import LoginModal from './components/LoginModal';
import ErrorBoundary from './components/ErrorBoundary';
import { useStore } from './store/useStore';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { auth, login } = useStore();

  const handleLogin = (user: any) => {
    login(user);
    setShowLoginModal(false);
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Layout>
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/test" element={<Test />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/upload" element={<Upload />} />
            </Routes>
          </Layout>
          
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
          />
          
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155',
              },
            }}
          />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
