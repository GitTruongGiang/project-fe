import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Link as RouterLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../hooks/useAuth";
import { Box } from "@mui/system";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import "./LoginPageCss.css";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("email required"),
  password: yup.string().required("password"),
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const defaultValues = {
    email: "",
    password: "",
  };
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema),
  });
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";
    try {
      const { email, password } = data;
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
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
      <Box
        sx={{
          display: "flex",
          mb: { xs: 3, sm: 3.5, md: 4, lg: 4.5, xl: 5 },
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
          mb: { xs: 0.6, sm: 0.7, md: 0.8, lg: 0.9, xl: 1 },
        }}
      >
        Don’t have an account?{" "}
        <Link
          variant="subtitle2"
          component={RouterLink}
          to="/register"
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
          Get started
        </Link>
      </Alert>
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
            mb: { xs: 1.2, sm: 1.4, md: 1.6, lg: 1.8, xl: 2 },
          }}
        >
          {errors.responseError.message}
        </Alert>
      )}
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontSize: {
            xs: "1.1rem",
            sm: "1.2rem",
            md: "1.3rem",
            lg: "1.4rem",
            xl: "1.5rem",
          },
        }}
      >
        LOGIN
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                autoComplete="off"
                label="Email"
                id="email"
                fullWidth
                {...field}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                {...field}
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Visibility
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
                          <VisibilityOff
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
            )}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            size="large"
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
            LogIn
          </LoadingButton>
        </Stack>
      </form>
    </Container>
  );
}

export default LoginPage;
