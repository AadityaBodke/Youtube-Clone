import React, { useState } from "react";
import "./_header.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdApps, MdNotifications } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../../store/actions/authActions";

const Header = ({ handleToggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const history = useHistory();
  const searchHandler = (e) => {
    e.preventDefault();
    history.push(`/search/${text}`);
  };

  const dispatch = useDispatch();
  const loginClickHandler = () => {
    dispatch(login());
  };

  return (
    <div className="header">
      <FaBars
        className="header__menu"
        size={26}
        onClick={handleToggleSidebar}
      />
      <img src="/images/youtube_logo.png" alt="logo" className="header__logo" />
      <form onSubmit={searchHandler}>
        <input
          type="text"
          placeholder="Search"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>
          <AiOutlineSearch size={22} color="white" />
        </button>
      </form>
      <div className="header__icons">
        <MdApps size={28} />
        <MdNotifications size={28} />
        {user === null ? (
          <button onClick={loginClickHandler}>
            <div>
              <RiAccountCircleLine size={28} />
              <span>SIGN IN</span>
            </div>
          </button>
        ) : (
          <img
            src={user?.photoURL}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/blank-profile-picture.webp";
            }}
            alt="profile pic"
          />
        )}
      </div>
    </div>
  );
};
export default Header;
