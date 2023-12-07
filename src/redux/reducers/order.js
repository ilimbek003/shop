import { Order } from "../../api";

let initialState = {
  created_order: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CREATED_ORDER_DATA": {
      return {
        ...state,
        created_order: action.data,
      };
    }

    default:
      return state;
  }
};

export const setCreatedOrderData = (data) => ({
  type: "SET_CREATED_ORDER_DATA",
  data: data,
});

export const createOrder = (data) => (dispatch) =>
  Order.createOrder(data).then((response) =>
    dispatch(
      setCreatedOrderData({
        open: response.status === 201 ? false : true,
        message: response.data,
        severity: response.status,
      })
    )
  );

export default auth;
