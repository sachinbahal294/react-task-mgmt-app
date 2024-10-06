import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import CreateTask from './CreateTask';
import TaskList from './TaskList';
import Sidebar from './Sidebar';
import EditTask from './EditTask';
import { connectWebSocket, disconnectWebSocket } from '../services/websocket';
import { addTask, updateTaskStatus } from '../features/taskSlice';

function App() {
  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterUser, setFilterUser] = useState('all');

  useEffect(() => {
    if (loggedInUser) {
      connectWebSocket((message) => {
        if (message.type === 'taskUpdate') {
          dispatch(updateTaskStatus(message.task));
        } else if (message.type === 'taskCreation') {
          dispatch(addTask(message.task));
        }
      });
    }
    return () => {
      disconnectWebSocket();
    };
  }, [loggedInUser, dispatch]);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {!loggedInUser ? (
          <Login />
        ) : (
          <div className="flex flex-1">
            <Sidebar
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterUser={filterUser}
              setFilterUser={setFilterUser}
              users={users}
            />
            <div className="flex-1 max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
              <header className="mb-6">
                <h1 className="text-2xl font-bold mb-4">Welcome, {loggedInUser.name}!</h1>

                <Routes>
                  <Route path="/" element={
                <button className="mb-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                      <Link to="/create-task">Create Task</Link>
                </button>
                  } />
                </Routes>
              </header>

              <Routes>
                <Route
                  path="/"
                  element={
                    <TaskList
                      filterStatus={filterStatus}
                      filterUser={filterUser}
                      setFilterStatus={setFilterStatus}
                      setFilterUser={setFilterUser}
                    />
                  }
                />
                <Route path="/create-task" element={<CreateTask />} />
                <Route path="/edit-task/:id" element={<EditTask />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
