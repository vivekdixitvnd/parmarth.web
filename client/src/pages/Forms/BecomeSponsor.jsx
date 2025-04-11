import React, { useState } from "react";
import styles from "./BecomeSponsor.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const BecomeSponsor = () => {
  const BACKEND_ENDPOINT = "https://your-backend-api.com/sponsor-child";

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    contactNumber: '',
    ietConnection: '',
    sponsorshipDetails: '',
    numberOfChildren: '1'
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          recipientEmail: "vivekdixit504@gmail.com",
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          setFormData({
            email: '',
            name: '',
            contactNumber: '',
            ietConnection: '',
            sponsorshipDetails: '',
            numberOfChildren: '1'
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
      sponsorshipDetails: '',
      numberOfChildren: '1'
    });
  };

  return (
    <>
      <Navbar />
      <main className={styles.body}>
        <section className={styles.section}>
          <h1>Sponsor a Child</h1>
          
          <div className={styles.introText}>
            <p>
              Out of 3 slums and 150 families we are covering in our working area, there are more than 250 
              children of schooling age. Although we admit them in schools through RTE where they can 
              study without worry of money on their family's shoulder, yet there are a lot of children whose 
              admission couldn't be done through RTE due to many reasons such as their age or incomplete 
              documents. And also through RTE government only gives free education up to 8th standard.
            </p>
            <p>
              So these families of these children have to bear their study expenses on their own. But 
              sometimes they aren't able to fulfill educational needs due to financial conditions, 
              which becomes an obstacle in way of their child's education.
            </p>
            <p>
              So you can let us know if you are interested to bear educational expenses of one or more 
              than one child. We will make sure that your help reaches the needy ones and can even 
              connect you with them.
            </p>
          </div>

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
                Your name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your answer"
              />
            </div>

            {/* Contact Number */}
            <div className={styles.formGroup}>
              <label htmlFor="contactNumber">
                Contact number <span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                placeholder="Your answer"
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

            {/* Number of Children */}
            <div className={styles.formGroup}>
              <label htmlFor="numberOfChildren">
                How many children would you like to sponsor? *
              </label>
              <select
                id="numberOfChildren"
                name="numberOfChildren"
                value={formData.numberOfChildren}
                onChange={handleChange}
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4 or more</option>
              </select>
            </div>

            {/* Sponsorship Details */}
            <div className={styles.formGroup}>
              <label htmlFor="sponsorshipDetails">
                Any specific preferences or details about your sponsorship?
              </label>
              <textarea
                id="sponsorshipDetails"
                name="sponsorshipDetails"
                value={formData.sponsorshipDetails}
                onChange={handleChange}
                placeholder="(Optional) For example: preferred age, gender, or any other preferences"
                rows="3"
              />
            </div>

            <div className={styles.formActions}>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={submitStatus === 'sending'}
              >
                {submitStatus === 'sending' ? 'Sending...' : 'Submit'}
              </button>
              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClear}
              >
                Clear form
              </button>
            </div>

            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                Thanks for reaching out to us!!! We will contact you shortly with detailed information 
                of the child who needs to be taken care of.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className={styles.errorMessage}>
                Error submitting form. Please try again.
              </div>
            )}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BecomeSponsor;