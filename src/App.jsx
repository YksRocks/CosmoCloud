import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EmployeeDetails from "./pages/EmployeeDetails";
import Navbar from "./components/Navbar/Navbar";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
