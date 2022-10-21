import React from "react";
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
  width: 700,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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
    dispatch(cancelChair({ chairId: a._id, status: "none" }));
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
                fontSize: "20px",
                padding: "20px 15px",
                color: "white",
                backgroundColor: "#40c4ff",
                textTransform: "uppercase",
              }}
            />
            <Typography>{`( ${flight.codePlane} )`}</Typography>
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
                      }}
                      onClick={() => handeChangeChair(chair)}
                    >
                      <EventSeatIcon sx={{ fontSize: "20px", mr: 0.5 }} />
                      {chair.codeNumber} {chair.codeString}
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
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              sx={{ height: "30px", mr: 1 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <LoadingButton
              sx={{
                textTransform: "capitalize",
                width: "120px",
                height: "30px",
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
