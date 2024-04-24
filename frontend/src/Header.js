import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./pages/UserContext";
import logoImage from '../src/img/logo.png';
export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="top-bar">
      <div className="logo">
        <Link to="/" className="logo">
          <img src={logoImage} alt="MyBlog Logo" /> 
        </Link>
      </div>
      <div className="menu">
          <a href="/">Home</a>
          <a href="#">Blog</a>
          <a href="/admin">Test Admin</a>
      </div>
      <nav>
          {username ? (
              <div className="user-info">
                  <div className="username" onClick={() => setDropdownOpen(!dropdownOpen)}>{username}</div>
                  {dropdownOpen && (
                      <div className="dropdown-menu">
                          <Link to="/create" className="create-post">Create new post</Link>
                          <Link to="/profile/settings" className="profile-username">Profile</Link>
                          <button onClick={logout} className="logout-btn">Logout</button>
                      </div>
                  )}
              </div>
          ) : (
              <div className="auth-links">
                  <Link to="/login" className="login">Login</Link>
                  <Link to="/register" className="register">Register</Link>
              </div>
          )}
      </nav>
    </header>
  );
}
