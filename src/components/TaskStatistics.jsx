function TaskStatistics({ totalCount, completedCount }) {
  return (
    <section className="stats">
      <p className="stats-text">
        <span>
          Всего задач: <strong>{totalCount}</strong>
        </span>
        <span className="stats-divider">|</span>
        <span>
          Выполнено: <strong>{completedCount}</strong>
        </span>
      </p>
    </section>
  )
}

export default TaskStatistics
