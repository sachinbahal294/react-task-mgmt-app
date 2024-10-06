import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateTaskStatus } from '../features/taskSlice';
import { sendMessage } from '../services/websocket';

const TaskList = ({ filterStatus, filterUser, setFilterStatus, setFilterUser }) => {
  const tasks = useSelector((state) => {
    console.log(state);
    return state.tasks.tasks;
  });
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter((task) => {
    return (filterStatus === 'all' || task.status === filterStatus) &&
      (filterUser === 'all' || task.assignedUser === filterUser);
  });

  const handleStatusChange = (task, newStatus) => {
    const { id, title, description, dueDate, priority, assignedUser } = task;
    const taskUpdate = {
      id,
      title,
      description,
      dueDate,
      priority,
      assignedUser,
      status: newStatus
    };
    dispatch(updateTaskStatus(taskUpdate));
    sendMessage({ type: 'taskUpdate', task: taskUpdate });
  };

  return (
    <div>
      <div className="mb-6 flex space-x-4">
        <select
          onChange={(e) => setFilterStatus(e.target.value)}
          value={filterStatus}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          onChange={(e) => setFilterUser(e.target.value)}
          value={filterUser}
          className="p-2 border rounded"
        >
          <option value="all">All Users</option>
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Assigned To</th>
              <th className="py-3 px-6 text-left">Due Date</th>
              <th className="py-2 px-6 text-left">Priority</th>
              <th className="py-2 px-6 text-left">Status</th>
              <th className="py-2 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredTasks.map((task) => (
              <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{task.title}</td>
                <td className="py-3 px-6">{task.description}</td>
                <td className="py-3 px-6">{task.assignedUser}</td>
                <td className="py-3 px-6">{task.dueDate}</td>
                <td className="py-3 px-6">{task.priority}</td>
                <td className="py-3 px-6">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td className="py-3 px-6">
                  <Link to={`/edit-task/${task.id}`} className="text-blue-500 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
