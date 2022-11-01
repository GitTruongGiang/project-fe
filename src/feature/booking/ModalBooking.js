import {
  Box,
  Chip,
  Container,
  Divider,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { countrys } from "../../list";

const style = {
  position: "absolute",
  top: "38%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  with: "500px",
};

function ModalBooking({ open, setOpen, dataFlight, chairs }) {
  chairs.map((chair) => {
    if (chair.flight._id === dataFlight._id) {
      return chair;
    }
  });
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container maxWidth="sm" sx={style}>
        <Box sx={{ textAlign: "center" }}>
          <Chip
            label="thông tin chuyến bay"
            sx={{
              color: "white",
              fontSize: "30px",
              fontWeight: 600,
              backgroundColor: "#29b6f6",
              fontStyle: "italic",
              padding: "20px 10px",
              mb: 3,
            }}
          />
        </Box>
        <Paper
          elevation={12}
          sx={{ padding: "20px", borderRadius: "25px", width: "600px" }}
        >
          <Box sx={{ padding: "10px", mb: 2 }}>
            <Typography sx={{ textAlign: "center", fontSize: "25px" }}>
              {dataFlight?.airlines?.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Nơi đi:
                </Typography>
                {countrys.map((country) => {
                  if (country.value === dataFlight.from.toUpperCase()) {
                    return (
                      <Typography sx={{ ml: 1 }} key={country.value}>
                        {country.label}
                      </Typography>
                    );
                  }
                })}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Nơi đến:
                </Typography>
                {countrys.map((country) => {
                  if (country.value === dataFlight.to.toUpperCase()) {
                    return (
                      <Typography sx={{ ml: 1 }} key={country.value}>
                        {country.label}
                      </Typography>
                    );
                  }
                })}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Ngày xuất phát:
                </Typography>
                <Typography sx={{ ml: 1 }}>
                  {new Date(dataFlight?.fromDay).getDate()}
                  {"/"}
                  {new Date(dataFlight?.fromDay).getMonth() + 1}
                  {"/"}
                  {new Date(dataFlight?.fromDay).getFullYear()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Thời gian đi:
                </Typography>
                <Typography sx={{ ml: 1 }}>
                  {new Date(dataFlight.timeFrom).getHours() < 10
                    ? `0${new Date(dataFlight.timeFrom).getHours()}`
                    : new Date(dataFlight.timeFrom).getHours()}
                  :
                  {new Date(dataFlight.timeFrom).getMinutes() < 10
                    ? `0${new Date(dataFlight.timeFrom).getMinutes()}`
                    : new Date(dataFlight.timeFrom).getMinutes()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Thời gian đến:
                </Typography>
                <Typography sx={{ ml: 1 }}>
                  {new Date(dataFlight.timeTo).getHours() < 10
                    ? `0${new Date(dataFlight.timeTo).getHours()}`
                    : new Date(dataFlight.timeTo).getHours()}
                  :
                  {new Date(dataFlight.timeTo).getMinutes() < 10
                    ? `0${new Date(dataFlight.timeTo).getMinutes()}`
                    : new Date(dataFlight.timeTo).getMinutes()}
                </Typography>
              </Box>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Giá vé:
                </Typography>
                <Typography sx={{ ml: 1 }}>
                  ${Math.ceil(dataFlight.price / 21)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Hãng máy bay:
                </Typography>
                <Typography sx={{ ml: 1 }}>{dataFlight.plane.name}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Mã hiệu:
                </Typography>
                <Typography sx={{ ml: 1 }}>{dataFlight.codePlane}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Số ghế:
                </Typography>
                {chairs.map((chair) => {
                  if (chair.flight._id === dataFlight._id) {
                    return (
                      <Typography sx={{ ml: 1 }} key={chair._id}>
                        {chair.codeNumber}
                        {chair.codeString}
                      </Typography>
                    );
                  }
                })}
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Modal>
  );
}

export default ModalBooking;
