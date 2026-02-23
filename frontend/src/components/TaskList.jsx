import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { getTasks, deleteTask } from '../services/api';

const TaskList = ({ refreshTrigger }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTasks = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            setError('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [refreshTrigger]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            alert('Failed to delete task');
        }
    };

    if (loading) return <div className="loading">Loading tasks...</div>;
    if (error) return <div className="error-message">{error}</div>;

    if (tasks.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                No tasks found. Create one to get started!
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onDelete={() => handleDelete(task._id)}
                />
            ))}
        </div>
    );
};

export default TaskList;
