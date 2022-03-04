import React, { useEffect } from "react";
import "./loginScreen.scss";
import { RiAccountCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/authActions";
import { RiLoginBoxLine } from "react-icons/ri";

const LoginScreen = ({ setActive, value }) => {
  const dispatch = useDispatch();
  const loginClickHandler = () => {
    dispatch(login());
  };

  useEffect(() => {
    setActive(value);
  });

  return (
    <div className="main">
      <div className="main__content">
        <RiLoginBoxLine size={100} />
        <h1>Don't miss out</h1>
        <p>
          Sign in to access this feature and have a more personalised user
          experience
        </p>
        <button onClick={loginClickHandler}>
          <div>
            <RiAccountCircleLine size={28} />
            <span>SIGN IN</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
