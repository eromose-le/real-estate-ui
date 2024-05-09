import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { routeEnum } from "../constants/RouteConstants";
import { Notify } from "@/common/Notify";

interface LogoutProps {
  logout: () => Promise<void>;
  isLoading: boolean;
}

function useLogout(): LogoutProps {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate(routeEnum.LOGIN);

      Notify("Logout successful", "success");
    } catch (err: any) {
      Notify(`${err?.response?.data?.error || "An error occured"}`, "error");
    } finally {
      setIsLoading(false);
    }
  }, [updateUser, navigate]);

  return { logout, isLoading };
}

export default useLogout;
