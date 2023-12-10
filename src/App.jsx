import React from 'react'
import './styles/app.scss';
import { BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
        
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App
