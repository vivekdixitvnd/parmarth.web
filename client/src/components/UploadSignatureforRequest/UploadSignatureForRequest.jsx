import React, { useState } from "react";

const UploadSignatureForRequest = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    // const [selectedRequest, setSelectedRequest] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    // const handleRequestSelection = (event) => {
    //     setSelectedRequest(event.target.value);
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append('signature', selectedFile);

            try {
                const response = await axios.post('http://localhost:5000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Signature uploaded successfully!');
            } catch (error) {
                console.error('Error uploading the signature:', error);
                alert('Failed to upload the signature.');
            }
        } else {
            alert('Please choose a file to upload.');
        }
    };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Upload Signature for Approved Requests</h2>
        {/* <div className="input-group">
                    <label htmlFor="request">Select Approved Request</label>
                    <select id="request" onChange={handleRequestSelection} required>
                        <option value="">Select a request</option>
                        {requests.map((request) => (
                            <option key={request.id} value={request.id}>{request.name}</option>
                        ))}
                    </select>
                </div> */}
        <div className="input-group">
          <label htmlFor="signature">Choose a signature file</label>
          <input
            type="file"
            id="signature"
            name="signature"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {preview && (
        <div className="preview">
          <h3>Signature Preview</h3>
          <img src={preview} alt="Signature Preview" />
        </div>
      )}
    </div>
  );
};

export default UploadSignatureForRequest;
