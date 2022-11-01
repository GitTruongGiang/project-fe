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
import "./Search.css";

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
      label: `${adults} Người Lớn`,
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
    <Container sx={{ width: { xs: 300, sm: 350, md: 500, lg: 750, xl: 900 } }}>
      <Paper elevation={8}>
        <Stack spacing={2}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card
              sx={{
                padding: {
                  xs: "6px",
                  sm: "7px",
                  md: "6px",
                  lg: "9px",
                  xl: "10px",
                },
                borderRadius: {
                  xs: "4px",
                  sm: "5px",
                  md: "6px",
                  lg: "7px",
                  xl: "8px",
                },
                backgroundColor: "#24292e",
                color: "white",
              }}
            >
              <Box
                sx={{
                  margin: {
                    xs: "0",
                    sm: "2px 2px 0 2px",
                    lg: "4.5px 4.5px 0 4.5px",
                    xl: "5px 5px 0px 5px",
                  },
                }}
              >
                <Grid
                  container
                  spacing={{ xs: 1.2, sm: 1.4, md: 1.6, lg: 1.8, xl: 2 }}
                  columns={16}
                >
                  <Grid
                    item
                    xs={8}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <RadioGroup defaultValue="Một Chiều / Khứ Hồi" row>
                      <FormControlLabel
                        value="Một Chiều / Khứ Hồi"
                        control={<Radio />}
                        label="Một Chiều / Khứ Hồi"
                      />
                    </RadioGroup>
                  </Grid>

                  <Grid item xs={8}>
                    <Link href="#" sx={{ textDecoration: "none" }}>
                      <Chip
                        label="Mở Bản Đồ"
                        icon={
                          <FmdGoodIcon
                            style={{ color: "#1e88e5" }}
                            sx={{
                              fontSize: {
                                xs: "1.1rem",
                                sm: "1.2rem",
                                md: "1.3rem",
                                lg: "1.4rem",
                                xl: "1.5rem",
                              },
                            }}
                          />
                        }
                        sx={{
                          color: "white",
                          fontSize: {
                            xs: "8px",
                            sm: "10px",
                            md: "12px",
                            lg: "14px",
                            xl: "16px",
                          },
                          width: "100%",
                          height: {
                            xs: "24px",
                            sm: "26px",
                            md: "28px",
                            lg: "30px",
                            xl: "32px",
                          },
                          cursor: "pointer",
                        }}
                      />
                    </Link>
                  </Grid>

                  <Grid item xs={8}>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        display: "flex",
                        flexWrap: {
                          xs: "wrap",
                          sm: "wrap",
                          lg: "inherit",
                          xl: "inherit",
                        },
                      }}
                    >
                      <Box
                        sx={{ width: "100%", position: "relative" }}
                        component="div"
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            mb: { xs: 0.6, sm: 0.7, md: 0.8, lg: 0.9, xl: 1 },
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
                          From
                        </Typography>
                        <AirplanemodeActiveIcon
                          sx={{
                            position: "absolute",
                            color: "#1e88e5",
                            zIndex: 10,
                            left: { xs: 3, xl: 0 },
                            bottom: {
                              xs: "0px",
                              sm: "4px",
                              lg: "10px",
                              xl: "12px",
                            },
                            height: "20px",
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.9rem",
                              md: "1.1rem",
                              lg: "1.3rem",
                              xl: "1.5rem",
                            },
                          }}
                        />
                        <Autocomplete
                          size="small"
                          id="from"
                          options={countrys}
                          isOptionEqualToValue={(option, value) =>
                            option.label === value.label
                          }
                          getOptionLabel={(options) => options.label}
                          renderOption={(props, option) => {
                            return (
                              <>
                                <Typography
                                  key={option.value}
                                  {...props}
                                  sx={{
                                    cursor: "pointer",
                                    fontSize: {
                                      xs: "0.6rem",
                                      sm: "0.7rem",
                                      md: "0.8rem",
                                      lg: "0.9rem",
                                      xl: "1rem",
                                    },
                                    padding: 0,
                                  }}
                                >
                                  {option.label}
                                </Typography>
                              </>
                            );
                          }}
                          value={from}
                          onChange={(event, newValue) => setFrom(newValue)}
                          sx={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          margin: { xs: "0" },
                          position: "relative",
                        }}
                        component="div"
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            mb: { xs: 0.6, sm: 0.7, md: 0.8, lg: 0.9, xl: 1 },
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
                          To
                        </Typography>
                        <AirplanemodeActiveIcon
                          sx={{
                            position: "absolute",
                            color: "#1e88e5",
                            zIndex: 10,
                            left: { xs: 3, xl: 0 },
                            bottom: {
                              xs: "0px",
                              sm: "4px",
                              lg: "10px",
                              xl: "12px",
                            },
                            height: "20px",
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.9rem",
                              md: "1.1rem",
                              lg: "1.3rem",
                              xl: "1.5rem",
                            },
                          }}
                        />
                        <Autocomplete
                          size="small"
                          id="to"
                          options={countrys}
                          getOptionLabel={(options) => options.label}
                          renderOption={(props, option) => {
                            return (
                              <>
                                <Box
                                  component="li"
                                  key={option.value}
                                  {...props}
                                >
                                  <Typography
                                    sx={{
                                      cursor: "pointer",
                                      fontSize: {
                                        xs: "0.6rem",
                                        sm: "0.7rem",
                                        md: "0.8rem",
                                        lg: "0.9rem",
                                        xl: "1rem",
                                      },
                                      minHeight: 0,
                                    }}
                                  >
                                    {option.label}
                                  </Typography>
                                </Box>
                              </>
                            );
                          }}
                          value={to}
                          onChange={(event, newValue) => setTo(newValue)}
                          sx={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid item xs={8} sx={{ position: "relative" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: { xs: 0.6, sm: 0.7, md: 0.8, lg: 0.9, xl: 1 },
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
                      số hành khách
                    </Typography>
                    <PersonIcon
                      sx={{
                        position: "absolute",
                        color: "#1e88e5",
                        top: { xs: "32px", sm: "37px", xl: "55px" },
                        left: { xs: "12px", sm: "15px", xl: "20px" },
                        zIndex: 10,
                        fontSize: {
                          xs: "0.7rem",
                          sm: "0.9rem",
                          md: "1.1rem",
                          lg: "1.3rem",
                          xl: "1.5rem",
                        },
                      }}
                    />
                    <TextField
                      select
                      fullWidth
                      size="small"
                      id="people"
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
                      sx={{
                        mb: { xs: 0.6, sm: 0.7, md: 0.8, lg: 0.9, xl: 1 },
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
                      Calendar
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disablePast
                        value={calendar}
                        onChange={(newValue) => {
                          setCalendar(newValue);
                        }}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              id="datepiker"
                              sx={{
                                backgroundColor: "white",
                                borderRadius: "8px",
                                color: "#1e88e5",
                              }}
                            />
                          );
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={4}></Grid>

                  <Grid item xs={8} sx={{ position: "relative" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: { xs: 0.6, sm: 0.7, md: 0.8, lg: 0.9, xl: 1 },
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
                      hạng ghế
                    </Typography>
                    <ChairIcon
                      sx={{
                        position: "absolute",
                        color: "#1e88e5",
                        zIndex: 10,
                        left: { xs: "15px", sm: "16px", xl: "20px" },
                        bottom: { xs: "6px", sm: "5px", xl: "26px" },
                        height: "20px",
                        fontSize: {
                          xs: "0.7rem",
                          sm: "0.9rem",
                          md: "1.1rem",
                          lg: "1.3rem",
                          xl: "1.5rem",
                        },
                      }}
                    />
                    <TextField
                      select
                      fullWidth
                      size="small"
                      onChange={(event) => setRankChairs(event.target.value)}
                      value={rankChairs}
                      id="rankchairs"
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
                  mr: { xs: 0, sm: 0.3, xl: 0.5 },
                  mt: { xs: 0.6, sm: 0.7, md: 0.8, lg: 0.9, xl: 1 },
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
                    fontSize: {
                      xs: "8px",
                      sm: "10px",
                      md: "12px",
                      lg: "14px",
                      xl: "16px",
                    },
                    padding: { xs: "4px 12px", sm: "6px 6px", xl: "6px 16px" },
                    lineHeight: { xs: 0, sm: 0.6, xl: 1.75 },
                  }}
                  loading={isSubmitting}
                >
                  <SearchIcon
                    sx={{
                      mr: { xs: 0, sm: 0.5, xl: 0.5 },
                      fontSize: {
                        xs: "0.7rem",
                        sm: "0.9rem",
                        md: "1.1rem",
                        lg: "1.3rem",
                        xl: "1.5rem",
                      },
                    }}
                  />
                  tìm kiếm chuyến bay
                </LoadingButton>
              </Box>
            </Card>
          </form>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Search;
