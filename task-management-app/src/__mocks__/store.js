const mockStore = {
    users: {
      loggedInUser: null,
      users: [{ id: 1, name: 'Shenam' }, { id: 2, name: 'Sangam' }],
    },
    tasks: {
      tasks: [],
    },
  };
  
  export const createStore = (initialState = mockStore) => {
    return {
      getState: () => initialState,
      subscribe: jest.fn(),
      dispatch: jest.fn(),
    };
  };
  