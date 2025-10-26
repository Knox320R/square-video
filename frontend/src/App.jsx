import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CookieGate from './components/CookieGate';
import Index from './pages/Index';
import Watch from './pages/Watch';
import Search from './pages/Search';
import Login from './pages/Login';
import Member from './pages/Member';

function App() {
  return (
    <Router>
      <CookieGate />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/member" element={<Member />} />
      </Routes>
    </Router>
  );
}

export default App;
