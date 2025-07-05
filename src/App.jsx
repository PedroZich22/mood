import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import MoodTracker from "./components/MoodTracker";
import Analytics from "./components/Analytics";
import Profile from "./components/Profile";
import MoodSettings from "./components/MoodSettings";
import Navbar from "./components/Navbar";
import "./index.css";

// Protected layout that shows Navbar and requires auth
function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

// Public layout for routes accessible without auth
function PublicLayout() {
  const { isAuthenticated } = useAuth();
  // If someone goes to login/register while already authenticated, redirect to dashboard
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gradient-to-br from-cream-50 to-brown-100">
          <Router>
            <Routes>
              {/* Public routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              {/* Protected routes */}
              <Route element={<ProtectedLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/mood" element={<MoodTracker />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/mood-settings" element={<MoodSettings />} />
              </Route>

              {/* Redirect any unknown route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
