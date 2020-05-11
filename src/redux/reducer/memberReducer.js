import {
  STATUS_MODAL,
  UPDATED_DATA,
  LIST_MEMBER,
} from "../actions/memberAction";

const initialState = {
  updated: false,
  squad: null,
  squadToCreate: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STATUS_MODAL:
      return {
        squadToCreate: action.squadToCreate,
      };
    case UPDATED_DATA:
      return {
        ...state,
        updated: action.updated,
      };
    case LIST_MEMBER:
      return {
        squad: action.squad,
      };
    default:
      return state;
  }
};
