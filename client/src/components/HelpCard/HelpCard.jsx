import styles from "./HelpCard.module.css";
import { Link } from "react-router-dom";

const HelpCard = ({
  src,
  title,
  description,
  primaryBtnText = "Donate Now",
  secondaryBtnText = "Learn More",
  primaryBtnUrl = "",
  secondaryBtnUrl = "",
  titleColor = "#2a9be7",
  dividerColor = "#2a9be7",
  primaryBtnColor = "#277bc0",
  secondaryBtnColor = "#2a9be7",
  bgColor = "rgba(253, 243, 228, 0.85)",
}) => {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(${src})`,
        "--title-color": titleColor,
        "--divider-color": dividerColor,
        "--primary-btn-color": primaryBtnColor,
        "--secondary-btn-color": secondaryBtnColor,
        "--bg-color": bgColor,
      }}
    >
      <div className={styles.contentOverlay}></div>
      <div className={styles.cardContent}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.divider}></div>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttonContainer}>
          <Link to={primaryBtnUrl} className={styles.actionButton}>
            {primaryBtnText}
          </Link>
          <Link to={secondaryBtnUrl} className={styles.secondaryButton}>
            {secondaryBtnText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpCard;
