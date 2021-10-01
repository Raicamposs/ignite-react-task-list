import { useState } from 'react';
import { FiCheckSquare, FiTrash } from 'react-icons/fi';
import '../styles/tasklist.scss';



interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {

    if (!newTaskTitle)
      return;

    const task = {
      id: Math.max(...tasks.map(item => item.id), 0) + 1,
      title: newTaskTitle,
      isComplete: false
    }

    setTasks([...tasks, task]);
  }

  function handleToggleTaskCompletion(id: number) {
    const task = tasks.find(task => task.id === id);

    if (!task)
      return;

    task.isComplete = !task.isComplete;
    setTasks([...tasks.filter(task => task.id !== id), task]);
  }

  function handleRemoveTask(id: number) {
    setTasks([...tasks.filter(task => task.id !== id)]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}