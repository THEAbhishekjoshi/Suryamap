import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.tsx';
import Dashboard from './Dashboard.tsx';
import ProtectedRoute from './Protected/ProtectedRoute.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>

          <Route path="/dashboard" element={<Dashboard />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
