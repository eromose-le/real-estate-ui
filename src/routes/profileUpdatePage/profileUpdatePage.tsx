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

function ProfileUpdatePage() {
  const user = useAuthUser();
  const { updateUser } = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const [avatar, setAvatar] = useState<string[]>([]);
  const { loaded } = useContext(CloudinaryScriptContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const { username, email, password } = Object.fromEntries(formData);

    console.log("PAYLOADS", avatar[0]);
    try {
      const res = await apiRequest.put(`/users/${user?.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });

      updateUser(res?.data?.data);
      navigate(routeEnum.PROFILE);
    } catch (err: any) {
      console.log(err);
      setError(err?.response?.data?.error);
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
              defaultValue={user?.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user?.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button type="submit" disabled={!loaded}>
            Update
          </button>
          {error && <span>{error}</span>}
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
          // setPublicId={undefined}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
