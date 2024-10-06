import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../__mocks__/store';
import App from '../App';

const renderWithMockStore = (component, { initialState } = {}) => {
  return {
    ...render(
      <Provider store={createStore(initialState)}>
        {component}
      </Provider>
    ),
  };
};

describe('App Component', () => {
  test('renders login page if user is not logged in', () => {
    renderWithMockStore(<App />);

    expect(screen.getByText(/select a user to log in/i)).toBeInTheDocument();
  });

  test('renders task list and sidebar if user is logged in', () => {
    const initialState = {
      users: {
        loggedInUser: { id: 1, name: 'Shenam' },
        users: [{ id: 1, name: 'Shenam' }, { id: 2, name: 'Sangam' }],
      },
      tasks: {
        tasks: [],
      },
    };

    renderWithMockStore(<App />, { initialState });

    expect(screen.getByText(/welcome, shenam/i)).toBeInTheDocument();
    expect(screen.getByText(/navigation/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create task/i })).toBeInTheDocument();
  });

});
