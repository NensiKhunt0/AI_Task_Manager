import React from 'react';

const TaskItem = ({ task, onDelete }) => {
    const priorityClass = `priority-${task.priority.toLowerCase()}`;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="task-item">
            <div className="task-info">
                <h4 className="task-title">{task.title}</h4>
                {task.description && <p className="task-desc">{task.description}</p>}

                <div className="task-meta">
                    <span className={`badge ${priorityClass}`}>
                        {task.priority}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>
                        Added: {formatDate(task.createdAt)}
                    </span>
                </div>
            </div>

            <div className="task-actions">
                <button onClick={onDelete} className="btn-icon" title="Delete Task">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
