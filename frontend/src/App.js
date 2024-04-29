import React, { useContext  } from "react";
import './App.css';
import Post from "./Post";
import Header from "./Header";
import { Route, Routes,Navigate  } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import ProfilePage from './pages/ProfilePage';
import AdminPage from "./pages/AdminPage";


// function ProtectedRoute({ element: Element, requiredRole, ...rest }) {
//   const { user } = useContext(UserContext);

//   if (!user || user.role !== requiredRole) {
//     alert("Bạn không có quyền truy cập.");
//     return <Navigate to="/" />;
//   }

//   return <Route {...rest} element={<Element />} />;
// }

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage/>} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route exact path="/profile/settings" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
