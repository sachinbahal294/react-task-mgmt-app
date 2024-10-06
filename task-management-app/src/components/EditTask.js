import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { updateTaskStatus } from '../features/taskSlice';
import { sendMessage } from '../services/websocket';

const EditTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector((state) => state.tasks.tasks.find((task) => task.id === Number(id)));
  const users = useSelector((state) => state.users.users);
  
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [dueDate, setDueDate] = useState(task ? task.dueDate : '');
  const [priority, setPriority] = useState(task ? task.priority : '');
  const [assignedUser, setAssignedUser] = useState(task ? task.assignedUser : '');

  useEffect(() => {
    if (!task) {
      navigate('/'); // Redirect if task not found
    }
  }, [task, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      id: Number(id),
      title,
      description,
      dueDate,
      priority,
      assignedUser,
      status: task.status,
    };
    dispatch(updateTaskStatus(updatedTask));
    sendMessage({ type: 'taskUpdate', task: updatedTask });
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
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          value={assignedUser}
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
        Update Task
      </button>
      <Link to="/" className="text-blue-500 hover:underline flex justify-center">Back to Task List</Link>
    </form>
  );
};

export default EditTask;
