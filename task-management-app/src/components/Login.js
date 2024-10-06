import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/userSlice';

const Login = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Select a User to Log In</h2>
        <div className="grid grid-cols-1 gap-4">
          {users.map((user) => (
            <button
              key={user.id}
              className="flex items-center justify-start bg-gray-100 hover:bg-gray-200 rounded-lg p-4 transition duration-300"
              onClick={() => dispatch(loginUser(user))}
            >
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mr-3" />
              <span className="text-lg">{user.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
