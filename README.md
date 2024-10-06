# Task Management App and WebSocket Server

This repository contains two applications:

1. **WebSocket Server**: A Node.js server that provides real-time task updates via WebSockets
2. **Task Management App**: A React-based frontend application for managing tasks.

---

## WebSocket Server

### Features

- Provides WebSocket connection to the Task Management App.
- Real-time updates for task creation and status changes.

### Setup Instructions

1. `cd websocket-server`
2. `npm install`
3. `node server.js`

---

## Task Management App

### Features

- Manage tasks with Create, Read, Update, and Filter functionalities.
- Real-time updates through WebSocket integration.
- Sidebar navigation with collapsible feature.
- Filtering options based on task status and assigned users.
- Responsive design using Tailwind CSS.

### Setup Instructions

1. `cd task-mgmt-app`
2. `npm install`
3. `npm start`

Note: Use `npm test` to run the test suite using Jest and React Testing Library.
