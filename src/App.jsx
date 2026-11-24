import { useState } from 'react'
import { initialTasks } from './data/initialTasks'
import Header from './components/Header'
import TaskStatistics from './components/TaskStatistics'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import './App.css'

function App() {
  // Основное состояние списка задач, активного фильтра и текста новой задачи
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('all')
  const [newTaskTitle, setNewTaskTitle] = useState('')

  // Добавление новой задачи из поля ввода
  function handleAddTask(event) {
    event.preventDefault()

    const trimmedTitle = newTaskTitle.trim()
    if (!trimmedTitle) return

    setTasks((prevTasks) => {
      const nextId =
        prevTasks.length > 0
          ? Math.max(...prevTasks.map((task) => task.id)) + 1
          : 1

      const newTask = {
        id: nextId,
        title: trimmedTitle,
        completed: false,
      }

      return [...prevTasks, newTask]
    })

    // Очищаем поле ввода после добавления
    setNewTaskTitle('')
  }

  // Удаление одной задачи по её id
  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  // Переключение статуса задачи (выполнена / в работе)
  function handleToggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  // Удаление только выполненных задач
  function handleClearCompleted() {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed))
  }

  // Полная очистка списка
  function handleClearAll() {
    setTasks([])
  }

  // Общая статистика всегда считается по всем задачам, а не по фильтру
  const totalCount = tasks.length
  const completedCount = tasks.filter((task) => task.completed).length

  // Вычисляем видимый список задач без изменения исходного массива
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed
    if (filter === 'active') return !task.completed
    return true
  })

  // Сообщение для пустого состояния зависит от причины пустоты
  const emptyMessage =
    tasks.length === 0 ? 'Задач пока нет' : 'Нет задач по выбранному фильтру'

  return (
    <div className="app">
      <div className="app-container">
        <Header />

        <main className="app-main">
          <TaskStatistics
            totalCount={totalCount}
            completedCount={completedCount}
          />

          {/* Форма добавления новой задачи */}
          <form className="task-form" onSubmit={handleAddTask}>
            <input
              type="text"
              className="task-input"
              placeholder="Введите название новой задачи..."
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.target.value)}
            />
            <button
              type="submit"
              className="btn btn-add"
              disabled={!newTaskTitle.trim()}
            >
              + Добавить задачу
            </button>
          </form>

          {/* Кнопки фильтрации задач */}
          <div className="filter-group">
            <button
              type="button"
              className={`btn btn-filter ${
                filter === 'all' ? 'btn-filter-active' : ''
              }`}
              onClick={() => setFilter('all')}
            >
              Все
            </button>
            <button
              type="button"
              className={`btn btn-filter ${
                filter === 'completed' ? 'btn-filter-active' : ''
              }`}
              onClick={() => setFilter('completed')}
            >
              Выполненные
            </button>
            <button
              type="button"
              className={`btn btn-filter ${
                filter === 'active' ? 'btn-filter-active' : ''
              }`}
              onClick={() => setFilter('active')}
            >
              Невыполненные
            </button>
          </div>

          <TaskList
            tasks={filteredTasks}
            emptyMessage={emptyMessage}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />

          {/* Кнопки массовой очистки задач */}
          <div className="bulk-actions">
            <button
              type="button"
              className="btn btn-clear-done"
              onClick={handleClearCompleted}
              disabled={completedCount === 0}
            >
              Удалить выполненные
            </button>
            <button
              type="button"
              className="btn btn-clear-all"
              onClick={handleClearAll}
              disabled={totalCount === 0}
            >
              Очистить список
            </button>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App
