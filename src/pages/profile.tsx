import RightNavBar from "../component/navbarleft";
import TopNavBar from "../component/navbartop";
import { MdOutlineEdit } from "react-icons/md";
import { LuLogOut, LuCalendarDays } from "react-icons/lu";
import image from "../assets/cool-profile-pictures-fake-smile.avif";
import gmail from "../assets/gmail-new.jpg";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase"; // ✅ import your firebase auth instance
import { signOut } from "firebase/auth";

export default function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser; // ✅ get the currently logged-in user

  // ✅ Format creation date from Firebase metadata
  const creationTime = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Unknown";

  // ✅ Extract first name from displayName for the greeting
  const fullName = user?.displayName ?? "User";
  const firstName = fullName.split(" ")[0];

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/Loggin"); // ✅ redirect to login after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  return (
    <div className="profile-container">
      <div className="top">
        <TopNavBar />
      </div>
      <div className="left">
        <RightNavBar />
      </div>
      <div className="bottom">
        <div className="profile-body-right">
          <h1>
            Welcome back, <span>{fullName}</span> 👋 {/* ✅ real name */}
          </h1>
          <p>Here's your account overview.</p>

          <div className="body-right-bottom">
            <div className="body-right-image">
              <img src={image} alt="profile" />
            </div>

            <h2>{firstName}</h2> {/* ✅ real first name */}

            <div className="gmail-container">
              <div className="gmail-package">
                <img src={gmail} alt="gmail" />
              </div>
              <span>{user?.email ?? "No email found"}</span> {/* ✅ real email */}
            </div>

            <div className="profile-icons-container">
              <div className="profile-calendar">
                <LuCalendarDays />
              </div>
              <div className="profile-icons">
                <span className="account-created">Account created</span>
                <span>{creationTime}</span> {/* ✅ real creation date */}
              </div>
            </div>

            <div className="profile-buttons">
              <button>
                <MdOutlineEdit size={18} /> Edit profile
              </button>
            </div>

            <div className="profile-final-button" onClick={handleLogout} style={{ cursor: "pointer" }}>
              <LuLogOut />
              <span>Logout</span> {/* ✅ actually works now */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}