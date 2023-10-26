import { createSlice } from "@reduxjs/toolkit";

const infoSlice = createSlice({
  name: "side-button",
  initialState: {
    sideBtn: { top: 258 },
    editQuestionIndex: 0,
    isSubmitted: false,
    theme: '#673ab7'
  },
  reducers: {
    setEditQuestionIndex(state, { payload }) {
      const { inputIndex } = payload;
      state.editQuestionIndex = inputIndex;
    },
    setTop(state, { payload }) {
      state.sideBtn.top = payload.top;
    },
    setIsSubmitted(state, { payload }) {
      state.isSubmitted = payload.isSubmitted;
    },
    setTheme( state, { payload }) {
      state.theme = payload.theme;
    }
  },
});

export const infoActions = infoSlice.actions;

export default infoSlice;
