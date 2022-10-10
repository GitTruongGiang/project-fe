import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, Radio, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAirlines } from "../../feature/airlines/airlineSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 25,
  p: 4,
  borderRadius: "25px",
};

function NameAirlines({ nameAir, setNameAir, setName, nameID }) {
  const handechange = async (e) => {
    if (e.target.checked) {
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
          {airlines.map((airline) => {
            return (
              <Stack spacing={2} key={airline._id} direction="row">
                <Radio
                  checked={nameID === airline._id}
                  value={airline._id}
                  onClick={handechange}
                />
                <img src={airline.imageUrl} alt="" width="30px" height="30px" />
                <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                  {airline.name}
                </Typography>
              </Stack>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
}

export default NameAirlines;
