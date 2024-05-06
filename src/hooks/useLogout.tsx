import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { routeEnum } from "../constants/RouteConstants";

interface LogoutProps {
  logout: () => Promise<void>;
  isError: boolean;
  isLoading: boolean;
}

function useLogout(): LogoutProps {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate(routeEnum.LOGIN);
    } catch (err) {
      setIsError(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [updateUser, navigate]);

  return { logout, isError, isLoading };
}

export default useLogout;
