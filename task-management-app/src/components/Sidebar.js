import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Icons for collapse/expand

const Sidebar = ({ filterStatus, setFilterStatus, filterUser, setFilterUser, users }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State for collapsing sidebar

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`bg-gray-800 text-white h-full p-4 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } relative`}
    >
      {/* Collapse/Expand button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full focus:outline-none"
      >
        {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>

      {!isCollapsed && (
        <>
          <h2 className="text-lg font-bold mb-4">Navigation</h2>
          <nav>
            <NavLink
              to="/create-task"
              className="block mb-2 hover:text-gray-300"
              activeClassName="text-gray-400"
            >
              Create Task
            </NavLink>
            <NavLink
              to="/"
              className="block mb-2 hover:text-gray-300"
              activeClassName="text-gray-400"
            >
              All Tasks
            </NavLink>
          </nav>

          <h2 className="text-lg font-bold mt-4 mb-4">Task Filters</h2>
          <div className="mb-6">
            <label className="block mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 w-full bg-gray-700 rounded"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Filter by User</label>
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="p-2 w-full bg-gray-700 rounded"
            >
              <option value="all">All Users</option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
