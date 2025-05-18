import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostCard.module.css";
import { FaShareAlt } from "react-icons/fa";
import ShareModal from "./ShareModal";

const PostCard = (props) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // ✅ Handle body scroll lock
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <>
      <div
        className={styles["post-card"]}
        onClick={() => navigate(`/${props.data.category}/${props.data._id}`)}
      >
        <img src={props.data.coverPhotoUrl} alt="" />
        <div className={styles.details}>
          <h2>{props.data.title}</h2>

          {/* Bottom row with date and share button */}
          <div className={styles.bottomRow}>
            <p className={styles["last-updated"]}>
              {new Date(props.data.lastUpdated).toLocaleDateString([], {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <button
              className={styles.shareButton}
              onClick={(e) => {
                e.stopPropagation(); // prevent navigate
                setShowModal(true);
              }}
            >
              <FaShareAlt style={{ marginRight: "6px" }} />
              Share
            </button>
          </div>

          {(props.data.category === "blog" ||
            props.data.category === "article") && (
            <p className={styles["category"]}>{props.data.category}</p>
          )}
        </div>
      </div>

      {showModal && (
        <ShareModal
          onClose={() => setShowModal(false)}
          title={props.data.title}
          url={`${window.location.origin}/${props.data.category}/${props.data._id}`}
          image={props.data.coverPhotoUrl}
        />
      )}
    </>
  );
};

export default PostCard;

