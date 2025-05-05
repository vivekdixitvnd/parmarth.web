import React, { useEffect } from "react";
import styles from "./ShareModel.module.css";
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";
import toast from "react-hot-toast";

const ShareModal = ({ onClose, title, url, image }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <h3>Share this post</h3>
        <div className={styles.icons}>
          <a
            href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp color="#25D366" />
            WhatsApp
          </a>
          <a
            href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaEnvelope color="#D44638" />
            Gmail
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook color="#4267B2" />
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter color="#1DA1F2" />
            Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin color="#0077B5" />
            LinkedIn
          </a>
          <button onClick={copyToClipboard}>
            <FaLink />
            Copy Link
          </button>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
