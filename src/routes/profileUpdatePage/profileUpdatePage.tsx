import { useContext, useState, FormEvent } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "@/context/AuthContext";
import apiRequest from "@/lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget, {
  CloudinaryScriptContext,
} from "@/components/uploadWidget/UploadWidget";
import { routeEnum } from "@/constants/RouteConstants";
import useAuthUser from "@/hooks/useAuthUser";
import LoadingButton from "@/common/LoadingButton";
import { Notify } from "@/common/Notify";

function ProfileUpdatePage() {
  const user = useAuthUser();
  const { updateUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<string[]>([]);
  useContext(CloudinaryScriptContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      setIsLoading(true);
      const res = await apiRequest.put(`/users/${user?.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });

      setIsLoading(false);
      updateUser(res?.data);
      navigate(routeEnum.PROFILE);

      Notify(`${res?.data?.message || "Profile Update successful"}`, "success");
    } catch (err: any) {
      Notify(`${err?.response?.data?.error || "An error occured"}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              disabled
              defaultValue={user?.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              disabled
              defaultValue={user?.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="******"
            />
          </div>
          <div className="item">
            <label htmlFor="password">Confirm Password</label>
            <input id="password" placeholder="******" />
          </div>

          <LoadingButton
            type="submit"
            isLoading={isLoading}
            disabled={!avatar || isLoading}
            buttonText="Update"
          />
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || user?.avatar || "/noavatar.jpg"}
          alt=""
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "do611maii",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
