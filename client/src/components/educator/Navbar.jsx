import { dummyEducatorData, assets} from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const educatorData = dummyEducatorData;
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-8" />
      </Link>
      <div className="flex items-center gap-3">
        <p className="text-gray-700">Hi! {user ? user.fullName : "Developers"}</p>
        {user ? <UserButton /> : <img src={assets.profile_img} alt="user" className="w-8 h-8 rounded-full" />}
      </div>
    </div>
  );
};

export default Navbar;
