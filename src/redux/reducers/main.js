import { Main } from "../../api";

let initialState = {
  banners: "",
  currency_list: {},
  articles: {},
  article_details: {},
  mail_res: {
    open: false,
    message: "",
    severity: "",
  },
  search: "",
  cities: {},
};

const main = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BANNERS": {
      return {
        ...state,
        banners: action.data,
      };
    }

    case "SET_CURRENCIES": {
      return {
        ...state,
        currency_list: action.data,
      };
    }

    case "SET_ARTICLES": {
      return {
        ...state,
        articles: action.data,
      };
    }

    case "SET_ARTICLE_DETAILS": {
      return {
        ...state,
        article_details: action.data,
      };
    }

    case "SET_MAIL_RES": {
      return {
        ...state,
        mail_res: action.data,
      };
    }

    case "SET_SEARCH": {
      return {
        ...state,
        search: action.data,
      };
    }

    case "SET_CITIES": {
      return {
        ...state,
        cities: action.data,
      };
    }

    default:
      return state;
  }
};


export const setCurrencies = (data) => ({
  type: "SET_CURRENCIES",
  data: data,
});

export const setBanners = (data) => ({
  type: "SET_BANNERS",
  data: data,
});

export const setArticles = (data) => ({
  type: "SET_ARTICLES",
  data: data,
});

export const setArticleDetails = (data) => ({
  type: "SET_ARTICLE_DETAILS",
  data: data,
});

export const setMailRes = (data) => ({
  type: "SET_MAIL_RES",
  data: data,
});

export const setSearch = (data) => ({
  type: "SET_SEARCH",
  data: data,
});

export const setCities = (data) => ({
  type: "SET_CITIES",
  data: data,
});

export const getBanners = (data) => (dispatch) =>
  Main.getBanners(data).then((response) => dispatch(setBanners(response)));

export const getCurrencyList = () => (dispatch) =>
  Main.getCurrencyList().then((response) => dispatch(setCurrencies(response)));

export const getArticles = () => (dispatch) =>
  Main.getArticles().then((response) => dispatch(setArticles(response)));

export const getArticleDetails = (id) => (dispatch) =>
  Main.getArticleDetails(id).then((response) =>
    dispatch(setArticleDetails(response))
  );

export const getCities = () => (dispatch) =>
  Main.getCities().then((response) => dispatch(setCities(response)));

export const subscribeMail = (data) => (dispatch) =>
  Main.subscribeMail(data).then((response) =>
    dispatch(
      setMailRes({
        open: true,
        message: response.data,
        severity: response.status,
      })
    )
  );

export default main;
