import React from "react";
import styles from "./BecomeSponsor.module.css";
import FormInput from "../../components/Form/FormInput";
import FormStatusMessage from "../../components/Form/FormStatusMessage";
import useForm from "../../components/Form/useForm";
import backendUrl from "../../backendUrl"

const HealthCareForm = () => {
  const initialState = {
    email: "",
    name: "",
    contactNumber: "",
    donationAmount: "",
    ietConnection: "",
  };

  const backend = `${backendUrl}/medical-help`;

  const recipientEmail = "vivekdixit504@gmail.com";

  const {
    formData,
    submitStatus,
    handleChange,
    handleClear,
    handleSubmit,
  } = useForm(initialState, backend, recipientEmail);

  return (
    <>
      {/* <Navbar /> */}
      <main style={{ paddingTop: "125px" }} className={styles.body}>
        <section className={styles.section}>
          <h1>Medical Help</h1>

          <div className={styles.introText}>
            <p>
              From time to time, there occur cases in slums where people need
              medical attention. Some of them are not financially capable to go
              for treatment of even minor diseases, which results in horrific
              unwanted health situations. So we have to provide them needed
              support in which sometimes we find ourselves in shortage of
              resources.
            </p>
            <p>
              Give your contacts and we will reach out to you if there is a
              requirement of any. We will provide details, medical bills, and
              medicine cost bills so that you can assure your help is reaching
              to needy ones.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your email"
            />

            <FormInput
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />

            <FormInput
              label="Contact Number"
              name="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              placeholder="Your number"
            />

            <FormInput
              label="How much are you willing to help?"
              name="donationAmount"
              type="text"
              value={formData.donationAmount}
              onChange={handleChange}
              required
              placeholder="Amount in INR"
            />

            <FormInput
              label={`Are we mutually connected through IET? If yes, then please let us know how?
              (If you are/were student, faculty or part of administration of IET, please mention it. Otherwise just write NO.)`}
              name="ietConnection"
              type="text"
              value={formData.ietConnection}
              onChange={handleChange}
              placeholder="Your answer"
            />

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={submitStatus === "sending"}
              >
                {submitStatus === "sending" ? "Sending..." : "Submit"}
              </button>
              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClear}
              >
                Clear form
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

export default HealthCareForm;
