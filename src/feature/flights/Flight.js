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
  const [limit, setLimit] = useState(9);
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
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: "20px", color: "black" }}>
                Bộ lọc:{" "}
              </Typography>
              <Box component="div">
                <Box component="div" className="dedcription-btn">
                  <span className="name-descripeion">Điểm Dừng</span>
                  <Box component="div" className="btn-icon">
                    <ExpandMoreIcon className="far fa-lightbulb" />
                  </Box>
                </Box>
              </Box>
              <Box component="div" onClick={handleLocation}>
                <Box component="div" className="dedcription-btn">
                  <span className="name-descripeion">Thời gian bay</span>
                  <Box component="div" className="btn-icon">
                    <ExpandMoreIcon className="far fa-lightbulb" />
                  </Box>
                </Box>
              </Box>
              <Box component="div" onClick={handleNameAirlines}>
                <Box component="div" className="dedcription-btn">
                  <span className="name-descripeion">Hãng hàng không </span>
                  <Box component="div" className="btn-icon">
                    <ExpandMoreIcon className="far fa-lightbulb" />
                  </Box>
                </Box>
              </Box>
            </Stack>
            <Typography sx={{ fontSize: "25px", mb: 2, color: "black" }}>
              Explore destinations
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
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CardMedia
                            component="img"
                            image={flight.airlines.imageUrl}
                            height="35px"
                            sx={{ width: "35px" }}
                          />
                          <Typography sx={{ ml: 1 }}>
                            {flight.airlines.name}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "25px",
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
                            }}
                          >
                            <Typography sx={{ fontWeight: 600 }}>
                              {flight.from.toUpperCase()}
                            </Typography>
                            <Typography sx={{ ml: 1 }}>
                              {lableFrom.label}
                            </Typography>
                          </Box>
                          <Typography sx={{ fontSize: "13px" }}>
                            {lableFrom.label}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography sx={{ fontStyle: "italic" }}>
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
                              width: "150px",
                            }}
                          ></Box>
                          <Typography sx={{ fontSize: "15px" }}>
                            direct
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "25px",
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
                            <Typography sx={{ fontWeight: 600 }}>
                              {flight.to.toUpperCase()}
                            </Typography>
                            <Typography sx={{ ml: 1 }}>
                              {lableTo.label}
                            </Typography>
                          </Box>
                          <Typography sx={{ fontSize: "13px" }}>
                            {lableTo.label}
                          </Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        <Box
                          sx={{
                            padding: "10px",
                            textAlign: "center",
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{ fontWeight: 600, fontSize: "15px" }}
                            >
                              price: ${Math.ceil(flight.price / 24)}
                            </Typography>
                            <Typography>
                              {date} / {month} / {year}
                            </Typography>
                          </Box>
                          <Box
                            component="button"
                            className="booking"
                            onClick={() => handleChairs(flight)}
                          >
                            <span>Booking</span>
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
                count={10}
                page={page}
                onChange={handleChange}
                color="secondary"
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
