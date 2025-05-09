import React from "react";
import styles from "./HelpCard.module.css";

const HelpCard = ({
  src,
  title,
  description,
  primaryBtnText = 'Donate Now',
  primaryBtnUrl = '',
  titleColor = '#2a9be7',
  dividerColor = '#2a9be7',
  primaryBtnColor = '#277bc0',
  bgColor = 'rgba(253, 243, 228, 0.85)'
}) => {
  return (
    <div className={styles.card} style={{
      backgroundImage: `url(${src})`,
      '--title-color': titleColor,
      '--divider-color': dividerColor,
      '--primary-btn-color': primaryBtnColor,
      '--bg-color': bgColor
    }}>
      <div className={styles.contentOverlay}></div>
      <div className={styles.cardContent}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.divider}></div>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttonContainer}>
        <a href={primaryBtnUrl} className={styles.actionButton}>
            {primaryBtnText}
          </a>
          
        </div>
      </div>
    </div>
  );
};

export default HelpCard;
