import {
  CHANNEL_DETAILS_FAILURE,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
  SUBSCRIPTION_LIST_FAILURE,
  SUBSCRIPTION_LIST_REQUEST,
  SUBSCRIPTION_LIST_SUCCESS,
} from "../constants";

const channelDetailsState = {
  channel: {},
  loading: true,
  subscriptionStatus: false,
};

export const channelDetailsReducer = (state = channelDetailsState, action) => {
  switch (action.type) {
    case CHANNEL_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANNEL_DETAILS_SUCCESS:
      return {
        ...state,
        channel: action.payload,
        loading: false,
      };
    case CHANNEL_DETAILS_FAILURE:
      return {
        ...state,
        channel: {},
        loading: false,
        error: action.payload,
      };
    case SET_SUBSCRIPTION_STATUS:
      return {
        ...state,
        subscriptionStatus: action.payload,
      };
    default:
      return state;
  }
};

const subscriptionListState = {
  channels: [],
  loading: true,
};
export const subscriptionListReducer = (
  state = subscriptionListState,
  action
) => {
  switch (action.type) {
    case SUBSCRIPTION_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBSCRIPTION_LIST_SUCCESS:
      return {
        ...state,
        channels: action.payload,
        loading: false,
      };
    case SUBSCRIPTION_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
