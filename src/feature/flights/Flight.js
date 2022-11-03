import {
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { countrys } from "../../list";
import { getFlights } from "./flightSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Location from "../../components/modal/Location";
import NameAirlines from "../../components/modal/NameAirlines";
import LoadingCss from "../../components/LoadingCss";
import FlightIcon from "@mui/icons-material/Flight";
import "./Flight.css";

function Flight() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [nameID, setNameID] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const fromDay = searchParams.get("fromDay");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [location, setLocation] = React.useState(false);
  const handleLocation = () => setLocation(true);

  const [nameAir, setNameAir] = React.useState(false);
  const handleNameAirlines = () => setNameAir(true);

  const { flights, count, totalPage, isLoading } = useSelector(
    (state) => state.flights
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleChairs = (flight) => {
    navigate(`/chairs/${flight._id}`);
  };

  useEffect(() => {
    let F;
    let T;
    if (timeFrom && timeFrom !== 23) {
      F = new Date(fromDay);
      F.setHours(timeFrom);
      F.setMinutes(0);
      F.setSeconds(0);
    } else if (timeFrom && timeFrom === 23) {
      F = new Date(fromDay);
      F.setHours(timeFrom);
      F.setMinutes(59);
      F.setSeconds(59);
    }

    if (timeTo && timeTo !== 23) {
      T = new Date(fromDay);
      T.setHours(timeTo);
      T.setMinutes(0);
      T.setSeconds(0);
    } else if (timeTo && timeTo === 23) {
      T = new Date(fromDay);
      T.setHours(timeTo);
      T.setMinutes(59);
      T.setSeconds(59);
    }
    dispatch(
      getFlights({
        page,
        limit,
        from: from,
        to: to,
        fromDay: fromDay,
        timeFrom: F,
        timeTo: T,
        nameAirlines: nameID,
      })
    );
  }, [dispatch, page, limit, from, to, fromDay, timeFrom, timeTo, nameID]);

  return (
    <>
      {isLoading ? (
        <LoadingCss />
      ) : (
        <>
          <Container maxWidth="lg" sx={{ color: "white" }}>
            <Box
              sx={{
                mb: { xs: 1.2, sm: 1.4, md: 1.6, lg: 1.8, xl: 2 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                    md: "16px",
                    lg: "18px",
                    xl: "20px",
                  },
                  color: "black",
                }}
              >
                Bộ lọc:
              </Typography>
            </Box>
            <Box sx={{ display: "flex", mb: 2 }}>
              <Box component="div" sx={{ margin: "0 5px" }}>
                <Box component="div" className="dedcription-btn">
                  <Typography component="span" className="name-descripeion">
                    Điểm Dừng
                  </Typography>
                  <Box component="div" className="btn-icon">
                    <ExpandMoreIcon className="far fa-lightbulb" />
                  </Box>
                </Box>
              </Box>
              <Box
                component="div"
                onClick={handleLocation}
                sx={{ margin: "0 5px" }}
              >
                <Box component="div" className="dedcription-btn">
                  <Typography className="name-descripeion">
                    Thời gian bay
                  </Typography>
                  <Box component="div" className="btn-icon">
                    <ExpandMoreIcon className="far fa-lightbulb" />
                  </Box>
                </Box>
              </Box>
              <Box
                component="div"
                onClick={handleNameAirlines}
                sx={{ margin: "0 5px" }}
              >
                <Box component="div" className="dedcription-btn">
                  <Typography className="name-descripeion">
                    Hãng hàng không{" "}
                  </Typography>
                  <Box component="div" className="btn-icon">
                    <ExpandMoreIcon className="far fa-lightbulb" />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Typography
              sx={{
                fontSize: {
                  xs: "17px",
                  sm: "19px",
                  md: "21px",
                  lg: "23px",
                  xl: "25px",
                },
                mb: 2,
                color: "black",
              }}
            >
              KHÁM PHÁ CÁC ĐIỂM ĐẾN
            </Typography>

            <Grid container spacing={2} columns={12}>
              {flights.map((flight) => {
                let date = new Date(flight.fromDay).getDate();
                let month = new Date(flight.fromDay).getMonth() + 1;
                let year = new Date(flight.fromDay).getFullYear();
                const lableFrom = countrys.find(
                  (country) => country.value === flight.from.toUpperCase()
                );
                const lableTo = countrys.find(
                  (country) => country.value === flight.to.toUpperCase()
                );
                return (
                  <Grid item xs={12} key={flight._id}>
                    <Card
                      sx={{
                        padding: "10px",
                        boxShadow:
                          "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                          flexWrap: "wrap",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CardMedia
                            component="img"
                            image={flight.airlines.imageUrl}
                            height={{
                              xs: "15px",
                              sm: "20px",
                              md: "25px",
                              lg: "30px",
                              xl: "35px",
                            }}
                            sx={{
                              width: {
                                xs: "15px",
                                sm: "20px",
                                md: "25px",
                                lg: "30px",
                                xl: "35px",
                              },
                            }}
                          />
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
                            {flight.airlines.name}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              textAlign: "center",
                              margin: {
                                xs: "0 6px",
                                sm: "0 7px",
                                md: "0 8px",
                                lg: "0 9px",
                                xl: "0 10px",
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: {
                                  xs: "17px",
                                  sm: "19px",
                                  md: "21px",
                                  lg: "23px",
                                  xl: "25px",
                                },
                                fontStyle: "italic",
                                pointerEvents: "fill",
                              }}
                            >
                              {new Date(flight.timeFrom).getHours() < 10
                                ? `0${new Date(flight.timeFrom).getHours()}`
                                : new Date(flight.timeFrom).getHours()}
                              :
                              {new Date(flight.timeFrom).getMinutes() === 0
                                ? "00"
                                : new Date(flight.timeFrom).getMinutes() < 10
                                ? `0${new Date(flight.timeFrom).getMinutes()}`
                                : new Date(flight.timeFrom).getMinutes()}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
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
                                {flight.from.toUpperCase()}
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
                                {lableFrom.label}
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: "9px",
                                  sm: "10px",
                                  md: "11px",
                                  lg: "12px",
                                  xl: "13px",
                                },
                              }}
                            >
                              {lableFrom.label}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              textAlign: "center",
                              margin: {
                                xs: "0 6px",
                                sm: "0 7px",
                                md: "0 8px",
                                lg: "0 9px",
                                xl: "0 10px",
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                fontStyle: "italic",
                                fontSize: {
                                  xs: "0.6rem",
                                  sm: "0.7rem",
                                  md: "0.8rem",
                                  lg: "0.9rem",
                                  xl: "1rem",
                                },
                              }}
                            >
                              {Math.abs(
                                new Date(flight.timeFrom).getHours() -
                                  new Date(flight.timeTo).getHours()
                              )}
                              h{" "}
                              {Math.abs(
                                new Date(flight.timeFrom).getMinutes() -
                                  new Date(flight.timeTo).getMinutes()
                              )}
                              min
                            </Typography>
                            <Box
                              sx={{
                                backgroundColor: "black",
                                height: "1px",
                                width: {
                                  xs: "110px",
                                  sm: "120px",
                                  md: "130px",
                                  lg: "140px",
                                  xl: "150px",
                                },
                              }}
                            ></Box>
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: "7px",
                                  sm: "9px",
                                  md: "11px",
                                  lg: "13px",
                                  xl: "15px",
                                },
                              }}
                            >
                              direct
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              textAlign: "center",
                              margin: {
                                xs: "0 6px",
                                sm: "0 7px",
                                md: "0 8px",
                                lg: "0 9px",
                                xl: "0 10px",
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: {
                                  xs: "17px",
                                  sm: "19px",
                                  md: "21px",
                                  lg: "23px",
                                  xl: "25px",
                                },
                                fontStyle: "italic",
                              }}
                            >
                              {new Date(flight.timeTo).getHours() < 10
                                ? `0${new Date(flight.timeTo).getHours()}`
                                : new Date(flight.timeTo).getHours()}
                              :
                              {new Date(flight.timeTo).getMinutes() === 0
                                ? "00"
                                : new Date(flight.timeTo).getMinutes() < 10
                                ? `0${new Date(flight.timeTo).getMinutes()}`
                                : new Date(flight.timeTo).getMinutes()}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
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
                                {flight.to.toUpperCase()}
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
                                {lableTo.label}
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: "9px",
                                  sm: "10px",
                                  md: "11px",
                                  lg: "12px",
                                  xl: "13px",
                                },
                              }}
                            >
                              {lableTo.label}
                            </Typography>
                          </Box>
                          <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ ml: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 } }}
                          />
                        </Box>
                        <Box
                          sx={{
                            padding: {
                              xs: "6px",
                              sm: "7px",
                              md: "8px",
                              lg: "9px",
                              xl: "10px",
                            },
                            textAlign: "center",
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: {
                                  xs: "11px",
                                  sm: "12px",
                                  md: "13px",
                                  lg: "14px",
                                  xl: "15px",
                                },
                              }}
                            >
                              GIÁ VÉ: ${Math.ceil(flight.price / 24)}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: "0.6rem",
                                  sm: "0.7rem",
                                  md: "0.8rem",
                                  lg: "0.9rem",
                                  xl: "1rem",
                                },
                              }}
                            >
                              {date} / {month} / {year}
                            </Typography>
                          </Box>
                          <Box
                            component="button"
                            className="booking"
                            onClick={() => handleChairs(flight)}
                          >
                            <span>ĐẶT VÉ</span>
                          </Box>
                        </Box>
                      </Stack>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            <Stack spacing={2} sx={{ alignItems: "center", mt: 3 }}>
              <Pagination
                count={totalPage}
                page={page}
                onChange={handleChange}
                color="secondary"
                size="small"
              />
            </Stack>
          </Container>
        </>
      )}
      <Location
        location={location}
        setLocation={setLocation}
        setTimeFrom={setTimeFrom}
        setTimeTo={setTimeTo}
      />
      <NameAirlines
        nameID={nameID}
        setName={setNameID}
        nameAir={nameAir}
        setNameAir={setNameAir}
      />
    </>
  );
}

export default Flight;
