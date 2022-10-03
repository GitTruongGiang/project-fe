import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAirlines } from "../../feature/airlines/airlineSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function NameAirlines({ nameAir, setNameAir, setName }) {
  const handechange = async (e) => {
    if (e.target.checked === true) {
      setName(e.target.value);
    } else {
      setName("");
    }
  };

  const { airlines } = useSelector((state) => state.airlines);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAirlines({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleClose = () => setNameAir(false);
  return (
    <div>
      <Modal
        open={nameAir}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={1}>
            {airlines.map((airline) => {
              return (
                <Box key={airline._id} sx={{ display: "flex" }}>
                  <Checkbox
                    value={true ? airline._id : ""}
                    onClick={handechange}
                  />
                  <Typography>{airline.name}</Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default NameAirlines;
