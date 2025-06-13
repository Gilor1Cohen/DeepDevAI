import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import AuthPage from "../pages/AuthPage/AuthPage";

export default function GuestRoute() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/LogIn" element={<AuthPage />} />
      <Route path="/SignUp" element={<AuthPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
