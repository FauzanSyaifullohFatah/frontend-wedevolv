import { Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import PortfolioPage from "../pages/portfolio";

import DashboardPage from "../pages/dashboard";
import Dashboard from "../pages/dashboard/user/Dashboard";
import Projects from "../pages/dashboard/user/Projects";
import Certificates from "../pages/dashboard/user/Certificates";
import Profile from "../pages/dashboard/user/Profile";

import AboutUs from "../pages/aboutus";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "../pages/reset-password";
import ConfirmPassword from "../pages/confirm-password";

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) return <p>Loading</p>

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="projects" element={<Projects />} />
          <Route path="certificates" element={<Certificates />} />
        </Route>
      </Route>

      <Route path="/explore" element={<p>Explore</p>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/confirm-password/:token" element={<ConfirmPassword />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/:username" element={<PortfolioPage />} />
    </Routes>
  );
}

export default AppRoutes;