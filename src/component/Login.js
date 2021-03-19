import React from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";

import { AUTH_USER } from "../constants";

const Login = ({ setUserLogged }) => {
  const [loginUser, { loading, data, error }] = useMutation(LOGIN_USER);
  const emailRef = React.useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      loginUser({ variables: { email: emailRef.current.value } });
    } catch (er) {
      console.log("err");
    }
  };

  if (data) {
    const { login } = data;
    setUserLogged(login);
    localStorage.setItem(AUTH_USER, JSON.stringify(login));
  }

  return (
    <>
      <form onSubmit={(e) => submitHandler(e)}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="yourname@example.com"
          style={{ textAlign: "center" }}
          ref={emailRef}
          required
        />
        <br />
        <input type="submit" value="login" />
      </form>
      <br />
      {loading && <div>logging in...</div>}
      {error && <div>An error has occurred</div>}
    </>
  );
};

export default Login;
