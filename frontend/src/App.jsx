import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import Profiles from './pages/Profiles';
import Profile from './pages/Profile';
import Post from './pages/Post';
import GlobalBackground3D from './components/UI/GlobalBackground3D';
import MouseFollower from './components/UI/MouseFollower';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <AuthProvider>
      <GlobalBackground3D />
      <MouseFollower />
      <Router>
        <div className="min-h-screen bg-dark text-white flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/posts/:id" element={<Post />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
