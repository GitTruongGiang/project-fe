import {
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { countrys } from "../../list";
import { getSingleChair } from "../chair/chairSlice";

function InfomationBooking() {
  const { chairId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chair, flight } = useSelector((state) => state.chairs);
  console.log(chair);
  console.log(flight);
  const handleFinish = async () => {
    navigate("/");
    toast.success("booking flight success");
  };

  useEffect(() => {
    dispatch(getSingleChair({ chairId }));
  }, [dispatch, chairId]);

  const country = countrys.filter((country) => {
    if (country.value === flight.from.toLocaleUpperCase()) {
      return country.label;
    }
    if (country.value === flight.to.toLocaleUpperCase()) {
      return country.label;
    }
  });

  return (
    <Container maxWidth="sm">
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
      <Card sx={{ padding: "20px", borderRadius: "25px" }}>
        <Box sx={{ padding: "10px", mb: 2 }}>
          <Typography sx={{ textAlign: "center", fontSize: "25px" }}>
            {flight.airlines?.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: "18px" }}>
              Nơi đi: {country[0].label}
            </Typography>
            <Typography sx={{ fontSize: "18px" }}>
              Nơi đến: {country[1].label}
            </Typography>

            <Typography sx={{ fontSize: "18px" }}>
              Ngày xuất phát: {new Date(flight.fromDay).getDate()}
              {"/"}
              {new Date(flight.fromDay).getMonth()}
              {"/"}
              {new Date(flight.fromDay).getFullYear()}
            </Typography>

            <Typography sx={{ fontSize: "18px" }}>
              Thời gian đi:{" "}
              {new Date(flight.timeFrom).getHours() < 10
                ? `0${new Date(flight.timeFrom).getHours()}`
                : new Date(flight.timeFrom).getHours()}
              :
              {new Date(flight.timeFrom).getMinutes() < 10
                ? `0${new Date(flight.timeFrom).getMinutes()}`
                : new Date(flight.timeFrom).getMinutes()}
            </Typography>

            <Typography sx={{ fontSize: "18px" }}>
              Thời gian đến:{" "}
              {new Date(flight.timeTo).getHours() < 10
                ? `0${new Date(flight.timeTo).getHours()}`
                : new Date(flight.timeTo).getHours()}
              :
              {new Date(flight.timeTo).getMinutes() < 10
                ? `0${new Date(flight.timeTo).getMinutes()}`
                : new Date(flight.timeTo).getMinutes()}
            </Typography>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack spacing={2}>
            <Typography sx={{ fontSize: "18px" }}>
              Giá vé: ${Math.ceil(flight.price / 21)}
            </Typography>

            <Typography sx={{ fontSize: "18px" }}>
              Hãng máy bay: {flight.plane.name}
            </Typography>

            <Typography sx={{ fontSize: "18px" }}>
              Mã hiệu: {flight.codePlane}
            </Typography>

            <Typography sx={{ fontSize: "18px" }}>
              Số ghế: {chair.codeNumber}
              {chair.codeString}
            </Typography>
          </Stack>
        </Box>
      </Card>
      <Box sx={{ textAlign: "end", mt: 2 }}>
        <Button variant="contained" onClick={handleFinish}>
          finish
        </Button>
      </Box>
    </Container>
  );
}

export default InfomationBooking;
