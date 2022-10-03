import { Button, Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

function Location({ location, setLocation, setTimeFrom, setTimeTo }) {
  const handleClose = () => setLocation(false);
  return (
    <Modal
      open={location}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <Typography variant="h6" component="h2" textAlign="center" mb={2}>
            Giờ cất cánh
          </Typography>
          <Grid container spacing={2} columns={8} sx={{ textAlign: "center" }}>
            <Grid item xs={4}>
              <BootstrapButton
                disableRipple
                onClick={() => setTimeFrom(6)}
                sx={{ fontSize: "16px" }}
                variant="contained"
              >
                00:00 - 06:00
              </BootstrapButton>
            </Grid>
            <Grid item xs={4}>
              <BootstrapButton
                disableRipple
                sx={{ fontSize: "16px" }}
                variant="contained"
                onClick={() => setTimeFrom(12)}
              >
                06:00 - 12:00
              </BootstrapButton>
            </Grid>
            <Grid item xs={4}>
              <BootstrapButton
                disableRipple
                sx={{ fontSize: "16px" }}
                variant="contained"
                onClick={() => setTimeFrom(18)}
              >
                12:00 - 18:00
              </BootstrapButton>
            </Grid>
            <Grid item xs={4}>
              <BootstrapButton
                disableRipple
                sx={{ fontSize: "16px" }}
                variant="contained"
                onClick={() => setTimeFrom(23)}
              >
                18:00 - 24:00
              </BootstrapButton>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Typography
            variant="h6"
            component="h2"
            textAlign="center"
            mb={2}
            mt={2}
          >
            Giờ hạ cánh
          </Typography>
          <Grid container spacing={2} columns={8} sx={{ textAlign: "center" }}>
            <Grid item xs={4}>
              <BootstrapButton
                disableRipple
                sx={{ fontSize: "16px" }}
                variant="contained"
                onClick={() => setTimeTo(6)}
              >
                00:00 - 06:00
              </BootstrapButton>
            </Grid>
            <Grid item xs={4}>
              <BootstrapButton
                disableRipple
                sx={{ fontSize: "16px" }}
                variant="contained"
                onClick={() => setTimeTo(12)}
              >
                06:00 - 12:00
              </BootstrapButton>
            </Grid>
            <Grid item xs={4}>
              <BootstrapButton
                disableRipple
                sx={{ fontSize: "16px" }}
                variant="contained"
                onClick={() => setTimeTo(18)}
              >
                12:00 - 18:00
              </BootstrapButton>
            </Grid>
            <Grid item xs={4}>
              <BootstrapButton
                disableRipple
                sx={{ fontSize: "16px" }}
                variant="contained"
                onClick={() => setTimeTo(23)}
              >
                18:00 - 24:00
              </BootstrapButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
}

export default Location;
