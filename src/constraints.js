const constraints = {
  firstName: {
    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  lastName: {
    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  username: {
    length: {
      minimum: 2,
      maximum: 20,
    },

    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  emailAddress: {
    email: {
      message: "^Email incorrecto",
    },

    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  emailAddressConfirmation: {
    email: {
      message: "^Confirmación de email incorrecta",
    },

    equality: {
      attribute: "emailAddress",
      message: "^Confirmación de email no es igual al email",
    },

    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  password: {
    length: {
      minimum: 6,
    },

    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  passwordConfirmation: {
    equality: "password",

    length: {
      minimum: 6,
    },

    presence: {
      allowEmpty: false,
    },

    type: "string",
  },
};

export default constraints;
