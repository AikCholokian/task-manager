import TaskItem from './TaskItem'

function TaskList({ tasks, emptyMessage, onToggleTask, onDeleteTask }) {
  // Показываем сообщение, если видимый список задач пуст
  if (tasks.length === 0) {
    return (
      <section className="task-list-section">
        <p className="task-list-empty">{emptyMessage}</p>
      </section>
    )
  }

  return (
    <section className="task-list-section">
      <ul className="task-list">
        {/* Отрисовываем каждую задачу через map() с уникальным key */}
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
          />
        ))}
      </ul>
    </section>
  )
}

export default TaskList
