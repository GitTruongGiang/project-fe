import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import InputMask from "react-input-mask";
import CardImage from "../../components/CardImage";
import creditCardType from "credit-card-type";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleChair, updateChair } from "../chair/chairSlice";
import { toast } from "react-toastify";

function CreditCard() {
  const [status, setStatus] = useState("placed");
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [CVV, setCVV] = useState("");

  const { chairId } = useParams();
  const auth = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleChair({ chairId }));
  }, [dispatch, chairId]);

  const { chair } = useSelector((state) => state.chairs);
  const { user } = auth;

  const returnCardType = (value) => {
    if (!value) return;
    return creditCardType(value)[0]?.type;
  };

  const methods = useForm({});

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      if (cardNumber && nameOnCard && expiryDate && CVV) {
        dispatch(
          updateChair({ status: status, userId: user._id, chairId: chairId })
        );
        navigate(`/booking/${chairId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center" }}>
        <Chip
          label="Booking"
          sx={{
            fontSize: "30px",
            color: "white",
            fontStyle: "italic",
            fontWeight: 600,
            backgroundColor: "#29b6f6",
            padding: "20px 25px 20px 25px",
            borderRadius: "25px",
            mb: 3,
          }}
        />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="row" spacing={2} columns={16}>
          <Grid item xs={8}>
            <Card sx={{ maxHeight: "600px", padding: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "15px",
                }}
              >
                <Typography sx={{ fontSize: "20px" }}>
                  Enter card information to pay
                </Typography>
                <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                  ${Math.ceil(chair.flight?.price / 21)}
                </Typography>
              </Box>
              <Stack
                sx={{
                  backgroundColor: "#eeeeee",
                  height: "380px",
                  width: "360px",
                  margin: "0 auto",
                  padding: "20px",
                }}
              >
                <Box
                  sx={{
                    height: "350px",
                    width: "320px",
                    margin: "auto",
                  }}
                >
                  <Stack spacing={2}>
                    <Box>
                      <Typography sx={{ mb: 1 }}>
                        Enter your card number
                      </Typography>
                      <Box component="div" sx={{ position: "relative" }}>
                        <InputMask
                          mask="9999 9999 9999 9999"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          style={{
                            height: "50px",
                            padding: "16.5px 14px",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            right: "20px",
                            top: "10px",
                          }}
                        >
                          <CardImage type={returnCardType(cardNumber)} />
                        </span>
                      </Box>
                    </Box>
                    <Box>
                      <Typography sx={{ mb: 1 }}>Name on card</Typography>
                      <TextField
                        value={nameOnCard}
                        autoComplete="off"
                        onChange={(e) => setNameOnCard(e.target.value)}
                        fullWidth
                        sx={{ backgroundColor: "white", borderRadius: "10px" }}
                      />
                    </Box>
                  </Stack>
                  <Grid container spacing={1} columns={16} sx={{ mt: 1 }}>
                    <Grid item xs={8}>
                      <Typography>Expiry date</Typography>
                      <InputMask
                        mask="99/99"
                        required
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        style={{
                          height: "50px",
                          padding: "16.5px 14px",
                          width: "100%",
                          borderRadius: "5px",
                        }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>CVC/CVV</Typography>
                      <InputMask
                        mask="999"
                        required
                        value={CVV}
                        onChange={(e) => setCVV(e.target.value)}
                        style={{
                          height: "50px",
                          padding: "16.5px 14px",
                          width: "100%",
                          borderRadius: "5px",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card sx={{ maxHeight: "600px" }}>
              <Typography sx={{ textAlign: "center", fontSize: "20px", mt: 1 }}>
                Thông tin liên hệ
              </Typography>
              <Stack spacing={1} sx={{ padding: "15px" }}>
                <Stack spacing={1}>
                  <Typography sx={{ fontSize: "13px" }}>Name:</Typography>
                  <TextField defaultValue={user.name} size="small" />
                </Stack>
                <Stack spacing={1}>
                  <Typography sx={{ fontSize: "13px" }}>Email:</Typography>
                  <TextField defaultValue={user.email} size="small" />
                </Stack>
                <Stack spacing={1}>
                  <Typography sx={{ fontSize: "13px" }}>City:</Typography>
                  <TextField defaultValue={user.city} size="small" />
                </Stack>
                <Stack spacing={1}>
                  <Typography sx={{ fontSize: "13px" }}>Country:</Typography>
                  <TextField defaultValue={user.country} size="small" />
                </Stack>
                <Stack spacing={1}>
                  <Typography sx={{ fontSize: "13px" }}>Phone:</Typography>
                  <TextField defaultValue={user.phone} size="small" />
                </Stack>
                <Button sx={{ justifyContent: "center" }} variant="contained">
                  Edit
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "end", mt: 5 }}>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={isSubmitting}
          >
            Booking Flight
          </LoadingButton>
        </Box>
      </form>
    </Container>
  );
}

export default CreditCard;
