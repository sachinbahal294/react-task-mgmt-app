import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CreateTask from '../CreateTask';
import { createStore } from '../../__mocks__/store';
import { addTask } from '../../features/taskSlice';
import { sendMessage } from '../../services/websocket';

jest.mock('../../features/taskSlice', () => ({
  addTask: jest.fn(),
}));
jest.mock('../../services/websocket', () => ({
  sendMessage: jest.fn(),
}));

const renderComponent = (store) => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/create']}>
        <Routes>
          <Route path="/create" element={<CreateTask />} />
          <Route path="/" element={<div>Task List</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('CreateTask component', () => {
  let store;

  beforeEach(() => {
    store = createStore({
      users: { users: [{ id: 1, name: 'Shenam' }, { id: 2, name: 'Sangam' }] },
    });
    jest.clearAllMocks();
  });

  test('renders form fields and submit button', () => {
    renderComponent(store);

    expect(screen.getByPlaceholderText('Task Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Task Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create task/i })).toBeInTheDocument();
    expect(screen.getByText(/back to task list/i)).toBeInTheDocument();
  });

  test('allows user to fill out the form and submit', () => {
    renderComponent(store);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Task Title'), {
      target: { value: 'New Task' },
    });
    fireEvent.change(screen.getByPlaceholderText('Task Description'), {
      target: { value: 'Task description' },
    });
    fireEvent.change(screen.getByPlaceholderText(/due date/i), {
      target: { value: '2024-10-31' },
    });
    fireEvent.change(screen.getByPlaceholderText('Priority'), {
      target: { value: 'high' },
    });
    fireEvent.change(screen.getByPlaceholderText(/assign to user/i), {
      target: { value: 'Shenam' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /create task/i }));

    // Assert that addTask and sendMessage were called with the correct arguments
    expect(addTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'New Task',
        description: 'Task description',
        dueDate: '2024-10-31',
        priority: 'high',
        assignedUser: 'Shenam',
      })
    );
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'taskCreation',
        task: expect.objectContaining({
          title: 'New Task',
          description: 'Task description',
        }),
      })
    );

    // Check that navigation occurred
    expect(screen.getByText('Task List')).toBeInTheDocument();
  });

  test('validates required fields and does not submit with missing fields', () => {
    renderComponent(store);

    // Submit without filling out required fields
    fireEvent.click(screen.getByRole('button', { name: /create task/i }));

    // Assert that addTask and sendMessage were not called
    expect(addTask).not.toHaveBeenCalled();
    expect(sendMessage).not.toHaveBeenCalled();
  });
});
