import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/taskSlice';
import { sendMessage } from '../services/websocket';
import { useNavigate, Link } from 'react-router-dom';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [assignedUser, setAssignedUser] = useState('');
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === '' && description === '' && dueDate === '' && assignedUser === '') {
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
      assignedUser,
      status: 'pending',
    };
    dispatch(addTask(newTask));
    sendMessage({ type: 'taskCreation', task: newTask });
    navigate('/'); // Redirect back to Task List
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="p-2 border rounded w-full"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="p-2 border rounded w-full"
          rows="4"
          required
        />
        <input
          type="date"
          placeholder='Due Date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
        <select
          value={priority}
          placeholder='Priority'
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          value={assignedUser}
          placeholder='Assign to user'
          onChange={(e) => setAssignedUser(e.target.value)}
          className="p-2 border rounded w-full"
          required
        >
          <option value="">Assign to User</option>
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Create Task
      </button>
      <Link to="/" className="text-blue-500 hover:underline flex justify-center">Back to Task List</Link>
    </form>
    
  );
};

export default CreateTask;
