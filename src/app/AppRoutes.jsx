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
import DashboardAdmin from "../pages/dashboard/admin/DashboardAdmin";
import GLobalLoading from "../component/GlobalLoading";
import PageNotFound from "../pages/notFound";

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <GLobalLoading />;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />}>
          {user?.is_superuser ? (
            <>
              <Route index element={<DashboardAdmin />} />
            </>
          ) : (
            <>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="projects" element={<Projects />} />
              <Route path="certificates" element={<Certificates />} />
            </>
          )}
        </Route>
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ResetPassword />} />
      <Route path="/confirm-password/:token" element={<ConfirmPassword />} />
      <Route path="/about" element={<AboutUs />} />

      <Route path="/:username" element={<PortfolioPage />} />
      <Route path="*" element={<PageNotFound />}/>
    </Routes>
  );
}

export default AppRoutes;