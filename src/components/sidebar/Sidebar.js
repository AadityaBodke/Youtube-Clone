import React from "react";
import "./_sidebar.scss";
import {
  MdHome,
  MdSubscriptions,
  MdThumbUp,
  MdExplore,
  MdHistory,
  MdExitToApp,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../store/actions/authActions";
import { useHistory } from "react-router";
import { RiAccountCircleLine } from "react-icons/ri";

const Sidebar = ({ toggleSidebar, active }) => {
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();

  const component = (icon, title, clickHandler) => (
    <li onClick={clickHandler} className={active === title ? "active" : ""}>
      {icon}
      <span>{title}</span>
    </li>
  );

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  const loginClickHandler = () => {
    dispatch(login());
  };

  const handleClick = (title) => {
    switch (title) {
      case "Home":
        history.push("/");
        break;
      case "Subscriptions":
        history.push("/feed/subscriptions");
        break;
      default:
        history.push("/");
    }
  };

  return (
    <nav className={toggleSidebar ? "sidebar open" : "sidebar"}>
      {component(<MdHome size={23} />, "Home", () => handleClick("Home"))}
      {component(<MdSubscriptions size={23} />, "Subscriptions", () =>
        handleClick("Subscriptions")
      )}
      <hr />
      {user != null ? (
        component(<MdExitToApp size={23} />, "Log out", logoutHandler)
      ) : (
        <div className="sidebar__auth">
          <p>Sign in to access all the features</p>
          <button onClick={loginClickHandler}>
            <div>
              <RiAccountCircleLine size={28} />
              <span>SIGN IN</span>
            </div>
          </button>
        </div>
      )}
      <hr />
    </nav>
  );
};

export default Sidebar;
