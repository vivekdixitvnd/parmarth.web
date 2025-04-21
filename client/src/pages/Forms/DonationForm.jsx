import React, { useState } from "react";
import styles from "./BecomeSponsor.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FormInput from "../../components/Form/FormInput";
import FormStatusMessage from "../../components/Form/FormStatusMessage";
import useForm from "../../components/Form/useForm";
import backendUrl from "../../backendUrl";

const DonationForm = () => {
  const [amountError, setAmountError] = useState("");

  const backend_endpoint = `${backendUrl}/donate`;

  // Define the initial form data state
  const initialState = {
    email: "",
    name: "",
    contactNumber: "",
    ietConnection: "",
    donationType: [],
    donationAmount: "",
  };

  // Initialize the custom useForm hook
  const { formData, submitStatus, handleChange, resetForm, handleSubmit } =
    useForm(initialState, backend_endpoint);

  const handleLocalChange = (e) => {
    handleChange(e);

    if (e.target.name === "donationAmount") {
      const value = parseFloat(e.target.value);
      if (value > 5000) {
        setAmountError("Donation amount cannot exceed ₹5,000");
      } else {
        setAmountError("");
      }
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <main style={{ paddingTop: "150px" }} className={styles.body}>
        <section className={styles.section}>
          <h1>Donate to Parmarth</h1>
          <p className={styles.introText}>
            Your contribution helps us continue our mission of educating
            underprivileged children. Please fill out this form to make a
            donation.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (amountError) return;
              handleSubmit(e);
            }}
            className={styles.form}
          >
            {/* Email */}
            <FormInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your email"
            />

            {/* Name */}
            <FormInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />

            {/* Contact Number */}
            <FormInput
              label="Contact Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              placeholder="Your phone number"
              type="tel"
            />

            {/* IET Connection */}
            <FormInput
              label="Are we mutually connected through IET? If yes, then please let us know how?"
              name="ietConnection"
              value={formData.ietConnection}
              onChange={handleChange}
              required
              placeholder="Your answer"
              rows="3"
            />

            {/* Donation Type */}
            <div className={styles.formGroup}>
              <label>What are you willing to donate? *</label>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="donationType"
                    value="Money"
                    checked={formData.donationType.includes("Money")}
                    onChange={handleChange}
                  />
                  Money
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="donationType"
                    value="Stuffs"
                    checked={formData.donationType.includes("Stuffs")}
                    onChange={handleChange}
                  />
                  Stuffs
                </label>
              </div>
            </div>

            {/* Donation Amount */}
            <FormInput
              label="How much do you want to donate?"
              name="donationAmount"
              value={formData.donationAmount}
              onChange={handleLocalChange}
              placeholder="Amount in INR"
            />
            {amountError && <p className={styles.error}>{amountError}</p>}

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={submitStatus === "sending"}
              >
                {submitStatus === "sending" ? "Sending..." : "Submit Donation"}
              </button>
              <button
                type="button"
                className={styles.clearButton}
                onClick={resetForm}
              >
                Clear Form
              </button>
            </div>

            <FormStatusMessage status={submitStatus} />
          </form>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default DonationForm;
