import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ children }) => {
    return localStorage.getItem('token') ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    return !localStorage.getItem('token') ? children : <Navigate to="/" />;
};

function App() {
    return (
        <div className="app-container">
            <Routes>
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
        </div>
    );
}

export default App;
