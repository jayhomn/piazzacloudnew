import React from "react";
import LoginComponent from "../components/LoginComponent";

class Login extends React.Component {
  render() {
    return (
      <div
        style={{
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        }}
      >
        <LoginComponent
          style={{
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
          }}
        />
      </div>
    );
  }
}

export default Login;
