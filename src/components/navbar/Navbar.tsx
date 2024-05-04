import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";
import UserAvatar from "../common/UserAvatar";

function Navbar() {
  const user = useAuthUser();
  const [open, setOpen] = useState(false);

  const avatar = user?.avatar;
  const username = user?.username || "";

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>Estate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <UserAvatar
              username={username}
              imageUrl={avatar}
              alt="nav-profile-image"
            />
            <span>{username}</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <div className="user">
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </div>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/login">Sign in</a>
          <a href="/register">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
