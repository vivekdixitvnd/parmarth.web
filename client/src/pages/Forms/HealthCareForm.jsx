import React, { useState } from "react";
import styles from "./BecomeSponsor.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const HealthCareForm = () => {
    const BACKEND_ENDPOINT = "https://your-backend-api.com/medical-help";

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        contactNumber: '',
        donationAmount: '',
        ietConnection: ''
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
                        donationAmount: '',
                        ietConnection: ''
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
            donationAmount: '',
            ietConnection: ''
        });
    };

    return (
        <>
            <Navbar />
            <main className={styles.body}>
                <section className={styles.section}>
                    <h1>Medical Help</h1>

                    <div className={styles.introText}>
                        <p>
                            From time to time, there occur cases in slums where people need medical attention.
                            Some of them are not financially capable to go for treatment of even minor diseases,
                            which results in horrific unwanted health situations. So we have to provide them
                            needed support in which sometimes we find ourselves in shortage of resources.
                        </p>
                        <p>
                            Give your contacts and we will reach out to you if there is a requirement of any.
                            We will provide details, medical bills, and medicine cost bills so that you can
                            assure your help is reaching to needy ones.
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
                                Name <span className={styles.required}>*</span>
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

                        {/* Donation Amount */}
                        <div className={styles.formGroup}>
                            <label htmlFor="donationAmount">
                                How much are you willing to help? <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                id="donationAmount"
                                name="donationAmount"
                                value={formData.donationAmount}
                                onChange={handleChange}
                                required
                                placeholder="Amount in INR"
                            />
                        </div>

                        {/* IET Connection */}
                        <div className={styles.formGroup}>
                            <label htmlFor="ietConnection">
                                Are we mutually connected through IET? If yes, then please let us know how?
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
                                placeholder="Your answer"
                                rows="1"
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
                                Thanks for reaching out to us!! We will contact you very shortly if someone is needing your help.
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

export default HealthCareForm;