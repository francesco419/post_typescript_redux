import "./UserSetting.scss";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/Slices/userSlice";
import { ReactComponent as Edit } from "../../pictures/edit.svg";

export function UserSetting() {
  const user = useAppSelector(selectUser);
  const temp: string[] = [
    `Nickname : ${user.name}`,
    "Password",
    `Birth : ${user.birth}`,
    `Email : ${user.email}`,
  ];

  const handleClick = () => {
    const upload = document.getElementById("upload") as HTMLDivElement;
    upload.style.display = "block";
  };
  return (
    <div className="block-usersettings-display">
      <div className="block-usersettings-0">
        <img src={user.img} />
        <button
          type="button"
          onClick={() => {
            const upload = document.getElementById("upload") as HTMLDivElement;
            upload.style.display = "block";
          }}
        >
          Image
        </button>
      </div>
      <div className="block-usersettings-1">
        {temp.map((data) => (
          <div>
            <p>{data}</p>
            <Edit onClick={handleClick} />
          </div>
        ))}
      </div>
      <div className="block-usersettings-2">
        <div>
          <p>Posts</p>
          <p>{user.post}</p>
        </div>
        <div>
          <p>Follow</p>
          <p>{user.follow}</p>
        </div>
        <div>
          <p>Follower</p>
          <p>{user.follower}</p>
        </div>
      </div>
      <div className="block-usersettings-3">
        <div className="block-usersettings-intro">
          <div className="block-usersettings-box">
            <p>Intro</p>
            <Edit onClick={handleClick} />
          </div>
          <div>
            <p>{user.intro}</p>
          </div>
        </div>
      </div>
      <div className="block-usersettings-4">
        <button>Save</button>
      </div>
    </div>
  );
}
