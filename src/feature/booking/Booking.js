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
import LoadingCss from "../../components/LoadingCss";

function Booking() {
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
        <Divider />
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
                <Button sx={{ mr: 2, height: "30px" }} variant="contained">
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
    </Container>
  );
}

export default Booking;
