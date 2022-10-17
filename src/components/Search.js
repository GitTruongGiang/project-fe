import {
  Autocomplete,
  Card,
  Checkbox,
  Chip,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFlights } from "../feature/flights/flightSlice";
import { LoadingButton } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PersonIcon from "@mui/icons-material/Person";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ChairIcon from "@mui/icons-material/Chair";
import SearchIcon from "@mui/icons-material/Search";
import { countrys, rankChair } from "../list";

function Search() {
  const [from, setFrom] = useState(countrys[0]);
  const [to, setTo] = useState(countrys[5]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [baby, setBaby] = useState(0);
  const [rankChairs, setRankChairs] = useState("PT");
  const [calendar, setCalendar] = useState(dayjs());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const peoples = [
    {
      value: 1,
      label: `${adults} Người Lớn,${children} trẻ em, ${baby} em bé`,
    },
  ];

  const methods = useForm({});
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    let newDate = calendar.toDate();
    const date = new Date(newDate).getDate();
    const month = new Date(newDate).getMonth();
    const year = new Date(newDate).getFullYear();
    newDate = new Date(year, month, date);
    dispatch(getFlights({ from: from.value, to: to.value, fromDay: newDate }));
    navigate(`/flights?from=${from.value}&to=${to.value}&fromDay=${newDate}`);
  };
  return (
    <Container maxWidth="md">
      <Paper elevation={8}>
        <Stack spacing={2}>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card
                sx={{
                  minWidth: 200,
                  height: "300px",
                  padding: "10px",
                  backgroundColor: "#24292e",
                  color: "white",
                }}
              >
                <Box sx={{ margin: "5px 5px 0px 5px" }} component="div">
                  <Grid container spacing={2} columns={16}>
                    <Grid
                      item
                      xs={8}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <RadioGroup defaultValue="Một Chiều / Khứ Hồi" row>
                        <FormControlLabel
                          value="Một Chiều / Khứ Hồi"
                          control={<Radio />}
                          label="Một Chiều / Khứ Hồi"
                        />

                        <FormControlLabel
                          value="Nhiều Thành Phố"
                          control={<Radio />}
                          label="Nhiều Thành Phố"
                        />
                      </RadioGroup>
                    </Grid>

                    <Grid item xs={8}>
                      <Link href="#" sx={{ textDecoration: "none" }}>
                        <Chip
                          label="Mở Bản Đồ"
                          icon={<FmdGoodIcon style={{ color: "#1e88e5" }} />}
                          sx={{
                            color: "white",
                            fontSize: "16px",
                            width: "400px",
                            cursor: "pointer",
                          }}
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={4} sx={{ position: "relative" }}>
                      <Typography
                        variant="body1"
                        sx={{ mb: 1, fontWeight: 600 }}
                      >
                        From
                      </Typography>
                      <AirplanemodeActiveIcon
                        style={{
                          position: "absolute",
                          color: "#1e88e5",
                          zIndex: 10,
                          left: "20px",
                          bottom: "15px",
                          height: "20px",
                        }}
                      />
                      <Autocomplete
                        size="small"
                        options={countrys}
                        getOptionLabel={(options) => options.label}
                        value={from}
                        onChange={(event, newValue) => setFrom(newValue)}
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                    <Grid item xs={4} sx={{ position: "relative" }}>
                      <Typography
                        variant="body1"
                        sx={{ mb: 1, fontWeight: 600 }}
                      >
                        To
                      </Typography>
                      <AirplanemodeActiveIcon
                        style={{
                          position: "absolute",
                          color: "#1e88e5",
                          zIndex: 10,
                          left: "20px",
                          bottom: "15px",
                          height: "20px",
                        }}
                      />
                      <Autocomplete
                        size="small"
                        options={countrys}
                        getOptionLabel={(options) => options.label}
                        value={to}
                        onChange={(event, newValue) => setTo(newValue)}
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>

                    <Grid item xs={8} sx={{ position: "relative" }}>
                      <Typography
                        variant="body1"
                        sx={{ mb: 1, fontWeight: 600 }}
                      >
                        số hành khách
                      </Typography>
                      <PersonIcon
                        sx={{
                          position: "absolute",
                          color: "#1e88e5",
                          top: "55px",
                          left: "20px",
                          zIndex: 10,
                        }}
                      />
                      <TextField
                        select
                        fullWidth
                        size="small"
                        value={adults}
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          fontStyle: "italic",
                        }}
                      >
                        {peoples.map((people) => (
                          <MenuItem key={people.value} value={people.value}>
                            {people.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography
                        variant="body1"
                        sx={{ mb: 1, fontWeight: 600 }}
                      >
                        Calendar
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={calendar}
                          onChange={(newValue) => {
                            setCalendar(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              style={{
                                backgroundColor: "white",
                                borderRadius: "8px",
                                color: "#1e88e5",
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={4}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Khứ Hồi"
                        />
                      </FormGroup>
                    </Grid>

                    <Grid item xs={8} sx={{ position: "relative" }}>
                      <Typography
                        variant="body1"
                        sx={{ mb: 1, fontWeight: 600 }}
                      >
                        hạng ghế
                      </Typography>
                      <ChairIcon
                        style={{
                          position: "absolute",
                          color: "#1e88e5",
                          zIndex: 10,
                          left: "20px",
                          bottom: "26px",
                          height: "20px",
                        }}
                      />
                      <TextField
                        select
                        fullWidth
                        size="small"
                        onChange={(event) => setRankChairs(event.target.value)}
                        value={rankChairs}
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          fontStyle: "italic",
                        }}
                      >
                        {rankChair.map((chair) => (
                          <MenuItem key={chair.value} value={chair.value}>
                            {chair.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    mr: 2,
                    mt: 0,
                  }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    sx={{
                      color: "white",
                      textTransform: "capitalize",
                      ":hover": {
                        transition: "all 1s ease",
                        backgroundColor: "#d50000",
                        color: "white",
                      },
                    }}
                    loading={isSubmitting}
                  >
                    <SearchIcon sx={{ mr: 0.5 }} />
                    tìm kiếm chuyến bay
                  </LoadingButton>
                </Box>
              </Card>
            </form>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Search;
