import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AuthenticatedRoute from "./components/routes/AuthenticatedRoute";
import GuestRoute from "./components/routes/GuestRoute";
import { useEffect, useState } from "react";
import axios from "axios";
import type { JwtPayload, TokenRes } from "./types/Auth.types";
import { jwtDecode } from "jwt-decode";

function App() {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    async function GetToken(): Promise<void> {
      try {
        const res = await axios.get<TokenRes>(
          "http://localhost:5174/Auth/GetToken",
          {
            withCredentials: true,
          }
        );

        if (res.status !== 200) {
          setAuth(false);
          return;
        }

        const payload = jwtDecode<JwtPayload>(res.data.token);

        const currentTime: number = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < currentTime) {
          setAuth(false);
          return;
        }

        setAuth(true);
      } catch {
        setAuth(false);
      }
    }
    GetToken();
  }, []);

  return (
    <BrowserRouter>
      {auth ? (
        <AuthenticatedRoute setAuth={setAuth} />
      ) : (
        <GuestRoute setAuth={setAuth} />
      )}
    </BrowserRouter>
  );
}

export default App;
