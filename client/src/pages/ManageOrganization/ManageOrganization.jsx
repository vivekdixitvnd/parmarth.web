import React, { useEffect, useState, useContext, useRef } from "react";
import styles from "./ManageOrganization.module.css";
import toast from "react-hot-toast";
import AuthContext from "../../store/auth-context";
import backendUrl from "../../backendUrl";
import { fetchOrganizationData, clearOrgCache } from "../../api/organization";
import Modal from "../../components/Modal/Modal";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const SECTION_LABELS = {
  founder: "संस्थापक सदस्य (Founder)",
  advisory: "सलाहकार समिति (Advisory)",
  coreAdvisory: "मुख्य सलाहकार समिति (Core Advisory)",
  director: "निदेशक (Director)",
  governingHeadMem: "संकाय सलाहकार (Governing Head)",
  governingPastMem: "पूर्व संकाय सलाहकार (Governing Past)",
  executive: "प्रबंधकारिणी समिति (Executive)",
  legacyPresidents: "पूर्व अध्यक्ष (Legacy Presidents)",
  legacyVicePresidents: "पूर्व उपाध्यक्ष (Legacy Vice Presidents)",
};

const SECTION_FIELDS = {
  founder: ["ref", "name", "batch", "linkedin", "email"],
  advisory: ["ref", "name", "batch", "linkedin", "email"],
  coreAdvisory: ["ref", "name", "batch", "linkedin", "email"],
  director: ["name", "designation", "message", "linkedin", "email", "imgSrc"],
  governingHeadMem: ["name", "roleParmarth", "department", "message", "linkedin", "email", "imgSrc"],
  governingPastMem: ["name", "roleParmarth", "department", "message", "linkedin", "email", "imgSrc"],
  executive: ["name", "designation", "linkedin", "email", "imgSrc"],
  legacyPresidents: ["name", "designation", "department", "message", "linkedin", "email", "imgSrc"],
  legacyVicePresidents: ["name", "designation", "department", "message", "linkedin", "email", "imgSrc"],
};

const ManageOrganization = () => {
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState("executive");
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, index: null });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const imageInputRef = useRef(null);
  const authCtx = useContext(AuthContext);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchOrganizationData();
      setOrgData(data);
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const currentData = orgData?.[selectedSection];
  const isArray = Array.isArray(currentData);
  const fields = SECTION_FIELDS[selectedSection] || [];

  const openAddModal = () => {
    setEditIndex(null);
    const initial = {};
    fields.forEach((f) => (initial[f] = ""));
    setFormData(initial);
    setShowModal(true);
  };

  const openEditModal = (item, index) => {
    setEditIndex(index);
    const initial = {};
    fields.forEach((f) => (initial[f] = item[f] || ""));
    setFormData(initial);
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image (JPEG, PNG, WebP)");
      return;
    }
    setUploadingImage(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);
      const res = await fetch(`${backendUrl}/organization/upload-image`, {
        method: "POST",
        headers: { Authorization: "Bearer " + authCtx.token },
        body: formDataUpload,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || `Upload failed (${res.status})`);
        return;
      }
      if (data.error) {
        toast.error(data.error);
        return;
      }
      if (data.imageUrl) {
        setFormData((prev) => ({ ...prev, imgSrc: data.imageUrl }));
        toast.success("Image uploaded");
      } else {
        toast.error("Invalid response from server");
      }
    } catch (err) {
      toast.error(err.message || "Network error");
    }
    setUploadingImage(false);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = JSON.parse(JSON.stringify(orgData));
      const sectionData = updated[selectedSection];

      const newItem = { id: editIndex !== null && isArray ? (sectionData[editIndex]?.id || editIndex + 1) : Date.now(), ...formData };

      if (isArray) {
        if (editIndex !== null) {
          sectionData[editIndex] = newItem;
        } else {
          sectionData.push(newItem);
        }
      } else {
        updated[selectedSection] = newItem;
      }

      const res = await fetch(`${backendUrl}/organization`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
      });
      const resData = await res.json();

      if (resData.error) {
        toast.error(resData.error);
      } else {
        toast.success(resData.message);
        clearOrgCache();
        setOrgData(updated);
        setShowModal(false);
      }
    } catch (err) {
      toast.error(err.message);
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    const idx = deleteModal.index;
    if (idx === null) return;
    setDeleting(true);
    try {
      const updated = JSON.parse(JSON.stringify(orgData));
      const sectionData = updated[selectedSection];

      if (Array.isArray(sectionData)) {
        sectionData.splice(idx, 1);
      } else {
        updated[selectedSection] = null;
      }

      const res = await fetch(`${backendUrl}/organization`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
      });
      const resData = await res.json();

      if (resData.error) {
        toast.error(resData.error);
      } else {
        toast.success("Deleted successfully");
        clearOrgCache();
        setOrgData(updated);
        setDeleteModal({ show: false, index: null });
      }
    } catch (err) {
      toast.error(err.message);
    }
    setDeleting(false);
  };

  if (loading) {
    return (
      <div style={{ paddingTop: "150px", textAlign: "center" }}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  const displayItems = isArray ? currentData : (currentData ? [currentData] : []);

  return (
    <div style={{ paddingTop: "150px" }} className={styles.body}>
      <h1>Manage Organization</h1>

      <div className={styles.sectionSelect}>
        <label>Select Section:</label>
        <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className={styles.select}>
          {Object.entries(SECTION_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.actions}>
        {isArray && (
          <button onClick={openAddModal} className={styles.addBtn}>
            + Add New
          </button>
        )}
        {!isArray && currentData && (
          <button onClick={() => openEditModal(currentData, 0)} className={styles.addBtn}>
            Edit Director
          </button>
        )}
        {!isArray && !currentData && (
          <button onClick={openAddModal} className={styles.addBtn}>
            + Add Director
          </button>
        )}
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              {fields.map((f) => (
                <th key={f}>{f}</th>
              ))}
              <th className={styles.actionsHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayItems.length > 0 ? (
              displayItems.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td>{idx + 1}</td>
                  {fields.map((f) => (
                    <td key={f} className={styles.cell}>
                      {f === "message" ? (item[f]?.substring(0, 50) + "...") : String(item[f] || "-")}
                    </td>
                  ))}
                    <td className={styles.actionsCell}>
                    <div className={styles.actionsWrap}>
                      <button type="button" onClick={() => openEditModal(item, idx)} className={styles.editBtn} title="Edit">
                        <AiFillEdit /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteModal({ show: true, index: idx })}
                        className={styles.delBtn}
                        title="Delete"
                      >
                        <AiFillDelete /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={fields.length + 2}>No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal - custom styled */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => !saving && setShowModal(false)}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.formModalHeader}>
              <h2>{editIndex !== null ? "Edit" : "Add"} — {SECTION_LABELS[selectedSection]}</h2>
              <button type="button" className={styles.closeBtn} onClick={() => !saving && setShowModal(false)} aria-label="Close">
                ×
              </button>
            </div>
            <div className={styles.formModalBody}>
              {fields.map((f) => (
                <div key={f} className={styles.field}>
                  {f === "imgSrc" ? (
                    <>
                      <label>Profile Image</label>
                      <div className={styles.uploadSection}>
                        <div className={styles.uploadRow}>
                          <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handleImageUpload}
                            className={styles.fileInput}
                          />
                          <button
                            type="button"
                            className={styles.uploadBtn}
                            onClick={() => imageInputRef.current?.click()}
                            disabled={uploadingImage}
                          >
                            {uploadingImage ? "Uploading…" : "Choose & Upload Image"}
                          </button>
                        </div>
                        {formData.imgSrc && (
                          <div className={styles.imagePreview}>
                            <img src={formData.imgSrc} alt="Preview" />
                            <span className={styles.imageUrl}>{formData.imgSrc}</span>
                          </div>
                        )}
                        <input
                          type="text"
                          value={formData[f] || ""}
                          onChange={(e) => setFormData({ ...formData, [f]: e.target.value })}
                          placeholder="Or paste image URL"
                          className={styles.urlFallback}
                        />
                      </div>
                    </>
                  ) : f === "message" ? (
                    <>
                      <label>{f}</label>
                      <textarea
                        value={formData[f] || ""}
                        onChange={(e) => setFormData({ ...formData, [f]: e.target.value })}
                        rows={4}
                        className={styles.textarea}
                      />
                    </>
                  ) : (
                    <>
                      <label>{f}</label>
                      <input
                        type={f === "email" ? "email" : "text"}
                        value={formData[f] || ""}
                        onChange={(e) => setFormData({ ...formData, [f]: e.target.value })}
                        placeholder={f}
                        className={styles.input}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.formModalFooter}>
              <button type="button" className={styles.cancelBtn} onClick={() => !saving && setShowModal(false)} disabled={saving}>
                Cancel
              </button>
              <button type="button" className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <Modal
        open={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, index: null })}
        onConfirm={handleDelete}
        isLoading={deleting}
      >
        <div className={styles.deleteModal}>
          <span className={styles.deleteIcon}><AiFillDelete /></span>
          <div className={styles.deleteTitle}>Confirm Delete</div>
          <p>This action cannot be undone.</p>
        </div>
      </Modal>
    </div>
  );
};

export default ManageOrganization;
