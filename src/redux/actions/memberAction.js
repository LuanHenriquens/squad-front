export const memberStatusScreenOfCreate = (dispatch, squad) => {
  if (squad) memberUpdatedData(dispatch, false);

  dispatch({
    type: STATUS_MODAL,
    squadToCreate: squad,
  });
};

export const memberUpdatedData = (dispatch, updated) => {
  dispatch({
    type: UPDATED_DATA,
    updated: updated,
  });
};

export const listMembers = (dispatch, squad) => {
  dispatch({
    type: LIST_MEMBER,
    squad: squad,
  });
};

export const STATUS_MODAL = "STATUS_MODAL";
export const UPDATED_DATA = "UPDATED_DATA";
export const LIST_MEMBER = "LIST_MEMBER";
