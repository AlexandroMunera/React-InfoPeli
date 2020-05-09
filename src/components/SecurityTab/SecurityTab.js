import React, { Component } from "react";

import PropTypes from "prop-types";

import validate from "validate.js";
import moment from "moment";

import {
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Hidden,
  TextField,
  Tooltip,
  IconButton,
} from "@material-ui/core";

import { Lock as LockIcon, Edit as EditIcon } from "@material-ui/icons";

import constraints from "../../constraints";
import authentication from "../../services/authentication";

const initialState = {
  showingField: "",
  password: "",
  passwordConfirmation: "",
  performingAction: false,
  errors: null,
};

class SecurityTab extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  showField = (fieldId) => {
    if (!fieldId) {
      return;
    }

    this.setState({
      showingField: fieldId,
    });
  };

  hideFields = (callback) => {
    this.setState(
      {
        showingField: "",
        password: "",
        passwordConfirmation: "",
        errors: null,
      },
      () => {
        if (callback && typeof callback === "function") {
          callback();
        }
      }
    );
  };

  changeField = (fieldId) => {
    switch (fieldId) {
      case "password":
        const { password } = this.state;

        const errors = validate(
          {
            password: password,
          },
          {
            password: constraints.password,
          }
        );

        if (errors) {
          this.setState({
            errors: errors,
          });

          return;
        }

        this.setState(
          {
            errors: null,
          },
          () => {
            this.showField("password-confirmation");
          }
        );
        return;

      case "password-confirmation":
        this.changePassword();
        return;

      default:
        return;
    }
  };

  changePassword = () => {
    const { password, passwordConfirmation } = this.state;

    const errors = validate(
      {
        password: password,
        passwordConfirmation: passwordConfirmation,
      },
      {
        password: constraints.password,
        passwordConfirmation: constraints.passwordConfirmation,
      }
    );

    if (errors) {
      this.setState({
        errors: errors,
      });

      return;
    }

    this.setState(
      {
        errors: null,
      },
      () => {
        this.setState(
          {
            performingAction: true,
          },
          () => {
            authentication
              .changePassword(password)
              .then(() => {
                this.hideFields(() => {
                  this.props.openSnackbar("Changed password");
                });
              })
              .catch((reason) => {
                const code = reason.code;
                const message = reason.message;

                switch (code) {
                  default:
                    this.props.openSnackbar(message);
                    return;
                }
              })
              .finally(() => {
                this.setState({
                  performingAction: false,
                });
              });
          }
        );
      }
    );
  };

  handleKeyDown = (event, fieldId) => {
    if (!event || !fieldId) {
      return;
    }

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const key = event.key;

    if (!key) {
      return;
    }

    if (key === "Escape") {
      this.hideFields();
    } else if (key === "Enter") {
      this.changeField(fieldId);
    }
  };

  handlePasswordChange = (event) => {
    if (!event) {
      return;
    }

    const password = event.target.value;

    this.setState({
      password: password,
    });
  };

  handlePasswordConfirmationChange = (event) => {
    if (!event) {
      return;
    }

    const passwordConfirmation = event.target.value;

    this.setState({
      passwordConfirmation: passwordConfirmation,
    });
  };

  render() {
    // Properties
    const { userData } = this.props;

    const {
      showingField,
      password,
      passwordConfirmation,
      performingAction,
      errors,
    } = this.state;

    const hasChangedPassword = userData && userData.lastPasswordChange;

    return (
      <DialogContent>
        <List disablePadding>
          <ListItem>
            <Hidden xsDown>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
            </Hidden>

            {showingField === "password" && (
              <TextField
                autoComplete="new-password"
                autoFocus
                disabled={performingAction}
                error={!!(errors && errors.password)}
                fullWidth
                helperText={
                  errors && errors.password
                    ? errors.password[0]
                    : "Presiona enter para cambiar la contraseña."
                }
                label="Contraseña"
                required
                type="password"
                value={password}
                variant="filled"
                InputLabelProps={{ required: false }}
                onBlur={this.hideFields}
                onKeyDown={(event) => this.handleKeyDown(event, "password")}
                onChange={this.handlePasswordChange}
              />
            )}

            {showingField === "password-confirmation" && (
              <TextField
                autoComplete="new-password"
                autoFocus
                disabled={performingAction}
                error={!!(errors && errors.passwordConfirmation)}
                fullWidth
                helperText={
                  errors && errors.passwordConfirmation
                    ? errors.passwordConfirmation[0]
                    : "Presiona enter para cambiar la contraseña."
                }
                label="Confirmación de contraseña."
                required
                type="password"
                value={passwordConfirmation}
                variant="filled"
                InputLabelProps={{ required: false }}
                onBlur={this.hideFields}
                onKeyDown={(event) =>
                  this.handleKeyDown(event, "password-confirmation")
                }
                onChange={this.handlePasswordConfirmationChange}
              />
            )}

            {showingField !== "password" &&
              showingField !== "password-confirmation" && (
                <>
                  <Hidden xsDown>
                    <ListItemText
                      primary="Contraseña"
                      secondary={
                        hasChangedPassword
                          ? `Ultimo cambio ${moment(
                              userData.lastPasswordChange.toDate()
                            ).format("LL")}`
                          : "Nunca modificada"
                      }
                    />
                  </Hidden>

                  <Hidden smUp>
                    <ListItemText
                      primary="Contraseña"
                      secondary={
                        hasChangedPassword
                          ? `Ultimo cambio ${moment(
                              userData.lastPasswordChange.toDate()
                            ).format("ll")}`
                          : "Nunca modificada"
                      }
                    />
                  </Hidden>

                  <ListItemSecondaryAction>
                    <Tooltip title="Cambiar">
                      <div>
                        <IconButton
                          disabled={performingAction}
                          onClick={() => this.showField("password")}
                        >
                          <EditIcon />
                        </IconButton>
                      </div>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </>
              )}
          </ListItem>
        </List>
      </DialogContent>
    );
  }
}

SecurityTab.propTypes = {
  // Properties
  userData: PropTypes.object,

  // Functions
  openSnackbar: PropTypes.func.isRequired,
};

export default SecurityTab;
