import { useState, useEffect } from "react";
import axios from "axios";

const useAuthentication = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkAccessToken = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await axios.get("http://localhost:8000/api/user/", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (response.status === 200) {
            setUserData(response.data);
          }
        } catch (error) {
          console.error("Error while fetching user data:", error);
          localStorage.removeItem("accessToken");
          window.location.replace("/authorization");
        }
      } else {
        window.location.replace("/authorization");
      }
    };

    checkAccessToken();
  }, []);

  return userData;
};

export default useAuthentication;
