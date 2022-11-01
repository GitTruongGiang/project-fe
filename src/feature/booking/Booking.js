import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countrys } from "../../list";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LoadingCss from "../../components/LoadingCss";
import ModalBooking from "./ModalBooking";
import {
  cancelFlights,
  deletedChair,
  getListBooking,
} from "../chair/chairSlice";

function Booking() {
  const [dataFlight, setDataFlight] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = (flight) => {
    setDataFlight(flight);
    setOpen(true);
  };

  const dispatch = useDispatch();
  const { chairs, flights, isLoading } = useSelector((state) => state.chairs);

  useEffect(() => {
    dispatch(getListBooking({}));
  }, [dispatch]);

  const cancelFLight = async (flight) => {
    const chair = chairs.find((chair) => chair.flight._id === flight._id);
    dispatch(cancelFlights({ status: "none", chairId: chair._id }));
  };
  console.log(flights);
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
          <Typography sx={{ fontSize: "20px", textTransform: "uppercase" }}>
            lịch sử đặt chổ
          </Typography>
        </CardContent>
        {flights.length ? (
          <>
            {isLoading ? (
              <LoadingCss />
            ) : (
              <Stack spacing={1}>
                {flights.map((flight) => (
                  <Card
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      boxShadow:
                        "0 -2px 10px rgba(0,0,0,0.19), 0 4px 2px rgba(0,0,0,0.23)",
                    }}
                    key={flight._id}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center" }}
                    >
                      <CardContent
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Typography sx={{ fontWeight: 600 }}>
                          {flight?.airlines?.name}
                        </Typography>
                        :
                        <Typography sx={{ ml: 1, fontSize: "14px" }}>
                          {flight?.plane?.name}
                        </Typography>
                        -
                        <Typography sx={{ fontSize: "14px" }}>
                          {flight?.codePlane}
                        </Typography>
                      </CardContent>
                      {countrys.map((country) => {
                        if (country.value === flight.from.toUpperCase()) {
                          return (
                            <CardContent key={country.value}>
                              <Box sx={{ display: "flex" }}>
                                <Typography sx={{ fontWeight: 600 }}>
                                  From:
                                </Typography>
                                <Typography sx={{ ml: 1 }}>
                                  {country.label}
                                </Typography>
                              </Box>
                            </CardContent>
                          );
                        }
                      })}
                      {countrys.map((country) => {
                        if (country.value === flight.to.toUpperCase()) {
                          return (
                            <CardContent key={country.value}>
                              <Box sx={{ display: "flex" }}>
                                <Typography sx={{ fontWeight: 600 }}>
                                  From:
                                </Typography>
                                <Typography sx={{ ml: 1 }}>
                                  {country.label}
                                </Typography>
                              </Box>
                            </CardContent>
                          );
                        }
                      })}
                      {chairs.map((chair) => {
                        if (chair.flight._id === flight._id) {
                          return (
                            <CardContent
                              style={{ paddingBottom: "16px" }}
                              key={chair._id}
                            >
                              <Box sx={{ display: "flex" }}>
                                <Typography sx={{ fontWeight: 600 }}>
                                  Number Chair:
                                </Typography>
                                <Typography sx={{ ml: 1 }}>
                                  {chair?.codeNumber}
                                  {chair?.codeString}
                                </Typography>
                              </Box>
                            </CardContent>
                          );
                        }
                      })}
                    </Stack>
                    <Box>
                      <Button
                        sx={{ mr: 1, height: "30px", padding: "6px 10px" }}
                        variant="contained"
                        onClick={() => handleOpen(flight)}
                      >
                        CHI TIẾT
                        <ChevronRightIcon />
                      </Button>
                      <Button
                        sx={{
                          mr: 1,
                          height: "30px",
                          padding: "6px 10px",
                          backgroundColor: "#ff5252",
                          opacity: 0.7,
                          ":hover": {
                            backgroundColor: "#ff5252",
                            opacity: 1,
                          },
                        }}
                        variant="contained"
                        onClick={() => cancelFLight(flight)}
                      >
                        HỦY
                      </Button>
                    </Box>
                  </Card>
                ))}
              </Stack>
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
              <Typography>không có chuyến bay nào</Typography>
            </CardContent>
          </Card>
        )}
      </Card>
      {dataFlight ? (
        <ModalBooking
          open={open}
          setOpen={setOpen}
          dataFlight={dataFlight}
          chairs={chairs}
        />
      ) : (
        ""
      )}
    </Container>
  );
}

export default Booking;
