import { Profile } from "../../api";

let initialState = {
  profile: "",
  purchase_info: {},
  order_history: {},
  order_details: {
    loading: false,
  },
  updated_profile_data: {
    loading: false,
    open: false,
    message: "",
    severity: "",
  },
  favorites: "",
  isLoading: true,
  added_to_favorites: "",
  changed_phone_data: {
    open: false,
    message: "",
    severity: "",
  },
  changed_password_data: {
    open: false,
    message: "",
    severity: "",
  },
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE_DATA": {
      return {
        ...state,
        profile: action.data,
      };
    }

    case "SET_PURCHACE_INFO": {
      return {
        ...state,
        purchase_info: action.data,
      };
    }

    case "SET_ORDER_HISTORY": {
      return {
        ...state,
        order_history: action.data,
      };
    }

    case "SET_ORDER_DETAILS": {
      return {
        ...state,
        order_details: action.data,
      };
    }

    case "SET_PAYMENT_HISTORY": {
      return {
        ...state,
        order_history: action.data,
      };
    }

    case "SET_UPDATED_PROFILE_DATA": {
      return {
        ...state,
        updated_profile_data: action.data,
      };
    }

    case "SET_FAVORITE_LIST": {
      return {
        ...state,
        favorites: action.data,
        isLoading: false,
      };
    }

    case "SET_ADDED_TO_FAVORITES": {
      return {
        ...state,
        added_to_favorites: action.data,
      };
    }

    case "SET_CHANGED_PHONE_DATA": {
      return {
        ...state,
        changed_phone_data: action.data,
      };
    }

    case "SET_CHANGED_PASSWORD_DATA": {
      return {
        ...state,
        changed_password_data: action.data,
      };
    }

    default:
      return state;
  }
};

export const setProfileData = (data) => ({
  type: "SET_PROFILE_DATA",
  data: data,
});

export const setPurchaceInfo = (data) => ({
  type: "SET_PURCHACE_INFO",
  data: data,
});

export const setOrderHistory = (data) => ({
  type: "SET_ORDER_HISTORY",
  data: data,
});

export const setOrderDetails = (data) => ({
  type: "SET_ORDER_DETAILS",
  data: data,
});

export const setPaymentHistory = (data) => ({
  type: "SET_PAYMENT_HISTORY",
  data: data,
});

export const setFavoriteList = (data) => ({
  type: "SET_FAVORITE_LIST",
  data: data,
});

export const setUpdatedProfileData = (data) => ({
  type: "SET_UPDATED_PROFILE_DATA",
  data: data,
});

export const setAddedToFavorites = (data) => ({
  type: "SET_ADDED_TO_FAVORITES",
  data: data,
});

export const setChangedPhoneData = (data) => ({
  type: "SET_CHANGED_PHONE_DATA",
  data: data,
});

export const setChangedPasswordData = (data) => ({
  type: "SET_CHANGED_PASSWORD_DATA",
  data: data,
});

export const getProfileData = () => (dispatch) =>
  Profile.getProfileData().then((response) =>
    dispatch(setProfileData(response.results[0]))
  );

export const getPurchaseInfo = () => (dispatch) =>
  Profile.getPurchaseInfo().then((response) =>
    dispatch(setPurchaceInfo(response))
  );

export const getOrderHistory = (data) => (dispatch) =>
  Profile.getOrderHistory(data).then((response) =>
    dispatch(setOrderHistory(response))
  );

export const getOrderDetails = (id) => (dispatch) =>
  Profile.getOrderDetails(id).then((response) =>
    dispatch(setOrderDetails({ loading: false, response }))
  );

export const getPaymentHistory = () => (dispatch) =>
  Profile.getPaymentHistory().then((response) =>
    dispatch(setPaymentHistory(response))
  );

export const getFavoriteList = (data) => (dispatch) =>
  Profile.getFavoriteList(data).then((response) =>
    dispatch(setFavoriteList(response))
  );

export const addOrDeleteToFavorites = (id) => (dispatch) =>
  Profile.addOrDeleteToFavorites(id).then((response) =>
    dispatch(setAddedToFavorites(response))
  );

export const updateProfile = (data) => (dispatch) =>
  Profile.updateProfile(data).then((response) =>
    dispatch(
      setUpdatedProfileData({
        open: true,
        loading: false,
        message: response.data,
        severity: response.status,
      })
    )
  );

export const changePhone = (data) => (dispatch) =>
  Profile.changePhone(data).then((response) =>
    dispatch(
      setChangedPhoneData({
        open: true,
        message: response.data,
        severity: response.status,
      })
    )
  );

export const changePassword = (data) => (dispatch) =>
  Profile.changePassword(data).then((response) =>
    dispatch(
      setChangedPasswordData({
        open: true,
        message: response.data,
        severity: response.status,
      })
    )
  );

export default auth;
