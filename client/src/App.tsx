import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AuthenticatedRoute from "./components/routes/AuthenticatedRoute";
import GuestRoute from "./components/routes/GuestRoute";

function App() {
  const auth: boolean = false;

  return (
    <BrowserRouter>
      {auth ? <AuthenticatedRoute /> : <GuestRoute />}
    </BrowserRouter>
  );
}

export default App;
