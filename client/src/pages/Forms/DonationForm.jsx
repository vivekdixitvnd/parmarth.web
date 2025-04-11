import React, { useState } from "react";
import styles from "./BecomeSponsor.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const DonationForm = () => {
  // Your backend endpoint that will handle the email sending
  const BACKEND_ENDPOINT = "https://your-backend-api.com/send-donation";

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    contactNumber: '',
    ietConnection: '',
    donationType: [],
    donationAmount: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      let updatedDonationType = [...formData.donationType];
      if (checked) {
        updatedDonationType.push(value);
      } else {
        updatedDonationType = updatedDonationType.filter(item => item !== value);
      }
      setFormData({ ...formData, donationType: updatedDonationType });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      const response = await fetch(BACKEND_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recipientEmail: "vivekdixit504@gmail.com", // Your recipient email
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            email: '',
            name: '',
            contactNumber: '',
            ietConnection: '',
            donationType: [],
            donationAmount: ''
          });
          setSubmitStatus(null);
        }, 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }
  };

  const handleClear = () => {
    setFormData({
      email: '',
      name: '',
      contactNumber: '',
      ietConnection: '',
      donationType: [],
      donationAmount: ''
    });
  };

  return (
    <>
      <Navbar />
      <main className={styles.body}>
        <section className={styles.section}>
          <h1>Donate to Parmarth</h1>
          <p className={styles.introText}>
            Your contribution helps us continue our mission of educating underprivileged children.
            Please fill out this form to make a donation.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email">
                Email <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email"
              />
            </div>

            {/* Name */}
            <div className={styles.formGroup}>
              <label htmlFor="name">
                Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            {/* Contact Number */}
            <div className={styles.formGroup}>
              <label htmlFor="contactNumber">
                Contact Number <span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                placeholder="Your phone number"
              />
            </div>

            {/* IET Connection */}
            <div className={styles.formGroup}>
              <label htmlFor="ietConnection">
                Are we mutually connected through IET? If yes, then please let us know how? *
                <br />
                <span className={styles.subtext}>
                  If you are/were student, faculty or part of administration of IET, please mention it. Otherwise just write NO.
                </span>
              </label>
              <input
                type="ietconnection"
                id="ietConnection"
                name="ietConnection"
                value={formData.ietConnection}
                onChange={handleChange}
                required
                placeholder="Your answer"
                rows="3"
              />
            </div>

            {/* Donation Type */}
            <div className={styles.formGroup}>
              <label>What are you willing to donate? *</label>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="donationType"
                    value="Money"
                    checked={formData.donationType.includes('Money')}
                    onChange={handleChange}
                  />
                  Money
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="donationType"
                    value="Stuffs"
                    checked={formData.donationType.includes('Stuffs')}
                    onChange={handleChange}
                  />
                  Stuffs
                </label>
              </div>
            </div>

            {/* Donation Amount */}
            <div className={styles.formGroup}>
              <label htmlFor="donationAmount">
                How much do you want to donate?
              </label>
              <input
                type="text"
                id="donationAmount"
                name="donationAmount"
                value={formData.donationAmount}
                onChange={handleChange}
                placeholder="Amount in INR"
              />
            </div>

            <div className={styles.formActions}>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={submitStatus === 'sending'}
              >
                {submitStatus === 'sending' ? 'Sending...' : 'Submit Donation'}
              </button>
              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClear}
              >
                Clear Form
              </button>
            </div>

            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                Thank you for your donation! We'll contact you shortly.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className={styles.errorMessage}>
                Error submitting form. Please try again.
              </div>
            )}
            {submitStatus === 'sending' && (
              <div className={styles.sendingMessage}>
                Sending your donation details...
              </div>
            )}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DonationForm;