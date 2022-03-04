import request from "../../api";
import {
  CHANNEL_DETAILS_FAILURE,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
  SUBSCRIPTION_LIST_FAILURE,
  SUBSCRIPTION_LIST_REQUEST,
  SUBSCRIPTION_LIST_SUCCESS,
} from "../constants";

export const getChannelDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CHANNEL_DETAILS_REQUEST });
    const { data } = await request.get("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id,
      },
    });
    dispatch({ type: CHANNEL_DETAILS_SUCCESS, payload: data.items[0] });
  } catch (err) {
    dispatch({ type: CHANNEL_DETAILS_FAILURE, payload: err.message });
  }
};

export const getSubscriptionStatus = (id) => async (dispatch, getState) => {
  try {
    const { data } = await request.get("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
      payload: data.items.length !== 0,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSubscriptionList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUBSCRIPTION_LIST_REQUEST });
    const { data } = await request.get("/subscriptions", {
      params: {
        part: "snippet,contentDetails",
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: SUBSCRIPTION_LIST_SUCCESS,
      payload: data.items,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SUBSCRIPTION_LIST_FAILURE,
      payload: err.response.message,
    });
  }
};
