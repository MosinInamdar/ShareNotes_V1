import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import "./App.css";

// Import your components for the home page and dashboard
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Register from "./pages/register";
import { useAuthContext } from "./context/authContext";
import Upload from "./pages/upload";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={authUser ? <Home /> : <Home />} />
          <Route
            path="/dashboard"
            element={authUser ? <Dashboard /> : <Navigate to={"/"} />}
          />
          <Route
            path="/upload"
            element={authUser ? <Upload /> : <Navigate to={"/"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
