import "./login.css";
import image from "../assets/transparent.png";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaApple } from "react-icons/fa";
import { BiLogoFacebookCircle, BiLogoGoogle } from "react-icons/bi";
import React, { useState } from "react";
import { doSignInWithEmailAndPassword, doGoogleSignIN } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

function getAuthErrorMessage(err: unknown): string {
  if (err instanceof Error && "code" in err) {
    switch ((err as { code: string }).code) {
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-credential":
        return "Invalid email or password.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/user-disabled":
        return "This account has been disabled.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/network-request-failed":
        return "Network error. Check your connection.";
      default:
        return "Something went wrong. Please try again.";
    }
  }
  return "Something went wrong. Please try again.";
}

export default function Loggin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // ✅ was never set to true

    try {
      await doSignInWithEmailAndPassword(email, password);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/user-profile"), 1000); // ✅ redirect to profile
    } catch (err: unknown) {
      setError(getAuthErrorMessage(err)); // ✅ proper error messages
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignin() { // ✅ not a form handler, no e.preventDefault needed
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await doGoogleSignIN();
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/user-profile"), 1000);
    } catch (err: unknown) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="image-container">
            <img src={image} alt="" />
          </div>

          <div className="text-container">
            <span>Welcome back</span>
            <span className="second-span">Sign in to continue your journey</span>
          </div>

          <div className="full-input-container">
            <div className="input-container">
              <MdEmail color="rgba(0, 0, 0, 0.486)" />
              <input
                type="email" // ✅ was "text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <IoMdLock color="rgba(0, 0, 0, 0.486)" />
              <input
                type="password" // ✅ was "text", and placeholder was "Username" — wrong
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>} {/* ✅ success feedback */}

            <div className="forgotten-password-container">
              <span>Forgotten password?</span>
            </div>

            <div className="button-container">
              <button type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"} {/* ✅ was "Sign up" */}
              </button>
            </div>

            <div className="divider">
              <span>or</span>
            </div>
          </div>

          <div className="iconic">
            <BiLogoFacebookCircle size={30} />
            <FaApple size={30} />
            <button // ✅ was <a onClick> which is bad practice
              type="button"
              onClick={handleGoogleSignin}
              disabled={loading}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <BiLogoGoogle size={30} />
            </button>
          </div>

          <div className="already">
            <p>
              Don't have an account?{" "}
              <span onClick={() => navigate("/signup")}>Sign up</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}