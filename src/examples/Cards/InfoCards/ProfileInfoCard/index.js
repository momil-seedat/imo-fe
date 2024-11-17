import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import the profile icon from Material-UI Icons

function ProfileInfoCard({ title, info, social, action, shadow }) {
  const { userName, mobile, email, location, created, lastUpdated,role } = info;

  return (
    <Card elevation={shadow ? 3 : 0}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <IconButton component={Link} to={action.route} color="primary">
            <Tooltip title={action.tooltip}>
              <EditIcon />
            </Tooltip>
          </IconButton>
        </Box>
        <Divider />
<Box sx={{ display: 'flex', flexDirection:'column',  justifyContent: 'center', alignItems: 'flex-start' }}>
          <Avatar sx={{ width: 100, height: 100 ,justifyContent:'center',alignItems:'center'}} >
            <AccountCircleIcon style={{ width: 100, height: 100, color: "white"}} /> {/* Use the AccountCircleIcon as the profile icon */}
          </Avatar>
          <Box >
            <Typography variant="h4">{userName}</Typography>
            <Typography variant="subtitle1">({role})</Typography>
            
            <Typography variant="h6" color="textSecondary">
              {mobile}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {email}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {location}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Created: {created}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Last Updated: {lastUpdated}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mt: 2, mb: 2 }} />

      </CardContent>
    </Card>
  );
}

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    lastUpdated: PropTypes.string.isRequired,
  }).isRequired,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    })
  ).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
