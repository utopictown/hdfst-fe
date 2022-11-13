import React from "react";
import actionType from "./store/action-type";

// Context
const State = React.createContext();

const initialState = {
  user: {
    username: "",
    password: "",
  },
  orders: [],
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      return {
        ...state,
        user: action.value,
      };
    case actionType.ADD_ORDERS:
      return {
        ...state,
        orders: action.value,
      };
    case actionType.APPEND_ORDER:
      return {
        ...state,
        orders: [...state.orders, { ...action.value, id: state.orders.length + 1 }],
      };
    default:
      return state;
  }
};

// Provider
const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return <State.Provider value={{ state, dispatch }}>{children}</State.Provider>;
};

// Export
export const Store = {
  State,
  Provider,
};
