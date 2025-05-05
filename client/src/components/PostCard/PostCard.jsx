// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./PostCard.module.css";
// import {
//   FaWhatsapp,
//   FaInstagram,
//   FaFacebook,
//   FaTwitter,
//   FaTelegramPlane,
//   FaCopy,
//   FaEnvelope,
//   FaShareAlt,
//   FaTimes,
// } from "react-icons/fa";

// const PostCard = (props) => {
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);

//   const postUrl = `${window.location.origin}/${props.data.category}/${props.data._id}`;

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(postUrl);
//     alert("URL copied to clipboard!");
//   };

//   return (
//     <>
//       <div
//         className={styles["post-card"]}
//         onClick={() => navigate(`/${props.data.category}/${props.data._id}`)}
//       >
//         <img src={props.data.coverPhotoUrl} alt="" />
//         <div className={styles.details}>
//           <h2>{props.data.title}</h2>
//           <div className={styles["info-row"]}>
//             <p className={styles["last-updated"]}>
//               {new Date(props.data.lastUpdated).toLocaleDateString([], {
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric",
//               })}
//             </p>
//             <div
//               className={styles["share-button"]}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setShowPopup(true);
//               }}
//             >
//               <FaShareAlt size={16} />
//               <span>Share</span>
//             </div>
//           </div>

//           {(props.data.category === "blog" ||
//             props.data.category === "article") && (
//               <p className={styles["category"]}>{props.data.category}</p>
//             )}
//         </div>
//       </div>

//       {showPopup && (
//         <div className={styles["share-popup"]} onClick={() => setShowPopup(false)}>
//           <div
//             className={styles["share-popup-content"]}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setShowPopup(false)}
//               className={styles["close-btn"]}
//             >
//               <FaTimes />
//             </button>
//             <h3>Share this Post</h3>
//             <div className={styles["share-icons"]}>
//               <a
//                 href={`https://wa.me/?text=${encodeURIComponent(postUrl)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaWhatsapp color="#25D366" />
//               </a>
//               <a
//                 href={`https://t.me/share/url?url=${encodeURIComponent(postUrl)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaTelegramPlane color="#0088cc" />
//               </a>
//               <a
//                 href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaFacebook color="#3b5998" />
//               </a>
//               <a
//                 href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaTwitter color="#1DA1F2" />
//               </a>
//               <a
//                 href={`mailto:?subject=Check this post&body=${encodeURIComponent(postUrl)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaEnvelope color="#EA4335" />
//               </a>
//               <a onClick={copyToClipboard}>
//                 <FaCopy color="#000000" />
//               </a>
//               {/* Instagram doesn’t support link share like others, open homepage */}
//               <a
//                 href={`https://www.instagram.com`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaInstagram color="#C13584" />
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PostCard;


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

