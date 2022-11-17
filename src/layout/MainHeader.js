import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Search from "../components/Search";
import "./MainHeader.css";

const pageMains = [];

function MainHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [toggle, setToggle] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { chairId } = useParams();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    setToggle(open);
  };

  const handeHome = async () => {
    navigate("/");
    setToggle(false);
  };
  const handleProfile = async () => {
    navigate("/profile");
    handleClose();
  };
  const handleBookingList = async () => {
    navigate(`/listBooking`);
  };

  const pageHeaders = [
    {
      value: "TRANG CHỦ",
      icon: (
        <IconButton
          onClick={() => handeHome()}
          sx={{
            padding: {
              xs: "4px",
              sm: "5px",
              md: "6px",
              lg: "7px",
              xl: "8px",
            },
          }}
        >
          <HomeIcon
            color="info"
            sx={{
              fontSize: {
                xs: "1.1rem",
                sm: "1.2rem",
                md: "1.3rem",
                lg: "1.4rem",
                xl: "1.5rem",
              },
            }}
          />
        </IconButton>
      ),
    },
    {
      value: "ĐẶT CHỔ CỦA TÔI",
      icon: (
        <IconButton
          onClick={handleBookingList}
          sx={{
            padding: {
              xs: "4px",
              sm: "5px",
              md: "6px",
              lg: "7px",
              xl: "8px",
            },
          }}
        >
          <ListAltIcon
            color="info"
            sx={{
              fontSize: {
                xs: "1.1rem",
                sm: "1.2rem",
                md: "1.3rem",
                lg: "1.4rem",
                xl: "1.5rem",
              },
            }}
          />
        </IconButton>
      ),
    },
  ];

  const list = () => (
    <Box
      sx={{
        width: { xs: 150, sm: 180, md: 210, lg: 250, xl: 300 },
        zIndex: 100,
      }}
    >
      <List>
        {pageHeaders.map((index) => {
          return (
            <ListItem key={index.value} disablePadding>
              {index.value === "TRANG CHỦ" ? (
                <ListItemButton
                  onClick={() => handeHome()}
                  sx={{
                    padding: {
                      xs: "4px",
                      sm: "5px",
                      md: "6px",
                      lg: "7px",
                      xl: "8px",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: { xs: 0.6, sm: 0.7, md: 0.8, lg: 0.9, xl: 1 },
                    }}
                  >
                    {index.icon}
                  </ListItemIcon>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.8rem",
                        md: "0.85rem",
                        lg: "0.9rem",
                        xl: "1rem",
                      },
                    }}
                  >
                    {index.value}
                  </Typography>
                </ListItemButton>
              ) : index.value === "ĐẶT CHỔ CỦA TÔI" ? (
                <ListItemButton
                  onClick={handleBookingList}
                  sx={{
                    padding: {
                      xs: "4px",
                      sm: "5px",
                      md: "6px",
                      lg: "7px",
                      xl: "8px",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: { xs: 0.6, sm: 0.7, md: 0.8, lg: 0.9, xl: 1 },
                    }}
                  >
                    {index.icon}
                  </ListItemIcon>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.8rem",
                        md: "0.85rem",
                        lg: "0.9rem",
                        xl: "1rem",
                      },
                    }}
                  >
                    {index.value}
                  </Typography>
                </ListItemButton>
              ) : (
                <ListItemButton
                  sx={{
                    padding: {
                      xs: "4px",
                      sm: "5px",
                      md: "6px",
                      lg: "7px",
                      xl: "8px",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: { xs: 0.6, sm: 0.7, md: 0.8, lg: 0.9, xl: 1 },
                    }}
                  >
                    {index.icon}
                  </ListItemIcon>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.8rem",
                        md: "0.85rem",
                        lg: "0.9rem",
                        xl: "1rem",
                      },
                    }}
                  >
                    {index.value}
                  </Typography>
                </ListItemButton>
              )}
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {pageMains.map((index) => (
          <ListItem key={index.value} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index.icon}</ListItemIcon>
              <ListItemText primary={index.value} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleClick = async () => {
    await logout(() => {
      navigate("/login");
    });
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 0.5,
          top: 0,
          position: "sticky",
          zIndex: 99,
          paddingTop: {
            xs: "50px",
            sm: "70px",
            md: "80px",
            lg: "90px",
            xl: "100px",
          },
        }}
      >
        <Drawer anchor="left" open={toggle} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
        <AppBar
          variant="elevation"
          sx={{
            backgroundColor: "rgb(35,36,36)",
            color: "white",
            height: { xs: 45, sm: 40, md: 55, lg: 64, xl: 68 },
          }}
        >
          <Toolbar
            sx={{
              mr: { xs: 0.2, sm: 0.5, md: 0.8, lg: 0.9, xl: 1 },
              ml: { xs: 0.2, sm: 0.5, md: 0.8, lg: 0.9, xl: 1 },
              paddingLeft: {
                xs: "2px",
                sm: "6px",
                md: "16px",
                lg: "20px",
                xl: "24px",
              },
              paddingRight: {
                xs: "2px",
                sm: "6px",
                md: "16px",
                lg: "20px",
                xl: "24px",
              },
              minHeight: { xs: 40, sm: 40, md: 55, lg: 64, xl: 68 },
            }}
          >
            <IconButton
              size="small"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: { xs: 0, sm: 1, md: 1.6, lg: 1.8, xl: 2 } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon
                sx={{
                  ":hover": { color: "#f44336" },
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.35rem",
                    md: "1.4rem",
                    lg: "1.45rem",
                    xl: "1.5rem",
                  },
                }}
              />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: "white",
                fontSize: {
                  xs: "0.9rem",
                  sm: "1.1rem",
                  md: "1.15rem",
                  lg: "1.2rem",
                  xl: "1.25rem",
                },
              }}
            >
              Travel Booking
              <FlightTakeoffIcon
                sx={{
                  color: "#1e88e5",
                  ml: { xs: 0.1, sm: 0.2, md: 0.3, lg: 0.4, xl: 0.5 },
                  fontSize: {
                    xs: "1rem",
                    sm: "1.2rem",
                    md: "1.3rem",
                    lg: "1.4rem",
                    xl: "1.5rem",
                  },
                }}
              />
            </Typography>

            <Box
              component="button"
              variant="body2"
              className="btn-appbar"
              sx={{
                mr: { xs: 1, sm: 1.2, md: 1.6, lg: 1.8, xl: 2 },
              }}
              onClick={handleBookingList}
            >
              <span>đặt chổ của tôi</span>
            </Box>
            <Box>
              <Avatar
                onClick={handleMenu}
                src={user?.avatarUrl}
                alt={user?.name}
                sx={{
                  width: { xs: 25, sm: 26, md: 28, lg: 30, xl: 32 },
                  height: { xs: 25, sm: 26, md: 28, lg: 30, xl: 32 },
                  cursor: "pointer",
                  ":hover": { backgroundColor: "#1e88e5" },
                }}
              />
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  top: { xs: -8, sm: -4, md: -2, lg: 0, xl: 0 },
                  left: { xs: 10, sm: 4, md: 2, lg: 0, xl: 0 },
                }}
              >
                <Box
                  sx={{
                    my: { xs: 1.1, sm: 1.2, md: 1.3, lg: 1.4, xl: 1.5 },
                    px: { xs: 1.5, sm: 1.7, md: 1.9, lg: 2.2, xl: 2.5 },
                  }}
                >
                  <Typography
                    noWrap
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
                    {user?.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: {
                        xs: "0.7rem",
                        sm: "0.75rem",
                        md: "0.8rem",
                        lg: "0.85rem",
                        xl: "0.9rem",
                      },
                    }}
                    noWrap
                  >
                    {user?.email}
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    borderStyle: "dashed",
                    mr: {
                      xs: "4px",
                      sm: "5px",
                      md: "6px",
                      lg: "7px",
                      xl: "8px",
                    },
                  }}
                />
                <Typography
                  onClick={handleProfile}
                  sx={{
                    mx: { xs: 0.6, sm: 0.7, md: 0.8, lg: 0.9, xl: 1 },
                    padding: {
                      xs: "2px 16px",
                      sm: "6px 16px",
                      md: "6px 16px",
                      lg: "6px 16px",
                      xl: "6px 16px",
                    },
                    fontSize: {
                      xs: "0.6rem",
                      sm: "0.7rem",
                      md: "0.8rem",
                      lg: "0.9rem",
                      xl: "1rem",
                    },
                    cursor: "pointer",
                    ":hover": {
                      opacity: 0.5,
                    },
                  }}
                >
                  THÔNG TIN CÁ NHÂN
                </Typography>
                <Divider
                  sx={{
                    borderStyle: "dashed",

                    mt: {
                      xs: "4px",
                      sm: "5px",
                      md: "6px",
                      lg: "7px",
                      xl: "8px",
                    },
                  }}
                />
                <Typography
                  onClick={handleClick}
                  sx={{
                    mx: { xs: 0.6, sm: 0.7, md: 0.8, lg: 0.9, xl: 1 },
                    padding: {
                      xs: "2px 16px",
                      sm: "3px 16px",
                      md: "4px 16px",
                      lg: "5px  16px",
                      xl: "6px 16px",
                    },
                    fontSize: {
                      xs: "0.6rem",
                      sm: "0.7rem",
                      md: "0.8rem",
                      lg: "0.9rem",
                      xl: "1rem",
                    },
                    cursor: "pointer",
                    ":hover": {
                      opacity: 0.5,
                    },
                  }}
                >
                  Đăng Xuất
                </Typography>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {location.pathname !== `/credit/${chairId}` &&
      location.pathname !== `/booking/${chairId}` &&
      location.pathname !== `/profile` &&
      location.pathname !== `/listBooking` ? (
        <Search />
      ) : (
        ""
      )}
    </>
  );
}

export default MainHeader;
