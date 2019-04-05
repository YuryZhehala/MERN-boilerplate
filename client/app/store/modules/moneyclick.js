import axios from "axios";
import { createActions, handleActions } from "redux-actions";

// const url = 'https://159.89.26.174:8001/horizon-api/';
const url = "https://localhost:8001/horizon-api/";

const rest = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json"
  }
});

export const {
  doTransaction,
  notificationSubscribe,
  subscriptionClosed,
  getTransactionData
} = createActions({
  DO_TRANSACTION: (sourceSK, receiverPK, amount, memo) =>
    rest
      .post("/transfer", {
        source_sk: sourceSK,
        receiver_pk: receiverPK,
        amount,
        memo
      })
      .then(response => response.data)
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code out of the 2xx range
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      }),
  NOTIFICATION_SUBSCRIBE: (receiverPK, amount, memo) =>
    rest
      .put("/notification", {
        to: receiverPK,
        amount,
        orderid: memo
      })
      .then(response => response.data)
      .catch(error => {
        console.log(error);
        if (error.response) {
          // The request was made and the server responded with a status code out of the 2xx range
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      }),
  SUBSCRIPTION_CLOSED: () => ({ state: "closed" }),
  GET_TRANSACTION_DATA: transaction => transaction
});

export default handleActions(
  {
    [doTransaction]: (state, { payload }) => ({
      ...state,
      transfer: { ...payload }
    }),
    [notificationSubscribe]: (state, { payload }) => ({
      ...state,
      subscriptionState: payload.state
    }),
    [subscriptionClosed]: (state, { payload }) => ({
      ...state,
      subscriptionState: payload.state
    }),
    [getTransactionData]: (state, { payload }) => ({
      ...state,
      payment: payload
    })
  },
  { subscriptionState: false, payment: {} }
);
