import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Profile from "./components/Profile";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogList from "./BlogPages/BlogList";
import CreateBlog from "./BlogPages/CreateBlog";
import BlogView from "./BlogPages/BlogView";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/blog-list" element={<BlogList />} />
            <Route path="/create-blog" element={<CreateBlog />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<BlogView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
