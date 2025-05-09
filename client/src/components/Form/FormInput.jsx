import styles from "./FormInput.module.css";

const FormInput = ({ label, required, type = "text", name, value, onChange, placeholder, rows }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
};

export default FormInput;
