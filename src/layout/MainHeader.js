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
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import DownloadIcon from "@mui/icons-material/Download";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import KingBedIcon from "@mui/icons-material/KingBed";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Search from "../components/Search";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./MainHeader.css";

const pageMains = [
  { value: "VÉ MÁY BAY", icon: <FlightIcon color="info" /> },
  { value: "KHÁCH SẠN", icon: <HotelIcon sx={{ color: "Highlight" }} /> },
  { value: "ĐƯA ĐÓN SÂN BAY", icon: <KingBedIcon sx={{ color: "brown" }} /> },
];

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
        <IconButton onClick={() => handeHome()}>
          <HomeIcon color="info" />
        </IconButton>
      ),
    },
    {
      value: "ĐẶT CHỔ CỦA TÔI",
      icon: (
        <IconButton onClick={handleBookingList}>
          <ListAltIcon color="info" />
        </IconButton>
      ),
    },
    { value: "hỘP THƯ CỦA TÔI", icon: <MarkEmailUnreadIcon color="info" /> },
    { value: "ĐÃ LƯU", icon: <TurnedInIcon color="secondary" /> },
    {
      value: "LIÊN HỆ VỚI CHÚNG TÔI",
      icon: <PhoneEnabledIcon color="error" />,
    },
    { value: "NGOẠI TỆ", icon: <CurrencyExchangeIcon color="success" /> },
    { value: "TRỢ GIÚP", icon: <HelpOutlineIcon /> },
    { value: "TẢI ỨNG DỤNG", icon: <DownloadIcon color="warning" /> },
  ];

  const list = () => (
    <Box sx={{ width: 250, zIndex: 100 }}>
      <List>
        {pageHeaders.map((index) => {
          return (
            <ListItem key={index.value} disablePadding>
              {index.value === "TRANG CHỦ" ? (
                <ListItemButton onClick={() => handeHome()}>
                  <ListItemIcon>{index.icon}</ListItemIcon>
                  <ListItemText primary={index.value} />
                </ListItemButton>
              ) : index.value === "ĐẶT CHỔ CỦA TÔI" ? (
                <ListItemButton onClick={handleBookingList}>
                  <ListItemIcon>{index.icon}</ListItemIcon>
                  <ListItemText primary={index.value} />
                </ListItemButton>
              ) : (
                <ListItemButton>
                  <ListItemIcon>{index.icon}</ListItemIcon>
                  <ListItemText primary={index.value} />
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
          paddingTop: "100px",
        }}
      >
        <Drawer anchor="left" open={toggle} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
        <AppBar
          variant="elevation"
          style={{ backgroundColor: "rgb(35,36,36)", color: "white" }}
        >
          <Toolbar sx={{ mr: 3, ml: 3 }}>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon sx={{ ":hover": { color: "#f44336" } }} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white" }}
            >
              Travel Booking
              <FlightTakeoffIcon sx={{ color: "#1e88e5", ml: 0.5 }} />
            </Typography>

            <Box
              component="button"
              variant="body2"
              className="btn-appbar"
              sx={{
                mr: 2,
              }}
            >
              <span>chuyến bay</span>
            </Box>
            <Box
              component="button"
              variant="body2"
              className="btn-appbar"
              sx={{
                mr: 2,
              }}
            >
              <span>Khách Sạn</span>
            </Box>
            <Box
              component="button"
              variant="body2"
              className="btn-appbar"
              sx={{
                mr: 2,
              }}
            >
              <span> Khuyến mãi</span>
            </Box>
            <Box
              component="button"
              className="btn-appbar"
              sx={{
                mr: 2,
              }}
            >
              <span>Đơn Hàng</span>
            </Box>
            <Box>
              <Avatar
                onClick={handleMenu}
                src={user?.avatarUrl}
                alt={user?.name}
                sx={{
                  width: 32,
                  height: 32,
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
              >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                  <Typography variant="subtitle2" noWrap>
                    {user?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    {user?.email}
                  </Typography>
                </Box>
                <Divider sx={{ borderStyle: "dashed" }} />
                <MenuItem onClick={handleProfile} sx={{ mx: 1 }}>
                  THÔNG TIN CÁ NHÂN
                </MenuItem>
                <Divider sx={{ borderStyle: "dashed" }} />
                <MenuItem onClick={handleClick} sx={{ m: 1 }}>
                  Logout
                </MenuItem>
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
