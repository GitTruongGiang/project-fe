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
          padding: "20px",
          boxShadow: "0 -2px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: {
                xs: "12px",
                sm: "14px",
                md: "16px",
                lg: "18px",
                xl: "20px",
              },
              textTransform: "uppercase",
            }}
          >
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
                      sx={{
                        alignItems: "center",
                        flexWrap: { xs: "wrap", sm: "inherit", xl: "inherit" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          padding: {
                            xs: "8px 16px",
                            sm: "10px 16px",
                            md: "12px 16px",
                            lg: "14px 16px",
                            xl: "16px 16px",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: {
                              xs: "0.6rem",
                              sm: "0.7rem",
                              md: "0.8rem",
                              lg: "0.9rem",
                              xl: "1rem",
                            },
                          }}
                        >
                          {flight?.airlines?.name}
                        </Typography>
                        :
                        <Typography
                          sx={{
                            ml: 1,
                            fontSize: {
                              xs: "10px",
                              sm: "11px",
                              md: "12px",
                              lg: "13px",
                              xl: "14px",
                            },
                          }}
                        >
                          {flight?.plane?.name}
                        </Typography>
                        -
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "10px",
                              sm: "11px",
                              md: "12px",
                              lg: "13px",
                              xl: "14px",
                            },
                          }}
                        >
                          {flight?.codePlane}
                        </Typography>
                      </Box>
                      {countrys.map((country) => {
                        if (country.value === flight.from.toUpperCase()) {
                          return (
                            <Box
                              key={country.value}
                              sx={{
                                padding: {
                                  xs: "8px 16px",
                                  sm: "10px 16px",
                                  md: "12px 16px",
                                  lg: "14px 16px",
                                  xl: "16px 16px",
                                },
                              }}
                            >
                              <Box sx={{ display: "flex" }}>
                                <Typography
                                  sx={{
                                    fontWeight: 600,
                                    fontSize: {
                                      xs: "0.6rem",
                                      sm: "0.7rem",
                                      md: "0.8rem",
                                      lg: "0.9rem",
                                      xl: "1rem",
                                    },
                                  }}
                                >
                                  From:
                                </Typography>
                                <Typography
                                  sx={{
                                    ml: {
                                      xs: 0.6,
                                      sm: 0.7,
                                      md: 0.8,
                                      lg: 0.9,
                                      xl: 1,
                                    },
                                    fontSize: {
                                      xs: "0.6rem",
                                      sm: "0.7rem",
                                      md: "0.8rem",
                                      lg: "0.9rem",
                                      xl: "1rem",
                                    },
                                  }}
                                >
                                  {country.label}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        }
                      })}
                      {countrys.map((country) => {
                        if (country.value === flight.to.toUpperCase()) {
                          return (
                            <Box
                              key={country.value}
                              sx={{
                                padding: {
                                  xs: "8px 16px",
                                  sm: "10px 16px",
                                  md: "12px 16px",
                                  lg: "14px 16px",
                                  xl: "16px 16px",
                                },
                              }}
                            >
                              <Box sx={{ display: "flex" }}>
                                <Typography
                                  sx={{
                                    fontWeight: 600,
                                    fontSize: {
                                      xs: "0.6rem",
                                      sm: "0.7rem",
                                      md: "0.8rem",
                                      lg: "0.9rem",
                                      xl: "1rem",
                                    },
                                  }}
                                >
                                  To:
                                </Typography>
                                <Typography
                                  sx={{
                                    ml: {
                                      xs: 0.6,
                                      sm: 0.7,
                                      md: 0.8,
                                      lg: 0.9,
                                      xl: 1,
                                    },
                                    fontSize: {
                                      xs: "0.6rem",
                                      sm: "0.7rem",
                                      md: "0.8rem",
                                      lg: "0.9rem",
                                      xl: "1rem",
                                    },
                                  }}
                                >
                                  {country.label}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        }
                      })}
                      {chairs.map((chair) => {
                        if (chair.flight._id === flight._id) {
                          return (
                            <Box
                              sx={{
                                padding: {
                                  xs: "8px 16px",
                                  sm: "10px 16px",
                                  md: "12px 16px",
                                  lg: "14px 16px",
                                  xl: "16px 16px",
                                },
                              }}
                              key={chair._id}
                            >
                              <Box sx={{ display: "flex" }}>
                                <Typography
                                  sx={{
                                    fontWeight: 600,
                                    fontSize: {
                                      xs: "0.6rem",
                                      sm: "0.7rem",
                                      md: "0.8rem",
                                      lg: "0.9rem",
                                      xl: "1rem",
                                    },
                                  }}
                                >
                                  Number Chair:
                                </Typography>
                                <Typography
                                  sx={{
                                    ml: 1,
                                    fontSize: {
                                      xs: "0.6rem",
                                      sm: "0.7rem",
                                      md: "0.8rem",
                                      lg: "0.9rem",
                                      xl: "1rem",
                                    },
                                  }}
                                >
                                  {chair?.codeNumber}
                                  {chair?.codeString}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        }
                      })}
                    </Stack>
                    <Box
                      sx={{
                        margin: {
                          xs: "0 4px",
                          sm: "0 5px",
                          md: "0 6px",
                          lg: "0 7px",
                          xl: "0 8px",
                        },
                        display: "flex",
                        flexWrap: { xs: "wrap", sm: "inherit" },
                      }}
                    >
                      <Button
                        sx={{
                          margin: "5px 5px",
                          height: "30px",
                          padding: "6px 10px",
                          fontSize: {
                            xs: "0.6rem",
                            sm: "0.65rem",
                            md: "0.7rem",
                            lg: "0.75rem",
                            xl: "0.875rem",
                          },
                        }}
                        variant="contained"
                        onClick={() => handleOpen(flight)}
                      >
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "0.6rem",
                              sm: "0.65rem",
                              md: "0.7rem",
                              lg: "0.75rem",
                              xl: "0.875rem",
                            },
                          }}
                        >
                          CHI TIẾT
                        </Typography>
                        <ChevronRightIcon />
                      </Button>
                      <Button
                        sx={{
                          margin: "5px 5px",
                          height: "30px",
                          padding: "6px 10px",
                          backgroundColor: "#ff5252",
                          opacity: 0.7,
                          ":hover": {
                            backgroundColor: "#ff5252",
                            opacity: 1,
                          },
                          fontSize: {
                            xs: "0.6rem",
                            sm: "0.65rem",
                            md: "0.7rem",
                            lg: "0.75rem",
                            xl: "0.875rem",
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
