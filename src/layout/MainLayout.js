import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import background from "../image/airplane-2619434_960_720.jpg";

function MainLayout() {
  return (
    <>
      <div
        style={{
          margin: "0 auto",
          position: "relative",
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <MainHeader />
        <AlertMsg />
        <Box sx={{ paddingTop: "50px" }}>
          <Outlet />
        </Box>
        <Container
          maxWidth="xl"
          sx={{ backgroundColor: "white", marginTop: "100px" }}
        >
          <MainFooter />
        </Container>
      </div>
    </>
  );
}

export default MainLayout;
