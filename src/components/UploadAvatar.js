import React from "react";
import isString from "lodash/isString";
import { useDropzone } from "react-dropzone";
import { Typography, Box } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { styled, alpha } from "@mui/material/styles";
import RejectionFiles from "./RejectionFiles";
import { fData } from "../utills/numberFormat";

const RootStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  borderRadius: "50%",
  padding: theme.spacing(1),
  border: `1px dashed ${alpha("#919EAB", 0.32)}`,
}));

const DropZoneStyle = styled("div")({
  zIndex: 0,
  width: "100%",
  height: "100%",
  outline: "none",
  display: "flex",
  overflow: "hidden",
  borderRadius: "50%",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  "& > *": { width: "100%", height: "100%" },
  "&:hover": {
    cursor: "pointer",
    "& .placeholder": {
      zIndex: 9,
    },
  },
});

const PlaceholderStyle = styled("div")(({ theme }) => ({
  display: "flex",
  position: "absolute",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  color: "#919EAB",
  backgroundColor: "#919EAB",
  transition: theme.transitions.create("opacity", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&:hover": { opacity: 0.72 },
}));

function UploadAvatar({ error, file, helperText, sx, ...other }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    ...other,
  });

  return (
    <>
      <RootStyle
        sx={{
          ...((isDragReject || error) && {
            borderColor: "error.light",
          }),
          ...sx,
          width: { xs: 128, sm: 132, md: 136, lg: 140, xl: 144 },
          height: { xs: 128, sm: 132, md: 136, lg: 140, xl: 144 },
        }}
      >
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
          }}
        >
          <input {...getInputProps()} />

          {file && (
            <Box
              sx={{
                zIndex: 8,
                overflow: "hidden",
                "& img": {
                  objectFit: "cover",
                  width: 1,
                  height: 1,
                },
              }}
            >
              <img alt="avatar" src={isString(file) ? file : file.preview} />
            </Box>
          )}

          <PlaceholderStyle
            className="placeholder"
            sx={{
              ...(file && {
                opacity: 0,
                color: "common.white",
                bgcolor: "grey.900",
                "&:hover": { opacity: 0.72 },
              }),
              ...((isDragReject || error) && {
                bgcolor: "error.lighter",
              }),
            }}
          >
            <AddAPhotoIcon
              sx={{
                width: { xs: 16, sm: 18, md: 20, lg: 22, xl: 24 },
                height: { xs: 16, sm: 18, md: 20, lg: 22, xl: 24 },
                mb: { xs: 0.6, sm: 0.7, md: 0.8, lg: 0.9, xl: 1 },
              }}
            />
            <Typography variant="caption">
              {file ? "Update photo" : "Upload photo"}
            </Typography>
          </PlaceholderStyle>
        </DropZoneStyle>
      </RootStyle>

      <Typography
        variant="caption"
        sx={{
          mt: { xs: 1.2, sm: 1.4, md: 1.6, lg: 1.8, xl: 2 },
          mx: "auto",
          display: "block",
          textAlign: "center",
          color: "text.secondary",
          fontSize: {
            xs: "0.55rem",
            sm: "0.6rem",
            md: "0.65rem",
            lg: "0.7rem",
            xl: "0.75rem",
          },
        }}
      >
        Allowed *.jpeg, *.jpg, *.png, *.gif
        <br /> max size of {fData(3145728)}
      </Typography>

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}
    </>
  );
}

export default UploadAvatar;
