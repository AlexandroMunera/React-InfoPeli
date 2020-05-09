import { AppBar, Button, ButtonGroup, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, SwipeableDrawer, Toolbar, Typography } from "@material-ui/core";
import { fade, withStyles } from "@material-ui/core/styles";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import MenuIcon from "@material-ui/icons/Menu";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import apiMovies from "../../services/apiMovies";
import Search from "../Search/Search";
import UserAvatar from "../UserAvatar";

class Bar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: {
        anchorEl: null,
      },
      generos: [],
      mobileOpen: false,
      selectedGenreId: 1
    };
  }  

  openMenu = (event) => {
    const anchorEl = event.currentTarget;

    this.setState({
      menu: {
        anchorEl,
      },
    });
  };

  closeMenu = () => {
    this.setState({
      menu: {
        anchorEl: null,
      },
    });
  };

  handleDrawerToggle = () => {

    this.setState({
      mobileOpen: this.state.mobileOpen ? false : true
    });
  };
  
  _handleClickLogo =() => {
    // loadingValue(true);
    this.props.history.push(`/peliculas/`)
  }

  _handleChangeGenre(event, idGenre, nameGenre) {
    
    // loadingValue(true); 
    
    this.setState({
      mobileOpen: this.state.mobileOpen ? this.handleDrawerToggle() : this.state.mobileOpen,
      selectedGenreId: idGenre
    });

    this.props.history.push(`/peliculas/${nameGenre}/1`)
  }

  async componentDidMount() {

    if(!this.props.genresData) {

      let res = await apiMovies.getGenres();
      this.setState({
        generos: res.genres
      })
      
    }else{
      this.setState({
        generos: this.props.genresData
      })
    }
    
    
  }
  

  render() {

    const { classes,theme } = this.props;
    // Properties
    const { performingAction, user, userData
      // , roles 
    } = this.props;
    
    
    // Events
    const {
      // onAboutClick,
      onSettingsClick,
      onSignOutClick,
      onSignUpClick,
      onSignInClick,
    } = this.props;

    const { menu,selectedGenreId } = this.state;

    const menuItems = [
      // {
      //   name: "About",
      //   onClick: onAboutClick,
      // },
      // {
      //   name: "Perfil",
      //   to: user ? `/user/${user.uid}` : null,
      // },
      {
        name: "Cuenta",
        onClick: onSettingsClick,
      },
      {
        name: "Salir",
        divide: true,
        onClick: onSignOutClick,
      },
    ];

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>        
          {this.state.generos.map((g) => (
            <ListItem
              button
              key={g.id}
              selected={selectedGenreId === g.id}
              onClick={(event) => this._handleChangeGenre(event, g.id, g.name)}
            >
              <ListItemIcon>
                {g.id % 2 === 0 ? <MovieFilterIcon /> : <LocalMoviesIcon />}
              </ListItemIcon>
              <ListItemText primary={g.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    

    return (
      <>
      <AppBar className={classes.appBar} color="primary" position="fixed">
        <Toolbar>

        <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit" 
          onClick={this._handleClickLogo}
          >
            <MovieFilterIcon fontSize="large" />
          </IconButton>

          {/* <Box display="flex" flexGrow={1}> */}
            <Typography className={classes.title} color="inherit" variant="h6" noWrap>
              {process.env.REACT_APP_TITLE}
            </Typography>
          {/* </Box> */}
          
          <Search />

          {user && (
            <>
              {/* {roles.includes("admin") && (
                <Box mr={1}>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/admin"
                    variant="outlined"
                  >
                    Admin
                  </Button>
                </Box>
              )} */}

              <IconButton
                color="inherit"
                disabled={performingAction}
                onClick={this.openMenu}
              >
                <UserAvatar user={Object.assign(user, userData)} />
              </IconButton>

              <Menu
                anchorEl={menu.anchorEl}
                open={Boolean(menu.anchorEl)}
                onClose={this.closeMenu}
              >
                {menuItems.map((menuItem, index) => {
                  if (
                    menuItem.hasOwnProperty("condition") &&
                    !menuItem.condition
                  ) {
                    return null;
                  }

                  let component = null;

                  if (menuItem.to) {
                    component = (
                      <MenuItem
                        key={index}
                        component={Link}
                        to={menuItem.to}
                        onClick={this.closeMenu}
                      >
                        {menuItem.name}
                      </MenuItem>
                    );
                  } else {
                    component = (
                      <MenuItem
                        key={index}
                        onClick={() => {
                          this.closeMenu();

                          menuItem.onClick();
                        }}
                      >
                        {menuItem.name}
                      </MenuItem>
                    );
                  }

                  if (menuItem.divide) {
                    return (
                      <span key={index}>
                        <Divider />

                        {component}
                      </span>
                    );
                  }

                  return component;
                })}
              </Menu>
            </>
          )}

          {!user && (
            <ButtonGroup
              size="small"
              color="inherit"
              disabled={performingAction}
              variant="outlined"
            >
              <Button onClick={onSignUpClick}>Registro</Button>
              <Button onClick={onSignInClick}>Entrar</Button>
            </ButtonGroup>
          )}

          
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <SwipeableDrawer
          container={this.props.container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={this.state.mobileOpen}
          onOpen={this.handleDrawerToggle}
          onClose={this.handleDrawerToggle}
        classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </SwipeableDrawer>
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
    </>
    );
  }
}

Bar.defaultProps = {
  performingAction: false,
};

Bar.propTypes = {
  // Properties
  performingAction: PropTypes.bool.isRequired,
  user: PropTypes.object,
  userData: PropTypes.object,
  genresData: PropTypes.array,

  // Events
  onAboutClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
};

const drawerWidth = 240;

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 3,
    textAlign: "left",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    flexGrow: "2",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    // pointerEvents: 'none',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "85%",
    justifyContent: "left",
  },
  inputInput: {
    textAlign: "left",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    paddingLeft: `${theme.spacing(2)}px`,
    transition: theme.transitions.create("width"),
    // width: '100%',
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  }, // necessary for content to be below app bar
  drawerPaper: {
    width: drawerWidth,
  },
});

export default withStyles(styles,{ withTheme: true })(withRouter(Bar));
