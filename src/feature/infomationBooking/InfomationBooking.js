import {
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { countrys } from "../../list";
import { getSingleChair } from "../chair/chairSlice";

function InfomationBooking() {
  const { chairId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chair, flight } = useSelector((state) => state.chairs);
  const handleFinish = async () => {
    navigate("/");
    toast.success("booking flight success");
  };

  useEffect(() => {
    dispatch(getSingleChair({ chairId }));
  }, [dispatch, chairId]);

  const country = countrys.filter((country) => {
    if (country.value === flight.from.toLocaleUpperCase()) {
      return country.label;
    }
    if (country.value === flight.to.toLocaleUpperCase()) {
      return country.label;
    }
  });
  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center" }}>
        <Chip
          label="thông tin chuyến bay"
          sx={{
            color: "white",
            fontSize: {
              xs: "22px",
              sm: "24px",
              md: "26px",
              lg: "28px",
              xl: "30px",
            },
            fontWeight: 600,
            backgroundColor: "#29b6f6",
            fontStyle: "italic",
            padding: "20px 10px",
            mb: 3,
          }}
        />
      </Box>
      <Paper
        elevation={12}
        sx={{
          padding: "20px",
          borderRadius: "25px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Box sx={{ padding: "10px", mb: 2 }}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: {
                xs: "17px",
                sm: "19px",
                md: "21px",
                lg: "23px",
                xl: "25px",
              },
            }}
          >
            {flight.airlines?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "10px",
                    sm: "12px",
                    md: "14px",
                    lg: "16px",
                    xl: "18px",
                  },
                  fontWeight: 600,
                }}
              >
                Nơi đi:
              </Typography>
              <Typography
                sx={{
                  ml: 1,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "15px",
                    xl: "16px",
                  },
                }}
              >
                {country[0].label}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "10px",
                    sm: "12px",
                    md: "14px",
                    lg: "16px",
                    xl: "18px",
                  },
                  fontWeight: 600,
                }}
              >
                Nơi đến:
              </Typography>
              <Typography
                sx={{
                  ml: 1,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "15px",
                    xl: "16px",
                  },
                }}
              >
                {country[1].label}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "10px",
                    sm: "12px",
                    md: "14px",
                    lg: "16px",
                    xl: "18px",
                  },
                  fontWeight: 600,
                }}
              >
                Ngày xuất phát:
              </Typography>
              <Typography
                sx={{
                  ml: 1,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "15px",
                    xl: "16px",
                  },
                }}
              >
                {new Date(flight.fromDay).getDate()}
                {"/"}
                {new Date(flight.fromDay).getMonth() + 1}
                {"/"}
                {new Date(flight.fromDay).getFullYear()}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "10px",
                    sm: "12px",
                    md: "14px",
                    lg: "16px",
                    xl: "18px",
                  },
                  fontWeight: 600,
                }}
              >
                Thời gian đi:
              </Typography>
              <Typography
                sx={{
                  ml: 1,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "15px",
                    xl: "16px",
                  },
                }}
              >
                {new Date(flight.timeFrom).getHours() < 10
                  ? `0${new Date(flight.timeFrom).getHours()}`
                  : new Date(flight.timeFrom).getHours()}
                :
                {new Date(flight.timeFrom).getMinutes() < 10
                  ? `0${new Date(flight.timeFrom).getMinutes()}`
                  : new Date(flight.timeFrom).getMinutes()}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "10px",
                    sm: "12px",
                    md: "14px",
                    lg: "16px",
                    xl: "18px",
                  },
                  fontWeight: 600,
                }}
              >
                Thời gian đến:
              </Typography>
              <Typography
                sx={{
                  ml: 1,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "15px",
                    xl: "16px",
                  },
                }}
              >
                {new Date(flight.timeTo).getHours() < 10
                  ? `0${new Date(flight.timeTo).getHours()}`
                  : new Date(flight.timeTo).getHours()}
                :
                {new Date(flight.timeTo).getMinutes() < 10
                  ? `0${new Date(flight.timeTo).getMinutes()}`
                  : new Date(flight.timeTo).getMinutes()}
              </Typography>
            </Box>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "10px",
                    sm: "12px",
                    md: "14px",
                    lg: "16px",
                    xl: "18px",
                  },
                  fontWeight: 600,
                }}
              >
                Giá vé:
              </Typography>
              <Typography
                sx={{
                  ml: 1,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "15px",
                    xl: "16px",
                  },
                }}
              >
                ${Math.ceil(flight.price / 21)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "10px",
                    sm: "12px",
                    md: "14px",
                    lg: "16px",
                    xl: "18px",
                  },
                  fontWeight: 600,
                }}
              >
                Hãng máy bay:
              </Typography>
              <Typography
                sx={{
                  ml: 1,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "15px",
                    xl: "16px",
                  },
                }}
              >
                {flight.plane?.name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "10px",
                    sm: "12px",
                    md: "14px",
                    lg: "16px",
                    xl: "18px",
                  },
                  fontWeight: 600,
                }}
              >
                Mã hiệu:
              </Typography>
              <Typography
                sx={{
                  ml: 1,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "15px",
                    xl: "16px",
                  },
                }}
              >
                {flight.codePlane}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "10px",
                    sm: "12px",
                    md: "14px",
                    lg: "16px",
                    xl: "18px",
                  },
                  fontWeight: 600,
                }}
              >
                Số ghế:
              </Typography>
              <Typography
                sx={{
                  ml: 1,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "15px",
                    xl: "16px",
                  },
                }}
              >
                {chair.codeNumber}
                {chair.codeString}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Paper>
      <Box sx={{ textAlign: "end", mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleFinish}
          sx={{
            fontSize: {
              xs: "0.65rem",
              sm: "0.7rem",
              md: "0.75rem",
              lg: "0.8rem",
              xl: "0.875rem",
            },
          }}
        >
          finish
        </Button>
      </Box>
    </Container>
  );
}

export default InfomationBooking;
