import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { type User } from "../types/user";

function useAuthUser(): User {
  const { currentUser } = useContext(AuthContext);

  return currentUser;
}

export default useAuthUser;
