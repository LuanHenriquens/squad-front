import {
  STATUS_MODAL,
  UPDATED_DATA,
  UPDATE_SQUAD,
} from "../actions/squadAction";

const initialState = {
  squadModal: false,
  updated: false,
  squad: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STATUS_MODAL:
      return {
        squadModal: action.statusModal,
      };
    case UPDATED_DATA:
      return {
        updated: action.updated,
      };
    case UPDATE_SQUAD:
      return {
        squad: action.squad,
      };
    default:
      return state;
  }
};
