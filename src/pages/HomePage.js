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
import { Stack } from "@mui/system";
import "./HomePageCss.css";

function HomePage() {
  return (
    <Container maxWidth="lg">
      <Stack
        direction={{ xs: "column", xl: "row" }}
        spacing={{ xs: 1.2, sm: 1.4, md: 1.6, lg: 1.8, xl: 2 }}
        sx={{
          textAlign: "center",
          justifyContent: "center",
          flexWrap: { xs: "wrap" },
          alignContent: "center",
        }}
      >
        <Paper
          sx={{
            height: {
              xs: "80px",
              sm: "90px",
              md: "100px",
              lg: "110px",
              xl: "120px",
            },
            width: {
              xs: "245px",
              sm: "250px",
              md: "255px",
              lg: "260px",
              xl: "265px",
            },
          }}
          elevation={3}
        >
          <LocalOfferIcon
            sx={{
              marginTop: {
                xs: "6px",
                sm: "7px",
                md: "8px",
                lg: "9px",
                xl: "10px",
              },
              marginLeft: {
                xs: "6px",
                sm: "7px",
                md: "8px",
                lg: "9px",
                xl: "10px",
              },
              fontSize: {
                xs: "1.1rem",
                sm: "1.2rem",
                md: "1.3rem",
                lg: "1.4rem",
                xl: "1.5rem",
              },
            }}
          />
          <Box
            sx={{
              padding: "5px 16px 12px 16px",
              fontSize: {
                xs: "9px",
                sm: "10px",
                md: "11px",
                lg: "12px",
                xl: "13px",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "11px",
                  sm: "12px",
                  md: "13px",
                  lg: "14px",
                  xl: "15px",
                },
                fontWeight: 600,
              }}
            >
              Best travel deals
            </Typography>
            Find the best deals available from 900+ travel sites.
          </Box>
        </Paper>
        <Paper
          sx={{
            height: {
              xs: "80px",
              sm: "90px",
              md: "100px",
              lg: "110px",
              xl: "120px",
            },
            width: {
              xs: "245px",
              sm: "250px",
              md: "255px",
              lg: "260px",
              xl: "265px",
            },
          }}
          elevation={3}
        >
          <CheckCircleOutlineIcon
            sx={{
              marginTop: {
                xs: "6px",
                sm: "7px",
                md: "8px",
                lg: "9px",
                xl: "10px",
              },
              marginLeft: {
                xs: "6px",
                sm: "7px",
                md: "8px",
                lg: "9px",
                xl: "10px",
              },
              fontSize: {
                xs: "1.1rem",
                sm: "1.2rem",
                md: "1.3rem",
                lg: "1.4rem",
                xl: "1.5rem",
              },
            }}
          />
          <Box
            sx={{
              padding: "5px 16px 12px 16px",
              fontSize: {
                xs: "9px",
                sm: "10px",
                md: "11px",
                lg: "12px",
                xl: "13px",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "11px",
                  sm: "12px",
                  md: "13px",
                  lg: "14px",
                  xl: "15px",
                },
                fontWeight: 600,
              }}
            >
              Search without worry
            </Typography>
            The prices you see aren't affected by your searches.
          </Box>
        </Paper>
        <Paper
          sx={{
            height: {
              xs: "80px",
              sm: "90px",
              md: "100px",
              lg: "110px",
              xl: "120px",
            },
            width: {
              xs: "245px",
              sm: "250px",
              md: "255px",
              lg: "260px",
              xl: "265px",
            },
          }}
          elevation={3}
        >
          <PublishedWithChangesIcon
            sx={{
              marginTop: {
                xs: "6px",
                sm: "7px",
                md: "8px",
                lg: "9px",
                xl: "10px",
              },
              marginLeft: {
                xs: "6px",
                sm: "7px",
                md: "8px",
                lg: "9px",
                xl: "10px",
              },
              fontSize: {
                xs: "1.1rem",
                sm: "1.2rem",
                md: "1.3rem",
                lg: "1.4rem",
                xl: "1.5rem",
              },
            }}
          />
          <Box
            sx={{
              padding: "5px 16px 12px 16px",
              fontSize: {
                xs: "9px",
                sm: "10px",
                md: "11px",
                lg: "12px",
                xl: "13px",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "11px",
                  sm: "12px",
                  md: "13px",
                  lg: "14px",
                  xl: "15px",
                },
                fontWeight: 600,
              }}
            >
              Book with flexibility
            </Typography>
            Easily find flights with no change fees.
          </Box>
        </Paper>
        <Paper
          sx={{
            height: {
              xs: "80px",
              sm: "90px",
              md: "100px",
              lg: "110px",
              xl: "120px",
            },
            width: {
              xs: "245px",
              sm: "250px",
              md: "255px",
              lg: "260px",
              xl: "265px",
            },
          }}
          elevation={3}
        >
          <RecommendIcon
            sx={{
              marginTop: {
                xs: "6px",
                sm: "7px",
                md: "8px",
                lg: "9px",
                xl: "10px",
              },
              marginLeft: {
                xs: "6px",
                sm: "7px",
                md: "8px",
                lg: "9px",
                xl: "10px",
              },
              fontSize: {
                xs: "1.1rem",
                sm: "1.2rem",
                md: "1.3rem",
                lg: "1.4rem",
                xl: "1.5rem",
              },
            }}
          />
          <Box
            sx={{
              padding: "5px 16px 12px 16px",
              fontSize: {
                xs: "9px",
                sm: "10px",
                md: "11px",
                lg: "12px",
                xl: "13px",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "11px",
                  sm: "12px",
                  md: "13px",
                  lg: "14px",
                  xl: "15px",
                },
                fontWeight: 600,
              }}
            >
              Trusted and free
            </Typography>
            We’re completely free to use – no hidden charges or fees.
          </Box>
        </Paper>
      </Stack>
      <Stack mt={{ xs: 6, sm: 7, md: 8, lg: 9, xl: 10 }}>
        <Card sx={{ backgroundColor: "#24292e", color: "white" }}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: 22, sm: 24, md: 26, lg: 28, xl: 30 },
              fontStyle: "italic",
              letterSpacing: 2,
              fontFamily: "monospace",
              padding: 1,
            }}
          >
            Mui Line
          </Typography>
          <CardMedia
            component="img"
            height={{
              xs: "220px",
              sm: "240px",
              md: "260px",
              lg: "280px",
              xl: "300px",
            }}
            image={image}
          />
          <CardActions
            sx={{
              justifyContent: "space-between",
              padding: { xs: 1.2, sm: 1.4, md: 1.6, lg: 1.8, xl: 2 },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                    md: "16px",
                    lg: "18px",
                    xl: "20px",
                  },
                  fontWeight: 600,
                }}
              >
                Mui Line, Authentic Cancun rediscovered
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "8px",
                    sm: "10px",
                    md: "12px",
                    lg: "14px",
                    xl: "16px",
                  },
                }}
              >
                A Mui Line family vacation offers beach fun, kids club and
                international cuisine
              </Typography>
            </Box>
            <Button
              sx={{
                backgroundColor: "#1e88e5",
                color: "white",
                fontSize: { xs: 12, sm: 13, md: 14, lg: 15, xl: 16 },
                textTransform: "capitalize",
                width: { xs: 90, sm: 100, md: 110, lg: 120, xl: 130 },
                height: { xs: 22, sm: 24, md: 26, lg: 28, xl: 30 },
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
