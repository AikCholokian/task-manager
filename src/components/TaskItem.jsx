function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'task-item-completed' : ''}`}>
      <div className="task-info">
        <span className="task-checkbox" aria-hidden="true">
          {task.completed ? '[✓]' : '[ ]'}
        </span>
        <span className="task-title">
          {task.id}. {task.title}
        </span>
        <span
          className={`task-status ${
            task.completed ? 'task-status-done' : 'task-status-active'
          }`}
        >
          {task.completed ? 'выполнена' : 'в работе'}
        </span>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className={`btn btn-toggle ${
            task.completed ? 'btn-toggle-undo' : 'btn-toggle-done'
          }`}
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? 'Вернуть в работу' : 'Выполнить'}
        </button>

        <button
          type="button"
          className="btn btn-delete"
          onClick={() => onDelete(task.id)}
        >
          Удалить
        </button>
      </div>
    </li>
  )
}

export default TaskItem
