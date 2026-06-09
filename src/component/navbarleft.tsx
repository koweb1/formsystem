import './navbar.css'
import image from "../assets/transparent.png";
import { SlHome } from "react-icons/sl";
import { CiSettings } from "react-icons/ci";
import { AiOutlineSecurityScan } from "react-icons/ai";

export default function RightNavBar(){
    return (
      <div className="rightnavbar-container">
        <div className="topNav-left">
          <img src={image} />
        </div>
        <ul>
          <li className="color-blue">
            <SlHome />
            Profile
          </li>
          <li>
            <CiSettings />
            Setting
          </li>
          <li>
            <AiOutlineSecurityScan />
            Security
          </li>
        </ul>
      </div>
    );
}