import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
const EmployeeDetails = lazy(() => import("./pages/EmployeeDetails"));
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loaders/Loader";
function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
