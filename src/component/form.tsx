import "./form.css";
import image from "../assets/transparent.png";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { FaApple } from "react-icons/fa";
import { BiLogoFacebookCircle, BiLogoGoogle } from "react-icons/bi";
import {
  doCreateUserWithEmailAndPassword,
  doGoogleSignIN,
} from "../firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

function getAuthErrorMessage(err: unknown): string {
  if (err instanceof Error && "code" in err) {
    switch ((err as { code: string }).code) {
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password must be at least 6 characters.";
      case "auth/network-request-failed":
        return "Network error. Check your connection.";
      default:
        return "Something went wrong. Please try again.";
    }
  }
  return "Something went wrong. Please try again.";
}

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // ✅ fixed typo in setter name
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ was true

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true); // ✅ set at start
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(
        email,
        password,
      );
      await updateProfile(userCredential.user, {
        // ✅ actually saves username
        displayName: username,
      });
      navigate("/account-created"); // ✅ redirect on success
    } catch (err: unknown) {
      // ✅ was error: any
      setError(getAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignup() {
    setError("");
    setIsSubmitting(true);
    try {
      await doGoogleSignIN();
      navigate("/account-created");
    } catch (err: unknown) {
      setError(getAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="image-container">
            <img src={image} alt="" />
          </div>
          <div className="text-container">
            <span>Your journey starts here</span>
            <span className="second-span">Take the first step</span>
          </div>

          <div className="full-input-container">
            <div className="input-container">
              <FaUser color="rgba(0, 0, 0, 0.486)" />{" "}
              {/* ✅ removed "color:" prefix */}
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Username"
                required
              />
            </div>

            <div className="input-container">
              <MdEmail color="rgba(0, 0, 0, 0.486)" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>

            <div className="input-container">
              <IoMdLock color="rgba(0, 0, 0, 0.486)" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <div className="input-container">
              <IoMdLock color="rgba(0, 0, 0, 0.486)" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // ✅ fixed typo
                placeholder="Confirm password"
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="button-container">
              <button type="submit" disabled={isSubmitting}>
                {" "}
                {/* ✅ disabled while loading */}
                {isSubmitting ? "Creating account..." : "Sign up"}
              </button>
            </div>

            <div className="divider">
              <span>or</span>
            </div>
          </div>

          <div className="iconic">
            <BiLogoFacebookCircle size={30} />
            <FaApple size={30} />
            <button // ✅ was <a onClick>
              type="button"
              onClick={handleGoogleSignup}
              disabled={isSubmitting}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <BiLogoGoogle size={30} />
            </button>
          </div>

          <div className="already">
            <p>
              Already have an account?{" "}
              <span onClick={() => navigate("/Loggin")}>Sign in</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
