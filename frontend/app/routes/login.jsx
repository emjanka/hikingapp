import { useState } from "react";
import { Link, useNavigate } from "react-router";
import PasswordInput from "../components/PasswordInput";
import { supabase } from "../lib/supabaseClient";
import { loadProfile } from "../lib/profileStorage";
import "./onboarding.css"; // shared form styles (fields, button)
import "./auth.css";

export default function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) setError(error.message);
    // Onboarding done before? → app. Otherwise → onboarding first.
    else navigate(loadProfile() ? "/" : "/onboarding");
  }

  // Sends a "reset your password" email via Supabase
  async function handleForgotPassword() {
    setError("");
    setMessage("");
    if (!email) {
      setError("Type your email first, then tap “Forgot password?”.");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) setError(error.message);
    else setMessage("We sent you an email to reset your password.");
  }

  return (
    <main className="auth">
      <p className="auth__logo">LOGO</p>

      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__fields">
          <div className="step-title">
            <h1 className="auth__title">Welcome back!</h1>
            <p className="step-title__sub">Log in to find your next journey.</p>
          </div>

          <label className="field">
            <span className="field__label">Email</span>
            <input
              className="field__input"
              type="email"
              placeholder="Example@gmail.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <div>
            <label className="field">
              <span className="field__label">Password</span>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </label>
            <button type="button" className="auth__forgot" onClick={handleForgotPassword}>
              Forgot password?
            </button>
          </div>

          {error && <p className="auth__error">{error}</p>}
          {message && <p className="auth__message">{message}</p>}
        </div>

        <div className="auth__bottom">
          <p className="auth__switch">
            New to Forester? <Link to="/signup">Sign up</Link>
          </p>
          <button type="submit" className="onboarding__button" disabled={loading}>
            {loading ? "Logging in…" : "Log in"}
          </button>
        </div>
      </form>
    </main>
  );
}
