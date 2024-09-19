import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reduxtoolkit/UserSlice'; // Import your login action
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [username, setUsername] = useState(''); // Using username instead of email
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Accessing authentication state
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the login action with username and password
    dispatch(loginUser({ username, password }));
  };

  // Navigate after successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');  // Safe navigation after render
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-800">Login to your account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full py-2 px-4 text-white font-semibold rounded-lg 
                ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} 
                focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition ease-in-out duration-150`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Optional: Sign-up link */}
        <div className="text-sm text-center">
          Don’t have an account?{' '}
          <a href="/register" className="text-indigo-600 hover:underline">
            Sign up here
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
