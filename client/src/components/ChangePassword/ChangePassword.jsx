import React, { useState, useContext } from "react";
import styles from "./ChangePassword.module.css";
import { toast, Toaster } from "react-hot-toast";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import backendUrl from "../../backendUrl";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRequestOTP = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${backendUrl}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.token,
        },
      });
      console.log(res);
      

      const resData = await res.json();
      if (resData.error) {
        toast.error(resData.error);
      } else {
        toast.success("OTP sent to your email");
        setOtpSent(true);
      }
    } catch (err) {
      toast.error("Failed to request OTP");
    }
    setIsLoading(false);
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${backendUrl}/verify-otp-and-change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.token,
        },
        body: JSON.stringify({ otp, currentPassword, newPassword }),
      });

      const resData = await res.json();
      if (resData.error) {
        toast.error(resData.error);
      } else {
        toast.success("OTP verified");
        setOtpVerified(true);
      }
    } catch (err) {
      toast.error("OTP verification failed");
    }
    setIsLoading(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      toast.error("Please verify OTP first");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${backendUrl}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.token,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          otp,
        }),
      });

      const resData = await res.json();

      if (resData.error) {
        toast.error(resData.error);
      } else {
        toast.success("Password changed successfully!");
        navigate("/", { replace: true });
      }
    } catch (err) {
      toast.error("Something went wrong");
    }

    setIsLoading(false);
  };

  return (
    <>
      <div style={{ paddingTop: "150px" }} className={styles.main}>
        <div className={styles["change-card"]}>
          <div className={styles.heading}>Change Password</div>
          <form
            className={styles["change-form"]}
            onSubmit={handleChangePassword}
          >
            <label htmlFor="currentPassword" className={styles.label}>
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className={styles["change-inputs"]}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />

            <label htmlFor="newPassword" className={styles.label}>
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className={styles["change-inputs"]}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={styles["change-inputs"]}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {!otpSent && (
              <button
                className={styles["change-btn"]}
                type="button"
                onClick={handleRequestOTP}
              >
                {isLoading ? (
                  <div className={styles.loader}></div>
                ) : (
                  "Request OTP"
                )}
              </button>
            )}

            {otpSent && !otpVerified && (
              <>
                <label htmlFor="otp" className={styles.label}>
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  className={styles["change-inputs"]}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />

                <button
                  className={styles["change-btn"]}
                  type="button"
                  onClick={handleVerifyOTP}
                >
                  {isLoading ? (
                    <div className={styles.loader}></div>
                  ) : (
                    "Verify OTP"
                  )}
                </button>
              </>
            )}

            {otpVerified && (
              <button className={styles["change-btn"]} type="submit">
                {isLoading ? <div className={styles.loader}></div> : "Update"}
              </button>
            )}
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ChangePassword;
