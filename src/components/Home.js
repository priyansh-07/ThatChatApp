import React, { useEffect, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChatWindow from './ChatWindow';
import AuthContextProvider, { AuthContext } from '../contexts/AuthContext';

import WhatshotIcon from '@material-ui/icons/Whatshot';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

import { db, fbauth } from '../config/firebase';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  minHeight: 0,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  menuIcon: {
    color: theme.palette.background.paper,
  },
  drawerHeader: {
    padding: '2em',
    paddingBottom: '1em',
  },
  drawerDisplayName: {
    textTransform: 'capitalize',
    fontSize: '40px',
    fontFamily: 'Poiret One, cursive',
  },
  drawerEmail: {
    fontFamily: 'Poiret One, cursive',
    fontSize: '1vw',
    [theme.breakpoints.down('xs')]: {
      fontSize: '4vw',
    },
  },
  drawerSectionHeader: {
    fontWeight: 'bold',
    fontSize: '1.5em',
    paddingLeft: '1em',
    paddingTop: '1em',
    fontFamily: 'Poiret One, cursive',
  },
  appBarTitle: {
    fontFamily: 'Poiret One, cursive',
    color: theme.palette.background.paper,
    fontWeight: 'bolder',
    fontSize: '2em',
  },
}));

const customUseStyles = makeStyles( theme => ({
  root: {
    justifyContent: 'space-between',
  },
  simpleMenuButton: {
    color: theme.palette.background.paper,
    paddingRight: 0,
  },
  accountCircleIcon: {
    marginRight: '0.5em',
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  }
}));

function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deviceWidth, setDeviceWidth] = useState(null);
  const simpleMenuClasses = customUseStyles();
  
  useEffect(() => {
    setDeviceWidth(window.innerWidth);
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    fbauth.signOut();
    props.handleLogout();
  }

  return (
    <div>
      <Button
        variant='outlined'
        color='primary'
        className={simpleMenuClasses.simpleMenuButton}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}>
          <AccountCircleIcon className={simpleMenuClasses.accountCircleIcon} />
          {deviceWidth < 600 ? null : props.displayName}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

function Home(props) {
  const { window } = props;
  const classes = useStyles();
  const customClasses = customUseStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [rooms, setRooms] = useState([])
  const [currentRoom, setCurrentRoom] = useState(localStorage.getItem('localRoom'))
  const [displayName, setDisplayName] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');

  useEffect(() => {
    db.collection('rooms')
      .onSnapshot(querySnapshot => {
        setRooms(querySnapshot.docs.map(doc => doc.data().roomName))
      })
  }, [])

  useEffect(() => {
    if (fbauth.currentUser !== null) {
      setDisplayName(fbauth.currentUser.displayName);
      setCurrentEmail(fbauth.currentUser.email);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.drawerHeader}>
        <span className={classes.drawerDisplayName}>{displayName}</span>
        <span className={classes.drawerEmail}> {currentEmail} </span>
      </div>
      <Divider />
      <div className={classes.drawerSectionHeader}>
        <span>Rooms</span>
      </div>
      <List>
        {rooms.map((text, index) => (
          <ListItem button key={text} onClick={() => {
            setCurrentRoom(text);
            localStorage.setItem('localRoom', text);
            if (mobileOpen)
              handleDrawerToggle();
          }}>
            <ListItemIcon>{index % 2 === 0 ? <WhatshotIcon /> : <AccountTreeIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={customClasses.root}>
          <IconButton
            color='inherit'
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <Typography className={classes.appBarTitle} variant="h6" noWrap>
            {currentRoom}
          </Typography>
          <AuthContext.Consumer>{context => {
            return (<SimpleMenu handleLogout={context.toggleAuth} displayName={displayName} />)
          }}
          </AuthContext.Consumer>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AuthContextProvider>
          <AuthContext.Consumer>{context => {
            return (
              <ChatWindow userId={displayName} currentRoom={currentRoom} />
            );
          }}
          </AuthContext.Consumer>
        </AuthContextProvider>
      </main>
    </div>
  );
}

// ResponsiveDrawer.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// }; 

export default Home;
