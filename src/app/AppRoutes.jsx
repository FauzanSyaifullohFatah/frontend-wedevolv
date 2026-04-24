import { Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import PortfolioPage from "../pages/portfolio";

import DashboardPage from "../pages/dashboard";
import MyDashboard from "../pages/dashboard/MyDashboard";
import MyProjects from "../pages/dashboard/MyProjects";
import MyCertificates from "../pages/dashboard/MyCertificates";
import MyProfile from "../pages/dashboard/MyProfile";
import AboutUs from "../pages/aboutus";

function AppRoutes() {
  const { loading } = useAuth();

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />}>
              <Route index element={<MyDashboard />} />
              <Route path="profile" element={<MyProfile />} />
              <Route path="projects" element={<MyProjects />} />
              <Route path="certificates" element={<MyCertificates />} />
          </Route>
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/:username" element={<PortfolioPage />} />
        </Routes>
      )}
    </>
  );
}

export default AppRoutes;