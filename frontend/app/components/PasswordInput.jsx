import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

/**
 * Password field with an eye button to show / hide the password.
 * Uses the same field styles as onboarding (onboarding.css).
 */
export default function PasswordInput({ value, onChange, autoComplete }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="field__input-wrap">
      <input
        className="field__input"
        type={visible ? "text" : "password"}
        placeholder="••••••••"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        minLength={6}
        required
      />
      <button
        type="button"
        className="field__icon field__icon--button"
        onClick={() => setVisible(!visible)}
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeSlashIcon size={24} /> : <EyeIcon size={24} />}
      </button>
    </div>
  );
}
