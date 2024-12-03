import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import useStore from '../store/useStore';
import { getCurrentUser, onAuthStateChange } from '../services/firebase';
import Sidebar from './Sidebar';

const LoadingScreen = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-950">
    <div className="flex flex-col items-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      <p className="mt-4 text-white">Loading CodeNest...</p>
    </div>
  </div>
);

const Layout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Session check failed:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
      setIsLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [setUser, navigate]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-950">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
