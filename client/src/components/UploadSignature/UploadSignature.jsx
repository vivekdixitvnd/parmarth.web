import React, { useEffect, useState } from "react";
import styles from "./UploadSignature.module.css";
import axios from "axios";
import backendUrl from "../../backendUrl";

const UploadSignature = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState("faculty1");

  const handleChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !user) return alert("Select file and user");
  
    const formData = new FormData();
    formData.append("signature", selectedFile); 
    formData.append("uploadedBy", user); 
    for (let pair of formData.entries()) {
      console.log(pair[0]+ ': ' + pair[1]);
    }
    
  
    try {
      const res = await axios.post(
        `${backendUrl}/upload-signature?uploadedBy=${user}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      alert(res.data.message);
      setSelectedFile(null);
      setPreview(null);
      onUpload(); // notify parent
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };
  

  return (
    <div className={styles.container}>
      <form onSubmit={handleUpload}>
        <h3>Upload Signature</h3>
        <select value={user} onChange={(e) => setUser(e.target.value)} required>
          <option value="faculty1">Faculty 1</option>
          <option value="faculty2">Faculty 2</option>
        </select>
        <input type="file" accept="image/*" onChange={handleChange} required />
        <button type="submit">Upload</button>
      </form>
      {preview && (
        <div className={styles.preview}>
          <img src={preview} alt="Signature Preview" />
        </div>
      )}
    </div>
  );
};

export default UploadSignature;
