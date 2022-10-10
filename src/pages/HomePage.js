import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import RecommendIcon from "@mui/icons-material/Recommend";
import image from "../image/bed-4416515_960_720.jpg";
import "../App.css";
import { Stack } from "@mui/system";

function HomePage() {
  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing={2}>
        <Paper
          sx={{
            height: "120px",
            width: "265px",
            ":hover": {
              transition: "all 0.3s ease",
              transform: "scale(1.1)",
              transitionDuration: "0.4s",
              zIndex: 1,
            },
          }}
          elevation={3}
        >
          <IconButton>
            <LocalOfferIcon sx={{ alignItems: "center" }} />
          </IconButton>
          <Typography sx={{ padding: "5px 16px 12px 16px", fontSize: "13px" }}>
            <samp style={{ fontSize: "15px", fontWeight: 600 }}>
              Best travel deals
            </samp>
            <br /> Find the best deals available from 900+ travel sites.
          </Typography>
        </Paper>
        <Paper
          sx={{
            height: "120px",
            width: "265px",
            ":hover": {
              transition: "all 0.3s ease",
              transform: "scale(1.1)",
              transitionDuration: "0.4s",
              zIndex: 1,
            },
          }}
          elevation={3}
        >
          <IconButton>
            <CheckCircleOutlineIcon />
          </IconButton>
          <Typography sx={{ padding: "5px 16px 12px 16px", fontSize: "13px" }}>
            <samp style={{ fontSize: "15px", fontWeight: 600 }}>
              Search without worry
            </samp>{" "}
            <br />
            The prices you see aren't affected by your searches.
          </Typography>
        </Paper>
        <Paper
          sx={{
            height: "120px",
            width: "265px",
            ":hover": {
              transition: "all 0.3s ease",
              transform: "scale(1.1)",
              transitionDuration: "0.4s",
              zIndex: 1,
            },
          }}
          elevation={3}
        >
          <IconButton>
            <PublishedWithChangesIcon />
          </IconButton>
          <Typography sx={{ padding: "5px 16px 12px 16px", fontSize: "13px" }}>
            <samp style={{ fontSize: "15px", fontWeight: 600 }}>
              Book with flexibility
            </samp>
            <br />
            Easily find flights with no change fees.
          </Typography>
        </Paper>
        <Paper
          sx={{
            height: "120px",
            width: "265px",
            ":hover": {
              transition: "all 0.3s ease",
              transform: "scale(1.1)",
              transitionDuration: "0.4s",
              zIndex: 1,
            },
          }}
          elevation={3}
        >
          <IconButton>
            <RecommendIcon />
          </IconButton>
          <Typography sx={{ padding: "5px 16px 12px 16px", fontSize: "13px" }}>
            <samp style={{ fontSize: "15px", fontWeight: 600 }}>
              Trusted and free
            </samp>{" "}
            <br />
            We’re completely free to use – no hidden charges or fees.
          </Typography>
        </Paper>
      </Stack>
      <Stack mt={10}>
        <Card sx={{ backgroundColor: "#24292e", color: "white" }}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 30,
              fontStyle: "italic",
              letterSpacing: 2,
              fontFamily: "monospace",
              padding: 1,
            }}
          >
            Mui Line
          </Typography>
          <CardMedia component="img" height="300px" image={image} />
          <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
            <Box>
              <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                Mui Line, Authentic Cancun rediscovered
              </Typography>
              <Typography>
                A Mui Line family vacation offers beach fun, kids club and
                international cuisine
              </Typography>
            </Box>
            <Button
              sx={{
                backgroundColor: "#1e88e5",
                color: "white",
                fontSize: 16,
                textTransform: "capitalize",
                width: 130,
                height: 30,
                ":hover": {
                  backgroundColor: "#f44336",
                },
              }}
            >
              Discover
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </Container>
  );
}

export default HomePage;
