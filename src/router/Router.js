import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRequired from "../context.js/AuthRequired";
import Chair from "../feature/chair/Chair";
import Flight from "../feature/flights/Flight";
import BlankLayout from "../layout/BlankLayout";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import CreditCard from "../feature/creditCard/CreditCard";
import InfomationBooking from "../feature/infomationBooking/InfomationBooking";
import Profile from "../feature/user/Profile";
import RegisterPage from "../pages/RegisterPage";
import Booking from "../feature/booking/Booking";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequired>
            <MainLayout />
          </AuthRequired>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="flights" element={<Flight />} />
        <Route path="chairs/:flightId" element={<Chair />} />
        <Route path="credit/:chairId" element={<CreditCard />} />
        <Route path="booking/:chairId" element={<InfomationBooking />} />
        <Route path="listBooking" element={<Booking />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
