import { Button, CssBaseline, Snackbar } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";
import readingTime from "reading-time";
import { auth, firestore } from "../../firebase";
import apiMovies from "../../services/apiMovies";
import appearance from "../../services/appearance";
import authentication from "../../services/authentication";
import Bar from "../Bar";
import DialogHost from "../DialogHost";
import ErrorBoundary from "../ErrorBoundary";
import LaunchScreen from "../LaunchScreen";
import Router from "../Router";
import UserWelcome from "../UserWelcome/UserWelcome";
import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";

const initialState = {
  ready: false,
  performingAction: false,
  theme: appearance.defaultTheme,
  user: null,
  userData: null,
  genresData: null,
  roles: [],

  aboutDialog: {
    open: false,
  },

  signUpDialog: {
    open: false,
  },

  signInDialog: {
    open: false,
  },

  settingsDialog: {
    open: false,
  },

  deleteAccountDialog: {
    open: false,
  },

  signOutDialog: {
    open: false,
  },

  userWelcomeDialog: {
    open: localStorage.getItem("showUserWelcome") === null ? true : false,
  },

  snackbar: {
    autoHideDuration: 0,
    message: "",
    open: false,
  },
};

class App extends Component {
  constructor(props) {
    
    super(props);

    this.state = initialState;

    const isFirstVisit = localStorage.getItem("showUserWelcome");
    
    if (isFirstVisit === null) {
      this.setState({
        userWelcomeDialog: {
          open: true,
        },
      });
      localStorage.setItem("showUserWelcome", true);
    }
  }

  resetState = (callback) => {
    this.setState(
      {
        ready: true,
        theme: appearance.defaultTheme,
        user: null,
        userData: null,
        genresData: null,
        roles: [],
      },
      callback
    );
  };

  setTheme = (theme, callback) => {
    if (!theme) {
      this.setState(
        {
          theme: appearance.defaultTheme,
        },
        callback
      );

      return;
    }

    this.setState(
      {
        theme: appearance.createTheme(theme),
      },
      callback
    );
  };

  openDialog = (dialogId, callback) => {
    const dialog = this.state[dialogId];

    if (!dialog || dialog.open === undefined || null) {
      return;
    }

    dialog.open = true;

    this.setState({ dialog }, callback);
  };

  closeDialog = (dialogId, callback) => {
    const dialog = this.state[dialogId];

    if (!dialog || dialog.open === undefined || null) {
      return;
    }

    dialog.open = false;

    this.setState({ dialog }, callback);
  };

  closeAllDialogs = (callback) => {
    this.setState(
      {
        aboutDialog: {
          open: false,
        },

        signUpDialog: {
          open: false,
        },

        signInDialog: {
          open: false,
        },

        settingsDialog: {
          open: false,
        },

        deleteAccountDialog: {
          open: false,
        },

        signOutDialog: {
          open: false,
        },
      },
      callback
    );
  };

  deleteAccount = () => {
    this.setState(
      {
        performingAction: true,
      },
      () => {
        authentication
          .deleteAccount()
          .then(() => {
            this.closeAllDialogs(() => {
              this.openSnackbar("Deleted account");
            });
          })
          .catch((reason) => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              default:
                this.openSnackbar(message);
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
  };

  signOut = () => {
    this.setState(
      {
        performingAction: true,
      },
      () => {
        authentication
          .signOut()
          .then(() => {
            this.closeAllDialogs(() => {
              this.openSnackbar("Salir");
            });
          })
          .catch((reason) => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              default:
                this.openSnackbar(message);
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
  };

  openSnackbar = (message, autoHideDuration = 2, callback) => {
    this.setState(
      {
        snackbar: {
          autoHideDuration: readingTime(message).time * autoHideDuration,
          message,
          open: true,
        },
      },
      () => {
        if (callback && typeof callback === "function") {
          callback();
        }
      }
    );
  };

  closeSnackbar = (clearMessage = false) => {
    const { snackbar } = this.state;

    this.setState({
      snackbar: {
        message: clearMessage ? "" : snackbar.message,
        open: false,
      },
    });
  };

  handleClickDialogUserWelcome = (value) => {
    this.setState({
      userWelcomeDialog: {
        open: value,
      },
    });
  };

  openDialogUserWelcome = () => {
    this.setState({
      userWelcomeDialog: {
        open: true,
      },
    });
  };

  render() {
    const {
      ready,
      performingAction,
      theme,
      user,
      userData,
      genresData,
      roles,
    } = this.state;

    const {
      aboutDialog,
      signUpDialog,
      signInDialog,
      settingsDialog,
      deleteAccountDialog,
      signOutDialog,
      userWelcomeDialog,
    } = this.state;

    const { snackbar } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <ErrorBoundary>
          {!ready && <LaunchScreen />}

          {ready && (

              <div style={{ display: "flex", textAlign: "center" }}>
              <Router
                user={user}
                roles={roles}
                bar={
                  <Bar
                    performingAction={performingAction}
                    theme={theme}
                    user={user}
                    userData={userData}
                    genresData={genresData}
                    roles={roles}
                    onSignUpClick={() => this.openDialog("signUpDialog")}
                    onSignInClick={() => this.openDialog("signInDialog")}
                    onAboutClick={() => this.openDialog("aboutDialog")}
                    onSettingsClick={() => this.openDialog("settingsDialog")}
                    onSignOutClick={() => this.openDialog("signOutDialog")}
                    onUserWelcomeClick={() => this.openDialogUserWelcome()}
                  />
                }
                openSnackbar={this.openSnackbar}
              />

              <UserWelcome
                handleOpen={userWelcomeDialog}
                setHandleOpen={(value) =>
                  this.handleClickDialogUserWelcome(value)
                }
              />

              <DialogHost
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={this.openSnackbar}
                dialogs={{
                  aboutDialog: {
                    dialogProps: {
                      open: aboutDialog.open,

                      onClose: () => this.closeDialog("aboutDialog"),
                    },
                  },

                  signUpDialog: {
                    dialogProps: {
                      open: signUpDialog.open,

                      onClose: (callback) => {
                        this.closeDialog("signUpDialog");

                        if (callback && typeof callback === "function") {
                          callback();
                        }
                      },
                    },
                  },

                  signInDialog: {
                    dialogProps: {
                      open: signInDialog.open,

                      onClose: (callback) => {
                        this.closeDialog("signInDialog");

                        if (callback && typeof callback === "function") {
                          callback();
                        }
                      },
                    },
                  },

                  settingsDialog: {
                    dialogProps: {
                      open: settingsDialog.open,

                      onClose: () => this.closeDialog("settingsDialog"),
                    },

                    props: {
                      onDeleteAccountClick: () =>
                        this.openDialog("deleteAccountDialog"),
                    },
                  },

                  deleteAccountDialog: {
                    dialogProps: {
                      open: deleteAccountDialog.open,

                      onClose: () => this.closeDialog("deleteAccountDialog"),
                    },

                    props: {
                      deleteAccount: this.deleteAccount,
                    },
                  },

                  signOutDialog: {
                    dialogProps: {
                      open: signOutDialog.open,

                      onClose: () => this.closeDialog("signOutDialog"),
                    },

                    props: {
                      title: "¿ Salir ?",
                      contentText:
                        "Si sales ya no podras crear listas y administrar tus pelis.",
                      dismissiveAction: (
                        <Button
                          color="primary"
                          onClick={() => this.closeDialog("signOutDialog")}
                        >
                          Cancelar
                        </Button>
                      ),
                      confirmingAction: (
                        <Button
                          color="primary"
                          disabled={performingAction}
                          variant="contained"
                          onClick={this.signOut}
                        >
                          Salir
                        </Button>
                      ),
                    },
                  },
                }}
              />

              <Snackbar
                autoHideDuration={snackbar.autoHideDuration}
                message={snackbar.message}
                open={snackbar.open}
                onClose={this.closeSnackbar}
              />
            </div>
                        
          )}
        </ErrorBoundary>
      </MuiThemeProvider>
    );
  }

  componentDidMount() {
    this.onAuthStateChangedObserver = auth.onAuthStateChanged(
      (user) => {
        // The user is not signed in or doesn’t have a user ID.
        if (!user || !user.uid) {
          if (this.userDocumentSnapshotListener) {
            this.userDocumentSnapshotListener();
          }

          this.resetState();

          return;
        }

        // The user is signed in, begin retrieval of external user data.
        this.userDocumentSnapshotListener = firestore
          .collection("users")
          .doc(user.uid)
          .onSnapshot(
            (snapshot) => {
              const data = snapshot.data();

              // The user doesn’t have a data point, equivalent to not signed in.
              if (!snapshot.exists || !data) {
                if (this.userDocumentSnapshotListener) {
                  this.userDocumentSnapshotListener();
                }

                this.resetState();

                return;
              }

              authentication
                .getRoles()
                .then((value) => {
                  this.setTheme(data.theme, () => {
                    this.setState({
                      ready: true,
                      user: user,
                      userData: data,
                      roles: value || [],
                    });
                  });
                })
                .catch((reason) => {
                  this.resetState(() => {
                    const code = reason.code;
                    const message = reason.message;

                    switch (code) {
                      default:
                        this.openSnackbar(message);
                        return;
                    }
                  });
                });
            },
            (error) => {
              this.resetState(() => {
                const code = error.code;
                const message = error.message;

                switch (code) {
                  default:
                    this.openSnackbar(message);
                    return;
                }
              });
            }
          );
      },
      (error) => {
        this.resetState(() => {
          const code = error.code;
          const message = error.message;

          switch (code) {
            default:
              this.openSnackbar(message);
              return;
          }
        });
      }
    );

    //Consultar los generos
    apiMovies.getGenres().then((res) => {
      this.setState({
        genresData: res.genres,
      });
    });
  }

  componentWillUnmount() {
    if (this.onAuthStateChangedObserver) {
      this.onAuthStateChangedObserver();
    }

    if (this.userDocumentSnapshotListener) {
      this.userDocumentSnapshotListener();
    }
  }
}

export default App;
