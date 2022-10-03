import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChairModal from "../../components/modal/ChairModal";
import { getSingleFlight } from "../flights/flightSlice";
import { getChairs } from "./chairSlice";

function Chair() {
  const params = useParams();
  const dispatch = useDispatch();
  const flightId = params.flightId;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const { flight } = useSelector((state) => state.flight);

  useEffect(() => {
    dispatch(getSingleFlight({ flightId }));
    dispatch(getChairs({ flightId }));
  }, [dispatch, flightId]);
  return (
    <Container maxWidth="xl">
      <Box sx={{ textAlign: "center" }}>
        <Chip
          sx={{
            color: "white",
            fontSize: "30px",
            backgroundColor: "#ff9100",
            p: "20px",
          }}
          label={flight?.airlines?.name || ""}
        />
      </Box>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          color: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "25px" }}>
          {new Date(flight?.fromDay).getDate()}-
          {new Date(flight?.fromDay).getMonth()}-
          {new Date(flight?.fromDay).getFullYear()}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        <Card sx={{ minWidth: 450, textAlign: "center" }}>
          <CardContent>
            <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
              Booking Cabin
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="200px"
            image="https://cdn.pixabay.com/photo/2014/09/10/18/21/aircraft-441019_960_720.jpg"
          />
          <Button
            variant="text"
            fullWidth
            sx={{
              textTransform: "capitalize",
              color: "black",
              fontSize: "16px",
              borderRadius: 0,
              ":hover": { backgroundColor: "#81c784", color: "white" },
            }}
          >
            check cabin
          </Button>
        </Card>
        <Card sx={{ minWidth: 450, textAlign: "center" }}>
          <CardContent>
            <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
              Booking Chair
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="200px"
            image="https://cdn.pixabay.com/photo/2014/11/06/10/52/seats-519002_960_720.jpg"
          />
          <Button
            variant="text"
            fullWidth
            sx={{
              textTransform: "capitalize",
              color: "black",
              fontSize: "16px",
              borderRadius: 0,
              ":hover": { backgroundColor: "#81c784", color: "white" },
            }}
            onClick={handleOpen}
          >
            check chair
          </Button>
        </Card>
        <ChairModal open={open} setOpen={setOpen} flight={flight} />
      </Stack>
    </Container>
  );
}

export default Chair;
