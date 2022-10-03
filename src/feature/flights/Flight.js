import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
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

  const { flights, count, totalPage } = useSelector((state) => state.flight);

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
    <Container maxWidth="lg" sx={{ color: "white" }}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Typography sx={{ fontSize: "20px" }}>Bộ lọc: </Typography>
        <Button
          sx={{
            color: "white",
            textTransform: "capitalize",
            ":hover": { backgroundColor: "#1e88e5" },
          }}
          variant="contained"
          color="secondary"
        >
          Diem dung <ExpandMoreIcon />
        </Button>
        <Button
          sx={{
            color: "white",
            textTransform: "capitalize",
            ":hover": { backgroundColor: "#1e88e5" },
          }}
          variant="contained"
          color="secondary"
          onClick={handleLocation}
        >
          Thời gian bay <ExpandMoreIcon />
        </Button>
        <Button
          sx={{
            color: "white",
            textTransform: "capitalize",
            ":hover": { backgroundColor: "#1e88e5" },
          }}
          variant="contained"
          color="secondary"
          onClick={handleNameAirlines}
        >
          Hãng hàng không <ExpandMoreIcon />
        </Button>
        <Location
          location={location}
          setLocation={setLocation}
          setTimeFrom={setTimeFrom}
          setTimeTo={setTimeTo}
        />
        <NameAirlines
          setName={setNameID}
          nameAir={nameAir}
          setNameAir={setNameAir}
        />
      </Stack>
      <Typography sx={{ fontSize: "25px", mb: 2 }}>
        Explore destinations
      </Typography>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {flights.map((flight) => {
          let date = new Date(flight.fromDay).getDate();
          let month = new Date(flight.fromDay).getMonth();
          let year = new Date(flight.fromDay).getFullYear();
          const lable = countrys.find(
            (country) => country.value === flight.to.toUpperCase()
          );
          return (
            <Grid item xs={2} sm={4} md={4} key={flight._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="150px"
                  image={flight.imageUrl}
                />
                <Stack alignItems="center" sx={{ mt: 2 }}>
                  <Chip
                    label={flight.airlines.name}
                    sx={{
                      fontSize: "18px",
                      backgroundColor: "#ff9100",
                      color: "white",
                    }}
                  />
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ display: "flex", alignItems: "center", mt: 1 }}
                  >
                    <Box>
                      <Typography>
                        {new Date(flight.timeFrom).getHours() < 10
                          ? `0${new Date(flight.timeFrom).getHours()}`
                          : new Date(flight.timeFrom).getHours()}
                        :
                        {new Date(flight.timeFrom).getMinutes() === 0
                          ? "00"
                          : new Date(flight.timeFrom).getMinutes()}
                      </Typography>
                      <Chip label={flight.from.toUpperCase()} />
                    </Box>
                    <Typography sx={{ alignItems: "center" }}>
                      {"===>"}
                    </Typography>
                    <Box>
                      <Typography>
                        {new Date(flight.timeTo).getHours() < 10
                          ? `0${new Date(flight.timeTo).getHours()}`
                          : new Date(flight.timeTo).getHours()}
                        :
                        {new Date(flight.timeTo).getMinutes() === 0
                          ? "00"
                          : new Date(flight.timeTo).getMinutes()}
                      </Typography>
                      <Chip label={flight.to.toUpperCase()} />
                    </Box>
                  </Stack>
                </Stack>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: "15px" }}>
                      {lable.label}
                    </Typography>
                    <Typography sx={{ fontSize: "15px" }}>Viet Nam</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: "15px" }}>
                      price ${Math.ceil(flight.price / 24)}
                    </Typography>
                    <Typography>
                      {date} / {month} / {year}
                    </Typography>
                    <Button
                      sx={{
                        color: "white",
                        fontSize: "12px",
                        textTransform: "capitalize",
                        width: "100px",
                        height: "25px",
                        mt: 1,
                      }}
                      variant="contained"
                      onClick={() => handleChairs(flight)}
                    >
                      Booking
                    </Button>
                  </Box>
                </CardContent>
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
  );
}

export default Flight;
