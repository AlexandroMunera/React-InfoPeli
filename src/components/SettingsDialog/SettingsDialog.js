import {
  Dialog,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  AccountCircle as AccountCircleIcon,
  Close as CloseIcon,
  Link as LinkIcon,
  Palette as PaletteIcon,
  Security as SecurityIcon,
} from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import SwipeableViews from "react-swipeable-views";
import "simplebar/src/simplebar.css";
import AccountTab from "../AccountTab";
import AppearanceTab from "../AppearanceTab";
import LinksTab from "../LinksTab";
import SecurityTab from "../SecurityTab";

const styles = (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  tabs: {
    display: "initial",
  },
});

const initialState = {
  selectedTab: 0,
};

class SettingsDialog extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  handleExited = () => {
    this.setState(initialState);
  };

  handleTabChange = (event, value) => {
    this.setState({
      selectedTab: value,
    });
  };

  handleIndexChange = (index) => {
    this.setState({
      selectedTab: index,
    });
  };

  render() {
    //Traductor
    const { t } = this.props;
    const tabs = [
      {
        key: "account",
        icon: <AccountCircleIcon />,
        label: t("Cuenta"),
      },

      {
        key: "appearance",
        icon: <PaletteIcon />,
        label: t("Apariencia"),
      },

      {
        key: "links",
        icon: <LinkIcon />,
        label: t("Accesos"),
      },

      {
        key: "security",
        icon: <SecurityIcon />,
        label: t("Seguridad"),
      },
    ];

    // Styling
    const { classes } = this.props;

    // Dialog Properties
    const { dialogProps } = this.props;

    // Custom Properties
    const { user, userData, theme } = this.props;

    // Custom Functions
    const { openSnackbar } = this.props;

    // Custom Functions
    const { onDeleteAccountClick } = this.props;

    const { selectedTab } = this.state;

    return (
      <Dialog {...dialogProps} onExited={this.handleExited}>
        <DialogTitle disableTypography>
          <Typography variant="h6">{t("Configuración")}</Typography>

          <Tooltip title={t("cerrar")}>
            <IconButton
              className={classes.closeButton}
              onClick={dialogProps.onClose}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>

        <Tabs
          classes={{ root: classes.tabs }}
          style={{ overflow: "initial", minHeight: "initial" }}
          indicatorColor="primary"
          textColor="primary"
          value={selectedTab}
          variant="fullWidth"
          onChange={this.handleTabChange}
        >
          {tabs.map((tab) => {
            return <Tab key={tab.key} icon={tab.icon} label={tab.label} />;
          })}
        </Tabs>

        <SwipeableViews
          index={selectedTab}
          onChangeIndex={this.handleIndexChange}
        >
          <AccountTab
            user={user}
            userData={userData}
            openSnackbar={openSnackbar}
            onDeleteAccountClick={onDeleteAccountClick}
          />

          <AppearanceTab theme={theme} openSnackbar={openSnackbar} />

          <LinksTab theme={theme} openSnackbar={openSnackbar} />

          <SecurityTab
            user={user}
            userData={userData}
            openSnackbar={openSnackbar}
          />
        </SwipeableViews>
      </Dialog>
    );
  }
}

SettingsDialog.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired,

  // Dialog Properties
  dialogProps: PropTypes.object.isRequired,

  // Custom Properties
  theme: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userData: PropTypes.object,

  // Custom Functions
  openSnackbar: PropTypes.func.isRequired,

  // Custom Events
  onDeleteAccountClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(withTranslation()(SettingsDialog));
