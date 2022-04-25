import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

import SuperAdmin from "./SuperAdmin";
import Admin from "./Admin";

// Config
import config from "../config";
import HR from "./HR";
import User from "./User";

const Home = () => {
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [isSuperAdmin, setSuperAdmin] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [isHR, setHR] = useState(false);
  const [isUser, setUserUI] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserDetails();
  }, []);

  const checkUserDetails = async () => {
    console.log(localStorage.getItem("token"));

    if (localStorage.getItem("token") === null) {
      setLoginRedirect(true);
    } else {
      const user = await axios.get(
        `${config.apiURL}/api/v1/auth/user?token=${localStorage.getItem(
          "token"
        )}`
      );
      setUser(user.data);

      if (user.data.role === "ROLE_SUPER_ADMIN") {
        setSuperAdmin(true);
        console.log(user.data);
      } else if (user.data.role === "ROLE_ADMIN") {
        setAdmin(true);
      } else if (user.data.role === "ROLE_HR") {
        setHR(true);
      } else {
        setUserUI(true);
      }
    }
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Typography align="center" variant="body2" sx={{ mt: 5, mb: 1 }}>
          Loading....
        </Typography>
      ) : (
        <>
          {loginRedirect ? (
            <Navigate to="/login" />
          ) : (
            <>
              {isSuperAdmin && <SuperAdmin user={user} />}
              {isAdmin && <Admin user={user} />}
              {isHR && <HR user={user} />}
              {isUser && <User user={user} />}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
