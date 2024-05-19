import React, { useState, useEffect } from 'react';
import { connectWallet } from '../services/eth';
import { addTaskToIPFS, getTaskFromIPFS } from '../services/ipfs';

const ToDoList = () => {
  const [contract, setContract] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskContent, setTaskContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const contract = await connectWallet();
      setContract(contract);
      const taskCount = await contract.taskCount();
      const tasks = [];
      for (let i = 1; i <= taskCount; i++) {
        const task = await contract.tasks(i);
        task.content = await getTaskFromIPFS(task.content);
        tasks.push(task);
      }
      setTasks(tasks);
      setLoading(false);
    };
    init();
  }, []);

  const createTask = async () => {
    const hash = await addTaskToIPFS(taskContent);
    await contract.createTask(hash);
    const taskCount = await contract.taskCount();
    const newTask = await contract.tasks(taskCount);
    newTask.content = await getTaskFromIPFS(newTask.content);
    setTasks([...tasks, newTask]);
    setTaskContent('');
  };

  const toggleCompleted = async (id) => {
    await contract.toggleCompleted(id);
    const updatedTasks = tasks.map(task =>
      task.id.toNumber() === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input
        type="text"
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
      />
      <button onClick={createTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id.toNumber()}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.content}
            </span>
            <button onClick={() => toggleCompleted(task.id.toNumber())}>
              {task.completed ? 'Incomplete' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
