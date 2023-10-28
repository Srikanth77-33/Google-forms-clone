import { createSlice } from "@reduxjs/toolkit";

const infoSlice = createSlice({
  name: "side-button",
  initialState: {
    sideBtn: { top: 258 },
    editQuestionIndex: 0,
    isSubmitted: false
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
    }
  },
});

export const getEditQuestionIndex = () => (state) => state.info.editQuestionIndex;
export const getTop = () => (state) => state.info.sideBtn.top;
export const getIsSubmitted = () => (state) => state.info.isSubmitted;

export default infoSlice;
