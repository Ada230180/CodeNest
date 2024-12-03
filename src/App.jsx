import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useStore from './store/useStore'

// Loading component
const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-950">
    <div className="flex flex-col items-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      <p className="mt-4 text-white">Loading CodeNest...</p>
    </div>
  </div>
)

// Lazy load pages
const Landing = lazy(() => import('./pages/Landing'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Community = lazy(() => import('./pages/Community'))
const Channel = lazy(() => import('./pages/Channel'))
const Profile = lazy(() => import('./pages/Profile'))
const Chats = lazy(() => import('./pages/Chats'))
const Communities = lazy(() => import('./pages/Communities'))

function App() {
  const { user, checkSession } = useStore((state) => ({
    user: state.user,
    checkSession: state.checkSession
  }));

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-950">
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1F2937',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route 
              path="/" 
              element={user ? <Navigate to="/home" /> : <Landing />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/home" />} 
            />
            <Route 
              path="/register" 
              element={!user ? <Register /> : <Navigate to="/home" />} 
            />
            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="/" />}
            />
            <Route 
              path="/community/:id" 
              element={user ? <Community /> : <Navigate to="/" />} 
            />
            <Route 
              path="/channel/:channelId" 
              element={user ? <Channel /> : <Navigate to="/" />} 
            />
            <Route 
              path="/profile" 
              element={user ? <Profile /> : <Navigate to="/" />} 
            />
            <Route 
              path="/chats" 
              element={user ? <Chats /> : <Navigate to="/" />} 
            />
            <Route 
              path="/communities" 
              element={user ? <Communities /> : <Navigate to="/" />} 
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
