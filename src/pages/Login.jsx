import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { signIn } from '../services/firebase';
import useStore from '../store/useStore';

const Login = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await signIn(email, password);
      setUser(user);
      navigate('/home');
      toast.success('Successfully logged in!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-xl shadow-2xl">
        {/* Logo */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-primary">CodeNest</h2>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
              Sign up
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-primary focus:ring-primary"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <div className="text-sm ">
              <a href="#" className="font-medium text-primary hover:text-primary-dark">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-300">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.0003 2.00001C6.47829 2.00001 2.00033 6.47797 2.00033 12C2.00033 16.4912 4.86597 20.2898 8.83797 21.6198C9.33797 21.7098 9.52533 21.4198 9.52533 21.1698C9.52533 20.9398 9.51463 20.0798 9.51463 19.2198C7.00033 19.6998 6.35033 18.5998 6.15033 18.0198C6.03797 17.7298 5.55033 16.8198 5.12533 16.5898C4.77533 16.4098 4.27533 15.9298 5.11463 15.9198C5.91463 15.9098 6.51463 16.6498 6.69463 16.9498C7.69463 18.4398 9.28797 18.0598 9.56533 17.8098C9.65533 17.1498 9.92533 16.7098 10.2253 16.4598C7.97533 16.2098 5.62533 15.3698 5.62533 11.6498C5.62533 10.5498 6.02533 9.63981 6.72533 8.92981C6.62533 8.69181 6.27533 7.68981 6.82533 6.27181C6.82533 6.27181 7.75533 5.98981 9.52533 7.32181C10.3253 7.08181 11.1753 6.96181 12.0253 6.96181C12.8753 6.96181 13.7253 7.08181 14.5253 7.32181C16.2953 5.97981 17.2253 6.27181 17.2253 6.27181C17.7753 7.68981 17.4253 8.69181 17.3253 8.92981C18.0253 9.63981 18.4253 10.5398 18.4253 11.6498C18.4253 15.3798 16.0653 16.2098 13.8153 16.4598C14.1753 16.7598 14.4953 17.3598 14.4953 18.2598C14.4953 19.5598 14.4853 20.8398 14.4853 21.1698C14.4853 21.4198 14.6753 21.7198 15.1753 21.6198C17.1588 20.9496 18.8575 19.6663 20.0424 17.9599C21.2274 16.2536 21.8361 14.2079 21.7853 12.1198C21.7853 6.47981 17.3073 2.00001 12.0003 2.00001Z" />
              </svg>
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.7137 12.2235C23.7137 11.2435 23.6337 10.2635 23.4737 9.32349H12.2137V13.6535H18.6537C18.3937 15.0835 17.5537 16.2935 16.3237 17.0935V19.9235H20.1837C22.4537 17.9435 23.7137 15.3435 23.7137 12.2235Z" />
                <path d="M12.214 24.0001C15.504 24.0001 18.254 22.9301 20.184 19.9201L16.324 17.0901C15.244 17.8301 13.854 18.2501 12.214 18.2501C9.084 18.2501 6.424 16.2401 5.474 13.5101H1.494V16.4101C3.414 20.9601 7.524 24.0001 12.214 24.0001Z" />
                <path d="M5.47333 13.5098C5.24333 12.8098 5.11333 12.0698 5.11333 11.2998C5.11333 10.5298 5.24333 9.78984 5.47333 9.08984V6.18984H1.49333C0.613327 7.70984 0.113327 9.44984 0.113327 11.2998C0.113327 13.1498 0.613327 14.8898 1.49333 16.4098L5.47333 13.5098Z" />
                <path d="M12.214 4.35C13.984 4.35 15.574 4.93 16.844 6.15L20.274 2.72C18.244 1.03 15.494 0 12.214 0C7.524 0 3.414 3.04 1.494 7.59L5.474 10.49C6.424 7.76 9.084 5.75 12.214 5.75V4.35Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
