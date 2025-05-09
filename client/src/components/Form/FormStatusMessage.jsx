import styles from "./FormStatusMessage.module.css";

const FormStatusMessage = ({ status }) => {
  if (status === "success")
    return <div className={styles.success}>Thank you! We’ll contact you soon.</div>;
  if (status === "error")
    return <div className={styles.error}>Error submitting form. Try again.</div>;
  if (status === "sending")
    return <div className={styles.sending}>Sending your details...</div>;
  return null;
};

export default FormStatusMessage;
