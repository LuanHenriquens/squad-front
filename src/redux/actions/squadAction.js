export const squadStatusScreenOfCreate = (dispatch, statusModal) => {
  if(statusModal)
    squadUpdatedData(dispatch, false);

  dispatch({
    type: STATUS_MODAL,
    statusModal: statusModal
  });
};

export const squadUpdatedData = (dispatch, updated) => {
  dispatch({
    type: UPDATED_DATA,
    updated: updated
  })
}

export const STATUS_MODAL = "STATUS_MODAL";
export const UPDATED_DATA = "UPDATED_DATA";
