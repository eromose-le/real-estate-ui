import { Notify } from "@/common/Notify";
import apiRequest from "@/lib/apiRequest";

export const logoutAction = async (error: any) => {
  await apiRequest.post("/auth/logout");
  window.location.replace("http://localhost:5173/login");
  Notify(`${error || "An error occured"}`, "error");
  return;
};
