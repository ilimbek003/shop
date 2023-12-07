import { Auth } from "../../api";

let initialState = {
  loginDialog: false,
  verifyDialog: false,
  regDialog: false,
  forgotPasswordDialog: false,
  confirmDialog: false,
  login: {
    open: false,
    message: "",
    severity: "",
  },
  reg: {
    open: false,
    message: "",
    severity: "",
  },

  verify: {
    open: false,
    message: "",
    severity: "",
  },
  code: {
    open: false,
    message: "",
    severity: "",
  },

  edited_password_data: {
    open: false,
    message: "",
    severity: "",
  },

  reseted_password_data: {
    open: false,
    message: "",
    severity: "",
  },
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN_RES": {
      return {
        ...state,
        login: action.data,
      };
    }

    case "SET_VERIFY_RES": {
      return {
        ...state,
        verify: action.data,
      };
    }

    case "SET_REG_RES": {
      return {
        ...state,
        reg: action.data,
      };
    }

    case "SET_LOGIN_DIALOG": {
      return {
        ...state,
        loginDialog: action.data,
      };
    }
    case "SET_VERIFY_DIALOG": {
      return {
        ...state,
        verifyDialog: action.data,
      };
    }

    case "SET_REG_DIALOG": {
      return {
        ...state,
        regDialog: action.data,
      };
    }

    case "SET_FORGOT_PASSWORD_DIALOG": {
      return {
        ...state,
        forgotPasswordDialog: action.data,
      };
    }

    case "SET_CONFIRM_DIALOG": {
      return {
        ...state,
        confirmDialog: action.data,
      };
    }

    case "SET_CODE_RES": {
      return {
        ...state,
        code: action.data,
      };
    }

    case "SET_EDITED_PASSWORD_DATA": {
      return {
        ...state,
        edited_password_data: action.data,
      };
    }

    case "SET_RESETED_PASSWORD_DATA": {
      return {
        ...state,
        reseted_password_data: action.data,
      };
    }

    default:
      return state;
  }
};

export const setOpenLogin = (data) => ({ type: "SET_LOGIN_DIALOG", data });
export const setLogin = (data) => ({ type: "SET_LOGIN_RES", data });
export const setReg = (data) => ({ type: "SET_REG_RES", data });
export const setVerifyRes = (data) => ({ type: "SET_VERIFY_RES", data });
export const setRegDialog = (data) => ({ type: "SET_REG_DIALOG", data });
export const setVerifyDialog = (data) => ({ type: "SET_VERIFY_DIALOG", data });
export const setForgotPasswordDialog = (data) => ({
  type: "SET_FORGOT_PASSWORD_DIALOG",
  data,
});

export const setConfirmDialog = (data) => ({
  type: "SET_CONFIRM_DIALOG",
  data,
});

export const setCodeRes = (data) => ({
  type: "SET_CODE_RES",
  data,
});

export const setEditedPasswordData = (data) => ({
  type: "SET_EDITED_PASSWORD_DATA",
  data,
});

export const setResetedPasswordData = (data) => ({
  type: "SET_RESETED_PASSWORD_DATA",
  data,
});

export const postLogin = (data) => (dispatch) =>
  Auth.postLogin(data).then((response) =>
    dispatch(
      setLogin({
        open: true,
        message: response.data,
        severity: response.status,
      })
    )
  );

export const sendRegData = (data) => (dispatch) =>
  Auth.sendRegData(data).then((response) =>
    dispatch(
      setReg({
        open: true,
        message: response.data,
        severity: response.status,
      })
    )
  );

export const sendVerifyData = (data) => (dispatch) =>
  Auth.sendVerifyData(data).then((response) =>
    dispatch(
      setVerifyRes({
        open: true,
        message: response.data,
        severity: response.status,
      })
    )
  );

export const sendCode = (data) => (dispatch) =>
  Auth.sendCode(data).then((response) =>
    dispatch(
      setCodeRes({
        open: true,
        message: response.data,
        severity: response.status,
      })
    )
  );

export const forgotPassword = (data) => (dispatch) =>
  Auth.forgotPassword(data).then((response) =>
    dispatch(
      setEditedPasswordData({
        open: true,
        message: response.data,
        severity: response.status,
      })
    )
  );

export const resetPassword = (data) => (dispatch) =>
  Auth.resetPassword(data).then((response) =>
    dispatch(
      setResetedPasswordData({
        open: true,
        message: response.data,
        severity: response.status,
      })
    )
  );

export default auth;
