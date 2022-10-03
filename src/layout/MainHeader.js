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

const pageMains = [
  { value: "vé máy bay", icon: <FlightIcon color="info" /> },
  { value: "khách sạn", icon: <HotelIcon sx={{ color: "Highlight" }} /> },
  { value: "đưa đón sân bay", icon: <KingBedIcon sx={{ color: "brown" }} /> },
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
    handleClose();
  };

  const pageHeaders = [
    {
      value: "trang trủ",
      icon: (
        <IconButton onClick={() => handeHome()}>
          <HomeIcon color="info" />
        </IconButton>
      ),
    },
    { value: "đặt chổ của tôi", icon: <ListAltIcon color="info" /> },
    { value: "hộp thư của tôi", icon: <MarkEmailUnreadIcon color="info" /> },
    { value: "đẫ lưu", icon: <TurnedInIcon color="secondary" /> },
    {
      value: "liên hệ với chúng tôi",
      icon: <PhoneEnabledIcon color="error" />,
    },
    { value: "ngoại tệ", icon: <CurrencyExchangeIcon color="success" /> },
    { value: "trợ giúp", icon: <HelpOutlineIcon /> },
    { value: "tải ứng dụng", icon: <DownloadIcon color="warning" /> },
  ];

  const list = () => (
    <Box sx={{ width: 250, zIndex: 100 }}>
      <List>
        {pageHeaders.map((index) => (
          <ListItem key={index.value} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index.icon}</ListItemIcon>
              <ListItemText primary={index.value} />
            </ListItemButton>
          </ListItem>
        ))}
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
              <MenuIcon sx={{ ":hover": { color: "#66bb6a" } }} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white" }}
            >
              Travel Booking
              <FlightTakeoffIcon sx={{ color: "#1e88e5", ml: 0.5 }} />
            </Typography>

            <Button
              variant="body2"
              sx={{
                mr: 2,
                ":hover": { backgroundColor: "#f44336", color: "white" },
              }}
            >
              chuyến bay
            </Button>
            <Button
              variant="body2"
              sx={{
                mr: 2,
                ":hover": { backgroundColor: "#f44336", color: "white" },
              }}
            >
              khách sạn
            </Button>
            <Button
              variant="body2"
              sx={{
                mr: 2,
                ":hover": { backgroundColor: "#f44336", color: "white" },
              }}
            >
              khuyến mãi
            </Button>
            <Button
              variant="body2"
              sx={{
                mr: 2,
                ":hover": { backgroundColor: "#f44336", color: "white" },
              }}
            >
              đơn hàng
            </Button>
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
                  Profile
                </MenuItem>
                <MenuItem onClick={handleBookingList} sx={{ mx: 1 }}>
                  booking
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
