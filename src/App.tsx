// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main page route */}
        <Route path="/" element={<MainPage />} />
        {/* Admin page route */}
        <Route path="/admin" element={<AdminPage />} />
        {/* User page route */}
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default App;
