import { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/api/api-slice';
import { setCredentials } from '../../redux/features/auth-slice';
import { useAppDispatch } from '../../redux/hooks';
// import useSession from '../../hooks/useSession';

const Login = ({ setAuth}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const [loginApi, { isLoading }] = useLoginMutation()
  // const location = useLocation();
  // const navigate = useNavigate();

  // const redirectTo = new URLSearchParams(location.search).get('redirectTo') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginRes = await loginApi({ email, password }).unwrap()
      console.log('Login response:', loginRes)
      dispatch(setCredentials(loginRes))
      setError('')
      // navigate(redirectTo)

    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.data.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              Login
            </button>
            <button onClick={() => setAuth('signup')} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;