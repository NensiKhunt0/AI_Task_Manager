import React, { useState } from 'react';
import { createTask } from '../services/api';

const TaskForm = ({ onTaskAdded, initialTitle = '' }) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setError('');
        setLoading(true);
        try {
            await createTask({ title, description, priority });
            setTitle('');
            setDescription('');
            setPriority('Medium');
            if (onTaskAdded) onTaskAdded();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
                <label>Task Title *</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    required
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Details (optional)"
                />
            </div>

            <div className="form-group">
                <label>Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading || !title.trim()}>
                {loading ? 'Adding...' : 'Add Task'}
            </button>
        </form>
    );
};

export default TaskForm;
