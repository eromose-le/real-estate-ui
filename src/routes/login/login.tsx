import { FormEvent, useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { routeEnum } from "@/constants/RouteConstants";
import { AuthContext } from "@/context/AuthContext";
import apiRequest from "@/lib/apiRequest";
import LoadingButton from "@/common/LoadingButton";
import { Notify } from "@/common/Notify";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      updateUser(res?.data?.data);
      navigate(routeEnum.HOME);

      Notify(`${res?.data?.message || "Login successful"}`, "success");
    } catch (err: any) {
      Notify(`${err?.response?.data?.error || "An error occured"}`, "error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <LoadingButton
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            buttonText="Login"
          />
          <Link to={routeEnum.REGISTER}>{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
