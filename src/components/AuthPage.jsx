import { useFormAndValidation } from "../utils/useFormAndValidation";

export default function AuthPage({
  title,
  formName,
  inputs,
  handleAuth,
  children,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, username, avatarLink: avatar } = values;
    console.log(username, avatar);
    handleAuth({ email, password, username, avatar }, resetForm);
  };

  return (
    <div className="auth-pg">
      <h2 className="auth-pg__title">{title}</h2>
      <form
        className={`auth-pg__form  auth-pg__form_${formName}`}
        onSubmit={handleSubmit}
      >
        {inputs.map((input) => {
          const { inputName, type, required, min, max } = input;
          const formattedInputName = inputName.replace(/\s\w/g, (match) =>
            match[1].toUpperCase()
          );
          return (
            <div key={formattedInputName} className="auth-pg__input-container">
              <label className="auth-pg__label">
                {inputName[0].toUpperCase() + inputName.slice(1)}
                {required && "*"}
                <input
                  type={type}
                  className="auth-pg__input"
                  name={formattedInputName}
                  value={values[formattedInputName] || ""}
                  onChange={handleChange}
                  required={required}
                  min={min}
                  max={max}
                />
              </label>
              <span
                className={`auth-pg__span${
                  errors[formattedInputName] ? " auth-pg__span_visible" : ""
                }`}
              >
                {errors[formattedInputName]}
              </span>
            </div>
          );
        })}
        <button
          className={`auth-pg__submit-btn${
            isValid ? " auth-pg__submit-btn_enabled" : ""
          }`}
          type="submit"
          disabled={!isValid}
        >
          {title}
        </button>
      </form>
      <div className="auth-pg__links-container">{children}</div>
    </div>
  );
}
