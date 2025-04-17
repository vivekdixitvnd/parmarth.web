import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./CreatePost.module.css";
import PostForm from "../../components/PostForm/PostForm";

const CreatePost = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div style={{ paddingTop: "150px" }} className={styles.body}>
        <PostForm function="create" />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default CreatePost;
