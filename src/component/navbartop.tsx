import image from "../assets/transparent.png";
import profile from "../assets/cool-profile-pictures-fake-smile.avif";
import { IoSunnyOutline } from "react-icons/io5";
import "./navbar.css";
export default function TopNavBar() {
  return (
    <div className="topnavbar-container">
      <nav>
        <div className="topNav-left">
          <img src={image} />
        </div>
        <div className="topNav-right">
          <IoSunnyOutline size={25} />
          <div className="topNav-user">
            <img src={profile} alt="" />
          </div>
        </div>
      </nav>
    </div>
  );
}
