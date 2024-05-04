import Chat from "@/components/chat/Chat";
import List from "@/components/list/List";
import "./profilePage.scss";
import useAuthUser from "@/hooks/useAuthUser";
import useLogout from "@/hooks/useLogout";
import UserAvatar from "@/common/UserAvatar";

function ProfilePage() {
  const user = useAuthUser();
  const { logout, isLoading } = useLogout();

  const avatar = user?.avatar;
  const username = user?.username || "";
  const email = user?.email || "";

  const profileInfo = [
    {
      id: 1,
      title: "Avatar",
      value: (
        <UserAvatar username={username} imageUrl={avatar} alt="profile-image" />
      ),
      // value: <img src={avatar} alt="" />,
    },
    {
      id: 2,
      title: "Username",
      value: username,
    },
    {
      id: 3,
      title: "E-mail",
      value: email,
    },
  ];

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            {profileInfo?.map((profile) => (
              <span key={profile.id}>
                {profile.title}: {profile.value}
              </span>
            ))}

            <button onClick={logout} disabled={isLoading}>
              Logout {isLoading && <span id="loading-indicator"></span>}
            </button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
