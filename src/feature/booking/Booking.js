import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countrys } from "../../list";
import { getListBooking } from "../user/userSlice";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LoadingCss from "../../components/LoadingCss";

const style = {
  position: "absolute",
  top: "38%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function Booking() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const { chairs, flights, message, isLoading } = useSelector(
    (state) => state.users
  );
  useEffect(() => {
    dispatch(getListBooking({}));
  }, [dispatch, getListBooking]);

  const country = countrys.filter((country) => {
    if (country.value === flights?.from?.toLocaleUpperCase()) {
      return country.label;
    }
    if (country.value === flights?.to?.toLocaleUpperCase()) {
      return country.label;
    }
  });

  return (
    <Container maxWidth="lg">
      <Card
        sx={{
          height: "300px",
          padding: "20px",
          boxShadow: "0 -2px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: "20px" }}>lịch sử đặt chổ</Typography>
        </CardContent>
        {flights && chairs ? (
          <>
            {isLoading ? (
              <LoadingCss />
            ) : (
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {flights?.airlines?.name}
                    </Typography>
                    :
                    <Typography sx={{ ml: 1, fontSize: "14px" }}>
                      {flights?.plane?.name}
                    </Typography>
                    -
                    <Typography sx={{ fontSize: "14px" }}>
                      {flights?.codePlane}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Box sx={{ display: "flex" }}>
                      <Typography sx={{ fontWeight: 600 }}>From:</Typography>
                      <Typography sx={{ ml: 1 }}>
                        {country[0]?.label}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardContent>
                    <Box sx={{ display: "flex" }}>
                      <Typography sx={{ fontWeight: 600 }}>To:</Typography>
                      <Typography sx={{ ml: 1 }}>
                        {country[1]?.label}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardContent style={{ paddingBottom: "16px" }}>
                    <Box sx={{ display: "flex" }}>
                      <Typography sx={{ fontWeight: 600 }}>
                        Number Chair:
                      </Typography>
                      <Typography sx={{ ml: 1 }}>
                        {chairs?.codeNumber}
                        {chairs?.codeString}
                      </Typography>
                    </Box>
                  </CardContent>
                </Stack>
                <Button
                  sx={{ mr: 2, height: "30px" }}
                  variant="contained"
                  onClick={handleOpen}
                >
                  Details
                  <ChevronRightIcon />
                </Button>
              </Card>
            )}
          </>
        ) : (
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CardContent>
              <Typography>{message}</Typography>
            </CardContent>
          </Card>
        )}
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="sm" sx={style}>
          <Box sx={{ textAlign: "center" }}>
            <Chip
              label="Infomation Flight"
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
          <Paper elevation={12} sx={{ padding: "20px", borderRadius: "25px" }}>
            <Box sx={{ padding: "10px", mb: 2 }}>
              <Typography sx={{ textAlign: "center", fontSize: "25px" }}>
                {flights.airlines?.name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    Nơi đi:
                  </Typography>
                  <Typography sx={{ ml: 1 }}>{country[0].label}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    Nơi đến:
                  </Typography>
                  <Typography sx={{ ml: 1 }}>{country[1].label}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    Ngày xuất phát:
                  </Typography>
                  <Typography sx={{ ml: 1 }}>
                    {new Date(flights.fromDay).getDate()}
                    {"/"}
                    {new Date(flights.fromDay).getMonth()}
                    {"/"}
                    {new Date(flights.fromDay).getFullYear()}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    Thời gian đi:
                  </Typography>
                  <Typography sx={{ ml: 1 }}>
                    {new Date(flights.timeFrom).getHours() < 10
                      ? `0${new Date(flights.timeFrom).getHours()}`
                      : new Date(flights.timeFrom).getHours()}
                    :
                    {new Date(flights.timeFrom).getMinutes() < 10
                      ? `0${new Date(flights.timeFrom).getMinutes()}`
                      : new Date(flights.timeFrom).getMinutes()}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    Thời gian đến:
                  </Typography>
                  <Typography sx={{ ml: 1 }}>
                    {new Date(flights.timeTo).getHours() < 10
                      ? `0${new Date(flights.timeTo).getHours()}`
                      : new Date(flights.timeTo).getHours()}
                    :
                    {new Date(flights.timeTo).getMinutes() < 10
                      ? `0${new Date(flights.timeTo).getMinutes()}`
                      : new Date(flights.timeTo).getMinutes()}
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
                    ${Math.ceil(flights.price / 21)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    Hãng máy bay:
                  </Typography>
                  <Typography sx={{ ml: 1 }}>{flights.plane.name}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    Mã hiệu:
                  </Typography>
                  <Typography sx={{ ml: 1 }}>{flights.codePlane}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    Số ghế:
                  </Typography>
                  <Typography sx={{ ml: 1 }}>
                    {chairs.codeNumber}
                    {chairs.codeString}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Modal>
    </Container>
  );
}

export default Booking;
