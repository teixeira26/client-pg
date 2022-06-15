import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./loading.module.css";

export const Loading = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/no-registrado");
  }, [isLoading, isAuthenticated, navigate]);
  return (
    <div className={styles.loading}>
      <img src="https://cdn.dribbble.com/users/29245/screenshots/2222541/media/69ae0b5b5a7148ed864f889ad9f8498d.gif" alt='img not found'/>
    </div>
  );
};

export default Loading;


