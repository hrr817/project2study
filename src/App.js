import React, { useState, useEffect, useCallback } from "react";
import { setContext } from "@apollo/client/link/context";

import Login from "./component/Login";
import RocketLaunchesList from "./component/RocketLaunchesList";

import { AUTH_USER } from "./constants";

const userToken = JSON.parse(localStorage.getItem(AUTH_USER));

function App() {
  const [userLogged, setUserLogged] = useState(null);
  

  useEffect(() => {
    if (userToken) {
      setUserLogged(userToken);
      setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: AUTH_USER.token ? `Bearer ${AUTH_USER.token}` : "",
          },
        };
      });
    }
  }, []);

  const setUserLoggedMemoized = useCallback(
    (obj) => setUserLogged({ ...obj }),
    [setUserLogged]
  );

  const logOut = () => {
    localStorage.removeItem(AUTH_USER);
    setUserLogged(null);
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      {userLogged && (
        <nav
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            borderBottom: "1px solid #cecece",
            padding: "1em",
          }}
        >
          <span>Welcome back, {userLogged.email}</span>
          <button style={{ padding: "0.5em" }} onClick={logOut}>
            {" "}
            Log out
          </button>
        </nav>
      )}
      {!userLogged && <Login setUserLogged={setUserLoggedMemoized} />}
      {userLogged && <RocketLaunchesList />}
    </div>
  );
}

export default App;
