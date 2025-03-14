import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Profile } from "./pages";
import Student from "./pages/admin/students/index";
import Attendance from "./pages/admin/attendance";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/students" element={<Student />} />
          <Route path="/attendances" element={<Attendance />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
