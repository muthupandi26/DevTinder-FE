import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.userReducer);
  return <div className="mb-20">{user && <EditProfile user={user} />}</div>;
};

export default Profile;
