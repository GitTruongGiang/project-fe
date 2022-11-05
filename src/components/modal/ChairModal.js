import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Chip, Grid, Stack } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelChair, updateChair } from "../../feature/chair/chairSlice";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 320, sm: 400, md: 500, lg: 600, xl: 700 },
  height: { xs: 300, sm: 340, md: 360, lg: 380, xl: 400 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
  borderRadius: "200px 200px 40px 40px",
};

function ChairModal({ open, setOpen, flight }) {
  const [status, setStatus] = useState("");
  const [chairId, setChairId] = useState("");
  const navigate = useNavigate();

  const { chairs, chairCount, rowChairCount } = useSelector(
    (state) => state.chairs
  );

  const methods = useForm({});

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);
  const auth = useAuth();
  const { user } = auth;

  const handeChangeChair = async (chair) => {
    const a = chairs.find((e) => {
      if (e.user === user._id) {
        return e;
      }
    });
    if (a) {
      toast.error(
        `bạn hiện đang có ghế chờ ${a.codeNumber}${a.codeString} bấm send để tiếp tục hoặc bấm cancel để hủy ghế`
      );
    } else {
      if (chair.status === "none") {
        setStatus("pending");
        setChairId(chair._id);
      }
    }
  };
  const handleCancel = async () => {
    const a = chairs.find((e) => e.user);
    dispatch(
      cancelChair({ chairId: a._id, status: "none", flightId: flight._id })
    );
  };

  const onSubmit = async () => {
    try {
      if (status === "pending") {
        dispatch(
          updateChair({ status: status, userId: user._id, chairId: chairId })
        );
        navigate(`/credit/${chairId}`);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={style}>
          <Stack
            spacing={1}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Chip
              label={flight?.plane?.name}
              sx={{
                fontSize: {
                  xs: "12px",
                  sm: "14px",
                  md: "16px",
                  lg: "18px",
                  xl: "20px",
                },
                padding: "20px 15px",
                color: "white",
                backgroundColor: "#40c4ff",
                textTransform: "uppercase",
              }}
            />
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
            >{`( ${flight.codePlane} )`}</Typography>
          </Stack>
          <Box sx={{ textAlign: "center" }}>
            <Grid container spacing={1} columns={chairCount} sx={{ mt: 2 }}>
              {chairs.map((chair) => {
                return (
                  <Grid item xs={rowChairCount} key={chair._id}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor:
                          chair.status === "none"
                            ? "#ff7043"
                            : chair.status === "pending"
                            ? "#29b6f6"
                            : "#81c784",
                        ":focus-within": {
                          backgroundColor:
                            chair.status === "none" ? "#29b6f6" : "",
                        },
                        ":hover": {
                          backgroundColor:
                            chair.status === "none" ? "#81c784" : "",
                          pointerEvents: chair.status !== "none" ? "none" : "",
                        },
                        padding: {
                          xs: "6px 8px",
                          sm: "6px 10px",
                          md: "6px 12px",
                          lg: "6px 14px",
                          xl: "6px 16px",
                        },
                        fontSize: {
                          xs: "0.6rem",
                          sm: "0.7rem",
                          md: "0.75rem",
                          lg: "0.8rem",
                          xl: "0.875rem",
                        },
                        minWidth: {
                          xs: "45px",
                          sm: "50px",
                          md: "55px",
                          lg: "60px",
                          xl: "64px",
                        },
                      }}
                      onClick={() => handeChangeChair(chair)}
                    >
                      <EventSeatIcon
                        sx={{
                          fontSize: {
                            xs: "12px",
                            sm: "14px",
                            md: "16px",
                            lg: "18px",
                            xl: "20px",
                          },
                          mr: 0.5,
                        }}
                      />
                      {chair.codeNumber}
                      {chair.codeString}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              mt: { xs: 1, xl: 3 },
            }}
          >
            <Button
              variant="contained"
              sx={{
                height: {
                  xs: "22px",
                  sm: "24px",
                  md: "26px",
                  lg: "28px",
                  xl: "30px",
                },
                mr: 1,
                fontSize: {
                  xs: "8px",
                  sm: "10px",
                  md: "12px",
                  lg: "14px",
                  xl: "16px",
                },
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <LoadingButton
              sx={{
                textTransform: "capitalize",
                // width: "120px",
                height: {
                  xs: "22px",
                  sm: "24px",
                  md: "26px",
                  lg: "28px",
                  xl: "30px",
                },
                fontSize: {
                  xs: "8px",
                  sm: "10px",
                  md: "12px",
                  lg: "14px",
                  xl: "16px",
                },
              }}
              variant="contained"
              type="submit"
              loading={isSubmitting}
            >
              send
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Modal>
  );
}

export default ChairModal;
