import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Profile from "./components/Profile";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
// import BlogList from "./BlogPages/BlogList";
// import CreateBlog from "./BlogPages/CreateBlog";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
