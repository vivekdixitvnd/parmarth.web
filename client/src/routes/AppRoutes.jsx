import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthContext from "../store/auth-context";
import toast from "react-hot-toast";
import backendUrl from "../backendUrl";

// Pages
import About from "../pages/About/About";
import Classes from "../pages/Classes/Classes";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import RequestForCertificate from "../pages/RequestForCertifcate/RequestForCertificate";
import Schooling from "../pages/Schooling/Schooling";
import RTE from "../pages/RTE/RTE";
import RequestReceived from "../pages/RequestReceived/RequestReceived";
import AddRteData from "../pages/AddRteData/AddRteData";
import RteData from "../pages/RteData/RteData";
import Volunteers from "../pages/Volunteers/Volunteers.jsx";
import Udgam from "../pages/Udgam/Udgam.jsx";
import SocialService from "../pages/SocialService/SocialService.jsx";
import Utsarg from "../pages/Utsarg/Utsarg.jsx";
import Utsaah from "../pages/Utsaah/Utsaah.jsx";
import Unnayan from "../pages/Unnayan/Unnayan.jsx";
import Ummeed from "../pages/Ummeed/Ummeed.jsx";
import EduVisit from "../pages/EduVisit/EduVisit.jsx";
import BloodDonation from "../pages/BloodDonation/BloodDonation.jsx";
import Governing from "../pages/organization/Governing/Governing.jsx"
import LegacyPresidents from "../pages/Organization/Legacy/PastPresidents/LegacyPresidents.jsx";
import LegacyVicePresidents from "../pages/Organization/Legacy/VicePresidents/LegacyVicePresidents.jsx";
import Executive from "../pages/Organization/Executive/Executive.jsx";
import Advisory from "../pages/Organization/Advisory/Advisory.jsx";
import Constitution from "../pages/Constitution/Constitution";
import CreatePost from "../pages/CreatePost/CreatePost";
import EditPost from "../pages/EditPost/EditPost";
import ListPost from "../pages/ListPosts/ListPosts";
import Post from "../pages/Post/Post";
import AddVolunteerData from "../pages/AddVolunteerData/AddVolunteerData";
import Events from "../pages/Events/Events";
import CreateUser from "../pages/CreateUser/CreateUser";
import ListUsers from "../pages/ListUsers/ListUsers";
import VerifyCode from "../pages/VerifyCode/VerifyCode";
import Muskan from "../pages/Muskan/Muskan.jsx";
import GE from "../pages/GE/GE.jsx";
import Article from "../pages/Article/Article.jsx";
// import ConvertUrl from "../pages/ConvertUrl/ConvertUrl";
import AddEventVolunteersData from "../pages/AddEventVolunteersData/AddEventVolunteersData";
import EventVolunteersData from "../pages/EventVolunteersData/EventVolunteersData";
import UtsavAyojan from "../pages/UtsavAyojan/UtsaavAyojan.jsx";
import DonationForm from "../pages/Forms/DonationForm.jsx";
import BecomeSponsor from "../pages/Forms/BecomeSponsor.jsx";
import HealthCareForm from "../pages/Forms/HealthCareForm.jsx";
import VolunteersData from "../pages/VolunteersData/VolunteersData.jsx";
import EventVolunteers from "../pages/EventVolunteers/EventVolunteers.jsx";

// Layout
import Layout from "../components/Layout.jsx";

const AppRoutes = () => {
  const authCtx = useContext(AuthContext);
  const userType = authCtx.userType;

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      const userId = localStorage.getItem("userId");
      (async () => {
        await fetch(`${backendUrl}/getUserType/${userId}`)
          .then((res) => res.json())
          .then((resData) => {
            authCtx.fillUserType(resData.userType);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })();
    }
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <Layout>
            <LandingPage />
          </Layout>
        }
      />
      {!authCtx.isLoggedIn && <Route path="/login" element={<Login />} />}
      {!authCtx.isLoggedIn && <Route path="/verify-code" element={<VerifyCode />} />}

      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/DonationForm" element={<Layout><DonationForm /></Layout>} />
      <Route path="/BecomeSponsor" element={<Layout><BecomeSponsor /></Layout>} />
      <Route path="/HealthCareForm" element={<Layout><HealthCareForm /></Layout>} />
      <Route path="/classes" element={<Layout><Classes /></Layout>} />
      <Route path="/governing" element={<Layout><Governing/></Layout>} />
      <Route path="/advisory" element={<Layout><Advisory/></Layout>} />
      <Route path="/executive" element={<Layout><Executive/></Layout>} />
      <Route path="/presidents" element={<Layout><LegacyPresidents/></Layout>} />
      <Route path="/vp" element={<Layout><LegacyVicePresidents/></Layout>} />
      <Route path="/udgam" element={<Layout><Udgam /></Layout>} />
      <Route path="/socialservice" element={<Layout><SocialService /></Layout>} />
      <Route path="/utsarg" element={<Layout><Utsarg /></Layout>} />
      <Route path="/utsaah" element={<Layout><Utsaah /></Layout>} />
      <Route path="/unnayan" element={<Layout><Unnayan /></Layout>} />
      <Route path="/ummeed" element={<Layout><Ummeed /></Layout>} />
      <Route path="/utsav" element={<Layout><UtsavAyojan /></Layout>} />
      <Route path="/eduvisit" element={<Layout><EduVisit /></Layout>} />
      <Route path="/blooddonation" element={<Layout><BloodDonation /></Layout>} />
      <Route path="/muskan" element={<Layout><Muskan /></Layout>} />
      <Route path="/ge" element={<Layout><GE /></Layout>} />
      <Route path="/schooling" element={<Layout><Schooling /></Layout>} />
      <Route path="/RTE" element={<Layout><RTE /></Layout>} />
      <Route path="/volunteers" element={<Layout><Volunteers /></Layout>} />
      <Route path="/event-volunteers" element={<Layout><EventVolunteers /></Layout>} />
      <Route path="/events" element={<Layout><Events /></Layout>} />
      <Route path="/article" element={<Layout><Article /></Layout>} />
      <Route path="/constitution" element={<Layout><Constitution /></Layout>} />
      <Route path="/request-for-certificate" element={<Layout><RequestForCertificate /></Layout>} />
      <Route path="/rte-data" element={<Layout><RteData /></Layout>} />
      <Route path="/rte-data/:academicYear" element={<Layout><RteData /></Layout>} />
      <Route path="/volunteers-data" element={<Layout><VolunteersData /></Layout>} />
      <Route path="/volunteers-data/:session" element={<Layout><VolunteersData /></Layout>} />
      <Route path="/event-volunteers-data/:academicYear" element={<Layout><EventVolunteersData /></Layout>} />
      <Route path="/:category/:id" element={<Layout><Post /></Layout>} />

      {/* Protected Routes */}
      {authCtx.isLoggedIn && (userType === "master" || userType === "media") && (
        <>
          <Route path="/add-rte-data" element={<Layout><AddRteData /></Layout>} />
          <Route path="/create-post" element={<Layout><CreatePost /></Layout>} />
          <Route path="/add-volunteer-data" element={<Layout><AddVolunteerData /></Layout>} />
          <Route path="/add-event-volunteers-data" element={<Layout><AddEventVolunteersData /></Layout>} />
        </>
      )}

      {authCtx.isLoggedIn && (userType === "master" || userType === "media" || userType === "teachers") && (
        <>
          <Route path="/edit-post/:id" element={<Layout><EditPost /></Layout>} />
          <Route path="/list-posts" element={<Layout><ListPost /></Layout>} />
        </>
      )}

      {authCtx.isLoggedIn && (userType === "master" || userType === "teachers") && (
        <Route path="/request-received" element={<Layout><RequestReceived /></Layout>} />
      )}

      {authCtx.isLoggedIn && userType === "master" && (
        <>
          <Route path="/create-user" element={<Layout><CreateUser /></Layout>} />
          <Route path="/list-users" element={<Layout><ListUsers /></Layout>} />
        </>
      )}

      {/* Fallback */}
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
};

export default AppRoutes;
