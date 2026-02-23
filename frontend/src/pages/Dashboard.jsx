import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { getAiSuggestions } from '../services/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [aiSuggestions, setAiSuggestions] = useState([]);
    const [loadingAi, setLoadingAi] = useState(false);
    const [aiError, setAiError] = useState('');
    const [refreshTasks, setRefreshTasks] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login', { replace: true });
    };

    const handleTaskAdded = () => {
        setRefreshTasks(prev => !prev);
    };

    const fetchAiSuggestions = async () => {
        setLoadingAi(true);
        setAiError('');
        try {
            const data = await getAiSuggestions();
            setAiSuggestions(data.suggestions || []);
        } catch (err) {
            setAiError('Failed to fetch AI suggestions. Try again.');
        } finally {
            setLoadingAi(false);
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">AI Task Manager</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: '500' }}>Hello, {user?.name}</span>
                    <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.4rem 1rem' }}>Logout</button>
                </div>
            </nav>

            <main className="main-content">
                <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Add Task Form */}
                    <div className="section-card">
                        <h3 className="section-title">Add New Task</h3>
                        <TaskForm onTaskAdded={handleTaskAdded} initialTitle="" />
                    </div>

                    {/* AI Suggestions */}
                    <div className="section-card">
                        <div className="ai-header">
                            <h3 className="section-title" style={{ marginBottom: 0, border: 'none', padding: 0 }}>AI Suggestions</h3>
                            <button
                                onClick={fetchAiSuggestions}
                                className="btn btn-secondary"
                                disabled={loadingAi}
                            >
                                {loadingAi ? 'Thinking...' : 'Get Ideas'}
                            </button>
                        </div>

                        {aiError && <p className="error-message">{aiError}</p>}

                        {!loadingAi && aiSuggestions.length > 0 && (
                            <ul className="ai-list">
                                {aiSuggestions.map((suggestion, index) => (
                                    <li key={index} className="ai-item">{suggestion}</li>
                                ))}
                            </ul>
                        )}
                        {!loadingAi && aiSuggestions.length === 0 && (
                            <p className="loading" style={{ fontSize: '0.9rem' }}>Click "Get Ideas" for AI generated task suggestions.</p>
                        )}
                    </div>
                </div>

                {/* Task List */}
                <div className="section-card" style={{ flex: 1 }}>
                    <h3 className="section-title">Your Tasks</h3>
                    <TaskList refreshTrigger={refreshTasks} />
                </div>
            </main>
        </>
    );
};

export default Dashboard;
