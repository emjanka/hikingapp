import { useState } from "react";
import { Link, useNavigate } from "react-router";
import PasswordInput from "../components/PasswordInput";
import { supabase } from "../lib/supabaseClient";
import "./onboarding.css"; // shared form styles (fields, button)
import "./auth.css";

export default function SignUp() {
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

    // Create the account in Supabase
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else if (data.session) {
      // Logged in straight away → continue to onboarding
      navigate("/onboarding");
    } else {
      // Supabase is set to confirm emails first
      setMessage("Check your inbox and confirm your email, then log in.");
    }
  }

  return (
    <main className="auth">
      <p className="auth__logo">LOGO</p>

      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__fields">
          <div className="step-title">
            <h1 className="auth__title">Welcome!</h1>
            <p className="step-title__sub">Create your account to join our community.</p>
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

          <label className="field">
            <span className="field__label">Password</span>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </label>

          {error && <p className="auth__error">{error}</p>}
          {message && <p className="auth__message">{message}</p>}
        </div>

        <div className="auth__bottom">
          <p className="auth__switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
          <button type="submit" className="onboarding__button" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </button>
        </div>
      </form>
    </main>
  );
}
