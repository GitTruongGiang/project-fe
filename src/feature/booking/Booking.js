import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
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

function Booking() {
  const dispatch = useDispatch();
  const { chairs, flights, message } = useSelector((state) => state.users);
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
      <Card sx={{ height: "300px", padding: "20px" }}>
        <CardContent>
          <Typography sx={{ fontSize: "20px" }}>lịch sử đặt chổ</Typography>
        </CardContent>
        <Divider />
        {flights && chairs ? (
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={1}>
              <CardContent sx={{ display: "flex", justifyContent: "left" }}>
                <Typography>{flights?.airlines?.name}</Typography>:{" "}
                <Typography sx={{ ml: 1 }}>{flights?.plane?.name}</Typography>-
                <Typography>{flights?.codePlane}</Typography>
              </CardContent>
              <CardContent>
                <Typography>From: {country[0]?.label}</Typography>
              </CardContent>
              <CardContent>
                <Typography>To: {country[0]?.label}</Typography>
              </CardContent>
              <CardContent>
                <Typography>
                  Number Chair: {chairs?.codeNumber}
                  {chairs?.codeString}
                </Typography>
              </CardContent>
            </Stack>
            <Button sx={{ mr: 2, height: "30px" }} variant="contained">
              Details
              <ChevronRightIcon />
            </Button>
          </Card>
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
    </Container>
  );
}

export default Booking;
