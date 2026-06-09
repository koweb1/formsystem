import "./formsuccess.css"
import { useNavigate } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { IoArrowForward } from "react-icons/io5";

export default function AccountCreated() {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          {" "}
          <IoMdCheckmark size={25} />
        </div>
        <h1>
          {" "}
          Account <span>created! </span>
        </h1>
        <p>Your account has been successfully created.</p>

        <div className="successfull-created-profile">
          <div className="success-profile">
            <FaUser size={25} color="green" />
          </div>
          <div className="success-info">
            <span>You're all set</span>
            <p>
              You can now signin to access <br />
              your account
            </p>
          </div>
        </div>
        
          <button
            className="success-button"
            onClick={() => navigate("/Loggin")}
          >
            Sign in to continue <IoArrowForward />
          </button>
        
      </div>
    </div>
  );
}