import React from "react";

import { Stack, Card, InputAdornment, TextField } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";

const SOCIAL_LINKS = [
  {
    value: "facebookLink",
    icon: <FacebookIcon sx={{ fontSize: 30 }} />,
  },
  {
    value: "instagramLink",
    icon: <InstagramIcon sx={{ fontSize: 30 }} />,
  },
  {
    value: "linkedinLink",
    icon: <LinkedInIcon sx={{ fontSize: 30 }} />,
  },
  {
    value: "twitterLink",
    icon: <TwitterIcon sx={{ fontSize: 30 }} />,
  },
];

function AccountSocialLinks() {
  const { user } = useAuth();

  const defaultValues = {
    facebookLink: user?.facebookLink || "",
    instagramLink: user?.instagramLink || "",
    linkedinLink: user?.linkedinLink || "",
    twitterLink: user?.twitterLink || "",
  };

  const methods = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  const onSubmit = async (data) => {};

  return (
    <Card sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          {SOCIAL_LINKS.map((link) => (
            <Controller
              control={control}
              key={link.value}
              name={link.value}
              render={({ field, fieldState: { error } }) => {
                return (
                  <TextField
                    fullWidth
                    autoComplete="off"
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {link.icon}
                        </InputAdornment>
                      ),
                    }}
                  />
                );
              }}
            />
          ))}

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </form>
    </Card>
  );
}

export default AccountSocialLinks;
