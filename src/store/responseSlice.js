import { createSlice } from "@reduxjs/toolkit";

const responseSlice = createSlice({
  name: "responses",
  initialState: {},
  reducers: {
    addResponse(state, { payload }) {
      const { formId, response } = payload;
      if (state[formId]) {
        state[formId].push(response);
      } else {
        state[formId] = [[...response]];
      }
    },
    deleteResponse(state, { payload }) {
      const { formId, responseIndex } = payload;
      state[formId].splice(responseIndex, 1);
    },
  },
});

export const responseActions = responseSlice.actions;

export default responseSlice;
