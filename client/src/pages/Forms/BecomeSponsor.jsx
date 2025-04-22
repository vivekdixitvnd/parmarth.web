import React from "react";
import FormInput from "../../components/Form/FormInput";
import FormStatusMessage from "../../components/Form/FormStatusMessage";
import useForm from "../../components/Form/useForm";
import styles from "./BecomeSponsor.module.css";
import backendUrl from "../../backendUrl";

const SponsorChildForm = () => {

  const backend = `${backendUrl}/sponsor-child`

  const initialState = {
    email: "",
    name: "",
    phone: "",
    numberOfChildren: "",
    ietConnection: "",
    sponsorshipDetails: "",
  };

  const { formData, submitStatus, handleChange, handleClear, handleSubmit } =
    useForm(initialState, backend);

  return (
    <>
    {/* <Navbar/> */}
    <main style={{ paddingTop: "125px" }} className={styles.body}>
      {" "}
      <section className={styles.section}>
        <h1>Sponsor a Child</h1>{" "}
        <div className={styles.introText}>
          {" "}
          <p>
            Out of 3 slums and 150 families we are covering in our working area,
            there are more than 250 // children of schooling age. Although we
            admit them in schools through RTE where they can // study without
            worry of money on their family's shoulder, yet there are a lot of
            children whose // admission couldn't be done through RTE due to many
            reasons such as their age or incomplete // documents. And also
            through RTE government only gives free education up to 8th standard.{" "}
          </p>{" "}
          <p>
            So these families of these children have to bear their study
            expenses on their own. But // sometimes they aren't able to fulfill
            educational needs due to financial conditions, // which becomes an
            obstacle in way of their child's education.{" "}
          </p>{" "}
          <p>
            So you can let us know if you are interested to bear educational
            expenses of one or more // than one child. We will make sure that
            your help reaches the needy ones and can even // connect you with
            them.{" "}
          </p>{" "}
        </div>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
          />
          <FormInput
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            required
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

          <FormInput
            label={`Any specific preferences or details about your sponsorship?`}
            name="sponsorshipDetails"
            type="text"
            value={formData.sponsorshipDetails}
            onChange={handleChange}
            placeholder="(Optional) For example: preferred age, gender, or any other preferences"
            rows="3"
          />

          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={submitStatus === "sending"}
            >
              {submitStatus === "sending" ? "Sending..." : "Sponsor a Child"}
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
    {/* <Footer/> */}
    </>
  );
};

export default SponsorChildForm;
