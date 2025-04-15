import { useState } from "react";

const useForm = (initialState, backendUrl, recipientEmail) => {
  const [formData, setFormData] = useState(initialState);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedList = checked
        ? [...formData[name], value]
        : formData[name].filter((v) => v !== value);
      setFormData({ ...formData, [name]: updatedList });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleClear = () => {
    setFormData(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("sending");

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(response);

      if (response.ok) {
        setSubmitStatus("success");
        handleClear();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  return {
    formData,
    submitStatus,
    handleChange,
    handleClear,
    handleSubmit,
  };
};

export default useForm;
