import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import type { AuthPageProps } from "../../types/Auth.types";

export default function GuestRoute({ setAuth }: AuthPageProps) {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/LogIn" element={<AuthPage setAuth={setAuth} />} />
      <Route path="/SignUp" element={<AuthPage setAuth={setAuth} />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
