import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  Typography,
  
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import CategoryIcon from "@mui/icons-material/Category";
import ExpandLess from "@mui/icons-material/ExpandLess";
import BlockIcon from "@mui/icons-material/Block";

import NotificationsIcon from "@mui/icons-material/Notifications";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Menu as MenuIcon } from "@mui/icons-material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import StarIcon from "@mui/icons-material/Star";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import { Link } from "react-router-dom";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import RunCircleOutlinedIcon from '@mui/icons-material/RunCircleOutlined';

const Sidebar = ({ onPageChange }) => {
  const [open, setOpen] = React.useState(false);
  const [openCourses, setOpenCourses] = React.useState(false);
  const [openCategory, setOpenCategory] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const [tips, setTips] = React.useState(false);

  const [isExpanded, setIsExpanded] = React.useState(true); 

  const toggleWidth = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleCoursesClick = () => {
    setOpenCourses(!openCourses);
  };

  const handleCategoryClick = () => {
    setOpenCategory(!openCategory);
  };

  const handleClickNotification = () => {
    setNotification(!notification);
  };


  const avatarUrl = "https://picsum.photos/200/300";
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: isExpanded ? "240px" : "70px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isExpanded ? "240px" : "70px",
          boxSizing: "border-box",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          // flexDirection: 'column',
          alignItems: "start",
          padding: "10px",
        }}
      >
        <button onClick={toggleWidth}>
          <MenuIcon />
        </button>
        {isExpanded && (
          <>
            <div className="center">
              <Avatar
                alt="User Avatar"
                src={avatarUrl}
                sx={{ width: 80, height: 80 }}
                style={{ marginBottom: "10px", marginTop: "25px" }}
              />
              <Typography variant="h6">Archika Didi</Typography>
            </div>
          </>
        )}
      </div>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/interest">
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Interest" />
        </ListItem>
        <ListItem button component={Link} to="/blog">
          <ListItemIcon>
            <RssFeedIcon />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

        

        <ListItem onClick={handleClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Setting" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              component={Link}
              to="/setting"
              style={{ paddingLeft: 40 }}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItem>
            {/* Add more sub-items here */}
          </List>
        </Collapse>

        <ListItem button onClick={handleCoursesClick}>
          <ListItemIcon>
            <LocalLibraryIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
          {openCourses ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCourses} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button style={{ paddingLeft: 40 }}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItem>
            <ListItem button style={{ paddingLeft: 40 }}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Subcategory" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleCategoryClick}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Category" />
          {openCategory ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCategory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              style={{ paddingLeft: 40 }}
              component={Link}
              to="/category"
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Main-Category" />
            </ListItem>
            <ListItem button style={{ paddingLeft: 40 }} component={Link}  to="/subcategory">
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Sub-Category" />
            </ListItem>
            {/* Add more sub-items for Category dropdown here */}
          </List>
        </Collapse>
        <ListItem button component={Link} to="/dailytips">
          <ListItemIcon>
            <SettingsInputComponentIcon />
          </ListItemIcon>
          <ListItemText primary="DailyTips" />
        </ListItem>

        <ListItem button onClick={handleClickNotification}>
          <ListItemIcon>
            <BlockIcon />
          </ListItemIcon>
          <ListItemText primary="Block Words" />
          {notification ? <ExpandLess /> : <ExpandMore />}{" "}
          {/* Update 'open' to 'notification' */}
        </ListItem>
        <Collapse in={notification} timeout="auto" unmountOnExit>
          {" "}
          {/* Update 'open' to 'notification' */}
          <List component="div" disablePadding>
            <ListItem
              button
              component={Link}
              to="/blockwords"
              style={{ paddingLeft: 40 }}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItem>
          </List>
        </Collapse>


        <ListItem button component={Link} to="/notification">
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notification" />
        </ListItem>
        	

        <ListItem button component={Link} to="/dailyquiz">
          <ListItemIcon>
            <TipsAndUpdatesIcon />
          </ListItemIcon>
          <ListItemText primary="Daily Quiz" />
        </ListItem>

        <ListItem button component={Link} to="/exercise_or_meditation">
          <ListItemIcon>
            <RunCircleOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Daily Exercise or Meditation" />
        </ListItem>
      </List>

      
      {/* </Box> */}
    </Drawer>
  );
};

export default Sidebar;
