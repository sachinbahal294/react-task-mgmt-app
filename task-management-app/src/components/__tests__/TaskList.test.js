import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import TaskList from '../TaskList';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from '../../__mocks__/store';

const renderWithReduxAndRouter = (component, { initialState } = {}) => {
  const store = createStore(initialState);
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>
  );
};

describe('TaskList Component', () => {
  const initialState = {
    tasks: {
      tasks: [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description 1',
          assignedUser: 'Shenam',
          dueDate: '2024-12-31',
          status: 'pending',
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Description 2',
          assignedUser: 'Sangam',
          dueDate: '2024-12-31',
          status: 'completed',
        },
      ],
    },
    users: {
      users: [
        { id: 1, name: 'Shenam' },
        { id: 2, name: 'Sangam' },
      ],
    },
  };

  test('renders task list rows based on mock store data', () => {
    renderWithReduxAndRouter(<TaskList filterStatus="all" filterUser="all" />, { initialState });

    // Check that the task titles are rendered
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    // Check that the task descriptions are rendered
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();

    // Check that the assigned users are rendered
    expect(screen.getAllByText('Shenam')[1]).toBeInTheDocument();
    expect(screen.getAllByText('Sangam')[1]).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);

  });

  test('filters tasks by status', () => {
    renderWithReduxAndRouter(<TaskList filterStatus="completed" filterUser="all" />, { initialState });

    // Only "Task 2" should be displayed because it's completed
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('filters tasks by assigned user', () => {
    renderWithReduxAndRouter(<TaskList filterStatus="all" filterUser="Shenam" />, { initialState });

    // Only "Task 1" should be displayed because it's assigned to Shenam
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });
});
