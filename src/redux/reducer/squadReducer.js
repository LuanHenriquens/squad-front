import { STATUS_MODAL, UPDATED_DATA } from "../actions/squadAction";

const initialState = {
  squadModal: false,
  updated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STATUS_MODAL:
      return {
        squadModal: action.statusModal
      };
    case UPDATED_DATA:
      return {
        updated: action.updated
      };
    default:
      return state;
  }
};
