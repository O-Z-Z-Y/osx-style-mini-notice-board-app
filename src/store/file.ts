import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileState } from "../types/reduxState";

//* 초기 상태
const initialState: FileState = {
  selectedFile: null,
};

const file = createSlice({
  name: "file",
  initialState,
  reducers: {
    //* 파일 선택하기
    setSelectedFile(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.selectedFile = null;
      }
      state.selectedFile = action.payload;
      return state;
    },
  }
});

export const fileActions = {...file.actions };

export default file;