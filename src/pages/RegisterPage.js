import React, { useState } from "react";
import {
  Link,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Container,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import "./RegisterPageCss.css";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  city: Yup.string().required("city is required"),
  phone: Yup.string().required("phone is required"),
  password: Yup.string().min(8).required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const defaultValues = {
  name: "",
  email: "",
  city: "",
  phone: "",
  password: "",
  passwordConfirmation: "",
};

function RegisterPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { name, email, password, city, phone } = data;
    try {
      await auth.register({ name, email, password, city, phone }, () => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container
      sx={{
        width: {
          xs: "300px",
          sm: "374px",
          md: "400px",
          lg: "424px",
          xl: "444px",
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FlightTakeoffIcon
              sx={{
                color: "#1e88e5",
                fontSize: {
                  xs: "30px",
                  sm: "35px",
                  md: "40px",
                  lg: "45px",
                  xl: "50px",
                },
              }}
            />
            <Typography
              sx={{
                fontSize: {
                  xs: "16px",
                  sm: "17px",
                  md: "18px",
                  lg: "19px",
                  xl: "20px",
                },
                fontWeight: 600,
              }}
            >
              TravelBooking
            </Typography>
          </Box>
          {!!errors.responseError && (
            <Alert
              severity="error"
              sx={{
                fontSize: {
                  xs: "0.7rem",
                  sm: "0.75rem",
                  md: "0.8rem",
                  lg: "0.85rem",
                  xl: "0.9rem",
                },
                padding: {
                  xs: "0px 16px",
                  sm: "6px 16px",
                  md: "6px 16px",
                  lg: "6px 16px",
                  xl: "6px 16px",
                },
              }}
            >
              {errors.responseError.message}
            </Alert>
          )}
          <Alert
            severity="info"
            sx={{
              fontSize: {
                xs: "0.7rem",
                sm: "0.75rem",
                md: "0.8rem",
                lg: "0.85rem",
                xl: "0.9rem",
              },
              padding: {
                xs: "0px 16px",
                sm: "6px 16px",
                md: "6px 16px",
                lg: "6px 16px",
                xl: "6px 16px",
              },
            }}
          >
            T??i Kho???ng C???a B???n ???? S???n S??ng{" "}
            <Link
              variant="subtitle2"
              component={RouterLink}
              to="/login"
              sx={{
                fontSize: {
                  xs: "0.7rem",
                  sm: "0.75rem",
                  md: "0.8rem",
                  lg: "0.85rem",
                  xl: "0.9rem",
                },
              }}
            >
              ????ng Nh???p
            </Link>
          </Alert>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  autoComplete="off"
                  fullWidth
                  id="name"
                  label="T??n ?????y ?????"
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  autoComplete="off"
                  fullWidth
                  id="email"
                  label="?????a Ch??? Email"
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="city"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  autoComplete="off"
                  fullWidth
                  id="city"
                  label="Th??nh Ph???"
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  autoComplete="off"
                  fullWidth
                  id="phone"
                  label="S??? ??i???n Tho???i"
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              );
            }}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  label="M???t Kh???u"
                  fullWidth
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityIcon
                              sx={{
                                fontSize: {
                                  xs: "1rem",
                                  sm: "1.2rem",
                                  md: "1.3rem",
                                  lg: "1.4rem",
                                  xl: "1.5rem",
                                },
                              }}
                            />
                          ) : (
                            <VisibilityOffIcon
                              sx={{
                                fontSize: {
                                  xs: "1rem",
                                  sm: "1.2rem",
                                  md: "1.3rem",
                                  lg: "1.4rem",
                                  xl: "1.5rem",
                                },
                              }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              );
            }}
          />
          <Controller
            name="passwordConfirmation"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  fullWidth
                  label="??i???n L???i M???t Kh???u"
                  id="password"
                  type={showPasswordConfirmation ? "text" : "password"}
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPasswordConfirmation(
                              !showPasswordConfirmation
                            )
                          }
                          edge="end"
                        >
                          {showPasswordConfirmation ? (
                            <VisibilityIcon
                              sx={{
                                fontSize: {
                                  xs: "1rem",
                                  sm: "1.2rem",
                                  md: "1.3rem",
                                  lg: "1.4rem",
                                  xl: "1.5rem",
                                },
                              }}
                            />
                          ) : (
                            <VisibilityOffIcon
                              sx={{
                                fontSize: {
                                  xs: "1rem",
                                  sm: "1.2rem",
                                  md: "1.3rem",
                                  lg: "1.4rem",
                                  xl: "1.5rem",
                                },
                              }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              );
            }}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              fontSize: {
                xs: "0.7rem",
                sm: "0.75rem",
                md: "0.8rem",
                lg: "0.85rem",
                xl: "0.9rem",
              },
              padding: {
                xs: "4px 22px",
                sm: "5px 22px",
                md: "6px 22px",
                lg: "7px 22px",
                xl: "8px 22px",
              },
            }}
          >
            T???o
          </LoadingButton>
        </Stack>
      </form>
    </Container>
  );
}

export default RegisterPage;
