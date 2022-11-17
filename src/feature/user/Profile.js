import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShareIcon from "@mui/icons-material/Share";
import AccountGeneral from "./AccountGeneral";
import AccountSocialLinks from "./AccountSocialLinks";
import { capitalCase } from "change-case";

function Profile() {
  const [currentTab, setCurrentTab] = useState("Chung");
  const ACCOUNT_TABS = [
    {
      value: "Chung",
      icon: (
        <AccountBoxIcon
          sx={{ fontSize: { xs: 22, sm: 24, md: 26, lg: 28, xl: 30 } }}
        />
      ),
      component: <AccountGeneral />,
    },
    {
      value: "Lien_Ket_Xa_Hoi",
      icon: (
        <ShareIcon
          sx={{ fontSize: { xs: 22, sm: 24, md: 26, lg: 28, xl: 30 } }}
        />
      ),
      component: <AccountSocialLinks />,
    },
  ];
  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: "white",
        padding: { xs: "12px", sm: "14px", md: "16px", lg: "18px", xl: "20px" },
        borderRadius: {
          xs: "6px",
          sm: "7px",
          md: "8px",
          lg: "9px",
          xl: "10px",
        },
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontSize: {
            xs: "1.1rem",
            sm: "1.2rem",
            md: "1.3rem",
            lg: "1.4rem",
            xl: "1.5rem",
          },
        }}
      >
        THÔNG TIN CÁ NHÂN
      </Typography>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={(e, value) => setCurrentTab(value)}
      >
        {ACCOUNT_TABS.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={capitalCase(tab.value)}
            icon={tab.icon}
            value={tab.value}
            sx={{
              fontSize: {
                xs: "0.65rem",
                sm: "0.7rem",
                md: "0.75rem",
                lg: "0.8rem",
                xl: "0.875rem",
              },
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ mb: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 } }} />

      {ACCOUNT_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default Profile;
