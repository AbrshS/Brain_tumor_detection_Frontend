import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import  Dashboard  from "./dashboard";
import Login from "./login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Dashboard} />
        <Route path="/analysis" Component={Login} />
      </Routes>
    </Router>
  );
}

export default App;
