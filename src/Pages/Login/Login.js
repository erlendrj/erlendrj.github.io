import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const navigate = useNavigate();

  const login = async () => {
    const requestOptions = {
      method: "POST",
      data: {
        Username: username,
        Password: password,
      },
    };
    await axios(
      "https://tb-sjakk-back.onrender.com/login",
      requestOptions
    ).then((resp) => {
      if (Object.keys(resp.data).length === 0) {
        setIncorrectPassword(true);
      } else if (resp.data[0].firstname === "Erlend") {
        console.log(resp.data);
        secureLocalStorage.setItem("user", resp.data[0].firstname);
        navigate("/admin");
      }
    });
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="login-main">
      <div className="login-form">
        <div>
          <div className={incorrectPassword ? "incorrect-password" : "d-none"}>
            Sorry, Incorrect Password. Try Again!
          </div>
          <div className="input-div">
            <input
              type="text"
              className="input-login"
              placeholder="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-div">
            <input
              type="password"
              className="input-login"
              placeholder="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>
          <div className="btn">
            <button type="submit" onClick={() => login()}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
