import React, { useState } from "react";
import "../CSS/Login.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const LoginPage = () => {
  const [email, Set_email] = useState("");
  const [pwd, Set_pwd] = useState("");

  const history = useHistory();

  const error1 = (inp, msg) => {
    if (!inp.classList.contains("invalid")) {
      inp.classList.add("invalid");
    }
    if (inp.classList.contains("valid")) {
      inp.classList.remove("valid");
    }

    inp.nextElementSibling.innerHTML = msg;
  };

  const success1 = (inp) => {
    if (inp.classList.contains("invalid")) {
      inp.classList.remove("invalid");
    }
    if (!inp.classList.contains("valid")) {
      inp.classList.add("valid");
    }
    inp.nextElementSibling.innerHTML = "";
  };

  const checkEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const checkValue = (inp) => {
    console.log(inp)
    if (inp.value == "") {
      error1(inp, `${inp.id} is required!`);
    } else {
      success1(inp);
    }
  };

  const OnFormSubmit = (e) => {
    e.preventDefault();
    let email_ = document.querySelector("#email");
    let pwd_ = document.querySelector("#password");
    checkValue(email_);
    checkValue(pwd_);
    if (checkEmail(email_.value)) {
      success1(email_);
    } else {
      error1(email_, "Invalid email address");
    }

    try {
      if (pwd !== "" && email !== "") {
        if (
          !email_.classList.contains("invalid") &&
          !pwd_.classList.contains("invalid")
        ) {
          setTimeout(() => {
            history.push("/");
          }, 2500);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeEmail = (e) => {
    Set_email(e.target.value);
  };
  const onChangePwd = (e) => {
    Set_pwd(e.target.value);
  };

  return (
    <main className="login_main">
      <section className="login-section">
        <div className="left_part">
          <h1>Welcome Back</h1>
          <h3>Please sign in to your account to use the app</h3>
          <p>
            No Account?{" "}
            <span>
              Create new one{" "}
              <i
                style={{ marginLeft: "4px", marginTop: "2px" }}
                className="fa fa-arrow-right"
              ></i>
            </span>
          </p>
        </div>
        <div className="right_part">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <div className="input-group_login">
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  id="email"
                  onChange={onChangeEmail}
                  type="text"
                  placeholder="Email"
                  className="login-input email-input"
                />
                <div style={{fontSize:"0.85em",fontWeight:"600",color:"brown",marginTop:"12px",marginLeft:"6px"}}></div>
              </div>
              <div className="input-group_login">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  value={pwd}
                  onChange={onChangePwd}
                  type="password"
                  placeholder="Password"
                  className="login-input password-input"
                />
                <div style={{fontSize:"0.85em",fontWeight:"600",color:"brown",marginTop:"12px",marginLeft:"6px"}}></div>
              </div>
              <div className="forgot_password">Forgot Password?</div>
              <button onClick={OnFormSubmit} className="register_login_btn">Sign In</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
